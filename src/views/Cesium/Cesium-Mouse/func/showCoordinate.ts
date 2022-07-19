import {
  ScreenSpaceEventHandler,
  Viewer,
  ScreenSpaceEventType,
  Cartesian2,
  Ray
} from 'cesium'

const getCoordinate = (viewer: Viewer, container: HTMLElement) => {
  container.innerHTML = `<span class="show-item">暂无数据</span>`

  let handler: ScreenSpaceEventHandler = new ScreenSpaceEventHandler(
    viewer.scene.canvas
  )
  // 有点炸了。。if好多，怎么优化
  handler.setInputAction(
    (movement: { startPosition: Cartesian2; endPosition: Cartesian2 }) => {
      // 获取 光线
      let currentRay = viewer.camera.getPickRay(movement.endPosition)

      if (currentRay) {
        // 查找光线和渲染的地球曲面之间的交点
        let cartesian3 = viewer.scene.globe.pick(currentRay, viewer.scene)
        
        if (cartesian3) {
          // 将提供的笛卡尔转换为地图表示。在椭球体的中心
          let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(
            cartesian3
          )
          
          // 海拔 getHeight 获取给定地图上的曲面高度。
          let viewHeight = viewer.scene.globe.getHeight(cartographic)
          // 视角海拔高度 地球高度 - 鼠标位置点高度
          let altitude1 = Math.sqrt(
            viewer.scene.camera.positionWC.x *
              viewer.scene.camera.positionWC.x +
              viewer.scene.camera.positionWC.y *
                viewer.scene.camera.positionWC.y +
              viewer.scene.camera.positionWC.z *
                viewer.scene.camera.positionWC.z
          )
          let altitude2 = Math.sqrt(
            cartesian3.x * cartesian3.x +
              cartesian3.y * cartesian3.y +
              cartesian3.z * cartesian3.z
          )
  

          
          // 地理坐标（弧度）转经纬度坐标 https://xw.qq.com/cmsid/20201208A0EGVO00
          // 通过new Cesium.Cartographic(longitude, latitude, height)创建，其中这里的参数是用弧度表示的经纬度，即经度和纬度。弧度即角度对应弧长是半径的倍数。
          // 弧度变角度 180/π×弧度
          // 角度转弧度 π/180×角度
          let point = [
            (cartographic.longitude / Math.PI) * 180,
            (cartographic.latitude / Math.PI) * 180
          ]
          
          if (!viewHeight) {
            viewHeight = 0
          }
          if (!altitude1) {
            altitude1 = 0
          }
          if (!altitude2) {
            altitude2 = 0
          }
          if (!point) {
            point = [0, 0]
          }
          container.innerHTML = `<span class="show-item">视角高度: ${(
            altitude1 - altitude2
          ).toFixed(2)} m</span>
                                      <span class="show-item">海拔高度: ${viewHeight.toFixed(
                                        2
                                      )} m</span>
                                      <span class="show-item">经度: ${point[0].toFixed(
                                        3
                                      )}</span>
                                      <span class="show-item">纬度: ${point[1].toFixed(
                                        3
                                      )}</span>`
        }
      }
    },
    ScreenSpaceEventType.MOUSE_MOVE
  )
}

export { getCoordinate }
