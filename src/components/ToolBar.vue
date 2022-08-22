<template>
  <div class="flex justify-between w-full align-middle items-center mx-auto">
    <div class="w-max md:w-48">
      <div
        class="cursor-pointer w-max bg-gray-900 bg-opacity-50 p-2 rounded-lg"
        @click="$store.commit('toggleIsNotePad')"
      >
        <img src="../assets/pencil.png" width="15" alt="" />
      </div>
    </div>
    <div class="flex-grow flex justify-center">
      <audio loop ref="primary" :src="audio"></audio>
      <audio loop ref="type" src="../assets/keyboard.mp3"></audio>
      <audio loop ref="rain" src="../assets/rain.mp3"></audio>
      <!-- Primary play / pause button -->
      <span @click="playPause('primary')" class="cursor-pointer">
        <img
          v-if="!primary.playing"
          src="../assets/play.png"
          alt=""
          class="w-12"
        />
        <img v-else src="../assets/pause.png" alt="" class="w-12" />
      </span>
    </div>
    <span
      @click="$store.commit('toggleDarkMode')"
      class="bg-primary p-2 rounded-lg bg-opacity-30 mr-4 cursor-pointer"
      title="Press Ctrl + p "
    >
      <Sun v-if="$store.state.isDarkMode" fillColor="white" :size="16" />
      <Moon v-else fillColor="white" :size="16" />
    </span>
    <div
      :class="showAlert ? 'right-4 bottom-20' : '-right-52 bottom-20'"
      style="transition: all 0.5s"
      class="p-2 fixed bg-primary dark:bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex clear-right"
      role="alert"
    >
      <span class="font-semibold mr-2 text-left flex-auto text-x"
        >Press Ctrl + p to open / close command pallet</span
      >
    </div>
    <span
      @click="$store.commit('toggleCommandPallet')"
      @mouseenter="showAlert = true"
      @mouseleave="showAlert = false"
      class="bg-primary p-2 rounded-lg bg-opacity-30 mr-4 cursor-pointer"
      title="Press Ctrl + p "
    >
      <HelpCircleOutline fillColor="white" :size="16" />
    </span>
    <!-- Volume button -->
    <div class="flex space-x-4 align-middle">
      <span class="cursor-pointer">
        <div
          class="h-full flex justify-end align-middle items-center"
          @mouseenter="primary.showSlider = true"
          @mouseleave="primary.showSlider = false"
        >
          <input
            name="primary"
            v-if="primary.showSlider"
            id="default-range"
            type="range"
            min="0"
            max="1"
            @input="slideVolume"
            :value="primary.volume"
            step="0.01"
            class="fixed bottom-20 right-44"
            orient="vertical"
          />
          <span
            @click="$store.commit('toggleMute', 'primary')"
            class="bg-gray-900 p-2 rounded-lg bg-opacity-30"
          >
            <img
              src="../assets/sound.png"
              width="15"
              alt=""
              :class="{ 'opacity-50 ': primary.muted || primary.volume <= 0 }"
            />
          </span>
        </div>
      </span>
      <!-- Keyboard button -->
      <div
        class="h-16 flex justify-end align-middle relative items-center"
        @mouseenter="type.showSlider = true"
        @mouseleave="type.showSlider = false"
      >
        <input
          name="type"
          v-if="type.showSlider"
          id="default-range"
          type="range"
          min="0"
          max="1"
          @input="slideVolume"
          :value="type.volume"
          step="0.01"
          class="fixed bottom-20 right-32"
          orient="vertical"
        />
        <span
          @click="playPause('type')"
          class="cursor-pointer bg-primary p-2 bg-opacity-30 rounded-lg"
        >
          <img
            src="../assets/typing.png"
            width="15"
            alt=""
            :class="{
              'opacity-50': !type.playing || type.muted || type.volume <= 0,
            }"
          />
        </span>
      </div>

      <!-- Rain cloud button -->
      <div
        class="h-16 flex justify-end align-middle relative items-center"
        @mouseenter="rain.showSlider = true"
        @mouseleave="rain.showSlider = false"
      >
        <input
          name="rain"
          v-if="rain.showSlider"
          id="default-range"
          type="range"
          min="0"
          max="1"
          @input="slideVolume"
          :value="rain.volume"
          step="0.01"
          class="fixed bottom-20 right-20"
          orient="vertical"
        />
        <span
          @click="playPause('rain')"
          class="cursor-pointer bg-gray-900 bg-opacity-30 p-2 rounded-lg"
        >
          <img
            src="../assets/rain.png"
            width="17"
            alt=""
            :class="{
              'opacity-50': !rain.playing || rain.muted || rain.volume <= 0,
            }"
          />
        </span>
      </div>
      <!-- Full Screen button -->
      <div class="h-16 flex justify-end align-middle relative items-center">
        <span
          @click="$store.commit('toggleIsFullScreen')"
          class="cursor-pointer bg-primary p-2 bg-opacity-30 rounded-lg"
        >
          <img src="../assets/fullscreen.png" width="15" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HelpCircleOutline from "vue-material-design-icons/HelpCircleOutline.vue";
import Sun from "vue-material-design-icons/WhiteBalanceSunny.vue";
import Moon from "vue-material-design-icons/MoonWaningCrescent.vue";
export default {
  name: "ToolBar",
  components: {
    HelpCircleOutline,
    Sun,
    Moon,
  },
  computed: {
    ...mapState(["primary", "rain", "type"]),
  },
  data() {
    return {
      showAlert: false,
      audio:
        "https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_9.mp3",
    };
  },
  watch: {
    "primary.playing": function () {
      this.togglePlay("primary");
    },
    "primary.volume": function () {
      this.setVolume("primary");
    },
    "rain.playing": function () {
      this.togglePlay("rain");
    },
    "type.playing": function () {
      this.togglePlay("type");
    },
    "primary.muted": function () {
      this.mutePlayer("primary");
    },
    "rain.muted": function () {
      this.mutePlayer("rain");
    },
    "type.muted": function () {
      this.mutePlayer("type");
    },
  },
  methods: {
    mutePlayer(player) {
      this.$refs[player].muted = this[player].muted;
    },
    slideVolume(e) {
      let player = e.target.name;
      let value = e.target.value;
      this.$store.commit("setVolume", { player, value });
      this.setVolume(player);
    },
    setVolume(player) {
      this.$refs[player].volume = this.$store.state[player].volume;
    },
    playPause(player) {
      //change player.playing value in store
      this.$store.commit("togglePlay", player);
    },
    togglePlay(player) {
      // toggle play attr in audio tag
      if (this.$store.state[player].playing) {
        this.$refs[player].play();
      } else {
        this.$refs[player].pause();
      }
    },
  },
};
</script>

<style scoped>
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
  width: 8px;
  height: 175px;
}
</style>
