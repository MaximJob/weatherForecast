<template>
  <div class="settings">
    <button @click="closeSettings">
      <img alt="Настройки" src="@/assets/img/close.svg">
    </button>
    <h5>Разработал Максим Алейников</h5>
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

  button {
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
  }

  button img {
    width: 32px;
    height: 32px;
  }
}
</style>