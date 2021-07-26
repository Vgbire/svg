export default class Ellipse {
  constructor(config){
    this.type = 'ellipse'
    this.cx = config.cx
    this.cy = config.cy
    this.rx = config.rx
    this.ry = config.ry
    this.fill = config.fill
    this.stroke = config.stroke
    this['stroke-width'] = config['stroke-width']
    this.cursor = config.cursor
    this.dot = config.dot
    this.cross = config.cross
  }
  getCross(){
    const { cx, cy, rx, ry } = this
    const top = [cx, cy - ry]
    const left = [cx - rx, cy]
    const right = [cx, cy + ry]
    const bottom = [cx + rx, cy]
    const cross = [top,left,right,bottom]
    return cross.map(item => {
      return {
        x: item[0] - 4,
        y: item[1] - 4,
        width: 8,
        height: 8
      }
    })
  }
  getDot(){
    const { cx, cy, rx, ry } = this
    const top = [cx, cy - ry]
    const left = [cx - rx, cy]
    const right = [cx, cy + ry]
    const bottom = [cx + rx, cy]
    const cross = [top,left,right,bottom]
    return cross.map(item => {
      return {
        x: item[0] - 9,
        y: item[1] - 9,
        width: 18,
        height: 18
      }
    })
  }
  click(){
    this.dot.push(...this.getDot())
  }
  mouseover(){
    this.cross.push(...this.getCross())
  }
  mouseleave(){
    const l = this.cross.length
    this.cross.splice(0, l)
  }
}