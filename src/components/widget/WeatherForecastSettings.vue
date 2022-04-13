<template>
  <div class="settings">
    <h2 class="settingsTitle">Настройки</h2>

    <button class="settingsClose" @click="$emit('close')">
      <img alt="Назад" class="settingsCloseImg" src="@/assets/img/close.svg">
    </button>

    <div class="settingsList">
      <div
        v-for="(setting, i) in settings"
        :key="setting.title"
        class="settingsListItem"
      >
        {{ setting.title }}
        <button
          :class="{
            'turnedOn': setting.turnedOn
          }"
          class="settingsListItemButton"
          @click="setting.action(i)"
        >
        </button>
      </div>
    </div>

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
      settings: [
        {
          title: "Использовать местоположение, если возможно",
          turnedOn: true,
          action: i => {
            const turnedOn = !this.settings[i].turnedOn;

            this.settings[i].turnedOn = turnedOn;

            const storage = JSON.parse(localStorage.settings);
            if (storage) {
              storage[i].turnedOn = turnedOn;
              localStorage.settings = JSON.stringify(storage);
            }

            this.$emit("giveGeoAccess", turnedOn);
          }
        }
      ],
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

  created() {
    if (localStorage.settings) {
      const storage = JSON.parse(localStorage.settings);
      const length = this.settings.length;

      if (storage.length !== length) {
        this.saveCommonSettings();
      }

      for (let i = 0; i < length; i++) {
        if (this.settings[i].title === storage[i].title) {
          this.settings[i].turnedOn = storage[i].turnedOn;
        }
      }
    } else {
      this.saveCommonSettings();
    }
  },

  methods: {
    saveCommonSettings() {
      const settings = this.settings.map(setting => {
        return {
          title: setting.title,
          turnedOn: setting.turnedOn
        };
      });
      localStorage.settings = JSON.stringify(settings);
    }
  }
};
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 5;
  padding: 40px 20px 20px 20px;

  @supports (backdrop-filter: blur(20px)) {
    background-color: transparent;
    backdrop-filter: blur(20px);
  }

  .settingsTitle {
    font-size: 26px;
    font-weight: 700;
    overflow-wrap: break-word;
    margin-bottom: 20px;
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
    cursor: pointer;
    -webkit-appearance: button;
    transition: all 0.1s;

    &:hover,
    &:focus {
      transition: all 0.1s;
      transform: scale(1.1);
    }

    .settingsCloseImg {
      display: block;
      width: 32px;
      height: 32px;
      pointer-events: none;
    }
  }

  .settingsList {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: auto;

    .settingsListItem {
      display: flex;
      align-items: center;
      justify-content: center;

      .settingsListItemButton {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 50px;
        padding: 5px 25px 5px 5px;
        color: #333333;
        border-radius: 20px;
        border: 1px solid #333333;
        transition: all 0.3s;
        font: inherit;
        font-size: 14px;
        font-weight: 400;
        background: transparent;
        -webkit-appearance: button;
        cursor: pointer;
        margin: 0 5px;

        &:focus {
          border: 1px solid #fb8e00;
        }

        &::after {
          content: '';
          width: 20px;
          min-width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #ff0000;
        }

        &.turnedOn {
          padding: 5px 5px 5px 25px;
          transition: all 0.3s;

          &::after {
            background-color: #08ff00;
          }
        }
      }
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
      transition: all 0.1s;

      &:hover,
      &:focus {
        transition: all 0.1s;
        transform: scale(1.1);
      }

      .settingsSocialLinkImg {
        display: block;
        width: 32px;
        height: 32px;
        pointer-events: none;
      }
    }
  }
}
</style>