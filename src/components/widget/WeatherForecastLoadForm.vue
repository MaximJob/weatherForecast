<template>
  <div>
    <form autocomplete="off" @submit.prevent="load">
      <input
        v-model.trim="city"
        :class="{
          'error': isErrorClass
        }"
        :placeholder="placeholder"
        class="inputCity"
        name="inputCity"
        type="text"
      />

      <button class="search" type="submit">
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

  data() {
    return {
      city: "",
      emptyNameError: false
    };
  },

  computed: {
    placeholder() {
      if (
        (this.cityExistError || this.emptyNameError)
        && this.searchesAmount > 0
      ) {
        return "Введите существующий город";
      }
      return "Введите город";
    },

    isErrorClass() {
      return (this.cityExistError || this.emptyNameError)
        && this.searchesAmount > 0;
    }
  },

  watch: {
    city() {
      this.city = this.city.replace(/[^a-zа-яё\s-]/gi, "");
    },

    geoAccessError() {
      if (this.geoAccessError) {

      }
    }
  },

  methods: {
    load() {
      if (this.city !== "") {
        this.emptyNameError = false;
        this.loadByCityName(this.city);
        this.city = "";
      } else {
        this.emptyNameError = true;
      }
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
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 38px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #333333;
    transition: all 0.3s;
    font: inherit;
    font-size: 14px;
    font-weight: 400;
    background: transparent;

    &::placeholder {
      color: unset;
    }

    &:focus {
      border: 1px solid $focus;
      transition: all 0.1s;
    }
  }

  .error {
    color: $error;
    border: 1px solid $error;
  }

  .search {
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