<template>
  <div
    :class="theme"
    :style="{
      'minHeight': ((settingsShowing || savedShowing) && !loading) ? '300px' : 'auto'
    }"
    class="weatherForecast"
  >
    <div
      :class="{
        'cityError': errorShowing || geoAccessShowing,
      }"
      class="info"
    >
      <weather-forecast-error
        v-if="errorShowing && !geoAccessShowing"
        :geo-access-error="geoAccessError"
        :geo-exist-error="geoExistError"
        :searches-amount="searchesAmount"
        class="error"
      />

      <weather-forecast-context
        :city-name="cityName"
        :copy-weather-forecast="copyWeatherForecast"
      />

      <weather-forecast-navigation
        :weather-showing="weatherShowing"
        @openMap="openMap"
        @openSaved="openSaved"
        @openSettings="openSettings"
      />

      <weather-forecast-geo-access
        v-if="geoAccessShowing"
        @allow="loadByCoords"
        @forbid="blockGeoAccess"
      />

      <weather-forecast-settings
        v-if="settingsShowing"
        @close="closeSettings"
        @giveGeoAccess="handleGeoAccess"
        @switchTheme="switchTheme"
      />

      <weather-forecast-saved
        v-if="savedShowing"
        :current-city="cityName"
        @close="closeSaved"
        @loadFromSaved="loadFromSaved"
      />

      <weather-forecast-today
        v-if="weatherShowing"
        :city-name="cityName"
        :loading="loading"
        :weather="current"
        class="today"
      />

      <weather-forecast-week
        v-if="weatherShowing"
        :loading="loading"
        :weather="daily"
        class="week"
      />

      <weather-forecast-load-form
        :city-exist-error="cityExistError"
        :loading="loading"
        :searches-amount="searchesAmount"
        class="form"
        @formSubmit="loadByCityName"
      />
    </div>
  </div>
</template>

<script>
import WeatherForecastToday from "@/components/widget/WeatherForecastToday.vue";
import WeatherForecastWeek from "@/components/widget/WeatherForecastWeek.vue";
import WeatherForecastLoading from "@/components/widget/WeatherForecastLoading.vue";
import WeatherForecastLoadForm from "@/components/widget/WeatherForecastLoadForm.vue";
import WeatherForecastError from "@/components/widget/WeatherForecastError.vue";
import WeatherForecastContext from "@/components/widget/WeatherForecastContext.vue";
import WeatherForecastSettings from "@/components/widget/WeatherForecastSettings.vue";
import WeatherForecastGeoAccess from "@/components/widget/WeatherForecastGeoAccess.vue";
import WeatherForecastSaved from "@/components/widget/WeatherForecastSaved.vue";
import WeatherForecastNavigation from "@/components/widget/WeatherForecastNavigation.vue";

const dayNamings = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthNamings = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Мая",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек"
];

