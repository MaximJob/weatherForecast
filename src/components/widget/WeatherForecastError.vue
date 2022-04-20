<template>
  <div class="error">
    <h2 class="errorText">{{ errorText }}</h2>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastError",

  props: {
    geoExistError: {
      type: Boolean,
      required: true,
      default: false
    },

    geoAccessError: {
      type: Boolean,
      required: true,
      default: false
    },

    searchesAmount: {
      type: Number,
      required: true,
      default: 0
    }
  },

  computed: {
    errorText() {
      if (this.geoExistError) {
        return "Устройство не поддерживает геолокацию";
      } else if (this.geoAccessError) {
        return "Доступ к геолокации запрещен";
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  margin-bottom: 20px;

  &Text {
    font-size: 24px;
    font-weight: 400;
    word-wrap: break-word;
    text-align: center;
    margin: 0;
  }
}
</style>