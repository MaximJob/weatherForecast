<template>
  <div class="rain">
    <img alt="Облако" class="cloud" src="@/assets/img/cloud.png">
    <img alt="Капля" class="drop drop1" src="@/assets/img/drop.png">
    <img alt="Капля" class="drop drop2" src="@/assets/img/drop.png">
    <img alt="Капля" class="drop drop3" src="@/assets/img/drop.png">
  </div>
</template>

<script>
export default {
  name: "WeatherForecastIconRain"
};
</script>

<style lang="scss" scoped>
.rain {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .cloud {
    width: 90%;
    height: 90%;
    position: absolute;
    left: 5%;
    top: 0;
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

  .drop {
    width: 15%;
    height: 15%;
    position: absolute;
    top: 60%;

    @keyframes drop {
      from {
        transform: translate(0, 0) rotate(45deg);
      }
      to {
        transform: translate(-150%, 250%) rotate(45deg);
      }
    }
  }

  .drop1 {
    left: 25%;
    animation: .5s drop .7s infinite;
  }

  .drop2 {
    left: 50%;
    animation: .5s drop .2s infinite;
  }

  .drop3 {
    left: 75%;
    animation: .5s drop .8s infinite;
  }
}
</style>