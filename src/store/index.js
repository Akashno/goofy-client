import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSongPlaying :false,
    isKeyboardPlaying :false,
    isRainPlaying :false,
    isFullScreen:false,
    isNotePad:false,
    isNotePadInFullScreen:false
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
    isNotePad(state){
      return state.isNotePad
    },
    isNotePadInFullScreen(state){
      return state.isNotePadInFullScreen
    }
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
    },
    toggleIsNotePad(state){
      state.isNotePad = !state.isNotePad
      state.isNotePadInFullScreen=false 
    },
    openNotePadInFullScreen(state){
      state.isNotePad = !state.isNotePadInFullScreen
      state.isNotePadInFullScreen= !state.isNotePadInFullScreen
    },
  },
})
