<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { NMessageProvider, NDialogProvider } from 'naive-ui'
// 引入上面你所定义的全局挂载组件
import Gloabl from './components/Gloabl.vue'


</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <n-dialog-provider>
        <gloabl></gloabl>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="less"></style>
