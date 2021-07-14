<template>
  <div id="svg">
    <svg style="width: 100%;height: 1000px">
      <ellipse v-for="(item, index) in ellipse" :key="index" v-bind="item" @mouseover="item.mouseover(item)" @mouseleave="item.mouseleave"/>
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
        el.onmousedown = e => {
          el.onmousemove = e => {
            value.cx = e.clientX - binding.instance.offsetX
            value.cy = e.clientY - binding.instance.offsetY
					};
          el.onmouseup = e => {
						el.onmousemove=null;
						el.onmouseup=null;
					};
          return false
				}
      }
    }
  },
  data(){
    return {
      ellipse: [{
        cx: 300,
        cy: 80,
        rx: 100,
        ry: 50,
        style: "fill:yellow;stroke:purple;stroke-width:2",
        mouseover: self => {
          const top = [self.cx, self.cy - self.ry]
          const left = [self.cx - self.rx, self.cy]
          const right = [self.cx, self.cy + self.ry]
          const bottom = [self.cx + self.rx, self.cy]
          const around = [top,left,right,bottom]
          this.around = around.map(item => {
            item.x = item[0] - 3
            item.y = item[1] - 3
            item.width = 8
            item.height = 8
            return item
          })
        },
        mouseleave: () => {
          this.around = []
        }
      }],
      offsetX: 0,
      offsetY: 0,
      around: [],
      imageUrl
    }
  },
  mounted(){
    const svg = document.querySelector('#svg')
    this.offsetX = svg.offsetLeft
    this.offsetY = svg.offsetTop
  },
  methods: {
    xx(){
    }
  }
}
</script>

<style>

</style>