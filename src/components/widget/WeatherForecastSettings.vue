<template>
  <div class="settings">
    <button class="settings__close" @click="closeSettings">
      <img alt="Настройки" class="settings__close__img" src="@/assets/img/close.svg">
    </button>
    <div class="settings__social">
      <button
        v-for="link in links"
        :key="link.href"
        class="settings__social__link"
        @click="link.action"
      >
        <img
          :alt="link.alt"
          :src="link.image"
          class="settings__social__link__img"
        >
      </button>
    </div>
    <h5 class="settings__developer">Разработчик: Максим Алейников</h5>
  </div>
</template>

<script>
import vk from "@/assets/img/vk.svg";
import telegram from "@/assets/img/telegram.svg";

export default {
  name: "WeatherForecastSettings",

  props: {
    closeSettings: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      links: [
        {
          image: vk,
          alt: "Вконтакте",
          action: () => window.open("https://vk.com/yokuu", "_blank")
        },
        {
          image: telegram,
          alt: "Телеграм",
          action: () => window.open("https://t.me/yungyoku", "_blank")
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: #ffffff;
  z-index: 5;
  padding: 20px;

  @supports (backdrop-filter: blur(20px)) {
    background-color: transparent;
    backdrop-filter: blur(20px);
  }

  .settings__close {
    position: absolute;
    left: 20px;
    top: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    user-select: none;
    cursor: pointer;
    -webkit-appearance: button;

    .settings__close__img {
      display: block;
      width: 32px;
      height: 32px;
      pointer-events: none;
      user-select: none;
    }
  }

  .settings__developer {
    margin: 10px 0 0 0;
  }

  .settings__social {
    display: flex;
    align-items: center;
    justify-content: center;

    .settings__social__link {
      width: 32px;
      height: 32px;
      margin: 0 5px;
      display: block;
      cursor: pointer;
      background-color: transparent;
      text-decoration: none;
      user-select: none;

      .settings__social__link__img {
        display: block;
        width: 32px;
        height: 32px;
        pointer-events: none;
        user-select: none;
      }
    }
  }
}
</style>