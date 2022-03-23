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
      required: true
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

        colors: ["#fbbf00"],

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
      const _series = [
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        }
      ];

      let minOfTheMaxTemp = 200;
      let maxOfTheMinTemp = -200;

      this.$props.temps.forEach((el) => {
        if (minOfTheMaxTemp > el.max) {
          minOfTheMaxTemp = el.max;
        }
        if (maxOfTheMinTemp < el.min) {
          maxOfTheMinTemp = el.min;
        }
      });

      if (minOfTheMaxTemp < 0) {
        minOfTheMaxTemp = Math.abs(minOfTheMaxTemp);
      } else {
        minOfTheMaxTemp = 0;
      }

      if (maxOfTheMinTemp < 0) {
        maxOfTheMinTemp = 0;
      }

      let index = 0;
      this.$props.temps.forEach((el) => {
        _series[0].data.push({
          x: index,
          y: (el.max += minOfTheMaxTemp)
        });

        _series[1].data.push({
          x: index,
          y: (el.min -= maxOfTheMinTemp)
        });

        index++;
      });

      return _series;
    }
  }
};
</script>

<style lang="scss" scoped></style>
