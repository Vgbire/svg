import { activeSVG, hoverSVG, hoverCorss, dot, cross } from '@/reactive.js'

export const dragDot = {
  mounted(el, binding){
    el.onmousedown = e => {
      const value = binding.value
      const attrs = value.attrs
      const disX = e.clientX - attrs.x
      const disY = e.clientY - attrs.y
      function mousemove(e){
        const x = e.clientX - disX
        const y = e.clientY - disY
        activeSVG.value.points[value.position][0] = x + 9
        activeSVG.value.points[value.position][1] = y + 9
        activeSVG.value.attrs.d = activeSVG.value.computedD(activeSVG.value.points)
      }
      function mouseup(){
        dot.value = activeSVG.value.getDot()
        // if(activeSVG) delete activeSVG.attrs['pointer-events']
        // if(hoverSVG){
        //   const id = activeSVG.id
        //   if(!hoverSVG.line[id]) hoverSVG.line[id] = {}
        //   const currentLine = hoverSVG.line[id]
        //   currentLine.id = id
        //   currentLine.position = hoverCorss.position
        //   if(value.position === 0){
        //     currentLine.start = activeSVG
        //   }else{
        //     currentLine.end = activeSVG
        //   }
        // }
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    }
  }
}