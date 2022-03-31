<template>
  <div class="weatherForecast">
    <weather-forecast-loading v-if="loading" />

    <div
      v-if="!loading"
      :class="{
        'cityError': cityExistError,
      }"
      class="info"
    >
      <weather-forecast-error
        v-if="cityExistError"
        :city-exist-error="cityExistError"
        :geo-access-error="geoAccessError"
        :geo-exist-error="geoExistError"
        :searches-amount="searchesAmount"
        class="error"
      />

      <weather-forecast-context
        :copy-weather-forecast="copyWeatherForecast"
      />

      <button class="settings__open" @click="openSettings">
        <img alt="Настройки" class="settings__open__img" src="@/assets/img/settings.svg">
      </button>

      <weather-forecast-settings v-if="settingsShowing" :close-settings="closeSettings" />

      <weather-forecast-today
        v-if="!cityExistError"
        :city-name="cityName"
        :weather="current"
        class="today"
      />

      <weather-forecast-week
        v-if="!cityExistError"
        :weather="daily"
        class="week"
      />

      <weather-forecast-load-form
        :city-exist-error="cityExistError"
        :geo-access-error="geoAccessError"
        :load-by-city-name="loadByCityName"
        :searches-amount="searchesAmount"
        class="form"
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
      current: {
        icon: "",
        temperature: "",
        feelsLike: "",
        description: "",
        conditions: ""
      },
      daily: {
        week: [],
        averageTemperatureDay: 0,
        averageTemperatureNight: 0
      },
      cityName: "",
      cityExistError: false,
      geoAccessError: false,
      geoExistError: false,
      settingsShowing: false,
      searchesAmount: 0
    };
  },

  computed: {
    daysInMonth() {
      const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
      return Math.round((nextMonth - thisMonth) / 1000 / 3600 / 24);
    }
  },

  created() {
    this.loadByCoords();
  },

  methods: {
    loadWeatherForecast(lat, lon) {
      if (lat && lon) {
        this.$http
          .get(
            `data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&lang=${this.lang}`
          )
          .then((response) => {
            this.searchesAmount++;
            this.setCurrentWeather(response.data.current);
            this.setDailyWeather(response.data.daily);
            this.cityExistError = false;
            this.loading = false;
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },

    loadCityName(lat, lon) {
      if (lat && lon) {
        this.$http
          .get(`geo/1.0/reverse?lat=${lat}&lon=${lon}`)
          .then((response) => {
            this.cityName = response.data[0].local_names[this.lang];
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },

    loadByCoords() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            this.loadCityName(lat, lon);
            this.loadWeatherForecast(lat, lon);
          },
          () => {
            this.cityExistError = true;
            this.geoAccessError = true;
            this.loading = false;
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        this.geoExistError = true;
      }
    },

    loadByCityName(city) {
      const alreadyLoadedCity = city.toLowerCase() === this.cityName.toLowerCase();
      if (alreadyLoadedCity) {
        document.activeElement.blur();
      }
      if (city && !alreadyLoadedCity) {
        this.loading = true;
        this.$http
          .get(`geo/1.0/direct?q=${city}`)
          .then((response) => {
            this.loadWeatherForecast(
              response.data[0].lat,
              response.data[0].lon
            );
            this.cityName = city;
          })
          .catch(() => {
            this.cityExistError = true;
            this.cityName = "";
            this.loading = false;
          });
      }
    },

    getMonthNaming(index) {
      return monthNamings[index];
    },

    getWeekDayNaming(day) {
      if (day === 1) {
        return "Сегодня";
      }
      const index = (day + new Date().getDay() - 2) % dayNamings.length;
      return dayNamings[index];
    },

    getDate(day, daysInMonth) {
      day = day + new Date().getDate();
      if (day <= daysInMonth) {
        return day + " " + this.getMonthNaming(new Date().getMonth());
      }
      return day % daysInMonth + " " + this.getMonthNaming(new Date().getMonth() + 1);
    },

    setCurrentWeather(current) {
      let description = current.weather[0].description;
      this.current.icon = `https://openweathermap.org/img/wn/${current.weather[0].icon}.png`;
      this.current.temperature = `${Math.round(current.temp)}°С`;
      this.current.feelsLike = `ощущается как ${Math.round(current.feels_like)}°С`;
      this.current.description = description[0].toUpperCase() + description.slice(1);
      this.current.conditions = `
        Ветер: ${Math.round(current.wind_speed)} м/с,
        Давление: ${Math.round(current.pressure)} мм рт. ст
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
        weekDayNaming: this.getWeekDayNaming(index + 1),
        date: this.getDate(index, this.daysInMonth),
        icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`
      };
    },

    setDailyWeather(daily) {
      this.daily.week = daily.map((day, index) => this.getFormattedDay(day, index));
      this.setAverageTemperature();
    },

    openSettings() {
      this.settingsShowing = true;
    },

    closeSettings() {
      this.settingsShowing = false;
    },

    copyWeatherForecast() {
      let text = "";
      text += "Текущая температура равна " + this.current.temperature;
      return text;
    }
  }
};
</script>

<style lang="scss" scoped>
.weatherForecast {
  box-sizing: border-box;
  max-width: 1150px;
  margin: 0 auto;
  padding: 30px 20px 20px 20px;
  background-color: #ffffff;
  color: #333;
  border-radius: 25px;
  position: relative;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  font-size: 100%;
  vertical-align: baseline;
  scroll-behavior: smooth;
  user-select: none;

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
    grid-gap: 0 10px;

    @media (max-width: 1000px) {
      grid-template: repeat(3, auto) / 1fr;
      grid-template-areas:
      'today'
      'week'
      'form';
      grid-gap: 0;
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

    .settings__open {
      position: absolute;
      left: 20px;
      top: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      user-select: none;
      cursor: pointer;
      -webkit-appearance: button;

      .settings__open__img {
        display: block;
        width: 32px;
        height: 32px;
        pointer-events: none;
        user-select: none;
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
