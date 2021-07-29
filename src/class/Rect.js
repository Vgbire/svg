import Image from './Image.js'
import { activeSVG, hoverSVG, hoverCorss, dot, cross } from '@/reactive.js'

export default class Rect {
  constructor(config){
    this.type = 'rect'
    this.attrs = config
    // this.on = {
    //   click: this.click,
    //   mouseover: this.mouseover,
    //   mouseleave: this.mouseleave
    // }
    this.lines = {}
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
  // click(){
  //   dot = this.getDot()
  //   cross = []
  // }
  // mouseover(){
  //   hoverSVG = this
  //   cross = this.getCross()
  //   if(activeSVG) activeSVG.attrs['pointer-events'] = 'none'
  // }
  // mouseleave(){
  //   if(activeSVG) delete activeSVG.attrs['pointer-events']
  //   setTimeout(()=>{
  //     if(dotmouseleave) {
  //       cross = []
  //       hoverSVG = null
  //     }
  //   })
  // }
}