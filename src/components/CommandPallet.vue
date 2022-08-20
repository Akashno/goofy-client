<template>
  <div
    class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-30 transition-opacity"
      aria-hidden="true"
    ></div>
    <div
      class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
    >
      <div class="relative">
        <svg
          class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
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
          ref="commandInput"
          autofocus
          spellcheck="false"
          type="text"
          class="focus:outline-none h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Search..."
          role="combobox"
          aria-expanded="false"
          aria-controls="options"
        />
      </div>

      <ul
        class="max-h-72 text-left scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
        id="options"
        role="listbox"
      >
        <li
          tabindex="0"
          @mouseenter="setActive(command)"
          :class="{ 'bg-gray-200': command.isActive }"
          class="cursor-default select-none px-4 py-2 hover:bg-gray-200 flex items-center"
          @click="triggerFunc(command)"
          id="option-1"
          role="option"
          v-for="(command, index) in filteredCommands"
          :key="index"
        >
          <component
            v-if="command.icon"
            :is="command.icon"
            class="mr-2"
            :size="14"
          />
          <span>{{ command.title }}</span>
        </li>
      </ul>
      <span class="text-xs" v-if="!filteredCommands.length"
        >No matching results</span
      >
      <div class="text-xs text-right pr-4 py-3 flex justify-between">
        <div class="text-xs text-right pl-4 text-gray-400">
          Press ctrl + p to close pallet
        </div>
        <div class="flex items-center space-x-3 font-bold">
          <span class="font-normal">Use </span>
          <span class="bg-gray-200 px-2 py-0.5">↓</span>
          <span class="bg-gray-200 px-2 py-0.5">↑</span>
          <span class="font-normal">or</span>
          <span class="bg-gray-200 px-2 py-0.5">k</span>
          <span class="bg-gray-200 px-2 py-0.5">j</span>
          <span class="font-normal"> to navigate</span>
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

export default {
  components: {
    Play,
    Pause,
    Keyboard,
    Cloud,
    FullScreen,
    Pencil,
  },

  data() {
    return {
      filter: "",
      commands: [
        {
          id: 1,
          title: this.$store.getters.isSongPlaying ? "Pause Song" : "Play Song",
          func: this.playSong,
          isActive: true,
          icon: this.$store.getters.isSongPlaying ? "Pause" : "Play",
        },
        {
          id: 2,
          title: "Toggle: Keyboard sound ",
          func: this.toggleKeyboard,
          isActive: false,
          icon: "Keyboard",
        },
        {
          id: 3,
          title: "Toggle: Rain sound ",
          func: this.toggleRain,
          isActive: false,
          icon: "Cloud",
        },
        {
          id: 4,
          title: "View: Toggle Full Screen",
          func: this.toggleFullScreen,
          isActive: false,
          icon: "FullScreen",
        },
        {
          id: 5,
          title: this.$store.getters.isNotePad
            ? "Close: Notepad"
            : "Open: Notepad ",
          func: this.toggleIsNotePad,
          isActive: false,
          icon: "Pencil",
        },
        {
          id: 6,
          title: this.$store.getters.isNotePadInFullScreen
            ? "Toggle:Minimise Note Pad"
            : "Toggle: FullScreen Notepad",
          func: this.openNotePadInFullScreen,
          isActive: false,
          icon: "Pencil",
        },
      ],
      filteredCommands: [],
    };
  },
  watch: {
    filter: {
      handler(val) {
        if (val === " ") this.filteredCommands = this.commands.splice(2, 3);
        this.filteredCommands = this.commands
          .filter((command) => {
            command.isActive = false;
            return command.title.toLowerCase().includes(val.toLowerCase());
          })
          .sort((a, b) => (a < b ? 1 : -1));
        if (this.filteredCommands.length)
          this.filteredCommands[0].isActive = true;
      },
    },
  },

  mounted() {
    this.$refs.commandInput.focus();
    this.filteredCommands = this.commands;
    window.addEventListener("keydown", this.setAciveCommand, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.setAciveCommand, {
      passive: true,
    });
  },

  methods: {
    setActive(com) {
      this.filteredCommands.map((command) => {
        command.isActive = false;
        if (command.id === com.id) {
          command.isActive = true;
        }
      });
    },
    setAciveCommand(e) {
      if (e.key === "ArrowUp" || e.key === "k") {
        let command = this.filteredCommands.find((command) => command.isActive);
        let foundIndex = this.filteredCommands.indexOf(command);
        this.filteredCommands[foundIndex].isActive = false;
        if (foundIndex > 0)
          this.filteredCommands[foundIndex - 1].isActive = true;
        else
          this.filteredCommands[
            this.filteredCommands.length - 1
          ].isActive = true;
        return;
      }
      if (e.key === "ArrowDown" || e.key === "j") {
        let command = this.filteredCommands.find((command) => command.isActive);
        let foundIndex = this.filteredCommands.indexOf(command);
        this.filteredCommands[foundIndex].isActive = false;
        if (foundIndex + 1 < this.filteredCommands.length)
          this.filteredCommands[foundIndex + 1].isActive = true;
        else this.filteredCommands[0].isActive = true;
        return;
      }
      if (e.key === "Enter") {
        this.commands.map((command) => {
          if (command.isActive) {
            this.triggerFunc(command);
          }
        });
        return;
      }
    },
    closeCommandPallet() {
      this.$emit("closeCommandPallet");
    },

    triggerFunc(command) {
      command.func();
      this.closeCommandPallet();
    },
    toggleIsNotePad() {
      this.$store.commit("toggleIsNotePad");
    },
    openNotePadInFullScreen() {
      this.$store.commit("openNotePadInFullScreen");
    },
    playSong() {
      this.$store.commit("toggleIsSongPlaying");
    },
    toggleKeyboard() {
      this.$store.commit("toggleIsKeyboardPlaying");
    },
    toggleRain() {
      this.$store.commit("toggleIsRainPlaying");
    },
    toggleFullScreen() {
      this.$store.commit("toggleIsFullScreen");
    },
  },
};
</script>

<style></style>
