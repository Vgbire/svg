export default class Ellipse {
  constructor(config){
    this.type = 'ellipse'

    this.attrs.cx = config.cx
    this.attrs.cy = config.cy
    this.attrs.rx = config.rx
    this.attrs.ry = config.ry
    this.attrs.fill = config.fill
    this.attrs.stroke = config.stroke
    this.attrs.cursor = config.cursor
    this.attrs['stroke-width'] = config['stroke-width']
  }
  getCross(){
    const { cx, cy, rx, ry } = this.attrs
    const top = [cx, cy - ry,'top']
    const left = [cx - rx, cy,'left']
    const right = [cx, cy + ry,'right']
    const bottom = [cx + rx, cy,'bottom']
    const cross = [top,left,right,bottom]
    return cross.map(item => {
      return {
        x: item[0] - 4,
        y: item[1] - 4,
        width: 8,
        height: 8,
        position: item[3]
      }
    })
  }
  getDot(){
    const { cx, cy, rx, ry } = this.attrs
    const top = [cx, cy - ry,'top']
    const left = [cx - rx, cy,'left']
    const right = [cx, cy + ry,'right']
    const bottom = [cx + rx, cy,'bottom']
    const cross = [top,left,right,bottom]
    return cross.map(item => {
      return {
        x: item[0] - 9,
        y: item[1] - 9,
        width: 18,
        height: 18,
        position: item[3]
      }
    })
  }
}