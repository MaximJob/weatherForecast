<template>
  <div class="week">
    <div class="days">
      <div v-for="(day, i) in weather.week" :key="i" class="daysItem">
        {{ day.weekDayNaming }}
        <br />
        {{ day.date }}
        <img :src="day.icon" alt="Иконка погоды" />
      </div>
    </div>

    <div class="graph">
      <div class="graphMax">
        <div
          v-for="(day, i) in weather.week"
          :key="day.max + '' + i"
          class="graphMax__item"
        >
          {{ day.max }}°
        </div>
      </div>

      <weather-forecast-chart
        :temperature-color-day="temperatureColorDay"
        :temperature-color-night="temperatureColorNight"
        :temps="weather.week"
      />

      <div class="graphMin">
        <div
          v-for="(day, i) in weather.week"
          :key="day.min + '' + i"
          class="graphMin__item"
        >
          {{ day.min }}°
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherForecastChart from "@/components/widget/WeatherForecastChart.vue";

const hotter = "#DC143C";
const hot = "#FF7F50";
const normal = "#f4df5b";
const cold = "#ADD8E6";
const colder = "#4682B4";

export default {
  name: "WeatherForecastWeek",

  components: { WeatherForecastChart },

  props: {
    weather: {
      type: Object,
      required: true,
      default: {
        week: [
          {
            date: "",
            icon: "",
            max: 0,
            min: 0,
            weekDayNaming: ""
          },
          {
            date: "",
            icon: "",
            max: 0,
            min: 0,
            weekDayNaming: ""
          },
          {
            date: "",
            icon: "",
            max: 0,
            min: 0,
            weekDayNaming: ""
          },
          {
            date: "",
            icon: "",
            max: 0,
            min: 0,
            weekDayNaming: ""
          },
          {
            date: "",
            icon: "",
            max: 0,
            min: 0,
            weekDayNaming: ""
          },
          {
            date: "",
            icon: "",
            max: 0,
            min: 0,
            weekDayNaming: ""
          },
          {
            date: "",
            icon: "",
            max: 0,
            min: 0,
            weekDayNaming: ""
          },
          {
            date: "",
            icon: "",
            max: 0,
            min: 0,
            weekDayNaming: ""
          }
        ],
        averageTemperatureDay: 0,
        averageTemperatureNight: 0
      }
    }
  },

  computed: {
    temperatureColorDay() {
      return this.getTempColor(this.weather.averageTemperatureDay);
    },

    temperatureColorNight() {
      return this.getTempColor(this.weather.averageTemperatureNight);
    }
  },

  methods: {
    getTempColor(temp) {
      if (temp > 30) {
        return hotter;
      } else if (temp > 20) {
        return hot;
      } else if (temp > 0) {
        return normal;
      } else if (temp < -20) {
        return colder;
      } else if (temp < 0) {
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

    .daysItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        display: block;
        max-width: 100%;
        pointer-events: none;
        user-select: none;
      }
    }
  }

  .graph {
    display: grid;
    grid-template: repeat(3, auto) / 1fr;
    font-weight: 700;
    padding: 50px 20px;

    @media (max-width: 768px) {
      padding: 50px 0;
    }

    @media (max-width: 600px) {
      padding: 30px 0 40px 0;
    }

    .graphMax,
    .graphMin {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .graphMin div,
    .graphMax div {
      width: 30px;
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>
