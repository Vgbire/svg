export default class Text {
  constructor(config){
    this.type = 'text'
    this.text = config.text

    delete config.text
    this.attrs = config
  }
}