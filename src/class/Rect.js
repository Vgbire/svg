export default class Rect {
  constructor(config){
    this.x = config.x
    this.y = config.y,
    this.width = config.width,
    this.height = config.height,
    this.rx = config.rx,
    this.ry = config.ry,
    this.fill = config.fill,
    this.stroke = config.stroke,
    this['stroke-width'] = config['stroke-width'],
    this.cursor = config.cursor
    this.dot = config.dot
    this.cross = config.cross
  }
  getCross(){
    const { x, y, width, height } = this
    const leftTop = [x, y]
    const top = [x + width / 2, y]
    const rightTop = [x + width, y]
    const left = [x, y + height / 2]
    const right = [x + width, y + height / 2]
    const leftBottom = [x, y + height]
    const bottom = [x + width / 2, y + height]
    const rightBottom = [x + width, y + height]
    const cross = [leftTop, top, rightTop, left, right, leftBottom, bottom, rightBottom]
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
    const { x, y, width, height } = this
    const leftTop = [x, y]
    const top = [x + width / 2, y]
    const rightTop = [x + width, y]
    const left = [x, y + height / 2]
    const right = [x + width, y + height / 2]
    const leftBottom = [x, y + height]
    const bottom = [x + width / 2, y + height]
    const rightBottom = [x + width, y + height]
    const dot = [leftTop, top, rightTop, left, right, leftBottom, bottom, rightBottom]
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