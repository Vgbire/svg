import store from '@/store'

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
        const activeSVG = store.getters.activeSVG
        activeSVG.points[attrs.index][0] = x + 9
        activeSVG.points[attrs.index][1] = y + 9
        activeSVG.d = activeSVG.computedD(activeSVG.points)
        // store.commit('setActiveSVG', activeSVG)
      }
      function mouseup(){
        // store.commit('setActiveSVG', {})
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    }
  }
}