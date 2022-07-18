import { Cartesian3, Color, Entity, PointGraphics, Viewer } from 'cesium'

const drawPoint = (viewer: Viewer, tfData: any): void => {
  tfData.points.forEach((item: any, index: number) => {
    let position = [item.lng, item.lat]

    viewer.entities.add(
      new Entity({
        id: `${item.strong} 点${index}`,
        point: new PointGraphics({
          color: Color[judgeColorByWindLevel(item.strong)],
          pixelSize: 10
        }),
        position: Cartesian3.fromDegrees(
          Number(position[0]),
          Number(position[1])
        ),
        description: `
          <div style='color: red;'>
            台风信息
          </div>
          <div>
            经度: ${item.lng}, 纬度: ${item.lat}
          </div>
          <div>
            台风强度: ${item.power}
          </div>
          <div>
            台风点生成时间: ${item.time}
          </div>
        `
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
