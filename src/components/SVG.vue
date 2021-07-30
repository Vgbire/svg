<template>
  <button @click="addEllipse">圆</button>
  <button @click="addRect">矩形</button>
  <button @click="addPath">线</button>
  <button @click="addText">文本</button>
  <div id="svg">
    <svg class="svg-container" @mousedown="clearDot">
      <g v-for="(item, index) in ellipse" :key="index">
        <ellipse v-bind="item.attrs" @click="click(item)" @mouseover="mouseover(item)" @mouseleave="mouseleave" v-drag-ellipse="item"/>
      </g>
      <g v-for="(item, index) in rect" :key="index">
        <rect v-bind="item.attrs" @click="click(item)" @mouseover="mouseover(item)" @mouseleave="mouseleave" v-drag-rect="item"/>
      </g>
      <g v-for="(item, index) in path" :key="index">
        <path v-bind="item.attrs" @click="click(item)" v-drag-path="item"/>
      </g>
      <g v-for="(item, index) in text" :key="index">
        <text v-bind="item.attrs" v-drag-text="item">{{item.text}}</text>
      </g>
      <g>
        <g v-for="(item,index) in dot" :key="index">
          <ellipse v-if="item.type === 'ellipse'" v-bind="item.attrs"></ellipse>
          <image v-else v-bind="item.attrs" v-drag-dot="item"></image>
        </g>
      </g>
      <g>
        <g v-for="(item,index) in cross" :key="index">
          <image v-bind="item.attrs" @mouseover="crossMouseover(item)" @mouseleave="crossMouseleave" @mousemove="crossMousemove(item)"></image>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { dragEllipse } from '@/directives/dragEllipse.js'
import { dragRect } from '@/directives/dragRect.js'
import { dragPath } from '@/directives/dragPath.js'
import { dragDot } from '@/directives/dragDot.js'
import { dragText } from '@/directives/dragText.js'
import Ellipse from '@/class/Ellipse.js'
import Rect from '@/class/Rect.js'
import Path from '@/class/Path.js'
import Text from '@/class/Text.js'
import { activeSVG, hoverSVG, preHoverSVG, hoverCorss, dot, cross } from '@/reactive.js'

export default {
  directives: {
    dragEllipse,
    dragRect,
    dragPath,
    dragDot,
    dragText
  },
  setup(){
    return { activeSVG, hoverSVG, preHoverSVG, hoverCorss, dot, cross }
  },
  data(){
    return {
      ellipse: [],
      rect: [],
      path: [],
      text: [],
      dotmouseleave: true
    }
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
        'stroke-width': 10,
        'stroke-dasharray': '3,3'
      }))
    },
    addText(){
      this.text.push(new Text({
        x: 150,
        y: 150,
        text: 'Text',
        fill: '#000',
        cursor: 'move',
        'font-size': 15
      }))
    },
    clearDot(e){
      if(e.target.className.baseVal === 'svg-container') {
        this.activeSVG = null
        this.dot = []
      }
    },
    click(svg){
      if(svg.type === 'path'){
        this.activeSVG = svg
      }
      this.dot = svg.getDot()
      this.cross = []
    },
    mouseover(svg){
      this.hoverSVG = svg
      this.cross = svg.getCross()
      if(this.activeSVG) this.activeSVG.attrs['pointer-events'] = 'none'
    },
    mouseleave(){
      if(this.activeSVG) delete this.activeSVG.attrs['pointer-events']
      // 先让cross事件触发
      setTimeout(()=>{
        if(this.dotmouseleave) {
          this.cross = []
          this.preHoverSVG = this.hoverSVG
          this.hoverSVG = null
        }
      })
    }, 
    crossMouseover(svg){
      this.dotmouseleave = false
      this.hoverCorss = svg
      let attrs = svg.attrs
      this.dot.push(new Ellipse({
        cx: attrs.x + 4,
        cy: attrs.y + 4,
        rx: 8,
        ry: 8,
        fill: '#00ff00',
        stroke: '#00ff00',
        'fill-opacity': '0.3',
        'stroke-opacity': '0.3'
      }))
    },
    crossMouseleave(){
      this.dotmouseleave = true
      this.dot.pop()
      this.hoverCorss = null
    },
    crossMousemove(svg){
      // const attrs = svg.attrs
      // this.activeSVG.points[1][0] = attrs.x + 9
      // this.activeSVG.points[1][1] = attrs.y + 9
      // this.activeSVG.attrs.d = this.activeSVG.computedD(this.activeSVG.points)
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