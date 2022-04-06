<template>
  <div class="settings">
    <button class="settingsClose" @click="close">
      <img alt="Настройки" class="settingsCloseImg" src="@/assets/img/close.svg">
    </button>
    <div class="settingsSocial">
      <button
        v-for="link in links"
        :key="link.href"
        class="settingsSocialLink"
        @click="link.action"
      >
        <img
          :alt="link.alt"
          :src="link.image"
          class="settingsSocialLinkImg"
        >
      </button>
    </div>
    <h5 class="settingsDeveloper">Разработчик: Максим Алейников</h5>
  </div>
</template>

<script>
import vk from "@/assets/img/vk.svg";
import telegram from "@/assets/img/telegram.svg";

export default {
  name: "WeatherForecastSettings",

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
  },

  methods: {
    close() {
      this.$emit("close");
    }
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

  .settingsClose {
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

    .settingsCloseImg {
      display: block;
      width: 32px;
      height: 32px;
      pointer-events: none;
      user-select: none;
    }
  }

  .settingsDeveloper {
    margin: 10px 0 0 0;
    text-align: center;
  }

  .settingsSocial {
    display: flex;
    align-items: center;
    justify-content: center;

    .settingsSocialLink {
      width: 32px;
      height: 32px;
      margin: 0 5px;
      display: block;
      cursor: pointer;
      background-color: transparent;
      text-decoration: none;
      user-select: none;

      .settingsSocialLinkImg {
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