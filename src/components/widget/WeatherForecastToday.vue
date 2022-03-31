<template>
  <div class="day">
    <div class="temperatureWrap">
      <h3 class="cityName">{{ cityName }}</h3>
      <img :src="weather.icon" alt="Погода" class="icon" />
      <h2 class="temperature">{{ weather.temperature }}</h2>
      <h5 class="feelsLike">{{ weather.feelsLike }}</h5>
    </div>

    <div class="conditionsWrap">
      <h4 class="description">{{ weather.description }}</h4>
      <h5 class="conditions">{{ weather.conditions }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastToday",

  props: {
    cityName: {
      type: String,
      required: true,
      default: "Название города"
    },
    weather: {
      type: Object,
      required: true,
      default: {}
    }
  }
};
</script>

<style lang="scss" scoped>
.day {
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
    }

    .icon {
      grid-area: icon;
      display: block;
      min-width: 50px;
      min-height: 50px;
      max-width: 100%;
      pointer-events: none;
      user-select: none;
    }

    .temperature {
      grid-area: up;

      font-size: 66px;
      font-weight: 700;
      overflow-wrap: break-word;
    }

    .feelsLike {
      grid-area: down;

      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
    }
  }

  .conditionsWrap {
    padding: 20px 0;
    text-align: center;

    .description {
      font-size: 22px;
      font-weight: 700;
      overflow-wrap: break-word;
    }

    .conditions {
      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
    }
  }
}
</style>
