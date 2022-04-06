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
    document.onclick = () => this.showing = false;
    document.oncontextmenu = () => true;
    document.querySelector(".weatherForecast").oncontextmenu = e => this.handleContext(e);
  },

  methods: {
    setMenuCoords(e) {
      this.x = e.layerX - 5;
      this.y = e.y - 35;
    },

    handleContext(e) {
      let approveContext = false;

      let isItMobileDevice = false;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isItMobileDevice = true;
      }

      let domEl = e.target;
      while (domEl) {
        if (
          domEl.nodeName.toLowerCase() === "body"
          || domEl.classList.contains("apexcharts-canvas")
        ) {
          this.showing = false;
          break;
        }

        if (domEl.classList.contains("withContext")) {
          approveContext = true;
          break;
        }

        if (domEl.parentNode) {
          domEl = domEl.parentNode;
        }
      }

      if (approveContext && !isItMobileDevice) {
        this.setMenuCoords(e);
        this.showing = true;
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