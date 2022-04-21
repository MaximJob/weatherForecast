<template>
  <div>
    <div class="mist">
      <weather-forecast-icon-sun class="sun" />
      <img alt="Туман" class="mistImg" src="@/assets/img/mist.png" />
    </div>
  </div>
</template>

<script>
import WeatherForecastIconSun from "@/components/widget/icons/WeatherForecastIconSun.vue";

export default {
  name: "WeatherForecastIconMist",
  components: { WeatherForecastIconSun }
};
</script>

<style lang="scss" scoped>
.mist {
  width: 100%;
  height: 100%;
  position: relative;

  .sun {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .mistImg {
    width: 80%;
    height: 80%;
    position: absolute;
    left: 10%;
    bottom: 0;
    animation: 2s mist linear infinite alternate;

    @keyframes mist {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(-20%, 0);
      }
    }
  }
}
</style>