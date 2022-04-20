<template>
  <div class="saved">
    <h2 class="savedTitle">Сохранённое</h2>

    <button class="savedClose" @click="$emit('close')">
      <img alt="Назад" class="savedCloseImg" src="@/assets/img/close.svg">
    </button>

    <div class="savedList">
      <button
        v-for="city in saved"
        :key="city"
        class="savedListCity"
        @click="$emit('loadFromSaved', getFormattedCityName(city))"
      >
        {{ city }}
      </button>
      <h3 v-if="!saved.length" class="savedListEmpty">Пусто</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastSaved",

  data() {
    return {
      saved: localStorage.saved ? JSON.parse(localStorage.saved) : []
    };
  },

  methods: {
    getFormattedCityName(city) {
      // Оставляет буквы и тире
      city = city.replace(/[^a-zа-яё\s-]/gi, "");

      if (city.length) {
        city = city.toLowerCase();

        // Слова с заглавной буквы
        city = city.replace(/(^|\s)\S/g, l => l.toUpperCase());
      }

      return city;
    }
  }
};
</script>

<style lang="scss" scoped>
.saved {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 25px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 5;
  padding: 60px 20px 20px 20px;

  @supports (backdrop-filter: blur(20px)) {
    background-color: transparent;
    backdrop-filter: blur(20px);
  }

  &Title {
    font-size: 26px;
    font-weight: 700;
    overflow-wrap: break-word;
    margin: 0 0 20px 0;
  }

  &Close {
    position: absolute;
    left: 20px;
    top: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: button;
    transition: all 0.1s;
    border: none;
    padding: 0;

    &:hover,
    &:focus {
      transition: all 0.1s;
      transform: scale(1.1);
    }

    &Img {
      display: block;
      width: 32px;
      height: 32px;
      pointer-events: none;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }
    }
  }

  &List {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;

    &City {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 38px;
      padding: 10px;
      color: #333333;
      border-radius: 10px;
      border: 1px solid #333333;
      transition: all 0.3s;
      font: inherit;
      font-size: 14px;
      font-weight: 400;
      background: transparent;
      -webkit-appearance: button;
      cursor: pointer;
      margin: 0 5px;

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

    &Empty {
      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
      margin-bottom: 20px;
    }

    @supports (gap: 10px) {
      gap: 10px;

      &City {
        margin: 0;
      }
    }
  }
}
</style>