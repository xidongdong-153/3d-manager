<template>
  <n-space vertical size="large" >
    <n-layout >
      <layout-header></layout-header>
      <n-layout has-sider content-style="height: calc(100vh - 60px)">
        <layout-menu-vue></layout-menu-vue>
          <n-layout-content :native-scrollbar="false" content-style="padding: 24px;">
            <router-view></router-view>
          </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import layoutMenuVue from './components/layout-menu.vue'
import LayoutHeader from './components/layout-header.vue'

const color = ref('rgba(128, 128, 128, 0.4)')
</script>

<style lang="less" scoped>

.n-layout-content {
  // overflow-y: hidden;
  background: v-bind(color);
}
</style>
