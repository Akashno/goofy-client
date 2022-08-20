import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCommandPallet:false,
    isSongPlaying :false,
    isKeyboardPlaying :false,
    isRainPlaying :false,
    isFullScreen:false,
    isNotePad:false,
    isNotePadInFullScreen:false,
    isMyNotes:false,
    note:"",

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
    },
    note(state){
      return state.note
    },
    isMyNotes(state){
      return state.isMyNotes
    },
    isCommandPallet(state){
      return state.isCommandPallet
    },
    fontSize(state){
      return state.fontSize
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
      state.isMyNotes = !state.isNotePad
      state.isNotePad = !state.isNotePad
      state.isNotePadInFullScreen=false 
    },
    openNotePadInFullScreen(state){
      state.isNotePad =true 
      state.isNotePadInFullScreen= !state.isNotePadInFullScreen
    },
    setNote(state,payload){
      state.note= payload
    },
    clearNote(state){
      state.note = ""
    },
    toggleCommandPallet(state){
      state.isCommandPallet = !state.isCommandPallet 
    },

    showCommandPallet(state){
      state.isCommandPallet =true 
    },
    hideCommandPallet(state){
      state.isCommandPallet =false 
    },
    toggleIsMyNotes(state){
      if(!state.isMyNotes){
      state.isNotePadInFullScreen = true 
      state.isNotePad = true
      state.isMyNotes = true 
      }
      else{
      state.isMyNotes =false 
      }
    }
  },
})