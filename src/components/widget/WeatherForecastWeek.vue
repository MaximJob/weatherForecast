<template>
  <div class="week">
    <div class="days">
      <div v-for="(day, i) in weather" :key="i" class="daysItem">
        {{ day.weekDayNaming }}
        <br />
        {{ day.date }}
        <img :src="day.icon" alt="Иконка погоды" />
      </div>
    </div>

    <div class="graph">
      <div class="graphMax">
        <div
          v-for="(temp, i) in weather"
          :key="temp.max + '' + i"
          class="graphMax__item"
        >
          {{ temp.max }}°
        </div>
      </div>

      <weather-forecast-chart
        :temperature-color="temperatureColor"
        :temps="weather"
      />

      <div class="graphMin">
        <div
          v-for="(temp, i) in weather"
          :key="temp.min + '' + i"
          class="graphMin__item"
        >
          {{ temp.min }}°
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherForecastChart from "@/components/widget/WeatherForecastChart.vue";

export default {
  name: "WeatherForecastWeek",

  components: { WeatherForecastChart },

  props: {
    weather: {
      type: Array,
      required: true
    }
  },

  computed: {
    temperatureColor() {
      const hot = "#fb8e00";
      const cold = "#00cdfb";
      return this.weather.averageTemperature > 0 ? hot : cold;
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
    justify-items: center;
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
