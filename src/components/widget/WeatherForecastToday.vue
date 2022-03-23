<template>
  <div class="day">
    <div class="temperatureWrap">
      <img :src="icon" alt="Погода" class="icon" />
      <h2 class="temperature">{{ Math.round(weather.temp) }}°С</h2>
      <h5 class="feelsLike">
        ощущается как {{ Math.round(weather.feels_like) }}°С
      </h5>
    </div>

    <div class="conditionsWrap">
      <h4 class="description">{{ description }}</h4>
      <h5 class="conditions">
        Ветер: {{ Math.round(weather.wind_speed) }} м/с Давление
        {{ Math.round(weather.pressure) }} мм рт. ст
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastToday",

  props: {
    weather: {
      type: Object,
      required: true
    }
  },

  computed: {
    icon() {
      if (
        this.weather &&
        this.weather.weather &&
        this.weather.weather[0].icon
      ) {
        const icon = this.weather.weather[0].icon;
        return `https://openweathermap.org/img/wn/${icon}.png`;
      }
      return "";
    },

    description() {
      if (
        this.weather &&
        this.weather.weather &&
        this.weather.weather[0].description
      ) {
        let description = this.weather.weather[0].description;
        description = description[0].toUpperCase() + description.slice(1);
        return description;
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.day {
  padding: 20px 0 0 0;

  @media (max-width: 1000px) {
    padding: 0;
  }

  .temperatureWrap {
    display: grid;
    grid-template: auto / 1fr 1fr;
    grid-template-areas:
      "icon up"
      "icon down";
    align-items: center;
    justify-items: center;

    @media (max-width: 240px) {
      display: grid;
      grid-template: auto / 50px 1fr;
      grid-template-areas:
      "icon up"
      "icon down";
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
