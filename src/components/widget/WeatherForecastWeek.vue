<template>
  <div class="week">
    <div class="days">
      <div v-for="day in 8" :key="day" class="daysItem">
        {{ getWeekDayNaming(day) }}
        <br />
        {{ normalizeDayIndex(day) + " " + getMonthNaming }}
        <img :src="getIcon(day)" alt="Иконка погоды" />
      </div>
    </div>

    <div class="graph">
      <div class="graphMax">
        <div v-for="(temp, i) in maxMinTemps" :key="temp.max + '' + i">
          {{ temp.max }}°
        </div>
      </div>

      <weather-forecast-chart :temps="maxMinTemps" />

      <div class="graphMin">
        <div v-for="(temp, i) in maxMinTemps" :key="temp.min + '' + i">
          {{ temp.min }}°
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherForecastChart from "@/components/widget/WeatherForecastChart.vue";

const dayNamings = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthNamings = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Мая",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек"
];

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
    daysInMonth() {
      const thisMonth = new Date(2022, new Date().getMonth(), 1);
      const nextMonth = new Date(2022, new Date().getMonth() + 1, 1);
      return Math.round((nextMonth - thisMonth) / 1000 / 3600 / 24);
    },

    maxMinTemps() {
      const temps = [];
      if (this.weather && this.weather[0] && this.weather[0].temp) {
        this.weather.forEach((el) => {
          temps.push({
            max: Math.round(el.temp.max),
            min: Math.round(el.temp.min)
          });
        });
      }
      return temps;
    },

    getMonthNaming() {
      return monthNamings[new Date().getMonth()];
    }
  },

  methods: {
    getIcon(index) {
      index--;
      if (
        this.weather &&
        this.weather[index] &&
        this.weather[index].weather &&
        this.weather[index].weather[0].icon
      ) {
        const icon = this.weather[index].weather[0].icon;
        return `https://openweathermap.org/img/wn/${icon}.png`;
      }
      return "";
    },

    getWeekDayNaming(day) {
      if (day === 1) {
        return "Сегодня";
      }
      const index = (day + new Date().getDay() - 2) % dayNamings.length;
      return dayNamings[index];
    },

    normalizeDayIndex(day) {
      day = day + new Date().getDate() - 1;
      if (day <= this.daysInMonth) {
        return day;
      }
      return day % this.daysInMonth;
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
    padding: 50px 0;

    .graphMax {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

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
