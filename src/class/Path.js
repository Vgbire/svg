import { cloneDeep } from "lodash-es"
export default class Path {
  constructor(config){
    this.type = 'path'
    this.points =  config.points

    this.attrs.d = this.computedD(this.points)
    this.attrs.stroke = config.stroke,
    this.attrs.cursor = config.cursor
    this.attrs['stroke-width'] = config['stroke-width']
    this.attrs['stroke-dasharray'] = config['stroke-dasharray']
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
    return dot.map((item,index) => {
      return {
        x: item[0] - 9,
        y: item[1] - 9,
        width: 18,
        height: 18,
        index: index,
        type: 'path',
        instance: this
      }
    })
  }
}