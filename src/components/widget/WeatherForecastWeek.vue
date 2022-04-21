<template>
  <div class="week withContext">
    <weather-forecast-loading v-if="loading" />

    <div v-else>
      <div class="days">
        <div v-for="(day, i) in weather.week" :key="i" class="daysItem">
          <h4 class="daysItemName">{{ day.weekDayNaming }}</h4>
          <span class="daysItemDate">{{ day.date }}</span>
          <component :is="'weatherForecastIcon' + day.icon" class="daysItemImg" />
        </div>
      </div>

      <div class="graph">
        <div class="graphMax">
          <div
            v-for="(day, i) in weather.week"
            :key="day.max + '' + i"
            class="graphMaxItem"
          >
            {{ day.max }}°
          </div>
        </div>

        <weather-forecast-chart
          :chart-colors="chartColors"
          :temps="weather.week"
        />

        <div class="graphMin">
          <div
            v-for="(day, i) in weather.week"
            :key="day.min + '' + i"
            class="graphMinItem"
          >
            {{ day.min }}°
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherForecastLoading from "@/components/widget/WeatherForecastLoading.vue";
import WeatherForecastChart from "@/components/widget/WeatherForecastChart.vue";
import WeatherForecastIconClouds from "@/components/widget/icons/WeatherForecastIconClouds.vue";
import WeatherForecastIconLightning from "@/components/widget/icons/WeatherForecastIconLightning.vue";
import WeatherForecastIconMist from "@/components/widget/icons/WeatherForecastIconMist.vue";
import WeatherForecastIconRain from "@/components/widget/icons/WeatherForecastIconRain.vue";
import WeatherForecastIconSun from "@/components/widget/icons/WeatherForecastIconSun.vue";
import WeatherForecastIconSnow from "@/components/widget/icons/WeatherForecastIconSnow.vue";

const hotter = "#DC143C";
const hot = "#FF7F50";
const normal = "#f4df5b";
const cold = "#ADD8E6";
const colder = "#4682B4";

export default {
  name: "WeatherForecastWeek",

  components: {
    WeatherForecastLoading,
    WeatherForecastChart,
    WeatherForecastIconClouds,
    WeatherForecastIconLightning,
    WeatherForecastIconMist,
    WeatherForecastIconRain,
    WeatherForecastIconSnow,
    WeatherForecastIconSun
  },

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
    },

    weather: {
      type: Object,
      required: true,
      default: {
        week: [
          {
            date: "1 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Сегодня"
          },
          {
            date: "2 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Пн"
          },
          {
            date: "3 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Вт"
          },
          {
            date: "4 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Ср"
          },
          {
            date: "5 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Чт"
          },
          {
            date: "6 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Пт"
          },
          {
            date: "7 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Сб"
          },
          {
            date: "8 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Вс"
          }
        ],
        averageTemperatureDay: 0,
        averageTemperatureNight: 0
      }
    }
  },

  computed: {
    chartColors() {
      return {
        day: this.getTempColor(this.weather.averageTemperatureDay),
        night: this.getTempColor(this.weather.averageTemperatureNight)
      };
    },

    temperatureColorDay() {
      return this.getTempColor(this.weather.averageTemperatureDay);
    },

    temperatureColorNight() {
      return this.getTempColor(this.weather.averageTemperatureNight);
    }
  },

  methods: {
    getTempColor(temp) {
      if (temp >= 30) {
        return hotter;
      } else if (temp >= 20) {
        return hot;
      } else if (temp > 0) {
        return normal;
      } else if (temp <= -20) {
        return colder;
      } else if (temp <= 0) {
        return cold;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.week {
  @media (max-width: 600px) {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .days {
    display: grid;
    grid-template: auto / repeat(8, 1fr);
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    text-align: center;

    &Item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &Name {
        font-size: 16px;
        font-weight: 700;
        overflow-wrap: break-word;
        margin: 0;

        @media (max-width: 768px) {
          max-width: 3ch;
          max-height: 3ch;
          overflow: hidden;
        }
      }

      &Date {
        @media (max-width: 420px) {
          width: 27px;
        }
      }

      &Img {
        display: block;
        max-width: 40px;
        max-height: 40px;
        width: 100%;
        pointer-events: none;
        border-radius: 5px;

        @supports (aspect-ratio: 1 / 1) {
          aspect-ratio: 1 / 1;
        }
      }
    }
  }

  .graph {
    display: grid;
    grid-template: repeat(3, auto) / 1fr;
    font-weight: 700;
    padding: 50px 20px 40px 20px;

    @media (max-width: 768px) {
      padding: 50px 0 40px 0;
    }

    @media (max-width: 600px) {
      padding: 30px 0 20px 0;
    }

    &Max,
    &Min {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &Item,
      &Item {
        width: 30px;
        text-align: center;
        font-size: 16px;
      }
    }
  }
}
</style>
