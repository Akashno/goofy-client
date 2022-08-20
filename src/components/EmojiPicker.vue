<template>
  <emoji-picker @emoji="insert" :search="search">
    <div
      slot="emoji-invoker"
      slot-scope="{ events: { click: clickEvent } }"
      @click.stop="clickEvent"
      class=""
    >
      <p
        class="text-2xl -mt-1 cursor-pointer"
      >
        ☺
      </p>
    </div>
    <div
      slot="emoji-picker"
      slot-scope="{ emojis, insert, display }"
      class="w-48 h-48 absolute bottom-24 overflow-x-hidden bg-gray-800 bg-opacity-30 dark:bg-chatInputBg p-2"
      style="overflow-y: scroll"
    >
      <div class="">
        <div class="flex justify-between pr-4 pt-4">
          <input
            type="text"
            v-model="search"
            placeholder="Search for emoji ...."
            autofocus
            class="bg-gray-800 bg-opacity-30 text-white focus:outline-none dark:text-xs"
          />
        </div>
        <div>
          <div v-for="(emojiGroup, category) in emojis" :key="category">
            <hr class="my-2" />
            <div>
              <span
                class="cursor-pointer"
                v-for="(emoji, emojiName) in emojiGroup"
                :key="emojiName"
                @click="insert(emoji)"
                :title="emojiName"
                >{{ emoji }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </emoji-picker>
</template>

<script>
import EmojiPicker from "vue-emoji-picker";
export default {
  components: {
    EmojiPicker,
  },
  name:'Emoji',
  data(){
    return{
      search:""
    }
  },
  methods: {
    insert(emoji) {
        this.$emit('setEmoji',emoji)
    },
  },
};
</script>

<style></style>
