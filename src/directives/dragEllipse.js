export const dragEllipse = {
  mounted(el, binding){
    const value = binding.value
    el.onmousedown = e => {
      let disX = e.clientX - value.cx
      let disY = e.clientY - value.cy
      function mousemove(e){
        binding.instance.dot = []
        binding.instance.cross = []
        value.cx = e.clientX - disX
        value.cy = e.clientY - disY
      }
      function mouseup(){
        binding.instance.dot = value.getDot()
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    }
  }
}