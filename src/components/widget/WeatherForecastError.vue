<template>
  <div>{{ errorText }}</div>
</template>

<script>
export default {
  name: "WeatherForecastError",

  props: {
    geoExistError: {
      type: Boolean,
      required: true
    },
    geoAccessError: {
      type: Boolean,
      required: true
    },
    cityExistError: {
      type: Boolean,
      required: true
    },
    searchesAmount: {
      type: Number,
      required: true
    }
  },

  computed: {
    errorText() {
      if (this.cityExistError && this.searchesAmount > 0) {
        return "Такой город не существует";
      } else if (this.geoExistError) {
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