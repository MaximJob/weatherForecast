<template>
  <div class="settings">
    <button class="settings__close" @click="closeSettings">
      <img alt="Настройки" class="settings__close__img" src="@/assets/img/close.svg">
    </button>
    <div class="settings__social">
      <a class="settings__social__link" href="https://vk.com/yokuu" target="_blank">
        <img alt="Вконтакте" class="settings__social__link__img" src="@/assets/img/vk.svg">
      </a>
      <a class="settings__social__link" href="https://t.me/yungyoku" target="_blank">
        <img alt="Телеграм" class="settings__social__link__img" src="@/assets/img/telegram.svg">
      </a>
    </div>
    <h5 class="settings__developer">Разработал Максим Алейников</h5>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastSettings",

  props: {
    closeSettings: {
      type: Function,
      required: true
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
      cursor: pointer;

      .settings__social__link__img {
        display: block;
        width: 32px;
        height: 32px;
        margin: 0 5px;
        pointer-events: none;
        user-select: none;
      }
    }
  }
}
</style>