export default class Rect {
  constructor(config){
    this.attrs.x = config.x
    this.attrs.y = config.y
    this.attrs.rx = config.rx
    this.attrs.ry = config.ry
    this.attrs.width = config.width
    this.attrs.height = config.height
    this.attrs.fill = config.fill
    this.attrs.stroke = config.stroke
    this.attrs.cursor = config.cursor
    this.attrs['stroke-width'] = config['stroke-width']
  }
  getCross(){
    return this.computedPosition().map(item => {
      return {
        x: item[0] - 4,
        y: item[1] - 4,
        width: 8,
        height: 8,
        instance: this
      }
    })
  }
  getDot(){
    return this.computedPosition().map(item => {
      return {
        x: item[0] - 9,
        y: item[1] - 9,
        width: 18,
        height: 18
      }
    })
  }
  computedPosition(){
    const { x, y, width, height } = this.attrs
    const leftTop = [x, y]
    const top = [x + width / 2, y]
    const rightTop = [x + width, y]
    const left = [x, y + height / 2]
    const right = [x + width, y + height / 2]
    const leftBottom = [x, y + height]
    const bottom = [x + width / 2, y + height]
    const rightBottom = [x + width, y + height]
    return [leftTop, top, rightTop, left, right, leftBottom, bottom, rightBottom]
  }
}