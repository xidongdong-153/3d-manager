<template>
  <Echarts :options="options" @opt-change="getWbHot"></Echarts>
</template>

<script setup lang="ts">
import Echarts from '../Echarts.vue'
import { EChartsOption } from 'echarts'
import { wbHot } from '@/api/freeApi'
import { ref } from 'vue'

interface WbHotResult {
  hot_word: string
  hot_word_num: number
  url: string
}

const WbHotList = ref<WbHotResult[]>()

const chartSeries = []

const getWbHot = async (setOptions: (option: any) => {}) => {
  const { data } = await wbHot({ token: 'OQAPRjSJZF76QK9q', num: 20 })

  WbHotList.value = data.data

  if (WbHotList.value) {
    setOptions({
      title: {
        text: '微博热词', // 标题
        textStyle: {
          color: 'red'
        }
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: WbHotList.value.map(item => {
          return item.hot_word
        }),
        axisLabel: {
          interval: 0,
          rotate: 20,
          margin: 8
        }
      },
      series: [
        {
          type: 'bar',
          barWidth: '30%',
          data: WbHotList.value.map(item => {
            return item.hot_word_num
          })
        }
      ],
      visualMap: {
        // orient: 'horizontal',
        // left: 'center',
        min: 0,
        max: 2500000,
        // text: ['High Score', 'Low Score'],
        dimension: 0,
        inRange: {
          color: ['#65B581', '#FFCE34', '#FD665F']
        }
      }
    })
  }
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
  grid: {
    show: true,
    containLabel: true
    // backgroundColor: 'rgba(248, 160, 238, 0.5)'
  },
  legend: {},
  tooltip: {}
}
</script>

<style lang="less" scoped></style>
