import { xUrl, dotUrl } from '../base64.js'

export default class Image {
  constructor(config){
    this.type = config.type
    this.position = config.position
    
    delete config.type
    delete config.position
    this.attrs = config
    this.attrs['xlink:href'] = this.type === 'x' ? xUrl : dotUrl
  }
}