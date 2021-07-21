import { cloneDeep } from "lodash-es"
export default class Path {
  constructor(config){
    this.__proto__.points =  config.points
    this.d = this.computedD(this.points)
    this.stroke = config.stroke,
    this['stroke-width'] = config['stroke-width']
    this.cursor = config.cursor
  }
  computedD(points){
    return "M" + points.map(item => {
      return item.join(" ")
    }).join("L")
  }
  getDot(){
    const start = cloneDeep(this.points[0])
    const end = cloneDeep(this.points[1])
    const dot = [start, end]
    return dot.map(item => {
      return {
        x: item[0] - 9,
        y: item[1] - 9,
        width: 18,
        height: 18
      }
    })
  }
}