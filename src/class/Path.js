export default class Path {
  constructor(config){
    this.__proto__.points =  config.points
    this.d = this.computedD(this.points)
    this.stroke = config.stroke,
    this['stroke-width'] = config['stroke-width']
    this.cursor = config.cursor
  }
  getDot(){
    
  }
  computedD(points){
    return "M" + points.map(item => {
      return item.join(" ")
    }).join("L")
  }
}