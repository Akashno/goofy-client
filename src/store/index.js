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
    isDarkMode:false,

  },
  getters: {
    canLowerVolumeOfSong({primary}){
      return primary.playing && primary.volume > 0 
    },
    canIncreaseVolumeOfSong({primary}){
      return primary.playing && primary.volume < 1 
    },
    hasValidNote(state){
     return state.note.currentNote.content.length
    },
    canToggleWithSpace(state){
      return !state.note.isOpened  && !state.isCommandPallet
    },
    hasAnyExistingNoteInCurrentNote(state){
      return state.note.currentNote.id
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
      note.currentNote.content= payload
    },
    setCurrentNote({note},payload){
      if(!payload){
        note.currentNote = null
        return
      }   
      note.currentNote = payload
    },
    resetCurrentNote({note}){
     note.currentNote = {...note.emptyNote}
     note.isFocused = true
    },
    clearNote({note}){
      note.currentNote = {...note.emptyNote}
      note.isFocused = true
    },
    saveToNotes({note}){
      if(!note.currentNote.content) return
      if(note.currentNote.id){
        let existingNote = note.savedNotes.findIndex(existingNote =>existingNote.id === note.currentNote.id)
        if(existingNote.id != -1){
          note.savedNotes[existingNote].title = note.currentNote.title || 'New note' 
          note.savedNotes[existingNote].content = note.currentNote.content
        }
      }else{
        note.savedNotes.push({
         id:note.savedNotes.length + 1,
        title:note.currentNote.title || "New note",
        content:note.currentNote.content
      })
      }
      note.currentNote = {...note.emptyNote}
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