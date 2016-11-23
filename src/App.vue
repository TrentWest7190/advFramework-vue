<template>
  <div id="app">
    <div id="leftSideDiv">
      <TextPanel v-bind:text-data="screenToLoad.paragraphs"></TextPanel>
      <ButtonPanel v-bind:button-data="screenToLoad.buttons"></ButtonPanel>
    </div>
    <div id="rightSideDiv">
      <InventoryPanel v-bind:inventory-data="inventoryData"></InventoryPanel>
    </div>
  </div>
</template>

<script>
import TextPanel from './components/TextPanel'
import ButtonPanel from './components/ButtonPanel'
import InventoryPanel from './components/InventoryPanel'

export default {
  name: 'app',
  components: {
    TextPanel,
    ButtonPanel,
    InventoryPanel
  },
  computed: {
    screenToLoad () {
      return this.$store.state.loadedScreen
    },
    inventoryData () {
      return this.$store.state.playerInventoryModule.items
    }
  }
}
</script>

<style>
#app {
  box-sizing: border-box;
  display: inline-block;
  height: 80vh;
  width: 70%;
  float: left;
  border: 1px solid red;
}

#leftSideDiv {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  height: 100%;
  width:  75%;
}

#rightSideDiv {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  height: 100%;
  width:  25%;
}
</style>
