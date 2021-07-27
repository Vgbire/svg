import { activeSVG } from '@/reactive.js'

export const dragDot = {
  mounted(el, binding){
    const value = binding.value
    const attrs = value.attrs
    el.onmousedown = e => {
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
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    }
  }
}