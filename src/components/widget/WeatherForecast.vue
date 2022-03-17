<template>
  <div class="widget">
    <weather-forecast-loading v-if="loading" />

    <div v-show="!loading" class="info">
      <weather-forecast-today v-if="!cityError" :weather="current" />

      <weather-forecast-week v-if="!cityError" :weather="week" />

      <input
        ref="inputCity"
        v-model.trim="city"
        :placeholder="cityPlaceholder"
        class="inputCity"
        name="inputCity"
        type="text"
        @keydown.enter.prevent.self="loadByCityName"
      />

      <button class="search" type="submit" @click.prevent.self="loadByCityName">
        Поиск
      </button>
    </div>
  </div>
</template>

<script>
import WeatherForecastToday from "@/components/widget/WeatherForecastToday.vue";
import WeatherForecastWeek from "@/components/widget/WeatherForecastWeek.vue";
import WeatherForecastLoading from "@/components/widget/WeatherForecastLoading.vue";

export default {
  name: "WeatherForecast",

  components: {
    WeatherForecastLoading,
    WeatherForecastWeek,
    WeatherForecastToday
  },

  data() {
    return {
      loading: true,
      current: {},
      week: [],
      city: "",
      cityError: false,
      cityPlaceholder: "Введите город"
    };
  },

  created() {
    this.loadByCoords();
  },

  watch: {
    city() {
      this.city = this.city.replace(/[^a-zа-яё\s-]/gi, "");
    }
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

    loadByCityName() {
      if (this.city) {
        this.loading = true;
        this.$http
          .get(`geo/1.0/direct?q=${this.city}`)
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
        this.$refs.inputCity.classList.add("error");
      }
    },

    createCityError() {
      this.city = "";
      this.cityPlaceholder = "Введите существующий город";
      this.cityError = true;
      this.$refs.inputCity.classList.add("error");
    },

    clearCityError() {
      this.city = "";
      this.$refs.inputCity.classList.remove("error");
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
$focus: #fbc826;
$error: #ff0000;

.widget {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  color: #333;
  border-radius: 25px;
  position: relative;

  @media (min-width: 2000px) {
    transform: scale(1.4);
  }

  .info {
    height: 100%;
    display: grid;
    grid-template: repeat(2, auto) / 2fr 3fr;
    grid-gap: 0 10px;

    @media (max-width: 1000px) {
      grid-template: repeat(4, auto) / 1fr;
      grid-gap: 0;
    }

    .inputCity {
      height: 38px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #333333;
      transition: all 0.3s;
      font-size: 14px;
      font-weight: 400;
      background: transparent;

      &:focus {
        border: 1px solid $focus;
      }
    }

    .error {
      color: $error;
      border: 1px solid $error;
    }

    .search {
      height: 38px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #333333;
      transition: all 0.3s;
      font-size: 14px;
      font-weight: 400;
      background: transparent;

      @media (max-width: 1000px) {
        margin-top: 10px;
      }

      &:focus {
        border: 1px solid $focus;
      }

      &:hover {
        background-color: #333333;
        border: 1px solid #333333;
        color: #ffffff;
        transition: all 0.1s;
      }
    }
  }
}
</style>
