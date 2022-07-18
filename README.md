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





## Cesium ...



### Mouse

几个简单的 鼠标事件

**ScreenSpaceEventHandler 屏幕空间事件处理器**

可以处理用户输入时间，当前尝试鼠标左右键

获取一个屏幕监听对象 `handler`

```ts
let handler: ScreenSpaceEventHandler | null = new ScreenSpaceEventHandler(
    viewer.scene.canvas
  )
```



`handler`的 setInputAction 事件

setInputAction 参数：回调函数、点击事件

```ts
handler.setInputAction(() => {}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
```

回调函数的参数根据事件的不同而变化

单击：click 参数为  `click: { position: Cartesian2 }`

移动: movement 参数为 `movement: { startPosition: Cartesian2, endPosition: Cartesian2 }`

其他事件待尝试。。。



试试绘制实体

创建 实体的 数组集合

```ts
let tempEntities: Entity[] = []
let tempPoints: Cartesian3[] = []
```



- 绘制点：

  生成一个方法 watchDrawPoint

  需要参数： viewer

  

  ```ts
  const watchDrawPoint = (viewer: Viewer, tooltip: HTMLElement): void => {
      ...
   // 左键开始绘制点
  handler.setInputAction((movement: { position: Cartesian2 }) => {
      let position = viewer.camera.pickEllipsoid(
        movement.position,
        viewer.scene.globe.ellipsoid
      )
      if (position) {
        let point = drawPoint(position, viewer, index++)
        tempEntities.push(point)
      }
    }, ScreenSpaceEventType.LEFT_CLICK)
  // 右键取消绘制点
  handler.setInputAction(() => {
      if (handler) {
        tooltip.style.display = 'none'
        handler.destroy() //关闭事件句柄
      }
      handler = null
    }, ScreenSpaceEventType.RIGHT_CLICK)
  }
  ```

  生成一个点 实体

  ```ts
  const drawPoint = (position: Cartesian3, viewer: Viewer, index: number) => {
    const pointGeometry = viewer.entities.add({
      name: '点' + index,
      position,
      point: {
        color: Color.SKYBLUE,
        pixelSize: 10,
        outlineColor: Color.RED,
        outlineWidth: 1,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    })
    return pointGeometry
  }
  ```

  

- 绘制线：

  生成一个方法 watchDrawPoint

  需要参数： viewer

  

  ```ts
  const watchPolyline = (viewer: Viewer, tooltip: HTMLElement): void => {
  ...
    handler.setInputAction((click: { position: Cartesian2 }) => {
      let position = viewer.camera.pickEllipsoid(
        click.position,
        viewer.scene.globe.ellipsoid
      )
      if (position) {
        tempPoints.push(position)
      }
      let tempLength = tempPoints.length
      let point = drawPoint(tempPoints[tempPoints.length - 1], viewer, index++)
      tempEntities.push(point)
      if (tempLength > 1) {
        let pointline = drawPolyline(
          [tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]],
          viewer
        )
        if (pointline) tempEntities.push(pointline)
      } else {
        tooltip.innerText = '请绘制下一个点，右键结束'
      }
      return
    }, ScreenSpaceEventType.LEFT_CLICK)
    handler.setInputAction(() => {
      if (handler) {
        tooltip.style.display = 'none'
        handler.destroy() //关闭事件句柄
        tempPoints = []
      }
      handler = null
    }, ScreenSpaceEventType.RIGHT_CLICK)
  }
  ```

  生成线 实体

  ```ts
  const drawPolyline = (positions: Cartesian3[], viewer: Viewer) => {
    if (positions.length < 1) return
    const polylineGeometry = viewer.entities.add({
      name: '线',
      polyline: {
        positions,
        width: 5.0,
        material: new PolylineGlowMaterialProperty({
          color: Color.GOLD
        }),
        depthFailMaterial: new PolylineGlowMaterialProperty({
          color: Color.GOLD
        }),
        arcType: 2
      }
    })
    return polylineGeometry
  }
  ```

  

- 绘制面：

  生成一个方法 watchDrawPoint

  需要参数： viewer

  

  ```ts
  const watchPolygon = (viewer: Viewer, tooltip: HTMLElement): void => {
    ...
  
    handler.setInputAction((click: { position: Cartesian2 }) => {
      let position = viewer.camera.pickEllipsoid(
        click.position,
        viewer.scene.globe.ellipsoid
      )
      if (position) {
        tempPoints.push(position)
      }
      let tempLength = tempPoints.length
      let point = drawPoint(tempPoints[tempPoints.length - 1], viewer, index++)
      tempEntities.push(point)
      if (tempLength > 1) {
        let pointline = drawPolyline(
          [tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]],
          viewer
        )
        if (pointline) tempEntities.push(pointline)
      } else {
        tooltip.innerText = '请绘制下一个点，右键结束'
      }
      return
    }, ScreenSpaceEventType.LEFT_CLICK)
  
    handler.setInputAction((click: { position: Cartesian2 }) => {
      let cartesian = viewer.camera.pickEllipsoid(
        click.position,
        viewer.scene.globe.ellipsoid
      )
      if (cartesian) {
        let tempLength = tempPoints.length
        if (tempLength < 3) {
          window.$message.error('请选择3个以上的点再执行闭合操作命令')
        } else {
          //闭合最后一条线
          let pointline = drawPolyline(
            [tempPoints[tempPoints.length - 1], tempPoints[0]],
            viewer
          )
          if (pointline && tempPoints && handler) {
            tempEntities.push(pointline)
            const polygon = drawPolygon(tempPoints, viewer)
  
            if (polygon) tempEntities.push(polygon)
            tempPoints = []
            handler.destroy() //关闭事件句柄
            tooltip.style.display = 'none'
          }
          handler = null
        }
      }
      return
    }, ScreenSpaceEventType.RIGHT_CLICK)
  }
  ```

  生成面 实体

  ```ts
  const drawPolygon = (positions: Cartesian3[], viewer: Viewer) => {
    if (positions.length < 2) return
  
    const polygonGeometry = viewer.entities.add({
      name: '线几何对象',
      polygon: {
        height: 5000,
        hierarchy: new PolygonHierarchy(positions),
        material: Color.GREEN.withAlpha(0.5),
        distanceDisplayCondition: new DistanceDisplayCondition(1000, 10000000)
      }
    })
    return polygonGeometry
  }
  ```

  



