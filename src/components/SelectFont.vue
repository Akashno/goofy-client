<template>
           <select  @change="$emit('setFont',selectedFont)" v-model="selectedFont" class="text-xs bg-gray-900 bg-opacity-50 rounded-lg p-2 focus:outline-none mr-2">
              <option :value="font" v-for="(font,index) in fonts" :key="index" class="" >{{font}}</option>
            </select>
</template>

<script>
export default {
    name:"SelectFont",
    data(){
      return {
        fonts:["Arial" , "Verdana ", "Helvetica ", "Tahoma", "Trebuchet MS ", "Times New Roman ", "Georgia ", "Garamond ", "Courier New, Courier, monospace", "Brush Script MT " ],
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