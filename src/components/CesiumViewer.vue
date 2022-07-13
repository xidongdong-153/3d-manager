<template>
 <div id="cesiumContainer" class="cesiumContainer"></div>
</template>

<script setup lang='ts'>
import type { Viewer } from 'cesium'
import initCesium from '@/utils/Cesium/initCesium'
import { onMounted } from 'vue';

const init = ():void => {
  let viewer: Viewer = initCesium()
  window.viewer = viewer
}

onMounted(() => {
  init()
})
</script>

<style lang='less'>
.cesiumContainer {
  height: calc(100% - 60px);
  .cesium-viewer {
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 8px;
  }
}
</style>