export default {
  name: "WeatherForecast",

  components: {
    WeatherForecastNavigation,
    WeatherForecastSaved,
    WeatherForecastGeoAccess,
    WeatherForecastSettings,
    WeatherForecastContext,
    WeatherForecastError,
    WeatherForecastLoadForm,
    WeatherForecastLoading,
    WeatherForecastWeek,
    WeatherForecastToday
  },

  data() {
    return {
      loading: true,
      lang: window.navigator.language.slice(0, 2),
      lat: 0,
      lon: 0,
      current: {
        icon: "Sun",
        temperature: "0°С",
        feelsLike: "ощущается как 0°С",
        description: "Погодные условия",
        conditions: "Ветер: 0 м/c, Давление: 0 мм рт. ст"
      },
      daily: {
        week: [
          {
            date: "1 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Сегодня"
          },
          {
            date: "2 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Пн"
          },
          {
            date: "3 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Вт"
          },
          {
            date: "4 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Ср"
          },
          {
            date: "5 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Чт"
          },
          {
            date: "6 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Пт"
          },
          {
            date: "7 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Сб"
          },
          {
            date: "8 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Вс"
          }
        ],
        averageTemperatureDay: 0,
        averageTemperatureNight: 0
      },
      cityName: "Город",
      geoExistError: false,
      geoAccessError: false,
      cityExistError: false,
      settingsShowing: false,
      savedShowing: false,
      geoAccessShowing: true,
      searchesAmount: 0,
      theme: "light"
    };
  },

  computed: {
    daysInMonth() {
      const secondsInDay = 86400;

      const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

      return Math.round((nextMonth - thisMonth) / 1000 / secondsInDay);
    },

    anyGeoError() {
      return this.geoExistError || this.geoAccessError;
    },

    errorShowing() {
      return !this.searchesAmount ? this.anyGeoError : false;
    },

    weatherShowing() {
      return !this.errorShowing && !this.geoAccessShowing;
    }
  },

  mounted() {
    let settingsGeoAccess = false;
    let settings = localStorage.settings;
    if (settings) {
      settings = JSON.parse(settings);

      const theme = settings.find(settings => settings.title === "Фиолетовая тема");
      if (theme) {
        this.theme = theme.turnedOn ? "purple" : "light";
      }

      settingsGeoAccess = settings.find(settings => settings.title === "Использовать местоположение, если возможно").turnedOn;
      if (!settingsGeoAccess) {
        this.geoAccessShowing = false;
        this.geoAccessError = true;
        this.loading = false;
        return;
      }
    }

    if (navigator.permissions) {
      navigator.permissions.query({
        name: "geolocation"
      })
        .then(permission => {
            if (permission.state === "granted") {
              this.loadByCoords();
            } else if (permission.state === "denied") {
              this.geoAccessShowing = false;
              this.geoAccessError = true;
              this.loading = false;
            } else if (permission.state === "prompt") {
              this.loading = false;
            }
          }
        );
    } else {
      this.loading = false;
    }
  },

  methods: {
    switchTheme(theme) {
      this.theme = theme;
    },

    blockGeoAccess() {
      this.geoAccessShowing = false;
      this.geoAccessError = true;
    },

    handleGeoAccess(flag) {
      if (!this.searchesAmount) {
        if (flag) {
          this.geoAccessError = false;
          this.geoAccessShowing = true;
          this.loading = false;
        } else {
          this.geoAccessError = true;
          this.geoAccessShowing = false;
          this.loading = false;
        }
      }
    },

    async loadWeatherForecast(lat, lon) {
      await this.$http
        .get(
          "data/2.5/onecall?",
          {
            params: {
              lat,
              lon,
              exclude: "hourly,minutely,alerts",
              units: "metric",
              lang: this.lang
            }
          }
        )
        .then((response) => {
          this.geoAccessShowing = false;
          this.searchesAmount++;
          this.setCurrentWeather(response.data.current);
          this.setDailyWeather(response.data.daily);
          this.cityExistError = false;
        })
        .catch(e => {
          console.error(e);
        });
    },

    async loadCityName(lat, lon) {
      await this.$http
        .get("geo/1.0/reverse?", {
          params: {
            lat,
            lon
          }
        })
        .then(response => {
          this.cityName = response.data[0].local_names[this.lang];
        })
        .catch(e => {
          console.error(e);
        });
    },

    async loadFromSaved(city) {
      this.closeSaved();
      if (city !== this.cityName) {
        await this.loadByCityName(city);
      }
    },

    async loadByCoords() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          position => {
            this.geoAccessShowing = false;

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            this.lat = lat;
            this.lon = lon;

            this.loading = true;

            Promise.all([
              this.loadCityName(lat, lon),
              this.loadWeatherForecast(lat, lon)
            ]).then(() => {
              this.loading = false;
            });
          },
          () => {
            this.geoAccessShowing = false;
            this.geoAccessError = true;
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        this.geoAccessShowing = false;
        this.geoExistError = true;
      }
    },

    async loadByCityName(city) {
      const alreadyLoadedCity = city.toLowerCase() === this.cityName.toLowerCase();
      if (alreadyLoadedCity) {
        document.activeElement.blur();
        this.cityExistError = false;
        return;
      }

      if (city) {
        this.loading = true;

        await this.$http
          .get("geo/1.0/direct?", {
            params: {
              q: city
            }
          })
          .then((response) => {
            this.lat = response.data[0].lat;
            this.lon = response.data[0].lon;

            this.loadWeatherForecast(
              response.data[0].lat,
              response.data[0].lon
            )
              .then(() => {
                this.loading = false;
              });

            this.cityName = city;
          })
          .catch(() => {
            this.cityExistError = true;
            this.loading = false;
          });
      }
    },

    getWeekDayNaming(day) {
      if (day === 0) {
        return "Сегодня";
      }
      const index = (day + new Date().getDay() - 1) % dayNamings.length;
      return dayNamings[index];
    },

    getDate(day, daysInMonth) {
      const month = new Date().getMonth();
      if (day <= daysInMonth) {
        return day + " " + monthNamings[month];
      }
      return day % daysInMonth + " " + monthNamings[month + 1];
    },

    getWeatherGif(id) {
      id = id.slice(0, 2); // Поскольку пока-что иконки одинаковые для дня и ночи, убираем букву в конце id
      switch (id) {
        case "01":
          return "Sun";
        case "02":
          return "Clouds";
        case "03":
          return "Clouds";
        case "04":
          return "Clouds";
        case "09":
          return "Rain";
        case "10":
          return "Rain";
        case "11":
          return "Lightning";
        case "13":
          return "Snow";
        case "50":
          return "Mist";
        default:
          return "Sun";
      }
    },

    setCurrentWeather(current) {
      let description = current.weather[0].description;
      this.current.icon = this.getWeatherGif(current.weather[0].icon);
      this.current.temperature = `${Math.round(current.temp)}°С`;
      this.current.feelsLike = `ощущается как ${Math.round(current.feels_like)}°С`;
      this.current.description = description[0].toUpperCase() + description.slice(1);
      this.current.conditions = `
        Ветер: ${Math.round(current.wind_speed)} м/с,
        Давление: ${Math.round(current.pressure)} мм рт. ст.
      `;
    },

    setAverageTemperature() {
      const days = 8;
      let averageTempDay = 0;
      let averageTempNight = 0;

      this.daily.week.forEach(t => {
        averageTempDay += t.max;
        averageTempNight += t.min;
      });

      this.daily.averageTemperatureDay = averageTempDay / days;
      this.daily.averageTemperatureNight = averageTempNight / days;
    },

    getFormattedDay(day, index) {
      return {
        max: Math.round(day.temp.max),
        min: Math.round(day.temp.min),
        weekDayNaming: this.getWeekDayNaming(index),
        date: this.getDate(index + new Date().getDate(), this.daysInMonth),
        icon: this.getWeatherGif(day.weather[0].icon)
      };
    },

    setDailyWeather(daily) {
      this.daily.week = daily.map(this.getFormattedDay);
      this.setAverageTemperature();
    },

    openSettings() {
      this.settingsShowing = true;
    },

    closeSettings() {
      this.settingsShowing = false;
    },

    openSaved() {
      this.savedShowing = true;
    },

    closeSaved() {
      this.savedShowing = false;
    },

    copyWeatherForecast() {
      return `
        Текущая температура равна ${this.current.temperature}
        , ${this.current.feelsLike}
      `;
    },

    openMap() {
      window.open(`https://www.google.com/maps/@${this.lat},${this.lon},13z`);
    }
  }
};
</script>

