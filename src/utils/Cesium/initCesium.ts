import { Ion, Viewer, createWorldTerrain, createOsmBuildings } from 'cesium'

const myToken: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOTMxMGIyZi1mY2ZmLTQ4MjYtOWM1OS0xMDYxNjI0ZTI4Y2IiLCJpZCI6MTAwMzcyLCJpYXQiOjE2NTcxNzA1MTN9.OJUa2dVWTPZ_suTuYH-QgzjytXcHfoWqmMqFWSKGm2Y'
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
    // imageryProvider: true,
    fullscreenButton: false, //全屏按钮,默认显示true
    geocoder: false, //地名查找,默认true
    timeline: false, //时间线,默认true
    vrButton: false, //双屏模式,默认不显示false
    homeButton: false, //主页按钮，默认true
    infoBox: false, //点击要素之后显示的信息,默认true
    selectionIndicator: true, //选中元素显示,默认true,
    shouldAnimate: true
  })
  viewer.scene.primitives.add(createOsmBuildings())
  viewer._cesiumWidget._creditContainer.style.display = "none";
  
  return viewer
}

export default initCesium
