import { Cartesian3, Math } from 'cesium'
import type { Viewer } from 'cesium'
interface FlyTo {
  Degrees: Degrees[]
}
enum Degrees {
  longitude,
  latitude,
  height
}

/**
 * 相机-flyTo
 * @param viewer
 */
const useFlyTo = (viewer: Viewer): void => {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(103.84, 31.15, 17850000),
    orientation: {
      heading: Math.toRadians(348.4202942851978),
      pitch: Math.toRadians(-89.74026687972041),
      roll: Math.toRadians(0)
    }
  })
}

export default useFlyTo
