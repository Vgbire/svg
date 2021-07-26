<template>
  <button @click="addEllipse">圆</button>
  <button @click="addRect">矩形</button>
  <button @click="addPath">线</button>
  <div id="svg">
    <svg class="svg-container" @click="clearDot">
      <g v-for="(item, index) in ellipse" :key="index">
        <ellipse v-bind="item" @click.stop="click(item)" @mouseover="mouseover(item)" @mouseleave="mouseleave" v-drag-ellipse="item"/>
      </g>
      <g v-for="(item, index) in rect" :key="index">
        <rect v-bind="item" @click.stop="click(item)" @mouseenter="mouseover(item)" @mouseleave="mouseleave" v-drag-rect="item"/>
      </g>
      <g v-for="(item, index) in path" :key="index">
        <path v-bind="item" @click.stop="click(item)" v-drag-path="item"/>
      </g>
      <g>
        <g v-for="(item,index) in dot" :key="index+key">
          <ellipse v-if="item.type === 'ellipse'"  v-bind="item" fill-opacity="0.3" stroke-opacity="0.3"></ellipse>
          <image v-else v-bind="item" @click.stop :xlink:href="dotUrl" v-drag-dot="item"></image>
        </g>
      </g>
      <g>
        <g v-for="(item,index) in cross" :key="index">
          <image v-bind="item" :xlink:href="xUrl" @mouseover="crossMouseover(item)" @mouseleave="crossMouseleave"></image>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { xUrl, dotUrl } from './base64.js'
import { dragEllipse } from '@/directives/dragEllipse.js'
import { dragRect } from '@/directives/dragRect.js'
import { dragPath } from '@/directives/dragPath.js'
import { dragDot } from '@/directives/dragDot.js'
import Ellipse from '@/class/Ellipse.js'
import Rect from '@/class/Rect.js'
import Path from '@/class/Path.js'

export default {
  directives: {
    dragEllipse,
    dragRect,
    dragPath,
    dragDot
  },
  data(){
    return {
      ellipse: [],
      rect: [],
      path: [],
      offsetX: 0,
      offsetY: 0,
      dot: [],
      cross: [],
      xUrl,
      dotUrl,
      key: 0,
      dotmouseleave: true
    }
  },
  mounted(){
    const svg = document.querySelector('#svg')
    this.offsetX = svg.offsetLeft
    this.offsetY = svg.offsetTop
  },
  watch: {},
  methods: {
    addEllipse(){
      this.ellipse.push(new Ellipse({
        cx: 300,
        cy: 300,
        rx: 50,
        ry: 50,
        fill: 'white',
        stroke: '#555',
        'stroke-width': 1,
        cursor: 'move',
      }))
    },
    addRect(){
      this.rect.push(new Rect({
        x: 300,
        y: 300,
        width: 120,
        height: 60,
        rx: 9,
        ry: 9,
        fill: 'white',
        stroke: '#555',
        'stroke-width': 1,
        cursor: 'move',
      }))
    },
    addPath(){
      this.path.push(new Path({
        points: [[100,100],[200,200]],
        stroke: '#000',
        cursor: 'move',
        'stroke-width': 2,
        'stroke-dasharray': '3,3'
      }))
    },
    clearDot(){
      this.dot = []
    },
    click(svg){
      this.dot = svg.getDot()
      this.key += 100
      this.cross = []
    },
    mouseover(svg){
      this.cross = svg.getCross()
    },
    mouseleave(){
      setTimeout(()=>{
        if(this.dotmouseleave) this.cross = []
      })
    }, 
    crossMouseover(svg){
      this.dotmouseleave = false
      this.dot.push(new Ellipse({
        cx: svg.x + 4,
        cy: svg.y + 4,
        rx: 8,
        ry: 8,
        fill: '#00ff00',
        stroke: '#00ff00',
      }))
    },
    crossMouseleave(){
      this.dotmouseleave = true
      this.dot.pop()
      this.cross = []
    }
  }
}
</script>

<style lang='scss' scoped>
.svg-container {
 width: 80%;
 height: 800px;
 border: 1px solid #dcdcdc;
 margin: 50px;
}
</style>