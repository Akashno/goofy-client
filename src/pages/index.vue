<template>
  <div
    id="wrapper"
    class="flex p-4 justify-end bg-primary h-screen w-screen bg-cover bg-no-repeat flex-col"
    :style="{
      backgroundImage: $store.state.isDarkMode
        ? 'url(' + require('@/assets/lofi5.gif') + ')'
        : 'url(' + require('@/assets/lofi2.gif') + ')',
    }"
  >
    <CommandPallet v-if="isCommandPallet" />
    <div
      v-if="note.isOpened"
      class="transparentNoteWrapper bg-primary bg-opacity-60 saturate-200 rounded-lg flex"
      :class="note.isFullScreen ? ` w-full h-full` : `w-64 h-64`"
    >
      <div
        class="border-white w-full h-full text-white flex flex-col justify-between"
      >
        <div
        v-if="note.isFullScreen"
          @mouseenter="setFileNameInput()"
          @mouseleave="leaveFileNameInput()"
          class="py-4 text-xs text-left pl-5 pr-4 w-48  flex align-center bg-black bg-opacity-30 transition-all 3s"
        >
          <span class="mr-2">
            <span >
              <input
            :style="`font-family:${selectedFont}`"
                ref="fileNameInput"
                class="bg-transparent text-xs min-w-max outline-none focus:outline-none placeholder-gray-50 overflow-hidden text-justify h-full"
                :aria-selected="true"
                type="text"
                v-model="note.currentNote.title"
              />
            </span>
          </span>
          <Close class="hover:animate-pulse" :size="15" @click="resetCurrentNote()" v-if="note.currentNote.id" />
        </div>

        <div class="flex h-full p-3 pt-0">
          <textarea
            @blur="$store.commit('setFocusOnNotePad', false)"
            class="bg-transparent text-xs w-full p-2 outline-none focus:outline-none placeholder-gray-50 overflow-hidden text-justify h-full pt-3"
            placeholder="Write something"
            :value="note.currentNote.content"
            spellcheck="false"
            ref="noteArea"
            @input="setNote"
            :style="`font-family:${selectedFont}`"
          ></textarea>
        </div>
        <div class="flex justify-between items-center align-center p-2">
          <div class="flex items-center px-2">
            <SelectFont
              @setFont="setFont"
              class="mr-4"
              v-if="note.isFullScreen"
            />

            <span
              @click="clearNote()"
              class="cursor-pointer bg-primary p-2 bg-opacity-50 rounded-lg mr-4"
              :class="note.isFullScreen ? 'text-xs' : 'text-x'"
            >
              clear
            </span>
            <span
              @click="saveToNotes()"
              class="cursor-pointer bg-primary p-2 bg-opacity-50 rounded-lg mr-2"
            >
              <img
                src="../assets/save.png"
                :width="note.isFullScreen ? '14' : '8'"
                alt=""
              />
            </span>
            <span
            @click="resetCurrentNote()"
              class="cursor-pointer bg-primary p-2 bg-opacity-50 rounded-lg mr-2"

            >
            <Plus :size="16"/>
            </span>
          </div>

          <div class="flex align-center items-center">
            <span class="cursor-pointer bg-gray-900 bg-opacity-30 rounded-lg mr-2 p-1">
              <History @click="toggleIsSavedNotes" class="cursor-pointer " />
            </span>
            <span
              @click="makeNoteFullScreen()"
              class="cursor-pointer bg-gray-900 bg-opacity-30 rounded-lg p-1"
            >
              <FullScreen />
            </span>
          </div>
        </div>
      </div>
      <div
        v-show="note.isFullScreen"
        class="h-100 noteHistory"
        :class="
          note.isSavedNotes
            ? 'border-l-2 bg-primary bg-opacity-40 border-gray-400 w-1/4 py-3 '
            : 'w-0 '
        "
      >
        <div
          :tabindex="index"
          :class="note.currentNote.id === item.id ?'bg-gray-400 bg-opacity-30' : ''"
          @click="setCurrentNote(item)"
          class="text-xs hover:bg-gray-400 hover:bg-opacity-30 hover:text-gray-50 text-gray-50 cursor-pointer"
          v-for="(item, index) in note.savedNotes"
          :key="index"
          v-show="note.isSavedNotes"
        >
          <div class="flex p-2">
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
    <ToolBar v-show="!note.isFullScreen" />
  </div>
</template>
<script>
import Emoji from "../components/EmojiPicker";
import CommandPallet from "../components/CommandPallet";
import SelectFont from "../components/SelectFont";
import ToolBar from "../components/ToolBar";
import Close from "vue-material-design-icons/CloseCircle.vue";
import FullScreen from "vue-material-design-icons/Fullscreen.vue";
import History from "vue-material-design-icons/History.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import { mapState } from "vuex";
export default {
  name: "IndexPage",
  components: {
    Emoji,
    SelectFont,
    ToolBar,
    CommandPallet,
    Close,
    FullScreen,
    History,
    Plus
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "p" && e.ctrlKey === true) {
        this.$store.commit("toggleCommandPallet");
        e.preventDefault();
      }
      if (e.key === "Escape") {
        this.$store.commit("hideCommandPallet");
      }
      if (e.code === "Space") {
        if (this.$store.getters.canToggleWithSpace) {
          this.$store.commit("togglePlay", "primary");
        }
      }
    });
  },
  watch: {
    "note.isFocused": function () {
      if (this.note.isFocused) {
        this.focusOnNotePad();
      }
    },
    "note.isOpened": function () {
      if (this.note.isOpened) {
        this.focusOnNotePad();
      }
    },
    isFullScreen: function () {
      this.toggleIsFullScreen();
    },
  },
  computed: {
    ...mapState([
      "isCommandPallet",
      "fontize",
      "note",
      "isFullScreen",
      "currentNote",
    ]),
  },
  data() {
    return {
      input: "",
      showAlert: false,
      selectedFont: null,
    };
  },
  methods: {
    resetCurrentNote(){
     this.$store.commit("resetCurrentNote")
    },
    leaveFileNameInput(){
      setTimeout(() => {
        this.$refs.fileNameInput.blur();
      }, 10);
    },
    setFileNameInput() {
      setTimeout(() => {
        this.$refs.fileNameInput.focus();
      }, 10);
    },
    focusOnNotePad() {
      setTimeout(() => {
        this.$refs.noteArea.focus();
      }, 5);
    },
    toggleIsSavedNotes() {
      this.$store.commit("toggleIsSavedNotes");
    },
    clearNote() {
      this.$store.commit("clearNote");
    },
    setCurrentNote(note) {
      this.$store.commit("setCurrentNote", note);
    },
    setNote(e) {
      this.$store.commit("setNote", e.target.value);
    },
    saveToNotes() {
      this.$store.commit("saveToNotes");
    },
    toggleIsFullScreen() {
      var fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      var element = document.querySelector("#wrapper");
      fullscreenElement
        ? document.exitFullscreen()
        : element.requestFullscreen();
    },
    setFont(selectedFont) {
      this.selectedFont = selectedFont;
    },
    setEmoji(emoji) {
      this.note += emoji;
    },
    makeNoteFullScreen() {
      this.$store.commit("openNotePadInFullScreen");
      this.focusOnNotePad();
    },
  },
};
</script>
<style scoped>
* {
  overflow: hidden;
}
#wrapper {
  transition: background-image 2s;
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
