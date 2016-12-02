<template>
<div id="button-panel">
    <button v-if="!bottomOfBranch" v-for="(folder, folderName) in currentNode" v-on:click="traverseDown(folderName)">{{ folderName }}</button>
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
      buttonTree: new ButtonTree(this.buttonData)
    }
  },

  computed: {
    currentNode () {
      return this.buttonTree.getCurrentNode()
    }
  },

  methods: {
    openFolder (nodeName) {
      console.log(nodeName)
      this.buttonTree.traverseDown(nodeName)
    },

    traverseDown (nodeName) {
      this.buttonTree.traverseDown(nodeName)
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