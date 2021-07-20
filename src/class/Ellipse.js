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
  getCross(){
    const { cx, cy, rx, ry } = this
    const top = [cx, cy - ry]
      const left = [cx - rx, cy]
      const right = [cx, cy + ry]
      const bottom = [cx + rx, cy]
      const cross = [top,left,right,bottom]
      return cross.map(item => {
        const result = {}
        result.x = item[0] - 4
        result.y = item[1] - 4
        result.width = 8
        result.height = 8
        return result
      })
  }
  mouseover(cross){
    cross.push(...this.getCross())
  }
  mouseleave(cross){
    const l = cross.length
    cross.splice(0, l)
  }
}