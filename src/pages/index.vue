<template>
  <div
    id="wrapper"
    class="flex p-4 justify-end bg-primary h-screen w-screen bg-cover bg-no-repeat flex-col"
    :style="{ backgroundImage: 'url(' + require('@/assets/lofi2.gif') + ')' }"
  >
    <CommandPallet
      v-if="isCommandPallet"
      @focusOnNotePad="focusOnNotePad"
      @saveToNotes="saveToNotes"
      @copyToClipBoard="copyToClipBoard"
    />
    <div
      v-if="note.isOpened"
      class="transparentNoteWrapper bg-gray-900 rounded-lg flex bg-opacity-50"
      :class="note.isFullScreen ? ` w-full h-full` : `w-64 h-64`"
    >
      <div
        class="border-white w-full h-full text-white flex flex-col justify-between"
      >
        <div class="flex h-full p-3">
          <textarea
          @blur="$store.commit('setFocusOnNotePad',false)"
            class="bg-transparent text-xs w-full p-2 outline-none focus:outline-none placeholder-gray-50 overflow-hidden text-justify h-full"
            placeholder="Write something"
            :value="this.$store.state.note.text"
            spellcheck="false"
            ref="noteArea"
            @input="setNote"
            :style="`font-family:${selectedFont}`"
            autofocus
          ></textarea>
          <span v-show="!note.isSavedNotes && note.isFullScreen" class="cursor-pointer">
            <img
              width="20px"
              src="../assets/history.png"
              alt=""
              class="ml-auto"
              @click="toggleIsSavedNotes"
            />
          </span>
        </div>
        <div class="flex justify-between items-center p-2">
          <div class="flex items-center px-2">
            <SelectFont @setFont="setFont" class="mr-4" v-if="note.isFullScreen" />
            <span
              @click="copyToClipBoard()"
              class="cursor-pointer bg-gray-900 p-2 bg-opacity-50 rounded-lg mr-4"
              :class="note.isFullScreen ? 'text-xs' : 'text-x'"
            >
              copy
            </span>
            <span
              @click="clearNote()"
              class="cursor-pointer bg-gray-900 p-2 bg-opacity-50 rounded-lg mr-4"
              :class="note.isFullScreen ? 'text-xs' : 'text-x'"
            >
              clear
            </span>
            <span
              @click="saveToNotes()"
              class="cursor-pointer bg-gray-900 p-2 bg-opacity-50 rounded-lg"
            >
              <img
                src="../assets/save.png"
                :width="note.isFullScreen ? '14' : '8'"
                alt=""
              />
            </span>
          </div>

          <div class="p-2">
            <span
              @click="makeNoteFullScreen()"
              class="cursor-pointer bg-gray-900 bg-opacity-30 rounded-lg"
            >
              <img
                src="../assets/fullscreen.png"
                :width="note.isFullScreen ? '14' : '8'"
              />
            </span>
          </div>
        </div>
      </div>
      <div
        v-show="note.isFullScreen"
        class="h-100 noteHistory "
        :class="note.isSavedNotes ? 'border-l-2 border-gray-500 w-1/4 py-3 ' : 'w-0 '"
      >
        <div class="cursor-pointer mb-2">
          <img
            width="20px"
            src="../assets/history.png"
            alt=""
            class="ml-auto mr-3"
            @click="toggleIsSavedNotes"
          />
        </div>
        <div
        :tabindex="index"
          @click="setCurrentNote(item)"
          class="text-xs  hover:bg-gray-400 hover:bg-opacity-30  hover:text-gray-50 text-gray-400 cursor-pointer"
          v-for="(item, index) in note.savedNotes"
          :key="index"
          v-show="note.isSavedNotes"
        >
          <div class="flex   p-2 ">
            <span>
              <img width="15px" src="../assets/file.png" alt="" class="mr-1" />
            </span>
            <span>
              {{ item.title }}
            </span>
          </div>
        </div>
        <div
          v-if="!note.savedNotes.length"
          class="text-gray-400 text-xs text-center mt-10"
        >
          Your saved notes will be shown here
        </div>
      </div>
    </div>
    <ToolBar
      @showTodo="toggleIsNotePad"
      v-show="!note.isFullScreen"
    />
  </div>
</template>
<script>
import Emoji from "../components/EmojiPicker";
import CommandPallet from "../components/CommandPallet";
import SelectFont from "../components/SelectFont";
import ToolBar from "../components/ToolBar";
import { mapState } from "vuex";
export default {
  name: "IndexPage",
  components: {
    Emoji,
    SelectFont,
    ToolBar,
    CommandPallet,
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "p" && e.ctrlKey === true) {
        this.$store.commit('toggleCommandPallet')
        e.preventDefault();
      }
      if (e.key === "Escape") {
        this.$store.commit('hideCommandPallet')

      }
    });
  },
  watch:{
    "note.isFocused":function(){
      if(this.note.isFocused){
      this.focusOnNotePad()
      }
    },
    "note.isOpened":function(){
        if(this.note.isOpened){
          this.focusOnNotePad()
        }
    },
    "isFullScreen":function(){
      this.toggleIsFullScreen()
    },
  },
  computed: {
    ...mapState([ "isCommandPallet","fontize","note","isFullScreen"]),
  },
  data() {
    return {
      input:"",
      showAlert:false,
      selectedFont: null,
    };
  },
  methods: {
    focusOnNotePad(){
      setTimeout(()=>{
        this.$refs.noteArea.focus()
      },5)
    },
    toggleIsSavedNotes(){
       this.$store.commit('toggleIsSavedNotes')
    },
    toggleIsNotePad(){
    this.$store.commit('toggleIsNotePad')
    },
    clearNote() {
      this.$store.commit('clearNote')
    },
    setCurrentNote(note) {
      debugger
      this.$store.commit('setNote',note.content)
    },
    setNote(e){
      this.$store.commit('setNote',e.target.value)
    },
    saveToNotes() {
      if (!this.$store.state.note.text) return;
      this.$store.commit('saveToNotes')
      this.focusOnNotePad()
    },
    toggleIsFullScreen() {
      var element = document.querySelector("#wrapper");
      !this.$store.state.isFullScreen ? document.exitFullscreen() : element.requestFullscreen();
    },
    setFont(selectedFont) {
      this.selectedFont = selectedFont;
    },
    setEmoji(emoji) {
      this.note += emoji;
    },
    copyToClipBoard() {
      this.focusOnNotePad()
      this.$refs.noteArea.setSelectionRange(0,this.note.length);
      document.execCommand("copy");
      this.$refs.noteArea.setSelectionRange(this.note.length, this.note.length);
    },
    makeNoteFullScreen() {
      this.$store.commit('openNotePadInFullScreen')
      this.focusOnNotePad()
    },
  },
};
</script>
<style scoped>
* {
  overflow: hidden;
}
.noteHistory {
  transition: width 0.2s linear !important;
}
.transparentNoteWrapper {
  transition: height 0.5s ease-in-out, width 0.5s ease-in-out;
}
textarea {
  resize: none;
}
</style>
