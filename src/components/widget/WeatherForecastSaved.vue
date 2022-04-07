<template>
  <div class="saved">
    <h2>Сохранённое</h2>

    <button class="savedClose" @click="$emit('close')">
      <img alt="Назад" class="savedCloseImg" src="@/assets/img/close.svg">
    </button>

    <div class="savedList">
      <button
        v-for="city in saved"
        :key="city"
        class="savedListCity"
        @click="$emit('loadFromSaved', city)"
      >
        {{ city }}
      </button>
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
  }
};
</script>

<style lang="scss" scoped>
.saved {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 5;
  padding: 40px 20px 20px 20px;

  @supports (backdrop-filter: blur(20px)) {
    background-color: transparent;
    backdrop-filter: blur(20px);
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    overflow-wrap: break-word;
    margin-bottom: 20px;
  }

  .savedClose {
    position: absolute;
    left: 20px;
    top: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    user-select: none;
    cursor: pointer;
    -webkit-appearance: button;

    .savedCloseImg {
      display: block;
      width: 32px;
      height: 32px;
      pointer-events: none;
      user-select: none;
    }
  }

  .savedList {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;

    .savedListCity {
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
      user-select: none;
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

    @supports (gap: 10px) {
      gap: 10px;

      .savedListCity {
        margin: 0;
      }
    }
  }
}
</style>