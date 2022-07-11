<template>
  <div class="chart-container" ref="container">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import {  init, EChartsOption } from 'echarts';

const props = defineProps({
  options: {
    type: Object,
    default: {},
    required: true,
  },
});

const { options } = toRefs(props);

const container = ref<HTMLElement>();

// 根据窗口变换 刷新Echarts


onMounted(() => {

    const chart = init(container.value!, 'dark');
    chart.setOption(options.value)

    window.onresize = function() {
      chart.resize()
    }
})
</script>

<style lang="less">
.chart-container {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
