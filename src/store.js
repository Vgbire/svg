import { createStore } from 'vuex'

export default createStore({
  state: {
    activeSVG: {},
    hoverSVG: {},
    // dot: [],
    // cross: []
  },
  getters: {
    activeSVG: state => state.activeSVG,
    hoverSVG: state => state.hoverSVG,
    // dot: state => state.dot,
    // cross: state => state.cross
  },
  mutations: {
    setActiveSVG(state, activeSVG){
      state.activeSVG = activeSVG
    },
    setHoverSVG(state, hoverSVG){
      state.hoverSVG = hoverSVG
    },
    // setDot(state, dot){
    //   state.dot = dot
    // },
    // dotPush(state, dot){
    //   state.dot.push(dot)
    // },
    // dotPop(state){
    //   state.dot.pop()
    // },
    // setCross(state, cross){
    //   state.cross = cross
    // }
  }
})