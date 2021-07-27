import Image from './Image.js'
export default class Ellipse {
  constructor(config){
    this.type = 'ellipse'
    this.attrs = config
  }
  getCross(){
    return this.computedPosition().map((item,index) => {
      return new Image({
        type: 'x',
        x: item[0] - 4,
        y: item[1] - 4,
        width: 8,
        height: 8,
        position: index
      })
    })
  }
  getDot(){
    return this.computedPosition().map((item,index) => {
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
  computedPosition(){
    const { cx, cy, rx, ry } = this.attrs
    const top = [cx, cy - ry]
    const left = [cx - rx, cy]
    const right = [cx, cy + ry]
    const bottom = [cx + rx, cy]
    return [top,left,right,bottom]
  }
}