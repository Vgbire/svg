export const dragEllipse = {
  mounted(el, binding){
    const value = binding.value
    el.onmousedown = () => {
      function mousemove(e){
        binding.instance.cross = []
        value.cx = e.clientX - binding.instance.offsetX
        value.cy = e.clientY - binding.instance.offsetY
      }
      function mouseup(){
        binding.instance.cross = value.getCross(value)
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    }
  }
}