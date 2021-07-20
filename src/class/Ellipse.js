export default class Ellipse {
  constructor(config){
    this.cx = config.cx
    this.cy = config.cy
    this.rx = config.rx
    this.ry = config.ry
    this.fill = config.fill
    this.stroke = config.stroke
    this['stroke-width'] = config['stroke-width']
    this.cursor = config.cursor 
  }
  getAround(){
    const { cx, cy, rx, ry } = this
    const top = [cx, cy - ry]
      const left = [cx - rx, cy]
      const right = [cx, cy + ry]
      const bottom = [cx + rx, cy]
      const around = [top,left,right,bottom]
      return around.map(item => {
        const result = {}
        result.x = item[0] - 4
        result.y = item[1] - 4
        result.width = 8
        result.height = 8
        return result
      })
  }
  mouseover(around){
    around.push(...this.getAround())
  }
  mouseleave(around){
    const l = around.length
    around.splice(0, l)
  }
}