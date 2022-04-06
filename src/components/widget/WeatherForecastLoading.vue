<template>
  <div class="loading">
    <div class="circle"></div>
  </div>
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

  .circle {
    min-width: 50px;
    width: 50px;
    min-height: 50px;
    height: 50px;
    border: 1px solid #333333;
    border-radius: 50%;
    position: relative;
    animation: circle 0.8s linear infinite;
  }

  .circle::before {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    left: -20px;
    top: -20px;
    background-color: #ffffff;
    animation: circleBg 0.8s linear infinite alternate;
  }

  @keyframes circle {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes circleBg {
    from {
      width: 40px;
      height: 40px;
      border-radius: 0;
    }

    to {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
}
</style>
