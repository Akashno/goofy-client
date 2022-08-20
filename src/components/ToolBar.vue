<template>
 <div class="flex justify-between w-full align-middle items-center mx-auto ">

       <div class="cursor-pointer bg-gray-900 bg-opacity-50 p-2 rounded-lg"  @click="$emit('showTodo')">
          <img src="../assets/pencil.png" width="15" alt="" />
      </div>
      <div class="flex-grow flex justify-center">
        <audio loop ref="primary" :src="audio"></audio>
        <audio loop ref="type" src="../assets/keyboard.mp3"></audio>
        <audio loop ref="rain" src="../assets/rain.mp3"></audio>
        <!-- Primary play / pause button -->
        <span @click="playPause('primary')" class="cursor-pointer">
          <img v-if="!primary.playing" src="../assets/play.png" alt="" class="w-12" />
          <img v-else src="../assets/pause.png" alt="" class="w-12" />
        </span>
      </div>
       <span @click="$store.commit('toggleCommandPallet')" class="bg-gray-900 p-2 rounded-lg bg-opacity-30 mr-4 cursor-pointer" title="Press Ctrl + p ">
          <HelpCircleOutline fillColor="white" :size="16"/>
        </span>
      <!-- Volume button -->
      <div class="flex space-x-4 align-middle">
        <span class="cursor-pointer">
          <div
            class="h-full flex  justify-end align-middle items-center"
            @mouseenter="primary.showSlider = true"
            @mouseleave="primary.showSlider = false"
          >
            <input
              v-if="primary.showSlider"
              id="default-range"
              type="range"
              min="0"
              max="1"
              @input="slideVolume('primary')"
              v-model="primary.volume"
              step="0.01"
               class="fixed bottom-20 right-44 "
              orient="vertical"
            />
            <span @click="toggleMute()" class="bg-gray-900 p-2 rounded-lg bg-opacity-30">
              <img
                src="../assets/sound.png"
                width="15"
                alt=""
                :class="{ 'opacity-50 ': primary.muted || primary.volume <=0 }"
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
            v-if="type.showSlider"
            id="default-range"
            type="range"
            min="0"
            max="1"
            @input="slideVolume('type')"
            v-model="type.volume"
            step="0.01"
              class="fixed bottom-20 right-32"
              orient="vertical"
          />
          <span
            @click="playPause('type')"
            class="cursor-pointer bg-gray-900 p-2 bg-opacity-30 rounded-lg"
          >
            <img
              src="../assets/typing.png"
              width="15"
              alt=""
              :class="{ 'opacity-50': !type.playing }"
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
            v-if="rain.showSlider"
            id="default-range"
            type="range"
            min="0"
            max="1"
            @input="slideVolume('rain')"
            v-model="rain.volume"
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
              :class="{ 'opacity-50': !rain.playing }"
            />
          </span>
        </div>
        <!-- Full Screen button -->
        <div class="h-16 flex justify-end align-middle relative items-center">
          <span
            @click="toggleFullScreen()"
            class="cursor-pointer bg-gray-900 p-2 bg-opacity-30 rounded-lg"
          >
            <img src="../assets/fullscreen.png" width="15" alt="" />
          </span>
        </div>
      </div>
    </div> 
</template>

<script>
import { mapState } from 'vuex';
import HelpCircleOutline from "vue-material-design-icons/HelpCircleOutline.vue"
import Player from "../methods/Player";
export default {
    name:"ToolBar",
    components:{
    HelpCircleOutline
    },
    data(){
     return{
      primary: new Player("primary"),
      rain: new Player("rain"),
      type: new Player("type"),
      audio:
        "https://dl.dropboxusercontent.com/s/8hylbfylsbyx4xl/Deep%20End.mp3?dl=0",
        }
    },
    watch:{
       isFullScreen:{
        handler(){
          this.toggleFullScreen()
        }
       },
       isSongPlaying:{
        handler(){
          this.playPause('primary')
        }
       },
       isKeyboardPlaying:{
        handler(){
          this.playPause('type')
        }
       },
       isRainPlaying:{
        handler(){
          this.playPause('rain')
        }
       }
    },
    computed:{
      ...mapState(['isSongPlaying','isRainPlaying','isKeyboardPlaying','isFullScreen'])
    },
    methods:{
    toggleFullScreen() {
        this.$emit('toggleFullScreen')
    },
    toggleMute() {
      this.primary.muted = !this.primary.muted;
      this.$refs.primary.muted = this.primary.muted;
    },
    slideVolume(player) {
      this.$refs[player].play();
      this[player].playing = true;
      this.$refs[player].volume = this[player].volume;
    },
    playPause(player) {
      if (this[player].playing) {
        this.$refs[player].pause();
        this[player].playing = false;
      } else {
        this.$refs[player].play();
        this[player].playing = true;
      }
    },
    }

}
</script>

<style scoped>
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
  width: 8px;
  height: 175px;
}
</style>