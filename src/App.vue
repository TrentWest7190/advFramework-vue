<template>
  <div id="app">
    <div id="leftSideDiv">
      <OptionPanel></OptionPanel>
    </div>
    <div id="centerDiv">
      <TextPanel v-if="paragraphData" v-bind:text-data="paragraphData"></TextPanel>
      <ButtonPanel v-if="buttonData" v-bind:button-data="buttonData"></ButtonPanel>
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
    paragraphData () {
      return this.screenToLoad.paragraphs
    },
    buttonData () {
      return this.screenToLoad.buttons
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
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid red;
}

#leftSideDiv {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  height: 100%;
  width:  15%;
}

#centerDiv {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  height: 100%;
  width:  70%;
}

#rightSideDiv {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  height: 100%;
  width:  15%;
}
</style>
