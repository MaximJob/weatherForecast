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
        ref="inputCity"
        v-model.trim="city"
        :class="{
          'error': inputError
        }"
        :placeholder="placeholder"
        class="inputCity"
        name="inputCity"
        type="text"
      />

      <div
        v-if="selectShowing && city && optionCities.length >= 1"
        class="citySelect"
      >
        <button
          v-for="oCity in optionCities"
          :key="oCity"
          class="citySelectItem"
          type="button"
          @click="setCity(oCity)"
        >
          {{ oCity }}
        </button>
      </div>

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
import cities from "@/assets/json/cities.json";

export default {
  name: "WeatherForecastLoadForm",

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
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
      selectShowing: false
    };
  },

  mounted() {
    document.addEventListener("click", e => this.handleClick(e.target.className));
  },

  destroyed() {
    document.addEventListener("click", e => this.handleClick(e.target.className));
  },

  computed: {
    inputError() {
      return this.cityExistError && this.searchesAmount > 0;
    },

    placeholder() {
      return this.inputError ? "Введите существующий город" : "Введите город";
    },

    optionCities() {
      const firstLet = this.city[0].toLowerCase();
      let _cities = cities[firstLet] || [];
      _cities = _cities.filter(city => city.startsWith(this.city));
      _cities = _cities.filter(city => city !== this.city);
      return _cities.slice(0, 20);
    }
  },

  watch: {
    city() {
      // Убирает лишние пробелы
      this.city = this.city.replace(/\s\s/gi, " ");

      // Оставляет буквы и тире
      this.city = this.city.replace(/[^a-zа-яё\s-]/gi, "");

      if (this.city.length) {
        this.selectShowing = true;

        this.city = this.city.toLowerCase();

        // Слова с заглавной буквы
        this.city = this.city.replace(/(^|\s|-)\S/g, l => l.toUpperCase());
      }
    }
  },

  methods: {
    setCity(city) {
      this.city = city;
      this.selectShowing = false;
      this.$refs["inputCity"].focus();
    },

    load() {
      if (this.city && !this.loading) {
        this.$emit("formSubmit", this.city);
        this.city = "";
      }
    },

    handleClick(className) {
      if (className && typeof className === "string") {
        const isInputClicked = className.includes("inputCity");
        const isOptionClicked = className.includes("citySelect") || className.includes("citySelectItem");

        if (isInputClicked) {
          this.selectShowing = true;
        } else if (!isOptionClicked) {
          this.selectShowing = false;
        }
      } else {
        this.selectShowing = false;
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
  position: relative;

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
    width: calc(100% - 90px);
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

  .citySelect {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 38px;
    background-color: rgba(255, 255, 255, 0.95);
    max-height: 200px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 10px;
    margin: 0;
    overflow: auto;

    &Item {
      text-align: left;
      width: 100%;
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      height: 30px;
      transition: all 0.3s;
      padding: 5px 10px;
      border-radius: 5px;

      &:hover {
        transition: all 0.3s;
        background-color: rgba(153, 153, 153, 0.95);
      }

      &:focus {
        transition: all 0.3s;
        background-color: rgba(153, 153, 153, 0.95);
      }
    }
  }

  .error {
    color: #ff4646;
    border: 1px solid #ff4646;
  }

  .search {
    width: 90px;
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

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }
    }

    &:focus {
      border: 1px solid #ff4646;
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