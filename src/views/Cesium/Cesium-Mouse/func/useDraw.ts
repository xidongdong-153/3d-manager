import {
  Color,
  Cartesian2,
  Cartesian3,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  PolylineGlowMaterialProperty,
  PolygonHierarchy,
  DistanceDisplayCondition
} from 'cesium'
import { Viewer, Entity } from 'cesium'

// -------------------数据---------------------

let index = 1
let tempEntities: Entity[] = []
let tempPoints: Cartesian3[] = []

// -------------------监听---------------------

const watchDrawPoint = (viewer: Viewer, tooltip: HTMLElement): void => {
  let handler: ScreenSpaceEventHandler | null = new ScreenSpaceEventHandler(
    viewer.scene.canvas
  )
  tooltip.innerText = '绘制点'
  handler.setInputAction((movement: { endPosition: Cartesian2 }) => {
    tooltip.style.display = 'block'
    tooltip.style.left = movement.endPosition.x + 45 + 'px'
    tooltip.style.top = movement.endPosition.y + 55 + 'px'
  }, ScreenSpaceEventType.MOUSE_MOVE)
  handler.setInputAction((movement: { position: Cartesian2 }) => {
    let position = viewer.camera.pickEllipsoid(
      movement.position,
      viewer.scene.globe.ellipsoid
    )
    if (position) {
      let point = drawPoint(position, viewer, index++)
      tempEntities.push(point)
      console.log(tempEntities)
    }
  }, ScreenSpaceEventType.LEFT_CLICK)
  handler.setInputAction(() => {
    if (handler) {
      tooltip.style.display = 'none'
      handler.destroy() //关闭事件句柄
    }
    handler = null
  }, ScreenSpaceEventType.RIGHT_CLICK)
}

const watchPolyline = (viewer: Viewer, tooltip: HTMLElement): void => {
  tooltip.innerText = '绘制线'
  let handler: ScreenSpaceEventHandler | null = new ScreenSpaceEventHandler(
    viewer.scene.canvas
  )
  handler.setInputAction((movement: { endPosition: Cartesian2 }) => {
    tooltip.style.display = 'block'
    tooltip.style.left = movement.endPosition.x + 45 + 'px'
    tooltip.style.top = movement.endPosition.y + 55 + 'px'
  }, ScreenSpaceEventType.MOUSE_MOVE)
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

const watchPolygon = (viewer: Viewer, tooltip: HTMLElement): void => {
  tooltip.innerText = '绘制面'
  let handler: ScreenSpaceEventHandler | null = new ScreenSpaceEventHandler(
    viewer.scene.canvas
  )

  handler.setInputAction((movement: { endPosition: Cartesian2 }) => {
    tooltip.style.display = 'block'
    tooltip.style.left = movement.endPosition.x + 45 + 'px'
    tooltip.style.top = movement.endPosition.y + 55 + 'px'
  }, ScreenSpaceEventType.MOUSE_MOVE)

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

// -------------------绘制---------------------

const drawPoint = (position: Cartesian3, viewer: Viewer, index: number) => {
  const pointGeometry = viewer.entities.add({
    name: '点几何对象' + index,
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

const drawPolyline = (positions: Cartesian3[], viewer: Viewer) => {
  if (positions.length < 1) return
  const polylineGeometry = viewer.entities.add({
    name: '线几何对象',
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

// -------------------清除---------------------

const clearAll = (viewer: Viewer) => {
  index = 1
  tempEntities = []
  tempPoints = []
  viewer.entities.removeAll()
}

export { watchDrawPoint, watchPolyline, watchPolygon, clearAll }
