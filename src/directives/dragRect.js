export const dragRect = {
  mounted(el, binding){
    const value = binding.value
    el.onmousedown = e => {
      let disX = e.clientX - value.x
      let disY = e.clientY - value.y
      function mousemove(e){
        binding.instance.around = []
        value.x = e.clientX - disX
        value.y = e.clientY - disY
      }
      function mouseup(){
        binding.instance.around = value.getAround()
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    }
  }
}