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
  }
  getAround(){
    const { x, y, width, height } = this
    const leftTop = [x, y]
    const top = [x + width / 2, y]
    const rightTop = [x + width, y]
    const left = [x, y + height / 2]
    const right = [x + width, y + height / 2]
    const leftBottom = [x, y + height]
    const bottom = [x + width / 2, y + height]
    const rightBottom = [x + width, y + height]
    const around = [leftTop, top, rightTop, left, right, leftBottom, bottom, rightBottom]
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