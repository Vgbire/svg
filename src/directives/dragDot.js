import { activeSVG, hoverSVG, hoverCorss, dot, cross } from '@/reactive.js'

function update (el, binding) {
  el.onmousedown = e => {
    const value = binding.value
    const attrs = value.attrs
    const active = activeSVG.value
    
    const disX = e.clientX - attrs.x
    const disY = e.clientY - attrs.y
    function mousemove (e) {
      active.points[value.position][0] = e.clientX - disX + 9
      active.points[value.position][1] = e.clientY - disY + 9
      active.attrs.d = active.computedD(active.points)
    }
    function mouseup () {
      dot.value = active.getDot()

      const hover = hoverSVG.value
      // if(activeSVG) delete activeSVG.attrs['pointer-events']
      if(hover){
        const id = active.id
        if(!hover.lines[id]) hover.lines[id] = {}
        const currentLine = hover.lines[id]
        currentLine.id = id
        currentLine.line = active
        currentLine.position = hoverCorss.value.position
        currentLine.pointPosition = value.position
      }
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
    return false
  }
}

export const dragDot = {
  mounted: update,
  updated: update
}