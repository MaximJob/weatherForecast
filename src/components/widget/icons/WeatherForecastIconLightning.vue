<template>
  <div>
    <div class="lightning">
      <img alt="Облако" class="cloud cloud1" src="@/assets/img/cloud.png">
      <img alt="Облако" class="cloud cloud2" src="@/assets/img/cloud.png">
      <img alt="Молния" class="lightning lightning1" src="@/assets/img/lightning.png">
      <img alt="Облако" class="lightning lightning2" src="@/assets/img/lightning.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastIconLightning"
};
</script>

<style lang="scss" scoped>
.lightning {
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
      0% {
        transform: scale(1, 1);
      }
      20% {
        transform: scale(0.9, 1);
      }
      30% {
        transform: scale(1, 1);
      }
      100% {
        transform: scale(1, 1);
      }
    }
  }

  .cloud2 {
    width: 70%;
    height: 70%;
    left: 15%;
    transform: rotate(180deg);
    animation: 1s cloud2 linear infinite alternate;

    @keyframes cloud2 {
      from {
        transform: translate(0, 45%) rotate(180deg);
      }
      to {
        transform: translate(0, 45%) rotate(180deg);
      }
    }
  }

  .lightning {
    width: 40%;
    height: 40%;
    position: absolute;
    z-index: 2;

    @keyframes lightning {
      0% {
        opacity: 1;
        transform: translate(0, 0);
      }
      20% {
        opacity: 0;
        transform: translate(5%, 10%);
      }
      40% {
        opacity: 1;
        transform: translate(5%, 10%);
      }
      80% {
        opacity: 1;
        transform: translate(0, 0);
      }
      100% {
        opacity: 0;
        transform: translate(5%, 10%);
      }
    }
  }

  .lightning1 {
    right: 0;
    bottom: 15%;
    animation: 1.5s lightning .0s linear infinite;
  }

  .lightning2 {
    right: 30%;
    bottom: 0;
    animation: 1.5s lightning .2s linear infinite;
  }
}
</style>