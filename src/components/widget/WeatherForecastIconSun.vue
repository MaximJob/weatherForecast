<template>
  <div>
    <div class="sun">
      <div class="bg"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastIconSun"
};
</script>

<style lang="scss" scoped>
.sun {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 5s sun linear infinite;
  overflow: hidden;

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #ff9800;
    clip-path: polygon(
        0% 0%,
        25% 25%,
        50% 0%,
        75% 25%,
        100% 0%,
        75% 25%,
        100% 50%,
        75% 75%,
        100% 100%,
        100% 100%,
        100% 100%,
        100% 100%,
        0% 100%,
        0% 100%,
        0% 100%,
        0% 100%
    );
  }

  .circle {
    width: 80%;
    height: 80%;
    position: absolute;
    //background-color: #ffeb3b;
    border-radius: 50%;
    overflow: hidden;
    animation: 1s circle linear infinite alternate;

    @keyframes circle {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(0.9);
      }
    }
  }

  @keyframes sun {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(0);
      //transform: rotate(360deg);
    }
  }
}
</style>