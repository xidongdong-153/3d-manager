<template>
  <Echarts :options="options" @opt-change="getWbHot"></Echarts>
</template>

<script setup lang="ts">
import Echarts from '../Echarts.vue'
import { EChartsOption } from 'echarts'
import { wbHot } from '@/api/freeApi'
import { ref } from 'vue'

interface WbHotResult {
  hostWord: string[]
  hostWordNum: string[]
}

const WbHotList = ref<WbHotResult[]>([])

const chartSeries = []

const getWbHot = async (callback: (option: any) => {}) => {
  const result = await wbHot({ token: 'OQAPRjSJZF76QK9q', num: 10 })

  WbHotList.value = result.data

  if (WbHotList.value) {
    callback({
      title: {
        text: '微博热词', // 标题
        textStyle: {
          color: 'red'
        }
      }
    })
  }

  // let
  console.log(WbHotList.value)
}
// getWbHot()

const options: EChartsOption = {
  title: {
    text: '微博热词', // 标题
    textStyle: {
      color: 'white'
    },
    subtext: '当日10条!~',
    subtextStyle: {
      color: 'orange'
    }
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {},
  grid: {
    show: true
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

<style lang="less" scoped></style>
