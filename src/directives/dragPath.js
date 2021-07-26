import { cloneDeep } from "lodash-es"

export const dragPath = {
  mounted(el, binding){
    const value = binding.value
    el.onmousedown = e => {
      let disX = e.clientX
      let disY = e.clientY
      let points
      function mousemove(e){
        points = cloneDeep(value.points)
        binding.instance.dot = []
        let x = e.clientX - disX
        let y = e.clientY - disY
        points = points.map(item => {
          item[0] += x
          item[1] += y
          return item
        })
        value.d = value.computedD(points)
      }
      function mouseup(){
        binding.instance.dot = value.getDot()
        points && (value.points = points)
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    }
  }
}