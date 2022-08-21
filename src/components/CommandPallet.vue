<template>
  <div
    class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
    role="dialog"
    aria-modal="true"
  >
    <div
      class=" mx-auto max-w-xl transform overflow-hidden rounded-xl bg-gray-100 dark:bg-primary shadow-2xl transition-all"
    >
      <div class="relative">
        <svg
          class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          v-model="filter"
          @focus="isInputFocus = true"
          @blur="isInputFocus = false"
          ref="commandInput"
          autofocus
          spellcheck="false"
          type="text"
          class="focus:outline-none h-12 w-full border-0 bg-transparent pl-11 pr-4 dark:placeholder-gray-100 dark:text-gray-100 focus:ring-0 sm:text-sm"
          placeholder="Search..."
          role="combobox"
          aria-expanded="false"
          aria-controls="options"
        />
      </div>

      <ul
        class="max-h-72 text-left scroll-py-2 overflow-y-auto py-2 text-sm dark:text-white"
        id="options"
        role="listbox"
      >
        <li
          v-for="(command, index) in filteredCommands"
          :key="index"
          :tabindex="index"
          :ref="`item${index}`"
          @mouseenter="setActiveOnHover(command)"
          :class="{
            'dark:bg-gray-200 dark:text-primary bg-gray-800  text-white':
              command.isActive,
          }"
          class="focus:outline-none cursor-default select-none px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 dark:hover:text-gray-800 hover:text-white flex items-center justify-between"
          @click="triggerFunc(command)"
          id="option-1"
          role="option"
        >
          <div class="flex items-center">
            <component
              v-if="command.icon"
              :is="command.icon"
              class="mr-2"
              :size="14"
            />
            <span>{{ command.title }}</span>
          </div>
          <div class="text-xs text-gray-800" v-show="command.isActive">
            {{ command.description }}
          </div>
        </li>
      </ul>
      <span class="text-xs dark:text-gray-100" v-if="!filteredCommands.length"
        >No matching results</span
      >
      <div class="text-xs text-right pr-4 py-3 flex justify-between">
        <div
          class="flex items-center space-x-3 font-bold text-xs text-right pl-4 text-gray-400 cursor-help"
          title="use Arrow keys or k / j to navigate through commands"
        >
          <span class="font-normal">Use </span>
          <span class="">↓</span>
          <span class="font-extrabold">↑</span>
          <span class="font-normal">or</span>
          <span class="">k</span>
          <span class="">j</span>
          <span class="font-normal"> to navigate</span>
        </div>
        <div
          class="cursor-help text-xs text-right pl-4 text-gray-400"
          title="Press / when you are not searching "
        >
          Press / to search
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Keyboard from "vue-material-design-icons/Keyboard.vue";
import Cloud from "vue-material-design-icons/Cloud.vue";
import FullScreen from "vue-material-design-icons/Fullscreen.vue";
import Pencil from "vue-material-design-icons/Pencil.vue";
import Save from "vue-material-design-icons/Floppy.vue";
import Clear from "vue-material-design-icons/Eraser.vue";
import File from "vue-material-design-icons/File.vue";
import Clipboard from "vue-material-design-icons/Clipboard.vue";
import Sun from "vue-material-design-icons/WhiteBalanceSunny.vue";
import Moon from "vue-material-design-icons/MoonWaningCrescent.vue";
import CommandPallet from "vue-material-design-icons/AppleKeyboardCommand.vue";

