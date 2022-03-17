<template>
  <div class="widget">
    <weather-forecast-loading v-if="loading" />

    <div v-show="!loading" class="info">
      <weather-forecast-today
        v-if="!cityError"
        :weather="current"
        class="today"
      />

      <weather-forecast-week
        v-if="!cityError"
        :weather="week"
        class="week"
      />

      <weather-forecast-load-form
        :error="error"
        :load-by-city-name="loadByCityName"
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

export default {
  name: "WeatherForecast",

  components: {
    WeatherForecastLoadForm,
    WeatherForecastLoading,
    WeatherForecastWeek,
    WeatherForecastToday
  },

  data() {
    return {
      loading: true,
      current: {},
      week: [],
      cityError: false,
      error: false
    };
  },

  created() {
    this.loadByCoords();
  },

  methods: {
    loadByCoords() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.loadWeatherForecast(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          () => {
            this.createCityError();
            this.loading = false;
            console.error("Доступ к геолокации запрещен");
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        console.error("Геолокация не доступна");
      }
    },

    loadByCityName(city) {
      if (city) {
        this.loading = true;
        this.$http
          .get(`geo/1.0/direct?q=${city}`)
          .then((response) => {
            this.loadWeatherForecast(
              response.data[0].lat,
              response.data[0].lon
            );
          })
          .catch(() => {
            this.createCityError();
            this.loading = false;
          });
      } else {
        this.error = true;
      }
    },

    createCityError() {
      this.city = "";
      this.cityPlaceholder = "Введите существующий город";
      this.cityError = true;
      this.error = true;
    },

    clearCityError() {
      this.city = "";
      this.error = false;
      if (this.cityError) {
        this.cityPlaceholder = "Введите город";
        this.cityError = false;
      }
    },

    loadWeatherForecast(lat, lon) {
      this.$http
        .get(
          `data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&lang=ru`
        )
        .then((response) => {
          this.current = response.data.current;
          this.week = response.data.daily;
          this.clearCityError();
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.widget {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  color: #333;
  border-radius: 25px;
  position: relative;

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
}
</style>
