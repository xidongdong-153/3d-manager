<template>
  <div class="camera-button">
      <n-button-group size="small">
        <n-button type="default" round>
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          测距
        </n-button>
        <n-button type="default">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          测面
        </n-button>
        <n-button type="default">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          清除
        </n-button>
      </n-button-group>
    </div>
    <cesium-viewer />
</template>

<script setup lang='ts'>
import CesiumViewer from '@/components/CesiumViewer.vue'
import type { Viewer } from 'cesium'
import {  Cartesian3 } from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'

import { LogInOutline as LogInIcon } from '@vicons/ionicons5'

import MeasureSpaceDistance from './func/useMeasureSpaceDistance'

const initContainer = (): void => {
  let viewer: Viewer = window.viewer

  viewer.camera.flyTo({
		destination : Cartesian3.fromDegrees(110.6543, 28.5363,5000000.0)
	});

  // measure d
  const measure = MeasureSpaceDistance(viewer, {})
}

onMounted(() => {
  initContainer()
})
</script>

<style lang='less'>
.camera-button {
  margin-bottom: 12px;
}

.cesiumContainer {
  height: calc(100% - 60px);
  .cesium-viewer {
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 8px;
  }
}
</style>