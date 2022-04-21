<template>
  <div class="clouds">
    <weather-forecast-icon-sun class="sun" />
    <img alt="Облако" class="cloud" src="@/assets/img/cloud.png">
  </div>
</template>

<script>
import WeatherForecastIconSun from "@/components/widget/icons/WeatherForecastIconSun.vue";

export default {
  name: "WeatherForecastIconRain",
  components: { WeatherForecastIconSun }
};
</script>

<style lang="scss" scoped>
.clouds {
  width: 100%;
  height: 100%;
  position: relative;

  .sun {
    width: 55%;
    height: 55%;
    position: absolute;
    left: 10%;
    top: 10%;
  }

  .cloud {
    width: 90%;
    height: 90%;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
    animation: 1s cloud linear infinite alternate;

    @keyframes cloud {
      from {
        transform: translateX(-5%);
      }
      to {
        transform: translateX(5%);
      }
    }
  }
}
</style>