<template>
  <div class="chart-container" ref="container">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import {  init } from 'echarts';
import type { EChartsOption } from 'echarts'

const props = defineProps({
  options: {
    type: Object,
    default: {},
    required: true,
  },
});

const emit = defineEmits(['opt-change'])


const { options } = toRefs(props);

const container = ref<HTMLElement>();

// 根据窗口变换 刷新Echarts


onMounted(() => {
    const chart = init(container.value!, 'dark');
    chart.setOption(options.value)
    
    emit('opt-change', (options: any) => {
      chart.setOption(options)
    })

    window.onresize = function() {
      chart.resize()
    }
})
</script>

<style lang="less" scoped>
.chart-container {
  width: 100%;
  height: calc(100vh - 160px);
}
</style>
