<template>
  <transition>
    <div
      v-if="showing"
      :style="{
      left: x + 'px',
      top: y + 'px',
    }"
      class="context"
    >
      <button v-for="setting in settings" class="context__button" @click="setting.action">
        {{ setting.text }}
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "WeatherForecastSettings",

  props: {
    savedText: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      x: 0,
      y: 0,
      showing: false,
      settings: [
        {
          text: "Скопировать прогноз",
          action: () => {
            navigator.clipboard.writeText(this.savedText);
          }
        },
        {
          text: "Сохранить",
          action: () => {
            const newInfo = "Saved!";
            const saved = JSON.parse(localStorage.getItem("saved"));

            if (saved) {
              if (typeof saved === "object") {
                saved.push(newInfo);
                localStorage.saved = JSON.stringify(saved);
              } else {
                localStorage.removeItem("saved");
                localStorage.saved = JSON.stringify([newInfo]);
              }
            } else {
              localStorage.saved = JSON.stringify([newInfo]);
            }
          }
        }
      ]
    };
  },

  beforeCreate() {
    document.onclick = () => {
      this.showing = false;
    };

    document.oncontextmenu = (e) => {
      const className = e.target.classList[0];

      const mobileDevice = window.innerWidth < 768;
      const form = className === "inputCity" || className === "search";
      const loading = className === "loading" || className === "circle";
      const settingsMenu =
        className === "settings"
        || className === "settings__developer"
        || className === "settings_open"
        || className === "settings__open__img"
        || className === "settings__close"
        || className === "settings__close__img";
      const contextMenu = this.showing && className === "context" || className === "context__button";
      const chart = e.target.className.baseVal === "apexcharts-svg" || e.target.parentNode.className === "chart";
      const weatherForecastElement =
        !!className
        && typeof className === "string"
        && !!(document.querySelector(".weatherForecast")
            .querySelector("." + className)
          || className === "weatherForecast");

      if (!weatherForecastElement && !chart) {
        return true;
      } else if (mobileDevice || !weatherForecastElement || contextMenu || loading) {
        return false;
      } else if (form || chart || settingsMenu) {
        this.showing = false;
        return false;
      }
      this.x = e.layerX - 5;
      this.y = e.y - 35;
      this.showing = true;
      return false;
    };
  }
};
</script>

<style lang="scss" scoped>
.context {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #333333;
  background-color: #ffffff;
  user-select: none;

  .context__button {
    white-space: nowrap;
    text-align: center;
    width: 100%;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: rgba(153, 153, 153, 0.3);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>