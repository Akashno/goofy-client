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
    note:new Note(),

    isCommandPallet:false,
    isFullScreen:false,
    isDarkMode:true,

  },
  getters: {
    hasValidNote(state){
     return state.note.text.length
    },
    canToggleWithSpace(state){
      return !state.note.isOpened  && !state.isCommandPallet
    }
  },
  mutations: {
    //core
    toggleIsFullScreen(state){
      state.isFullScreen = !state.isFullScreen
    },
    toggleDarkMode(state){
        state.isDarkMode = !state.isDarkMode
    },
    //command pallet
    showCommandPallet(state){
      state.isCommandPallet =true 
    },
    hideCommandPallet(state){
      state.isCommandPallet =false 
    },
    toggleCommandPallet(state){
      state.isCommandPallet = !state.isCommandPallet 
    },
    //player
    togglePlay(state,player){  
      state[player].playing = !state[player].playing
    },
    toggleMute(state,player){
       state[player].muted = !state[player].muted
    },
    setVolume(state,{player,value}){
      state[player].playing = true
      state[player].muted = false
      state[player].volume = value
    },

    //notepad
    setFocusOnNotePad({note},payload){
      note.isFocused = payload
    },
    toggleIsNotePad({note}){
      note.isOpened = !note.isOpened 
      note.isSavedNotes =  note.isOpened
      note.isFullScreen = false 
    },
    openNotePadInFullScreen({note}){
      note.isOpened =true 
      note.isFullScreen= !note.isFullScreen
    },
    setNote({note},payload){
      note.text= payload

    },
    clearNote({note}){
      note.text = ""
      note.isFocused = true
    },
    saveToNotes({note}){
      note.savedNotes.push({
        title:note.text.slice(0,20),
        content:note.text
      })
      note.text = ""
      note.isFocused = true
    },
    toggleIsSavedNotes({note}){
      if(!note.isSavedNotes){
      note.isFullScreen = true 
      note.isOpened = true
      note.isSavedNotes = true 
      }
      else{
      note.isSavedNotes =false 
      }
    },
  },
})