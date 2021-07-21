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
        <rect v-bind="item" @click.stop="click(item)" @mouseover="mouseover(item)" @mouseleave="mouseleave" v-drag-rect="item"/>
      </g>
      <g v-for="(item, index) in path" :key="index">
        <path v-bind="item" @click.stop="click(item)" v-drag-path="item"/>
      </g>
      <g>
        <g v-for="(item,index) in dot" :key="index">
          <image :x="item.x" :y="item.y" :width="item.width" :height="item.height" :xlink:href="dotUrl" preserveAspectRatio="none"></image>
        </g>
      </g>
      <g>
        <g v-for="(item,index) in cross" :key="index">
          <image :x="item.x" :y="item.y" :width="item.width" :height="item.height" :xlink:href="xUrl" preserveAspectRatio="none"></image>
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
import Ellipse from '@/class/Ellipse.js'
import Rect from '@/class/Rect.js'
import Path from '@/class/Path.js'

export default {
  directives: {
    dragEllipse,
    dragRect,
    dragPath
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
      dotUrl
    }
  },
  mounted(){
    const svg = document.querySelector('#svg')
    this.offsetX = svg.offsetLeft
    this.offsetY = svg.offsetTop
  },
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
        dot: this.dot,
        cross: this.cross
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
        dot: this.dot,
        cross: this.cross
      }))
    },
    addPath(){
      this.path.push(new Path({
        points: [[100,100],[200,200]],
        stroke: '#000',
        'stroke-width': 2,
        cursor: 'move',
        dot: this.dot,
        cross: this.cross
      }))
    },
    clearDot(){
      this.dot = []
    },
    click(svg){
      this.dot = svg.getDot()
      this.cross = []
    },
    mouseover(svg){
      if(!this.dot.length) this.cross = svg.getCross()
    },
    mouseleave(){
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