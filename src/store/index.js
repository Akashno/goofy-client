import Note from '@/methods/Note'
import Player from '@/methods/Player'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    primary:new Player('primary'),
    rain:new Player('rain'),
    type:new Player('type'),
    theNote:new Note(),

    isCommandPallet:false,
    isFullScreen:false,

  },
  getters: {
    primary(state){
      return state.primary
    },
    rain(state){
      return state.rain
    },
    type(state){
      return state.type
    },
    isFullScreen(state){
      return state.isFullScreen
    },
    theNote(state){
      return state.theNote
    },
    isCommandPallet(state){
      return state.isCommandPallet
    },
    fontSize(state){
      return state.fontSize
    },
  },
  mutations: {
    togglePlay(state,player){  
      state[player].playing = !state[player].playing
    },
    setVolume(state,{player,value}){
      state[player].playing = true
      state[player].muted = false
      state[player].volume = value
    },
    toggleMute(state,player){
       state[player].muted = !state[player].muted
    },
    toggleIsNotePad(state){
      state.theNote.isOpened = !state.theNote.isOpened 
      state.theNote.isSavedNotes =  state.theNote.isOpened
      state.theNote.isFullScreen = false 
    },
    openNotePadInFullScreen(state){
      state.theNote.isOpened =true 
      state.theNote.isFullScreen= !state.theNote.isFullScreen
    },
    setNote(state,payload){
      state.theNote.text= payload
    },
    clearNote(state){
      state.theNote.text = ""
    },
    saveToNotes(state){
      state.theNote.savedNotes.push({
        title:state.theNote.text.slice(0,20),
        content:state.theNote.text
      })
      state.theNote.text = ""
    },
    toggleCommandPallet(state){
      state.isCommandPallet = !state.isCommandPallet 
    },

    toggleIsSavedNotes(state){
      if(!state.theNote.isSavedNotes){
      state.theNote.isFullScreen = true 
      state.theNote.isOpened = true
      state.theNote.isSavedNotes = true 
      }
      else{
      state.theNote.isSavedNotes =false 
      }
    },
    toggleIsFullScreen(state){
      state.isFullScreen = !state.isFullScreen
    },
    showCommandPallet(state){
      state.isCommandPallet =true 
    },
    hideCommandPallet(state){
     state.isCommandPallet =false 
    },

  },
})