<template>
  <div>
    <form autocomplete="off" class="loadForm" @submit.prevent="load">
      <input
        v-model.trim="city"
        :class="{
          'error': inputError
        }"
        :placeholder="placeholder"
        class="inputCity"
        name="inputCity"
        type="text"
      />

      <button class="search" type="submit">
        Поиск
        <img alt="Поиск" class="search__img" src="@/assets/img/search.svg">
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
      required: true,
      default: (city) => {
      }
    },
    cityExistError: {
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

  data() {
    return {
      city: "",
      emptyNameError: false
    };
  },

  computed: {
    inputError() {
      return (this.cityExistError || this.emptyNameError) && this.searchesAmount > 0;
    },

    placeholder() {
      return this.inputError ? "Введите существующий город" : "Введите город";
    }
  },

  watch: {
    city() {
      this.city = this.city.replace(/[^a-zа-яё\s-]/gi, ""); // Оставляет буквы и тире

      if (this.city.length > 0) {
        this.city = this.city.toLowerCase();
        this.city = this.city.replace(/(^|\s)\S/g, l => l.toUpperCase()); // Слова с заглавной буквы
      }
    }
  },

  methods: {
    load() {
      console.log("submitted");
      if (this.city) {
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
.loadForm {
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
      border: 1px solid #fb8e00;
      transition: all 0.1s;
    }
  }

  .error {
    color: #ff0000;
    border: 1px solid #ff0000;
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

    .search__img {
      display: block;
      margin-left: 5px;
      width: 16px;
      height: 16px;
      pointer-events: none;
      user-select: none;
      transition: all 0.3s;
    }

    &:focus {
      border: 1px solid #fb8e00;
    }

    &:hover {
      background-color: #333333;
      border: 1px solid #333333;
      color: #ffffff;
      transition: all 0.1s;

      .search__img {
        transition: all 0.1s;
        filter: invert(100%);
      }
    }
  }
}
</style>