export default {
  components: {
    Play,
    Pause,
    Keyboard,
    Cloud,
    FullScreen,
    Pencil,
    Save,
    Clear,
    File,
    Clipboard,
    Sun,
    Moon,
    CommandPallet,
  },
  data() {
    return {
      filter: "",
      filteredCommands: [],
      isInputFocus: true,
      commands: [
        {
          id: 1,
          title: this.$store.state.primary.playing ? "Pause Song" : "Play Song",
          func: this.toggleSong,
          isActive: true,
          icon: this.$store.state.primary.playing ? "Pause" : "Play",
          description: this.$store.state.primary.playing
            ? "Pause current playing song"
            : "Play current song",
          show: true,
        },
        {
          id: 2,
          title: this.$store.state.type.playing
            ? "Keyboard sound: Turn Off "
            : " Keyboard sound: Turn On ",
          func: this.toggleKeyboard,
          isActive: false,
          icon: "Keyboard",
          description: "Play typing sound ",
          show: true,
        },
        {
          id: 3,

          title: this.$store.state.rain.playing
            ? "Rain sound: Turn Off "
            : " Rain sound: Turn On ",
          func: this.toggleRain,
          isActive: false,
          icon: "Cloud",
          description: "Play rain sound",
          show: true,
        },
        {
          id: 4,
          title: "Toggle: Window Full Screen",
          func: this.toggleIsFullScreen,
          isActive: false,
          icon: "FullScreen",
          show: true,
        },
        {
          id: 5,
          title: this.$store.state.note.isOpened
            ? "Close: Notepad"
            : "Open: Notepad ",
          func: this.toggleIsNotePad,
          isActive: false,
          icon: "Pencil",
          description: this.$store.state.note.isOpened
            ? ""
            : "Open and focus on notepad",
          show: true,
        },
        {
          id: 6,
          title: this.$store.state.note.isFullScreen
            ? "Toggle: Minimise Notepad"
            : "Toggle: Notepad Fullscreen",
          func: this.openNotePadInFullScreen,
          isActive: false,
          icon: "Pencil",
          description: this.$store.state.note.isFullScreen
            ? ""
            : "Open notepad in Full screen mode",
          show: true,
        },
        {
          id: 7,
          title: "Save your note",
          func: this.saveToNotes,
          isActive: false,
          icon: "Save",
          show: this.$store.getters.hasValidNote,
        },
        {
          id: 8,
          title: "Clear Note",
          func: this.clearNote,
          isActive: false,
          icon: "Clear",
          description: "Clear Current focused note",
          show: this.$store.getters.hasValidNote,
        },
        {
          id: 9,
          title: this.$store.state.note.isSavedNotes
            ? "Hide My Notes"
            : "Show My notes",
          func: this.openMyNotes,
          isActive: false,
          icon: "File",
          description: this.$store.state.note.isSavedNotes
            ? "Hide your Note history from display"
            : "Focus on your note history",
          show: true,
        },
        {
          id: 10,
          title: "Focus On Notepad",
          func: this.focusOnNotePad,
          isActive: false,
          icon: "File",
          description: "Focus cursor to notepad",
          show: this.$store.state.note.isOpened,
        },
        {
          id: 11,
          title: "Close: Command pallet",
          func: this.closeCommandPallet,
          isActive: false,
          icon: "CommandPallet",
          description: "Close Command Pallet",
          show: this.$store.state.isCommandPallet,
        },
        {
          id: 12,
          title:
            this.$store.state.type.muted || this.$store.state.type.volume === 0
              ? "Keyboard: Unmute sound"
              : "Keyboard: Mute Sound",
          func: this.muteKeyboard,
          isActive: false,
          icon: "Keyboard",
          description: "Mute the sound of typing",
          show:
            this.$store.state.type.playing && this.$store.state.type.volume > 0,
        },
        {
          id: 13,
          title:
            this.$store.state.rain.muted || this.$store.state.rain.volume === 0
              ? "Rain: Unmute sound"
              : "Rain: Mute Sound",
          func: this.muteRain,
          isActive: false,
          icon: "cloud",
          description: "Mute the sound of raining",
          show:
            this.$store.state.rain.playing && this.$store.state.rain.volume > 0,
        },
        {
          id: 14,
          title: "Song: Volume up",
          func: this.songVolumeUp,
          isActive: false,
          icon: "cloud",
          description: "Increase the sound of music by 0.5",
          show: this.$store.getters.canIncreaseVolumeOfSong,
        },
        {
          id: 15,
          title: "Song: Volume Down",
          func: this.songVolumeDown,
          isActive: false,
          icon: "cloud",
          show: this.$store.getters.canLowerVolumeOfSong,
        },
        {
          id: 16,
          title: this.$store.state.isDarkMode
            ? "Toggle: Light Mode"
            : "Toggle: Dark Mode",
          func: this.toggleDarkMode,
          isActive: false,
          icon: this.$store.state.isDarkMode ? "Sun" : "Moon",
          show: true,
        },
      ],
      //hehe
    };
  },
  watch: {
    filter: {
      handler() {
        this.setFilteredCommand();
      },
    },
  },
  mounted() {
     setTimeout(()=>{
    this.$refs.commandInput.focus();
     },0.1)
    this.setFilteredCommand();
    window.addEventListener("keydown", this.setActiveCommand, {
      passive: true,
    });
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.setActiveCommand, {
      passive: true,
    });
  },

  methods: {
    setFilteredCommand() {
      this.filteredCommands = this.commands
        .filter((command) => {
          command.isActive = false;
          return (
            command.title.toLowerCase().includes(this.filter.toLowerCase()) &&
            command.show
          );
        })
        .sort((a, b) => (a < b ? 1 : -1));
      if (this.filteredCommands.length)
        this.filteredCommands[0].isActive = true;
    },
    setActiveOnHover(com) {
      let foundIndex = this.filteredCommands.findIndex(
        (command) => command.id === com.id
      );
      this.filteredCommands = this.filteredCommands.map((command, index) => {
        return { ...command, isActive: foundIndex === index };
      });
      this.focusOnItem(foundIndex);
    },
    focusOnItem(index) { //focus on item with ref value
      let element = `item${index}`;
      this.$refs[element][0].focus();
    },
    setActiveCommand(e) {
      if (e.key === "ArrowUp" || e.key === "k") {
        // Navigate on arrow up / arrow down / k / j
        let command = this.filteredCommands.find((command) => command.isActive);
        let foundIndex = this.filteredCommands.indexOf(command);
        this.filteredCommands[foundIndex].isActive = false;
        if (foundIndex > 0) {
          this.filteredCommands[foundIndex - 1].isActive = true;
          if (e.key === "ArrowUp" || !this.isInputFocus)
            this.focusOnItem(foundIndex - 1);
        } else {
          this.filteredCommands[
            this.filteredCommands.length - 1
          ].isActive = true;
          if (e.key === "ArrowUp" || !this.isInputFocus)
            this.focusOnItem(this.filteredCommands.length - 1);
        }
        return;
      }
      if (e.key === "ArrowDown" || e.key === "j") {
        let command = this.filteredCommands.find((command) => command.isActive);
        let foundIndex = this.filteredCommands.indexOf(command);
        this.filteredCommands[foundIndex].isActive = false;
        if (foundIndex + 1 < this.filteredCommands.length) {
          if (e.key === "ArrowDown" || !this.isInputFocus)
            this.focusOnItem(foundIndex + 1);
          this.filteredCommands[foundIndex + 1].isActive = true;
        } else {
          this.filteredCommands[0].isActive = true;
          if (e.key === "ArrowDown" || !this.isInputFocus) this.focusOnItem(0);
        }
        return;
      }
      if (e.key === "Enter") { //execute command on enter key
        let command = this.commands.find((command) => command.isActive);
        this.triggerFunc(command);
        return;
      }
      if (e.key === "/") {
        //  Search on slash
        setTimeout(() => {
          this.$refs.commandInput.focus();
        }, 0.1);
        return;
      }
    },
    closeCommandPallet() {
      this.$store.commit("hideCommandPallet");
    },
    triggerFunc(command) {
      command.func();
      this.closeCommandPallet();
    },
    //commands
    toggleIsNotePad() {
      this.$store.commit("toggleIsNotePad");
    },
    openNotePadInFullScreen() {
      this.$store.commit("openNotePadInFullScreen");
    },
    toggleSong() {
      this.$store.commit("togglePlay", "primary");
    },
    toggleKeyboard() {
      this.$store.commit("togglePlay", "type");
    },
    toggleRain() {
      this.$store.commit("togglePlay", "rain");
    },
    toggleIsFullScreen() {
      this.$store.commit("toggleIsFullScreen");
    },
    saveToNotes() {
      this.$store.commit("saveToNotes");
    },
    clearNote() {
      this.$store.commit("clearNote");
    },
    openMyNotes() {
      this.$store.commit("toggleIsSavedNotes");
    },
    focusOnNotePad() {
      this.$store.commit("setFocusOnNotePad", true);
    },
    muteKeyboard() {
      this.$store.commit("toggleMute", "type");
    },
    muteRain() {
      this.$store.commit("toggleMute", "rain");
    },
    songVolumeUp() {
      this.$store.commit("setVolume", {
        player: "primary",
        value: this.$store.state.primary.volume + 0.1,
      });
    },
    songVolumeDown() {
      this.$store.commit("setVolume", {
        player: "primary",
        value: this.$store.state.primary.volume - 0.1,
      });
    },
    toggleDarkMode() {
      this.$store.commit("toggleDarkMode");
    },
  },
};
// copy to clipboard should be removed
</script>
<style>
</style>
