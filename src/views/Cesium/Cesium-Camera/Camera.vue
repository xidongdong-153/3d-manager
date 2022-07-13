<template>
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
          ...
        </n-button>
      </n-button-group>
    </div>
    <cesium-viewer />
</template>

<script setup lang="ts">
import type { Viewer } from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'
import useFlyTo from './func/useFlyTo'
import useLookAt from './func/useLookAt'
import useViewBoundingSphere from './func/useViewBoundingSphere'
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import CesiumViewer from '@/components/CesiumViewer.vue'

const initContainer = (): void => {
  let viewer: Viewer = window.viewer
  // useFlyTo(viewer)
  // useLookAt(viewer)
  useViewBoundingSphere(viewer)
}

onMounted(() => {
  initContainer()
})

onUnmounted(() => {
  console.log('onUnmounted');
  
})
</script>

<style lang="less">
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
