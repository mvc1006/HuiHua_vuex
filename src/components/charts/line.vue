<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  props: {
    value: Object,
    text: String
  },
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    init() {
      let xAxisData = Object.keys(this.value);
      let seriesData = Object.values(this.value);
      const option = {
        title: {
          text: this.text,
          x: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: "#2d8cf0"
              }
            },
            data: seriesData
          }
        ]
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    }
  },
  watch: {
    value: {
      handler: function (val, oldVal) {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
