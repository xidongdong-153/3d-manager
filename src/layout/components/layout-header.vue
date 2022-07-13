<template>
  <n-layout-header bordered>
    <h1 class="header-title">
      <n-icon size="32"> <game-controller-outline /> </n-icon>
      <span>不熟悉3D...</span>
    </h1>
  </n-layout-header>
</template>

<script setup lang="ts">
import { GameControllerOutline } from '@vicons/ionicons5'
</script>

<style lang="less" scoped>
.n-layout-header {
  height: 60px;
  line-height: 60px;
  padding: 0 24px;
  background: rgba(128, 128, 128, 0.2);
}
.header-title {
  display: flex;
  align-items: center;
  line-height: 60px;
}
</style>
