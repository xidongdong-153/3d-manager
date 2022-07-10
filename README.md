# Cesium 学习管理 demo

Cesium API + 自己想玩的组件的一个管理网页

## 搭建(不断完善...)

### 快速搭建项目

安装

`yarn`

配置

`yarn add -D tailwindcss@3.0.23 postcss@8.4.8 autoprefixer@10.4.2`

`npx tailwindcss init -p`

`yarn -D naive-ui vfonts`



### Vite自动导入UI库

插件：unplugin-vue-components

```js
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ]
```



### path模块

Vite中使用 path 模块 报错，解决方案：

安装 @types/node

tsconfig.node.json 写下

```json
"allowSyntheticDefaultImports": true
```



### 加载NaiveUI的Message

在 window 上挂载

Global.vue

```vue
// global.vue
// 挂载window下方法组件
// 我是全局用路由控制页面，如果有其他嵌套组件布局等，引入相应的替换即可
<template>
    <router-view />
</template>

<script lang="ts" setup>
import { useDialog, useMessage } from "naive-ui";

// 将 dialog & message 实例方法挂载
// $message 和 $dialog 随个人喜好定义名称
// 注意不要太过于简单，以免污染其他全局定义
window.$message = useMessage();
window.$dialog = useDialog();
</script>
```

在 App.vue 中引入

```vue
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
```

可在App组件之下的任意组件中使用了...

```vue
<script setup lang="ts">
const useMessage = ():void => {
    window.$message.info(`尝试一下 Message组件`)
}
</script>
```

有 ts 报错的地方，在.d.ts中更新类型

```ts
// 引入naive对应的定义类型
import { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'

declare global {
  interface Window {
    $message: MessageApiInjection
    $dialog: DialogApiInjection
  }
```

### 图标的加载

官网推荐的 https://www.xicons.org/

下载引用即可！

`yarn add -D @vicons/material @vicons/ionicons5`



### Cesium加载

安装:

 `yarn add cesium`

`yarn add -D vite-plugin-cesium`

使用vite-plugin-cesium插件，即可开箱使用...

vite.config.ts

```ts
// vite.config.ts
...
import cesium from 'vite-plugin-cesium'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...
    cesium()
  ]
    ...
})

```

初始化cesium, initCesium.ts

```ts
import { Ion, Viewer, createWorldTerrain, createOsmBuildings } from 'cesium'

const myToken: string =
  'your token'
Ion.defaultAccessToken = myToken

/**
 * 初始化viewer
 * @returns viwer
 */
const initCesium = (): Viewer => {
  const viewer = new Viewer('cesiumContainer', {
    terrainProvider: createWorldTerrain(),
    animation: false, //动画控制，默认true
    baseLayerPicker: true, //地图切换控件(底图以及地形图)是否显示,默认显示true
    fullscreenButton: false, //全屏按钮,默认显示true
    geocoder: false, //地名查找,默认true
    timeline: false, //时间线,默认true
    vrButton: false, //双屏模式,默认不显示false
    homeButton: false, //主页按钮，默认true
    infoBox: false, //点击要素之后显示的信息,默认true
    selectionIndicator: true //选中元素显示,默认true,
  })
  viewer.scene.primitives.add(createOsmBuildings())

  return viewer
}

export default initCesium

```

