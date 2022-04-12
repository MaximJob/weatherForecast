<template>
  <div>
    <form
      :class="{
        'searchable': city.length
      }"
      autocomplete="off"
      class="loadForm"
      @submit.prevent="load"
    >
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

      <button
        :class="{
          'clickable': city.length
        }"
        class="search"
        type="submit"
      >
        Поиск
        <img alt="Поиск" class="searchImg" src="@/assets/img/search.svg">
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastLoadForm",

  props: {
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
      city: ""
    };
  },

  computed: {
    inputError() {
      return this.cityExistError && this.searchesAmount > 0;
    },

    placeholder() {
      return this.inputError ? "Введите существующий город" : "Введите город";
    }
  },

  watch: {
    city() {
      // Убирает лишние пробелы
      this.city = this.city.replace(/  /gi, " ");

      // Оставляет буквы и тире
      this.city = this.city.replace(/[^a-zа-яё\s-]/gi, "");

      if (this.city.length) {
        this.city = this.city.toLowerCase();

        // Слова с заглавной буквы
        this.city = this.city.replace(/(^|\s)\S/g, l => l.toUpperCase());
      }
    }
  },

  methods: {
    load() {
      if (this.city) {
        this.$emit("formSubmit", this.city);
        this.city = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loadForm {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 1000px) {
    &.searchable {
      .inputCity,
      .search {
        width: 50%;
        transition: all 0.3s;
      }
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    grid-template: auto auto / 1fr;
  }

  .inputCity {
    width: calc(100% - 100px);
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
    margin-right: 10px;

    @media (max-width: 1000px) {
      width: 100%;
    }

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
    width: 100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    padding: 10px;
    color: #999999;
    border-radius: 10px;
    border: 1px solid #999999;
    transition: all 0.3s;
    font: inherit;
    font-size: 14px;
    font-weight: 400;
    background: transparent;
    -webkit-appearance: button;
    cursor: not-allowed;

    @media (max-width: 1000px) {
      width: 100%;
    }

    .searchImg {
      display: block;
      margin-left: 5px;
      width: 16px;
      height: 16px;
      pointer-events: none;
      transition: all 0.3s;
      filter: invert(60%);
    }

    &:focus {
      border: 1px solid #ff0000;
    }

    &.clickable {
      cursor: pointer;
      color: #333333;
      border: 1px solid #333333;

      .searchImg {
        filter: invert(0);
      }

      &:focus {
        border: 1px solid #fb8e00;
      }

      &:hover {
        background-color: #333333;
        border: 1px solid #333333;
        color: #ffffff;
        transition: all 0.1s;

        .searchImg {
          transition: all 0.1s;
          filter: invert(100%);
        }
      }
    }
  }

  @supports (gap: 10px) {
    gap: 10px;

    .inputCity {
      margin-right: 0;
    }
  }
}
</style>