<template>
  <div class="navigation">
    <button
      v-for="button in navigation"
      :key="button.img"
      class="navigationButton"
      type="button"
      @click="button.action"
    >
      <img
        :alt="button.alt"
        :src="button.img"
        class="navigationButtonImg"
      >
    </button>
  </div>
</template>

<script>
import settings from "@/assets/img/settings.svg";
import saved from "@/assets/img/saved.svg";
import map from "@/assets/img/map.svg";

export default {
  name: "WeatherForecastNavigation",

  props: {
    weatherShowing: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    return {
      navigation: [
        {
          img: settings,
          alt: "Настройки",
          action: () => {
            this.$emit("openSettings");
          }
        },
        {
          img: saved,
          alt: "Сохранённое",
          action: () => {
            this.$emit("openSaved");
          }
        },
        {
          img: map,
          alt: "На карте",
          action: () => {
            this.$emit("openMap");
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  left: 20px;

  &Button {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: button;
    transition: all 0.1s;
    margin: 0 10px 0 0;
    padding: 0;
    border: none;

    &:hover,
    &:focus {
      transition: all 0.1s;
      transform: scale(1.1);
    }

    &Img {
      display: block;
      width: 32px;
      height: 32px;
      pointer-events: none;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }
    }
  }

  @supports (gap: 10px) {
    gap: 10px;

    &Button {
      margin: 0;
    }
  }
}
</style>