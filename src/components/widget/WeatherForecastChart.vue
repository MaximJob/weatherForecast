<template>
  <div class="chart">
    <vue-apex-charts
        :options="chartOptions"
        :series="series"
        height="80"
        type="area"
    ></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "WeatherForecastChart",

  components: {
    VueApexCharts
  },

  props: {
    temps: {
      type: Array,
      required: true,
      default: [
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
        },
      ]
    },
    temperatureColorDay: {
      type: String,
      required: true,
      default: "#000000"
    },
    temperatureColorNight: {
      type: String,
      required: true,
      default: "#000000"
    }
  },

  data() {
    return {
      chartOptions: {
        annotations: {
          position: "back"
        },

        chart: {
          selection: {
            enabled: false
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: false
          }
        },

        tooltip: {
          enabled: false
        },

        colors: [this.temperatureColorDay, this.temperatureColorNight],

        dataLabels: {
          enabled: false
        },

        stroke: {
          show: false,
          curve: "straight",
          colors: ["transparent"]
        },

        grid: {
          show: false
        },

        legend: {
          show: false
        },

        markers: {
          size: 0,
          hover: {
            size: 0
          }
        },

        plotOptions: {
          area: {
            fillTo: "origin"
          }
        },

        fill: {
          type: "solid"
        },

        xaxis: {
          type: "numeric",
          labels: {
            show: false,
            style: {
              colors: "transparent"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          title: {
            style: {
              color: "transparent"
            }
          },
          crosshairs: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        },

        yaxis: {
          show: false,

          labels: {
            show: false,
            style: {
              colors: "transparent"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          title: {
            style: {
              color: "transparent"
            }
          },
          crosshairs: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    };
  },

  computed: {
    series() {
      const temps = this.temps

      const top = {
        name: "",
        data: [],
        min: 200,
      }

      const bottom = {
        name: "",
        data: [],
        max: -200,
      }

      temps.forEach(el => {
        if (top.min > el.max) {
          top.min = el.max;
        }

        if (bottom.max < el.min) {
          bottom.max = el.min;
        }
      });

      if (top.min < 0) {
        top.min = Math.abs(top.min);
      } else {
        top.min = 0;
      }

      if (bottom.max < 0) {
        bottom.max = 0;
      }

      temps.forEach((el, index) => {
        top.data.push({
          x: index,
          y: el.max + top.min
        });

        bottom.data.push({
          x: index,
          y: el.min - bottom.max
        });
      });

      return [top, bottom];
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  overflow: hidden;
}
</style>
