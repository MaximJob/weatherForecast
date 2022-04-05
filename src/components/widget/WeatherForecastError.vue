<template>
  <div>{{ errorText }}</div>
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
div {
  width: 100%;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
</style>