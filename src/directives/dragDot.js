export const dragDot = {
  mounted(el, binding){
    const value = binding.value
    el.onmousedown = e => {
      const disX = e.clientX - value.x
      const disY = e.clientY - value.y
      function mousemove(e){
        const x = e.clientX - disX
        const y = e.clientY - disY
        // value.x = x
        // value.y = y
        const instance = value.instance
        instance.points[value.index][0] = x + 9
        instance.points[value.index][1] = y + 9
        instance.d = instance.computedD(instance.points)
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