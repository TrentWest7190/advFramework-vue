import Vue from 'vue'
import Vuex from 'vuex'
import ScreenCompiler from './screenCompiler'
import PlayerFlagModule from './modules/PlayerFlagModule'
import PlayerInventoryModule from './modules/PlayerInventoryModule'

Vue.use(Vuex)

const compiler = new ScreenCompiler()

export default new Vuex.Store({
  state: {
    // compiledScreens: compiledScreens,
    loadedScreen: {}
  },
  getters: {
  },
  mutations: {
    compileScreens (state, inputData) {
      compiler.fillData(inputData)
      state.compiledScreens = compiler.compileScreens()
    },
    compileFlags (state) {
      state.PlayerFlagModule = compiler.compileFlags()
    },
    moveItemsToInventory (state) {
      state.PlayerInventoryModule.inventoryData = compiler.getInventoryData()
    },
    loadScreen (state, screenIdToLoad) {
      state.loadedScreen = state.compiledScreens.find(screen => screen.screenId === screenIdToLoad)
    },
    appendText (state, textObj) {
      state.loadedScreen.paragraphs.push(compiler.compileSingleParagraph(textObj))
    },
    loadText (state, textKeyToLoad) {
      state.loadedScreen.text.getText(textKeyToLoad)
    }
  },
  modules: {
    PlayerFlagModule,
    PlayerInventoryModule
  }
})
