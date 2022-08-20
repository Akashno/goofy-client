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
      v-if="isNotePad"
      class="transparentNoteWrapper bg-gray-900 rounded-lg flex bg-opacity-50"
      :class="isNotePadInFullScreen ? ` w-full h-full` : `w-64 h-64`"
    >
      <div
        class="border-white w-full h-full text-white flex flex-col justify-between"
      >
        <div class="flex h-full p-3">
          <textarea
            class="bg-transparent text-xs w-full p-2 outline-none focus:outline-none placeholder-gray-50 overflow-hidden text-justify h-full"
            placeholder="Write something"
            :value="this.$store.getters.note"
            spellcheck="false"
            ref="noteArea"
            @input="setNote"
            :style="`font-family:${selectedFont}`"
            autofocus
          ></textarea>
          <span v-show="!isMyNotes && isNotePadInFullScreen" class="cursor-pointer">
            <img
              width="20px"
              src="../assets/history.png"
              alt=""
              class="ml-auto"
              @click="toggleIsMyNotes"
            />
          </span>
        </div>
        <div class="flex justify-between items-center p-2">
          <div class="flex items-center px-2">
            <SelectFont @setFont="setFont" class="mr-4" v-if="isNotePadInFullScreen" />
            <!-- <Emoji @setEmoji="setEmoji" class="mr-4" v-if="isNotePadInFullScreen" /> -->
            <span
              @click="copyToClipBoard()"
              class="cursor-pointer bg-gray-900 p-2 bg-opacity-50 rounded-lg mr-4"
              :class="isNotePadInFullScreen ? 'text-xs' : 'text-x'"
            >
              copy
            </span>
            <span
              @click="clearNote()"
              class="cursor-pointer bg-gray-900 p-2 bg-opacity-50 rounded-lg mr-4"
              :class="isNotePadInFullScreen ? 'text-xs' : 'text-x'"
            >
              clear
            </span>
            <span
              @click="saveToNotes()"
              class="cursor-pointer bg-gray-900 p-2 bg-opacity-50 rounded-lg"
            >
              <img
                src="../assets/save.png"
                :width="isNotePadInFullScreen ? '14' : '8'"
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
                :width="isNotePadInFullScreen ? '14' : '8'"
              />
            </span>
          </div>
        </div>
      </div>
      <div
        v-show="isNotePadInFullScreen"
        class="h-100 noteHistory"
        :class="isMyNotes ? 'border-l-2 border-gray-500 w-1/4 p-3 ' : 'w-0 '"
      >
        <span class="cursor-pointer">
          <img
            width="20px"
            src="../assets/history.png"
            alt=""
            class="ml-auto"
            @click="toggleIsMyNotes"
          />
        </span>
        <div
          @click="setCurrentNote(note)"
          class="text-xs mb-2 hover:text-gray-50 text-gray-400 cursor-pointer"
          v-for="(note, index) in notes"
          :key="index"
          v-show="isMyNotes"
        >
          <div class="flex">
            <span>
              <img width="15px" src="../assets/file.png" alt="" class="mr-1" />
            </span>
            <span>
              {{ note.title }}
            </span>
          </div>
        </div>
        <div
          v-if="!notes.length"
          class="text-gray-400 text-xs text-center mt-10"
        >
          Your saved notes will be shown here
        </div>
      </div>
    </div>
    <ToolBar
      @toggleFullScreen="toggleFullScreen"
      @showTodo="toggleIsNotePad"
      v-show="!isNotePadInFullScreen"
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
        e.preventDefault()
        this.$store.commit('hideCommandPallet')

      }
    });
  },
  watch:{
    isNotePad:{
      handler(){
        if(this.isNotePad){
          setTimeout(()=>{
        this.$refs.noteArea.focus()
          },500)
        }
      }
    },
    note:{
      handler(){
        this.focusOnNotePad()
      }
    },
  },
  computed: {
    ...mapState(["isNotePad", "isNotePadInFullScreen","note","isMyNotes","isCommandPallet","fontize"]),
  },
  data() {
    return {
      notes: [],
     input:"",
     showAlert:false,
      isFullScreen: false,
      selectedFont: null,
    };
  },
  methods: {
    focusOnNotePad(){
      setTimeout(()=>{
     this.$refs.noteArea.focus()
      },10)
    },
    toggleIsMyNotes(){
       this.$store.commit('toggleIsMyNotes')
    },
    toggleIsNotePad(){
    this.$store.commit('toggleIsNotePad')
    },
    clearNote() {
      this.$store.commit('clearNote')
    },
    setCurrentNote(note) {
      this.$store.commit('setNote',note)
    },
    setNote(e){
      this.$store.commit('setNote',e.target.value)
    },
    saveToNotes() {
      if (!this.note) return;
      this.notes.push({
        title: this.note.slice(0, 20),
        content: this.note,
      });
      this.$store.commit('setNote',"")
      this.focusOnNotePad()
    },
    toggleFullScreen() {
      var element = document.querySelector("#wrapper");
      this.isFullScreen
        ? document.exitFullscreen()
        : element.requestFullscreen();
      this.isFullScreen = !this.isFullScreen;
    },
    setFont(selectedFont) {
      this.selectedFont = selectedFont;
    },
    setEmoji(emoji) {
      this.note += emoji;
    },
    copyToClipBoard() {
      debugger
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
