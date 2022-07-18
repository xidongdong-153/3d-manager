<template>
  <div class="button-group">
    <n-button type="success" @click="createPoint">
      渲染点
    </n-button>
  </div>
  <cesium-viewer />
</template>

<script setup lang="ts">
import { typhoonData } from '@/api/zjApi';
import { Cartesian3, ScreenSpaceEventHandler, ScreenSpaceEventType, defined } from 'cesium';
import { onMounted, ref } from 'vue';
import drawPoint from './func/drawPoint'

const typhoonResult = ref<any>({})

const getTyphoon = async() => {
  const { data } = await typhoonData(202203)
  typhoonResult.value = data[0]
}

const createPoint = async () => {
  let viewer = window.viewer
  await getTyphoon()
  
  viewer.camera.flyTo({
		destination : Cartesian3.fromDegrees(Number(typhoonResult.value.centerlng), Number(typhoonResult.value.centerlat),5000000.0)
	});

  // 鼠标事件
  let handle = new ScreenSpaceEventHandler(viewer.scene.canvas)

  handle.setInputAction(function(movement: any) {
    let pick = viewer.scene.pick(movement.position)
    defined(pick)
  }, ScreenSpaceEventType.LEFT_CLICK)
  
  drawPoint(viewer, typhoonResult.value)
}
</script>

<style lang="less">
.button-group {
  margin-bottom: 10px;
}
</style>
