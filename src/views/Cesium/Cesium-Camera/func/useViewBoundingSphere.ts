import {
  Cartesian3,
  HeadingPitchRange,
  HeadingPitchRoll,
  Math,
  Transforms,
  BoundingSphere,
  ClockViewModel
} from 'cesium'
import type { Viewer } from 'cesium'

const position = Cartesian3.fromDegrees(116.39, 39.91, 1500)
const orientation = Transforms.headingPitchRollQuaternion(
  position,
  new HeadingPitchRoll(Math.toRadians(60), 0, 0)
)
/**
 * 相机-viewBoundingSphere
 */
const useViewBoundingSphere = (viewer: Viewer): void => {
  const entity = viewer.entities.add({
    position,
    orientation,
    model: {
      uri: './ModelBuildingFiles/Cesium_Air.glb',
      minimumPixelSize: 100,
      maximumScale: 1000,
      show: true
    }
  })

  viewer.camera.viewBoundingSphere(
    new BoundingSphere(position, 20),
    new HeadingPitchRange(0, 0, 0)
  )
}

export default useViewBoundingSphere
