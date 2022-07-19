<template>
  <div class="camera-button">
    <n-button-group size="small">
      <n-button type="default" round @click="drawPoint">
        <template #icon>
          <n-icon><DrawOutlined /></n-icon>
        </template>
        绘制点
      </n-button>
      <n-button type="default" @click="drawLine">
        <template #icon>
          <n-icon><DrawOutlined /></n-icon>
        </template>
        绘制线(测线)
      </n-button>
      <n-button type="default" @click="drawPolygon">
        <template #icon>
          <n-icon><DrawOutlined /></n-icon>
        </template>
        绘制面(测面)
      </n-button>
      <n-button type="default" @click="clearAllEntities">
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        清除
      </n-button>
    </n-button-group>
  </div>
  <div class="tooltip" ref="tooltip"></div>
  <!-- 视角高度 海拔高度 经纬度 -->
  <div class="show-coordinate" ref="showCoordinate">
    <!-- <span class="show-item">视角高度: 121212 m</span>
    <span class="show-item">海拔高度: -18.64 m</span>
    <span class="show-item">经度: 121.212</span>
    <span class="show-item">纬度: 21.212</span> -->
  </div>
  <cesium-viewer />
</template>

<script setup lang="ts">
import CesiumViewer from '@/components/CesiumViewer.vue'
import { Viewer } from 'cesium'
import { Cartesian3 } from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'

import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import { DrawOutlined } from '@vicons/material'

import MeasureSpaceDistance from './func/useMeasureSpaceDistance'
import { watchDrawPoint, watchPolyline, watchPolygon, clearAll } from './func/useDraw'
import { getCoordinate } from './func/showCoordinate'

const initContainer = (): void => {
  let viewer: Viewer = window.viewer

  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(110.6543, 28.5363, 5000000.0)
  })

  // measure d
  const measure = MeasureSpaceDistance(viewer, {})
  getCoordinate(viewer, showCoordinate.value)
}

const tooltip = ref()
const showCoordinate = ref()

const drawPoint = () => {
  let viewer: Viewer = window.viewer
  watchDrawPoint(viewer, tooltip.value)
}

const drawLine = () => {
  let viewer: Viewer = window.viewer
  watchPolyline(viewer, tooltip.value)
}

const drawPolygon = () => {
  let viewer: Viewer = window.viewer
  watchPolygon(viewer, tooltip.value)
}

const clearAllEntities = () => {
  let viewer: Viewer = window.viewer
  clearAll(viewer)
}

onMounted(() => {
  initContainer()
})
</script>

<style lang="less">
.camera-button {
  margin-bottom: 12px;
}

.tooltip {
  display: none;
  position: absolute;
  top: 0;
  left: 10px;
  padding: 2px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  z-index: 100;
  transition: all 0.1s;
  &::before {
    position: absolute;
    top: 8px;
    left: -16px;
    content: '';
    border: 8px solid transparent;
    border-right-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
}

.show-coordinate {
  position: absolute;
  left: 30px;
  bottom: 24px;
  padding: 0 5px;
  // width: 440px;
  height: 20px;
  line-height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(255, 255, 255);
  font-size: 12px;
  border-radius: 2px;
  z-index: 100;
  transition: all 0.3s;
  .show-item:nth-child(n + 2) {
    margin-left: 5px;
  }
}
</style>
