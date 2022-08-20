<template>
  <div
    class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-800 bg-opacity-40 transition-opacity"
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
          @mouseenter="setActive(command)"
          :class="{ 'bg-gray-200': command.isActive }"
          class="cursor-default select-none px-4 py-2 hover:bg-gray-200"
          @click="triggerFunc(command)"
          id="option-1"
          role="option"
          tabindex="-1"
          v-for="(command, index) in filteredCommands"
          :key="index"
        >
          {{ command.title }}
        </li>
      </ul>

      <div>..</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: "",
      commands: [
        { id: 1, title: "Play / Pause", func: this.playSong, isActive: false },
        {
          id: 2,
          title: "Keyboard sound ",
          func: this.toggleKeyboard,
          isActive: false,
        },
        { id: 3, title: "Rain sound ", func: this.toggleRain, isActive: false },
        {
          id: 4,
          title: "View: Toggle Full Screen",
          func: this.toggleFullScreen,
          isActive: false,
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
      if (e.key === "ArrowUp") {
        let command = this.filteredCommands.find((command) => command.isActive);
        let foundIndex = this.filteredCommands.indexOf(command);
        this.filteredCommands[foundIndex].isActive = false;
        if (foundIndex > 0)
          this.filteredCommands[foundIndex - 1].isActive = true;
        else
          this.filteredCommands[
            this.filteredCommands.length - 1
          ].isActive = true;
      }
      if (e.key === "ArrowDown") {
        let command = this.filteredCommands.find((command) => command.isActive);
        let foundIndex = this.filteredCommands.indexOf(command);
        this.filteredCommands[foundIndex].isActive = false;
        if (foundIndex + 1 < this.filteredCommands.length)
          this.filteredCommands[foundIndex + 1].isActive = true;
        else this.filteredCommands[0].isActive = true;
      }
      if (e.key === "Enter") {
        this.commands.map((command) => {
          if (command.isActive) {
            this.triggerFunc(command)
          }
        });
      }
    },
    closeCommandPallet(){
      this.$emit("closeCommandPallet");
    },
    triggerFunc(command) {
      command.func();
      this.closeCommandPallet()
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
