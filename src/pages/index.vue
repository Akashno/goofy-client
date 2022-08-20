<template>
  <div
    id="wrapper"
    class="flex p-4 justify-end bg-primary h-screen w-screen bg-cover bg-no-repeat flex-col"
    :style="{ backgroundImage: 'url(' + require('@/assets/lofi2.gif') + ')' }"
  >
    <CommandPallet
      v-if="showCommandPallet"
      @closeCommandPallet="showCommandPallet = false"
      @keydown.esc="showCommandPallet = false"
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
            class="bg-transparent w-full p-2 text-xs outline-none focus:outline-none placeholder-gray-50 overflow-hidden text-justify h-full"
            placeholder="Write something"
            spellcheck="false"
            ref="noteArea"
            v-model="note"
            :style="`font-family:${selectedFont}`"
            autofocus
          ></textarea>
          <span v-show="!noteHistory && isNotePadInFullScreen" class="cursor-pointer">
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
            <SelectFont @setFont="setFont" class="mr-4" v-if="isNotePadInFullScreen" />
            <!-- <Emoji @setEmoji="setEmoji" class="mr-4" v-if="isNotePadInFullScreen" /> -->
            <span
              @click="copyToClipboard()"
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
          class="text-xs mb-2 hover:text-gray-50 text-gray-400 cursor-pointer"
          v-for="(note, index) in notes"
          :key="index"
          v-show="noteHistory"
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
        this.showCommandPallet = !this.showCommandPallet;
        e.preventDefault();
      }
      if (e.key === "Escape") {
        this.showCommandPallet = false;
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
    }
  },
  computed: {
    ...mapState(["isNotePad", "isNotePadInFullScreen"]),
  },
  data() {
    return {
      showCommandPallet: true,
      notes: [],
      noteHistory: false,
      isFullScreen: false,
      selectedFont: null,
      note: "",
      showBrightness: true,
      brightness: `bg-opacity-30`,
    };
  },
  methods: {
    toggleIsNotePad(){
    this.$store.commit('toggleIsNotePad')
    },
    clearNote() {
      this.note = "";
    },
    setCurrentNote(note) {
      this.note = note.content;
    },
    setNoteBrightness(event) {
      let index = event.target.value;
      let data = [
        "0",
        "5",
        "10",
        "20",
        "25",
        "30",
        "40",
        "50",
        "60",
        "70",
        "75",
        "80",
        "90",
        "95",
        "100",
      ];
      this.brightness = `bg-opacity-${data.at(index)}`;
      console.log(this.brightness, index);
    },
    saveToNotes() {
      if (!this.note) return;
      this.notes.push({
        title: this.note.slice(0, 20),
        content: this.note,
      });
      this.noteHistory = true;
      this.note = "";
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
      this.$store.commit('openNotePadInFullScreen')
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
