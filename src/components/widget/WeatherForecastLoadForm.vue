<template>
  <div>
    <form @submit.prevent="">
      <input
        v-model.trim="city"
        :class="{
          'error': error
        }"
        class="inputCity"
        name="inputCity"
        placeholder="Введите город"
        type="text"
        @keydown.enter.prevent.self="load"
      />

      <button class="search" type="submit" @click.prevent.self="load">
        Поиск
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastLoadForm",

  props: {
    loadByCityName: {
      type: Function,
      required: true
    },
    error: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      city: ""
    };
  },

  watch: {
    city() {
      this.city = this.city.replace(/[^a-zа-яё\s-]/gi, "");
    }
  },

  methods: {
    load() {
      this.loadByCityName(this.city);
      this.city = "";
    }
  }
};
</script>

<style lang="scss" scoped>
$focus: #fbc826;
$error: #ff0000;

form {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: auto / 1fr 1fr;
  grid-gap: 10px;

  @media (max-width: 1000px) {
    grid-template: auto auto / 1fr;
  }

  .inputCity {
    height: 38px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #333333;
    transition: all 0.3s;
    font-size: 14px;
    font-weight: 400;
    background: transparent;

    &:focus {
      border: 1px solid $focus;
    }
  }

  .error {
    color: $error;
    border: 1px solid $error;
  }

  .search {
    height: 38px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #333333;
    transition: all 0.3s;
    font-size: 14px;
    font-weight: 400;
    background: transparent;

    &:focus {
      border: 1px solid $focus;
    }

    &:hover {
      background-color: #333333;
      border: 1px solid #333333;
      color: #ffffff;
      transition: all 0.1s;
    }
  }
}
</style>