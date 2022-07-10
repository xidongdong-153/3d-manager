<template>
  <div class="cameraContainer">
    <div class="camera-button">
      <n-button-group size="small">
        <n-button type="default" round>
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          FlyTo
        </n-button>
        <n-button type="default">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          LookAt
        </n-button>
        <n-button type="default">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          ？？
        </n-button>
      </n-button-group>
    </div>
    <div id="cesiumContainer" class="cesiumContainer"></div>
  </div>
</template>

<script setup lang="ts">
import initCesium from '@/utils/Cesium/initCesium'
import { Viewer } from 'cesium'
import { onMounted, ref } from 'vue'
import useFlyTo from './func/useFlyTo'
import useLookAt from './func/useLookAt'
import useViewBoundingSphere from './func/useViewBoundingSphere'
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'

const initContainer = (): void => {
  let viewer: Viewer
  viewer = initCesium()
  // useFlyTo(viewer)
  // useLookAt(viewer)
  useViewBoundingSphere(viewer)
}

onMounted(() => {
  initContainer()
})
</script>

<style lang="less">
.cameraContainer {
  height: 100%;

  .camera-button {
    margin-bottom: 12px;
  }

  .cesiumContainer {
    height: 95%;
    .cesium-viewer {
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 8px;
    }
  }
}
</style>
