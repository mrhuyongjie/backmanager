<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series:[]
        };
      },
    },
  },
  watch:{
    chartData:{
      handler:function(){
        this.initChart()
      },
      deep:true
    }
  },
  methods:{
    initChart(){
      this.initChartData()
      if(this.echart){
        this.echart.setOption(this.options)
      }else{
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData(){
      if(this.isAxisChart){
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      }else{
        this.normalOption.series = this.chartData.series
      }
    }
  },
  data() {
    return {
      axisOption: {
        textStyle: {
          color: "#333",
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLable: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "5ab1ef", "#ffb980", "#d87a80", "8d98b3"],
        series: [],
      },
      normalOption: {
        tooltrip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#1abc9c",
          "#ffa502",
          "#81ecec",
          "#c7ecee",
          "#eb4d4b",
        ],
        series: [], 
      },
      echart:null
    };

  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
};
</script>
