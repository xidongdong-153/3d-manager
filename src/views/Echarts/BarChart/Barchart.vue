<template>
  <Echarts :options="options"></Echarts>
</template>

<script setup lang="ts">
import Echarts from '../Echarts.vue'
import { EChartsOption } from 'echarts'

const options: EChartsOption = {
  title: {
    text: '3个笨蛋', // 标题
    textStyle: {
      color: 'white'
    },
    subtext: '3年中的笨蛋值',
    subtextStyle: {
      color: 'orange'
    }
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {},
  grid: {
    show: true,
    // backgroundColor: 'rgba(248, 160, 238, 0.5)'
  },
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '2014', '2015', '2016'],
      ['笨笨', 66.12, 77.11, 42.39],
      ['憨憨', 35.12, 75.12, 62.39],
      ['聪聪', 56.12, 31.11, 23.39]
    ]
  },
  series: [
    {
      type: 'bar'
    },
    {
      type: 'bar'
    },
    {
      type: 'bar'
    }
  ]
}
</script>

<style lang="less"></style>
