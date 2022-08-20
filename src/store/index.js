import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSongPlaying :false,
    isKeyboardPlaying :false,
    isRainPlaying :false,
    isFullScreen:false
  },
  getters: {
    isSongPlaying(state){
      return state.isSongPlaying
    },
    isKeyboardPlaying(state){
      return state.isKeyboardPlaying
    },
    isRainPlaying(state){
      return state.isRainPlaying
    },
    isFullScreen(state){
      return state.isRainPlaying
    },
  },
  mutations: {
    toggleIsSongPlaying(state){
      state.isSongPlaying = !state.isSongPlaying
    },
    toggleIsKeyboardPlaying(state){
      state.isKeyboardPlaying = !state.isKeyboardPlaying
    },
    toggleIsRainPlaying(state){
      state.isRainPlaying = !state.isRainPlaying
    },
    toggleIsFullScreen(state){
      state.isFullScreen = !state.isFullScreen
    }
  },
})
