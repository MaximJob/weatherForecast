<template>
  <div id="app">
    <weather-forecast />
  </div>
</template>

<script>
import WeatherForecast from "@/components/widget/WeatherForecast.vue";


export default {
  name: "App",

  components: { WeatherForecast },

  beforeCreate() {
    document.oncontextmenu = () => false;
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #f3f3f3;
  padding: 30px;
  isolation: isolate;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
}
</style>
