import { Cartesian3, Color, Entity, PointGraphics, Viewer } from 'cesium'

const drawPoint = (viewer: Viewer, tfData: any): void => {
  tfData.points.forEach((item: any, index: number) => {
    let position = [item.lng, item.lat]
    
    viewer.entities.add(
      new Entity({
        point: new PointGraphics({
          color: Color[judgeColorByWindLevel(item.strong)],
          pixelSize: 10
        }),
        position: Cartesian3.fromDegrees(
          Number(position[0]),
          Number(position[1])
        )
      })
    )
  })
}

// interface WindLevel {
//   热带风暴: string
//   热带低压: string
//   强热带风暴: string
//   台风: string
//   强台风: string
//   超强台风: string
// }
// 台风强度表 哈哈 any script
const judgeColorByWindLevel = (windlevel: string): string => {
  const map = {
    热带风暴: 'BLUE',
    热带低压: 'GREEN',
    强热带风暴: 'YELLOW',
    台风: 'ORANGE',
    强台风: 'PURPLE',
    超强台风: 'RED'
  }
  
  return map[windlevel]
}

export default drawPoint
