<template>
<div id="button-panel">
    <button v-if="!bottomOfBranch" v-for="(folder, folderName) in loadedButtons" v-on:click="openFolder(folder)">{{ folderName }}</button>
    <SingleButton v-else v-for="button in loadedButtons" v-bind:button="button"></singleButton>
    <button v-on:click="traverseBack">Back</button>
</div>
</template>

<script>
import SingleButton from './SingleButton'
import ButtonTree from './constructs/ButtonTree'

export default {

  name: 'ButtonPanel',
  components: {
    SingleButton
  },

  props: ['buttonData'],

  data () {
    return {
      traveledPath: '',
      currentLevel: 'top'
    }
  },

  computed: {
    bottomOfBranch () {
      return Array.isArray(this.loadedButtons)
    },

    buttonTree () {
      return new ButtonTree(this.buttonData)
    }
  },

  methods: {
    openFolder (folderData) {
      console.log(folderData)
      this.loadedButtons = folderData
    },

    traverseBack () {

    }
  }
}
</script>

<style lang="css" scoped>
#button-panel {
    box-sizing: border-box;
    height: 25%;
    border: 1px solid red;
}

button {
  width: 25%;
  height: 50%;
  text-align: center;
  border: 1px solid red;
  float: left;
  outline: none;
}
</style>