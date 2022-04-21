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
  animation: 10s sun linear infinite;
  overflow: hidden;

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #ff9800;
    clip-path: polygon(
        15% 15%,
        //
        37% 20%,
        50% 5%,
        63% 20%,
        //
        85% 15%,
        //
        80% 37%,
        95% 50%,
        80% 63%,
        //
        85% 85%,
        //
        63% 80%,
        50% 95%,
        37% 80%,
        //
        15% 85%,
        //
        20% 63%,
        5% 50%,
        20% 37%
    );
    animation: 0.5s bg linear infinite alternate;

    @keyframes bg {
      from {
        clip-path: polygon(
            10% 10%,
            //
            37% 20%,
            50% 0,
            63% 20%,
            //
            90% 10%,
            //
            80% 37%,
            100% 50%,
            80% 63%,
            //
            90% 90%,
            //
            63% 80%,
            50% 100%,
            37% 80%,
            //
            10% 90%,
            //
            20% 63%,
            0 50%,
            20% 37%
        );
      }
      to {
        clip-path: polygon(
            15% 15%,
            //
            37% 20%,
            50% 5%,
            63% 20%,
            //
            85% 15%,
            //
            80% 37%,
            95% 50%,
            80% 63%,
            //
            85% 85%,
            //
            63% 80%,
            50% 95%,
            37% 80%,
            //
            15% 85%,
            //
            20% 63%,
            5% 50%,
            20% 37%
        );
      }
    }
  }

  .circle {
    width: 55%;
    height: 55%;
    position: absolute;
    background-color: #ffeb3b;
    border-radius: 50%;
    overflow: hidden;
    animation: 0.5s circle linear infinite alternate;

    @keyframes circle {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(0.95);
      }
    }
  }

  @keyframes sun {
    from {
      transform: rotate(0);
    }
    to {
      //transform: rotate(0);
      transform: rotate(360deg);
    }
  }
}
</style>