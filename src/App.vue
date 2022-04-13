<template>
  <div id="app">
    <weather-forecast />
  </div>
</template>

<script>
import WeatherForecast from "@/components/widget/WeatherForecast.vue";

export default {
  name: "App",

  components: { WeatherForecast }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 30px;
  isolation: isolate;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #222222;

  @media (max-width: 768px), (max-height: 800px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
}
</style>