<style lang="scss" scoped>
.weatherForecast.light {
  background-color: #ffffff;
}

.weatherForecast.purple {
  background-color: #adaaff;
}

.weatherForecast {
  box-sizing: border-box;
  max-width: 1150px;
  margin: 0 auto;
  padding: 30px 20px 20px 20px;
  color: #333;
  border-radius: 25px;
  position: relative;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
  font-family: 'Roboto Condensed', sans-serif;
  vertical-align: baseline;

  @supports (user-select: none) {
    user-select: none
  }

  @supports (-webkit-tap-highlight-color: transparent) {
    -webkit-tap-highlight-color: transparent;
  }

  @supports (scroll-behavior: smooth) {
    scroll-behavior: smooth;
  }

  ::selection {
    background-color: rgba(51, 51, 51, 0.2);
    border-radius: 5px;
  }

  .info {
    height: 100%;
    display: grid;
    grid-template: repeat(2, auto) / 2fr 3fr;
    grid-template-areas:
      'today week'
      'form form';
    grid-gap: 10px;

    @media (max-width: 1000px) {
      grid-template: repeat(3, auto) / 1fr;
      grid-template-areas:
      'today'
      'week'
      'form';
    }

    @media (max-width: 300px) {
      grid-template: repeat(2, auto) / 1fr;
      grid-template-areas:
      'today'
      'form';

      .week {
        display: none;
      }
    }

    @media (max-width: 240px) {
      grid-template: repeat(1, auto) / 1fr;
      grid-template-areas:
      'today';

      .form {
        display: none;
      }
    }

    .error {
      grid-area: error;
    }

    .today {
      grid-area: today;
    }

    .week {
      grid-area: week;
    }

    .form {
      grid-area: form;
    }
  }

  .cityError {
    display: grid;
    grid-template: auto / 1fr;
    grid-template-areas:
      'error'
      'form';
  }
}
</style>
