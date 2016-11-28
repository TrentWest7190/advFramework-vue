import Vue from 'vue'
import Vuex from 'vuex'
import ScreenCompiler from './screenCompiler'
import PlayerFlagModule from './modules/PlayerFlagModule'
import PlayerInventoryModule from './modules/PlayerInventoryModule'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.use(Vuex)

const compiler = new ScreenCompiler()

export default new Vuex.Store({
  state: {
    compiledScreens: [],
    loadedScreen: {}
  },
  getters: {
    getScreenIds: state => {
      return state.compiledScreens.map(screen => screen.screenId)
    }
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
  actions: {
    loadStory ({ commit, state }, storyToLoad) {
      Vue.http.get('/static/stories/' + storyToLoad + '.json').then((response) => {
        console.log(response.data)
        commit('compileScreens', response.data)
        commit('compileFlags')
        commit('moveItemsToInventory')
        commit('loadScreen', response.data.config.startScreenId)
      })
    }
  },
  modules: {
    PlayerFlagModule,
    PlayerInventoryModule
  }
})
