function update (el, binding) {
  const value = binding.value
  const attrs = value.attrs
  el.onmousedown = e => {
    let disX = e.clientX - attrs.cx
    let disY = e.clientY - attrs.cy
    function mousemove(e){
      binding.instance.dot = []
      binding.instance.cross = []
      attrs.cx = e.clientX - disX
      attrs.cy = e.clientY - disY
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

export const dragEllipse = {
  mounted: update,
  updated: update
}