<template>
           <select  @change="$emit('setFont',selectedFont)" v-model="selectedFont" class="text-xs bg-primary bg-opacity-50 rounded-lg p-2 focus:outline-none mr-2">
              <option :value="font" v-for="(font,index) in fonts" :key="index" class="" >{{font.split(",")[0]}}</option>
            </select>
</template>

<script>
export default {
    name:"SelectFont",
    data(){
      return {
        fonts:[ "Arial, Helvetica, sans-serif","Times New Roman, Times, serif",  "Courier New, Courier, monospace", ],
        selectedFont:null,
      }
    },
    mounted(){
        this.selectedFont = this.fonts[0]
    }

}
</script>

<style scoped>

option {
    margin: 40px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>