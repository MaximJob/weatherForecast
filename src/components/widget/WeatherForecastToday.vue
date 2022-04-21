<template>
  <div class="today withContext">
    <weather-forecast-loading v-if="loading" />

    <div v-else>
      <div class="temperatureWrap">
        <h1 class="cityName">{{ cityName }}</h1>
        <component :is="'weatherForecastIcon' + weather.icon" class="icon" />
        <h2 class="temperature">{{ weather.temperature }}</h2>
        <h3 class="feelsLike">{{ weather.feelsLike }}</h3>
      </div>

      <div class="conditionsWrap">
        <h3 class="description">{{ weather.description }}</h3>
        <h4 class="conditions">{{ weather.conditions }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherForecastLoading from "@/components/widget/WeatherForecastLoading.vue";
import WeatherForecastChart from "@/components/widget/WeatherForecastChart.vue";
import WeatherForecastIconClouds from "@/components/widget/WeatherForecastIconClouds.vue";
import WeatherForecastIconLightning from "@/components/widget/WeatherForecastIconLightning.vue";
import WeatherForecastIconMist from "@/components/widget/WeatherForecastIconMist.vue";
import WeatherForecastIconRain from "@/components/widget/WeatherForecastIconRain.vue";
import WeatherForecastIconSun from "@/components/widget/WeatherForecastIconSun.vue";
import WeatherForecastIconSnow from "@/components/widget/WeatherForecastIconSnow.vue";

export default {
  name: "WeatherForecastToday",

  components: {
    WeatherForecastLoading,
    WeatherForecastChart,
    WeatherForecastIconClouds,
    WeatherForecastIconLightning,
    WeatherForecastIconMist,
    WeatherForecastIconRain,
    WeatherForecastIconSnow,
    WeatherForecastIconSun
  },

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
    },

    cityName: {
      type: String,
      required: true,
      default: "Название города"
    },

    weather: {
      type: Object,
      required: true,
      default: {
        icon: "https://openweathermap.org/img/wn/02d@2x.png",
        temperature: "0°С",
        feelsLike: "ощущается как 0°С",
        description: "Погодные условия",
        conditions: "Ветер: 0 м/c, Давление: 0 мм рт. ст"
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.today {
  padding: 30px 0 0 0;

  .temperatureWrap {
    display: grid;
    grid-template: repeat(3, auto) / 1fr 1fr;
    grid-template-areas:
      "cityName cityName"
      "icon up"
      "icon down";
    align-items: center;
    justify-items: center;

    @media (max-width: 240px) {
      display: grid;
      grid-template: repeat(3, auto) / 50px 1fr;
      grid-template-areas:
      "cityName cityName"
      "icon up"
      "icon down";
    }

    .cityName {
      grid-area: cityName;
      font-size: 26px;
      font-weight: 700;
      overflow-wrap: break-word;
      margin: 0;
    }

    .icon {
      grid-area: icon;
      display: block;
      width: 100px;
      height: 100px;
      pointer-events: none;
      border-radius: 5px;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }
    }

    .temperature {
      grid-area: up;
      font-size: 66px;
      font-weight: 700;
      overflow-wrap: break-word;
      margin: 0;
    }

    .feelsLike {
      grid-area: down;
      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
      margin: 0;
    }
  }

  .conditionsWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;
    text-align: center;

    .description {
      font-size: 22px;
      font-weight: 700;
      overflow-wrap: break-word;
      margin: 0;
    }

    .conditions {
      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
      margin: 0;
    }
  }
}
</style>
