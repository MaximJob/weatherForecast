<template>
  <div class="geoAccess">
    <h2>Разрешить доступ к геолокации?</h2>
    <div>
      <button @click="allow">Разрешить</button>
      <button @click="forbid">Запретить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastGeoAccess",

  methods: {
    allow() {
      this.$emit("allow");
    },

    forbid() {
      this.$emit("forbid");
    }
  }
};
</script>

<style lang="scss" scoped>
.geoAccess {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-size: 24px;
    font-weight: 400;
    word-wrap: break-word;
    text-align: center;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    button {
      margin: 0 5px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 38px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #333333;
      transition: all 0.3s;
      font: inherit;
      font-size: 14px;
      font-weight: 400;
      background: transparent;
      user-select: none;
      cursor: pointer;
      -webkit-appearance: button;

      &:focus {
        border: 1px solid #fb8e00;
      }

      &:hover {
        background-color: #333333;
        border: 1px solid #333333;
        color: #ffffff;
        transition: all 0.1s;
      }
    }
  }
}
</style>