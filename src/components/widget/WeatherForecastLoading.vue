<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: "WeatherForecastLoading"
};
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 10px;
  background-image: linear-gradient(90deg, #f4f4f4, #d7d7d7, #f4f4f4, #d7d7d7);
  background-size: 300% 100%;
  animation: 1s loading linear infinite;

  @keyframes loading {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0 0;
    }
  }
}
</style>
