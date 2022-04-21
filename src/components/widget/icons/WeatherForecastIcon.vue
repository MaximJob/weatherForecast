<template>
  <div>
    <component :is="'weatherForecastIcon' + icon" />
  </div>
</template>

<script>
import WeatherForecastIconClouds from "@/components/widget/icons/WeatherForecastIconClouds.vue";
import WeatherForecastIconLightning from "@/components/widget/icons/WeatherForecastIconLightning.vue";
import WeatherForecastIconMist from "@/components/widget/icons/WeatherForecastIconMist.vue";
import WeatherForecastIconSun from "@/components/widget/icons/WeatherForecastIconSun.vue";
import WeatherForecastIconRain from "@/components/widget/icons/WeatherForecastIconRain.vue";
import WeatherForecastIconSnow from "@/components/widget/icons/WeatherForecastIconSnow.vue";

export default {
  name: "WeatherForecastIcon",

  components: {
    WeatherForecastIconClouds,
    WeatherForecastIconLightning,
    WeatherForecastIconMist,
    WeatherForecastIconRain,
    WeatherForecastIconSnow,
    WeatherForecastIconSun
  },

  props: {
    icon: {
      type: String,
      required: true,
      default: "Sun"
    }
  }
};
</script>

<style lang="scss" scoped>
</style>