function update (el, binding) {
  const value = binding.value
  const attrs = value.attrs
  el.onmousedown = e => {
    let disX = e.clientX - attrs.x
    let disY = e.clientY - attrs.y
    function mousemove(e){
      binding.instance.dot = []
      binding.instance.cross = []
      attrs.x = e.clientX - disX
      attrs.y = e.clientY - disY
      Object.keys(value.lines).forEach(item => {
        const { line, position, pointPosition } = value.lines[item]
        line.points[pointPosition] = value.computedPosition()[position]
        line.attrs.d = line.computedD(line.points)
      })
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

export const dragRect = {
  mounted: update
}