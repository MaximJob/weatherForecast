<template>
  <div class="widget">
    <weather-forecast-loading v-if="loading" />

    <div
      v-show="!loading"
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

      <weather-forecast-today
        v-if="!cityExistError"
        :weather="current"
        class="today"
      />

      <weather-forecast-week
        v-if="!cityExistError"
        :weather="week"
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

export default {
  name: "WeatherForecast",

  components: {
    WeatherForecastError,
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
      cityExistError: false,
      geoAccessError: false,
      geoExistError: false,
      searchesAmount: 0
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
            this.cityExistError = true;
            this.loading = false;
          });
      }
    },

    loadWeatherForecast(lat, lon) {
      this.$http
        .get(
          `data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&lang=ru`
        )
        .then((response) => {
          this.searchesAmount++;
          this.current = response.data.current;
          this.week = response.data.daily;
          this.cityExistError = false;
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
  box-sizing: border-box;
  min-width: 300px;
  max-width: 1150px;
  margin: 0 auto;
  padding: 30px 20px 20px 20px;
  background-color: #ffffff;
  color: #333;
  border-radius: 25px;
  position: relative;
  line-height: 1.5;

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
