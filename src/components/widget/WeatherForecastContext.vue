<template>
  <transition name="context">
    <div
      v-if="showing"
      :style="{
      left: x + 'px',
      top: y + 'px',
    }"
      class="context"
    >
      <button
        v-for="setting in settings"
        :key="setting.text"
        class="contextButton"
        @click="setting.action"
      >
        {{ setting.text }}
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "WeatherForecastSettings",

  props: {
    copyWeatherForecast: {
      type: Function,
      required: true,
      default: () => {
      }
    },

    cityName: {
      type: String,
      required: true,
      default: "Город"
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
            navigator.clipboard.writeText(this.copyWeatherForecast());
          }
        },
        {
          text: "Сохранить",
          action: () => {
            const saved = JSON.parse(localStorage.getItem("saved"));

            if (saved) {
              if (typeof saved === "object") {
                if (!saved.includes(this.cityName)) {
                  saved.push(this.cityName);
                  localStorage.saved = JSON.stringify(saved);
                }
              } else {
                localStorage.removeItem("saved");
                localStorage.saved = JSON.stringify([this.cityName]);
              }
            } else {
              localStorage.saved = JSON.stringify([this.cityName]);
            }
          }
        }
      ]
    };
  },

  mounted() {
    document.addEventListener("click", () => this.showing = false);
    document.querySelector(".weatherForecast").oncontextmenu = this.handleContext;
  },

  methods: {
    setMenuCoords(e) {
      const weatherForecast = document.querySelector(".weatherForecast");
      const weatherForecastWidth = weatherForecast.clientWidth;
      const weatherForecastHeight = weatherForecast.clientHeight;

      if (e.layerX + 170 > weatherForecastWidth) {
        this.x = e.layerX - 150;
      } else {
        this.x = e.layerX - 5;
      }

      if (e.y + 80 > weatherForecastHeight) {
        this.y = e.y - 100;
      } else {
        this.y = e.y - 35;
      }
    },

    handleContext(e) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return false;
      }

      let domEl = e.target;
      while (domEl) {
        if (
          domEl.nodeName.toLowerCase() === "body"
          || domEl.classList.contains("chart")
        ) {
          this.showing = false;
          break;
        }

        if (domEl.classList.contains("withContext")) {
          this.setMenuCoords(e);
          this.showing = true;
          break;
        }

        if (domEl.parentNode) {
          domEl = domEl.parentNode;
        }
      }

      return false;
    }
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

  .contextButton {
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

.context-enter-active,
.context-leave-active {
  transition: opacity 0.2s ease;
}

.context-enter-from,
.context-leave-to {
  opacity: 0;
}
</style>