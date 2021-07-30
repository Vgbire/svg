function update (el, binding) {
  const value = binding.value
  const attrs = value.attrs
  el.onmousedown = e => {
    let disX = e.clientX - attrs.x
    let disY = e.clientY - attrs.y
    function mousemove(e){
      attrs.x = e.clientX - disX
      attrs.y = e.clientY - disY
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

export const dragText = {
  mounted: update
}