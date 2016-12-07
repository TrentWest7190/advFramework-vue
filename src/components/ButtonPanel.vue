<template>
<div id="button-panel">
    <ActionButton v-for="button in currentNode" v-bind:button="button" v-on:loadChildren="loadChildren"></ActionButton>
    <button v-if="typeof currentNode._parent !== 'undefined'" v-on:click="goBack()">Back</button>
</div>
</template>

<script>
import ActionButton from './ActionButton'

export default {

  name: 'ButtonPanel',
  components: {
    ActionButton
  },

  props: ['buttonData'],

  data () {
    return {
      currentNode: this.buttonData
    }
  },

  methods: {
    loadChildren (childrenToLoad) {
      console.log('loading children', childrenToLoad)
      Object.defineProperty(childrenToLoad.children, '_parent', {value: this.currentNode})
      this.currentNode = childrenToLoad.children
    },

    goBack () {
      this.currentNode = this.currentNode._parent
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