import { xUrl, dotUrl } from './base64.js'

export default class Image {
  constructor(config){
    this.type = config.type
    this.position = config.position
    
    this.attrs[':xlink:href'] = this.type === 'x' ? xUrl : dotUrl
    this.attrs.x = config.x
    this.attrs.y = config.y
    this.attrs.width = config.width
    this.attrs.height = config.height
  }
}