<template>
  <div
    id="wrapper"
    class="flex p-4 justify-end bg-primary h-screen w-screen bg-cover bg-no-repeat flex-col"
          :style="{ backgroundImage: 'url(' + require('@/assets/lofi2.gif') + ')' }">

  >
    <div
      v-if="showTodo"
      class="transparentNoteWrapper bg-opacity-60 bg-gray-900 rounded-lg flex"
      :class="noteFullScreen ? ' w-full h-full' : 'w-64 h-64'"
    >
      <div
        class="border-white w-full h-full text-white flex flex-col justify-between"
      >
        <div class="flex h-full p-3">
          <textarea
            class="bg-transparent w-full p-2 text-xs outline-none focus:outline-none placeholder-gray-50 overflow-hidden text-justify h-full"
            placeholder="Write something"
            spellcheck="false"
            ref="noteArea"
            v-model="note"
            :style="`font-family:${selectedFont}`"
            autofocus
          ></textarea>
          <span v-show="!noteHistory && noteFullScreen" class="cursor-pointer">
            <img
              width="20px"
              src="../assets/history.png"
              alt=""
              class="ml-auto"
              @click="noteHistory = !noteHistory"
            />
          </span>
        </div>
        <div class="flex justify-between items-center p-2">
          <div class="flex items-center px-2">
            <SelectFont @setFont="setFont" class="mr-4" v-if="noteFullScreen" />
            <!-- <Emoji @setEmoji="setEmoji" class="mr-4" v-if="noteFullScreen" /> -->
            <span
              @click="copyToClipboard()"
              class="cursor-pointer bg-gray-900 p-2 bg-opacity-50 rounded-lg mr-4"
              :class="noteFullScreen ? 'text-xs' : 'text-x'"
            >
              copy
            </span>
            <span
              @click="saveToNotes()"
              class="cursor-pointer bg-gray-900 p-2 bg-opacity-50 rounded-lg"
            >
              <img src="../assets/save.png" :width="noteFullScreen ? '14' : '8'" alt="" />
            </span>
          </div>

          <span
            @click="makeNoteFullScreen()"
            class="cursor-pointer bg-gray-900 p-2 bg-opacity-30 rounded-lg"
          >
            <img
              src="../assets/fullscreen.png"
              :width="noteFullScreen ? '14' : '8'"
              alt=""
            />
          </span>
        </div>
      </div>
      <div
        v-show="noteFullScreen"
        class="h-100 noteHistory"
        :class="noteHistory ? 'border-l-2 border-gray-500 w-1/4 p-3 ' : 'w-0 '"
      >
        <span class="cursor-pointer">
          <img
            width="20px"
            src="../assets/history.png"
            alt=""
            class="ml-auto"
            @click="noteHistory = !noteHistory"
          />
        </span>
        <div
        @click="setCurrentNote(note)"
          class="text-xs mb-2  hover:text-gray-50 text-gray-400 cursor-pointer"
          v-for="(note, index) in notes"
          :key="index"
          v-show="noteHistory"
        >
        <div class="flex ">
          <span>

            <img
              width="15px"
              src="file.png"
              alt=""
              class="mr-1"
            />
          </span>
            <span>
          {{ note.title }}
            </span>
        </div>
        </div>
        <div v-if="!notes.length" class="text-gray-400 text-xs text-center mt-10">
          Your saved notes will be shown here

        </div>
      </div>
    </div>
    <ToolBar
      @toggleFullScreen="toggleFullScreen"
      @showTodo="showTodo = !showTodo"
      v-show="!noteFullScreen"
    />
  </div>
</template>
<script>
import Emoji from "../components/EmojiPicker";
import SelectFont from "../components/SelectFont";
import ToolBar from "../components/ToolBar";
export default {
  name: "IndexPage",
  components: {
    Emoji,
    SelectFont,
    ToolBar
  },
  data() {
    return {
      showTodo: false,
      noteFullScreen: false,
      notes: [],
      noteHistory: false,
      isFullScreen: false,
      selectedFont: null,
      note: "",
    };
  },
  methods: {
    setCurrentNote(note){
      debugger
      this.note =note.content 

    },
    saveToNotes() {
      this.notes.push({
        title: this.note.slice(0,20),
        content: this.note,
      });
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
    copyToClipboard() {
      this.$refs.noteArea.focus();
      this.$refs.noteArea.setSelectionRange(0, this.note.length);
      document.execCommand("copy");
      this.$refs.noteArea.setSelectionRange(this.note.length, this.note.length);
    },
    makeNoteFullScreen() {
      this.noteFullScreen = !this.noteFullScreen;
      this.$refs.noteArea.focus();
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
