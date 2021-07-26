import { createStore } from 'vuex'

export default createStore({
  state: {
    currentPath: {}
  },
  getters: {
    currentPath: state => state.currentPath
  },
  mutations: {
    setCurrentPath(state, currentPath){
      state.currentPath = currentPath
    }
  }
})