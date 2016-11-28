<template>
  <div id="app">
    <div id="leftSideDiv">
      <OptionPanel></OptionPanel>
    </div>
    <div id="centerDiv">
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
import OptionPanel from './components/OptionPanel'

export default {
  name: 'app',
  components: {
    TextPanel,
    ButtonPanel,
    InventoryPanel,
    OptionPanel
  },
  computed: {
    screenToLoad () {
      return this.$store.state.loadedScreen
    },
    inventoryData () {
      return this.$store.state.PlayerInventoryModule.items
    }
  }
}
</script>

<style>
#app {
  font-family: "Segoe UI";
  box-sizing: border-box;
  display: inline-block;
  height: 80vh;
  width: 80%;
  float: left;
  border: 1px solid red;
}

#leftSideDiv {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  height: 100%;
  width:  10%;
}

#centerDiv {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  height: 100%;
  width:  65%;
}

#rightSideDiv {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  height: 100%;
  width:  25%;
}
</style>
