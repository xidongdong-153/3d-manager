<template>
    <div class="camera-button">
      <n-button-group size="small">
        <n-button type="default" round @click="flyTo">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          FlyTo
        </n-button>
        <n-button type="default" @click="lookAt">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          LookAt
        </n-button>
        <n-button type="default" @click="viewBoundingSphere">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          viewBoundingSphere
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
import { Cartesian3, Matrix4 } from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'
import useFlyTo from './func/useFlyTo'
import useLookAt from './func/useLookAt'
import useViewBoundingSphere from './func/useViewBoundingSphere'
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import CesiumViewer from '@/components/CesiumViewer.vue'

const flyTo = () => {
  let viewer: Viewer = window.viewer
  useFlyTo(viewer)
  // viewer.trackedEntity = undefined
  viewer.camera.lookAtTransform(Matrix4.IDENTITY)
  window.$message.info('使用了 flyTo')
}

const lookAt = () => {
  let viewer: Viewer = window.viewer
  useLookAt(viewer)
  window.$message.info('使用了 lookAt')
}

const viewBoundingSphere = () => {
  let viewer: Viewer = window.viewer
  useViewBoundingSphere(viewer)
  window.$message.info('使用了 viewBoundingSphere')
}

onMounted(() => {

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
