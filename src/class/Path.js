import { cloneDeep } from "lodash-es"
import Image from './Image.js'

let id = 0
export default class Path {
  constructor(config){
    this.id = id++
    this.type = 'path'
    this.points =  config.points
    
    delete config.points
    this.attrs = config
    this.attrs.d = this.computedD(this.points)
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
      return new Image({
        type: 'dot',
        x: item[0] - 9,
        y: item[1] - 9,
        width: 18,
        height: 18,
        position: index
      })
    })
  }
}