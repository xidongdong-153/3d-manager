import { ScreenSpaceEventHandler, Viewer } from "cesium";

const MeasureSpaceDistance = (viewer: Viewer, options: any): void => {
  // let objId = Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0));

  // const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  // const ts_handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  
  // let polyline = null;
  // let positions = [];
  // let labels = [];
  // let floatLable = null;
  // let lastCartesian = null;
  // let allDistance = 0;

  const measureOpt = {
    viewer,
    objId: Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0)),
    handler: new ScreenSpaceEventHandler(viewer.scene.canvas),
    ts_handler: new ScreenSpaceEventHandler(viewer.scene.canvas),
    polyline: null,
    labels: [],
    floatLable: null,
    lastCartesian: null,
    allDistance: 0
  }

  startMeasure(measureOpt)
}

const startMeasure = (opt: any) => {
  const { viewer } = opt
  
}

export default MeasureSpaceDistance


