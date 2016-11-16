<template>
  <div id="app">
    <TextPanel v-bind:text-data="screenToLoad.text"></TextPanel>
    <ButtonPanel v-bind:button-data="screenToLoad.buttons"></ButtonPanel>
  </div>
</template>

<script>
import TextPanel from './components/TextPanel'
import ButtonPanel from './components/ButtonPanel'
import _ from 'lodash'

export default {
  name: 'app',
  components: {
    TextPanel,
    ButtonPanel
  },
  computed: {
    screenToLoad () {
      return _.find(this.$store.state.compiledScreens, {'id': this.$store.state.screenToLoad})
    }
  }
}
</script>

<style>
#app {
  box-sizing: border-box;
  display: inline-block;
  height: 80vh;
  width: 50%;
  float: left;
  border: 1px solid red;
}
</style>
