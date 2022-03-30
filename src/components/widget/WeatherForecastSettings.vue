<template>
  <div class="settings">
    <button class="settings__close" @click="closeSettings">
      <img alt="Настройки" class="settings__close__img" src="@/assets/img/close.svg">
    </button>
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
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 5;
  padding: 20px;

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
      width: 32px;
      height: 32px;
    }
  }
}
</style>