import { Cartesian3, HeadingPitchRange, Math } from 'cesium'
import type { Viewer } from 'cesium'

/**
 * 相机-lookAt
 * 锁定视角
 * @param viewer
 */
const useLookAt = (viewr: Viewer): void => {
  const center = Cartesian3.fromDegrees(116.39, 39.91)
  const heading = Math.toRadians(50)
  const pitch = Math.toRadians(-90)
  const range = 2500

  viewr.camera.lookAt(center, new HeadingPitchRange(heading, pitch, range))
}

export default useLookAt
