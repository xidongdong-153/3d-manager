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
import { Cartesian3 } from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'
import useFlyTo from './func/useFlyTo'
import useLookAt from './func/useLookAt'
import useViewBoundingSphere from './func/useViewBoundingSphere'
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import CesiumViewer from '@/components/CesiumViewer.vue'

const initContainer = (): void => {
  let viewer: Viewer = window.viewer
  useFlyTo(viewer)
  // useLookAt(viewer)
  // useViewBoundingSphere(viewer)

  // viewer.scene.camera.setView({
  //       destination : new Cartesian3(-1206939.1925299785, 5337998.241228442, 3286279.2424502545),
  //       orientation : {
  //           heading : 1.4059101895600987,
  //           pitch : -0.20917672793046682,
  //           roll : 2.708944180085382e-13
  //       }
  //   });
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
</style>
