<template>
  <button @click="addEllipse">圆</button>
  <div id="svg">
    <svg style="width: 100%;height: 800px;background-color: #dcdcdc;">
      <g v-for="(item, index) in ellipse" :key="index" >
        <ellipse v-bind="item" @mouseover="item.mouseover(item)" @mouseleave="item.mouseleave" v-drag="item"/>
      </g>
      <g>
        <g v-for="(item,index) in around" :key="index">
          <image :x="item.x" :y="item.y" :width="item.width" :height="item.height" :xlink:href="imageUrl" preserveAspectRatio="none"></image>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { imageUrl } from './base64'

export default {
  directives: {
    drag: {
      mounted(el,binding){
        const value = binding.value
        el.onmousedown = () => {
          el.onmousemove = e => {
            binding.instance.around = []
            value.cx = e.clientX - binding.instance.offsetX
            value.cy = e.clientY - binding.instance.offsetY
					};
          el.onmouseup = () => {
						el.onmousemove = null
						el.onmouseup = null
            binding.instance.around = binding.instance.getAroundPostion(value)
					};
          return false
				}
      }
    }
  },
  data(){
    return {
      ellipse: [],
      offsetX: 0,
      offsetY: 0,
      around: [],
      aroundBak: [],
      imageUrl
    }
  },
  mounted(){
    const svg = document.querySelector('#svg')
    this.offsetX = svg.offsetLeft
    this.offsetY = svg.offsetTop
  },
  methods: {
    getAroundPostion(svg){
      const top = [svg.cx, svg.cy - svg.ry]
      const left = [svg.cx - svg.rx, svg.cy]
      const right = [svg.cx, svg.cy + svg.ry]
      const bottom = [svg.cx + svg.rx, svg.cy]
      const around = [top,left,right,bottom]
      return around.map(item => {
        item.x = item[0] - 4
        item.y = item[1] - 4
        item.width = 8
        item.height = 8
        return item
      })
    },
    addEllipse(){
      this.ellipse.push({
        cx: 300,
        cy: 300,
        rx: 50,
        ry: 50,
        style: "fill:white;stroke:#555555;stroke-width:1;cursor: move;",
        mouseover: self => {
          this.around = this.getAroundPostion(self)
        },
        mouseleave: () => {
          this.around = []
        }
      })
    }
  }
}
</script>

<style>

</style>