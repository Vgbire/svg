<template>
  <button @click="addEllipse">圆</button>
  <button @click="addRect">矩形</button>
  <button @click="addPath">线</button>
  <div id="svg">
    <svg style="width: 100%;height: 800px;background-color: #dcdcdc;">
      <g v-for="(item, index) in ellipse" :key="index">
        <ellipse v-bind="item" @mouseover="item.mouseover(around)" @mouseleave="item.mouseleave(around)" v-drag-ellipse="item"/>
      </g>
      <g v-for="(item, index) in rect" :key="index">
        <rect v-bind="item" @mouseover="item.mouseover(around)" @mouseleave="item.mouseleave(around)" v-drag-rect="item"/>
      </g>
      <g v-for="(item, index) in path" :key="index">
        <path v-bind="item"/>
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
import { imageUrl } from './base64.js'
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
    addEllipse(){
      this.ellipse.push(new Ellipse({
        cx: 300,
        cy: 300,
        rx: 50,
        ry: 50,
        fill: 'white',
        stroke: '#555',
        'stroke-width': 1,
        cursor: 'move'
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
        d: 'M 100 100 L 200 200',
        stroke: '#000'
      }))
    }
  }
}
</script>

<style>

</style>