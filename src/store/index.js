import Vue from 'vue'
import Vuex from 'vuex'
import StoryBuilder from './StoryBuilder'
import PlayerFlagModule from './modules/PlayerFlagModule'
import PlayerInventoryModule from './modules/PlayerInventoryModule'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.use(Vuex)

const builder = new StoryBuilder()

export default new Vuex.Store({
  state: {
    lastLoadedScreenId: 0,
    compiledScreens: [],
    loadedScreen: {},
    storyConfiguration: {}
  },
  getters: {
    getScreenIds: state => {
      return state.compiledScreens.map(screen => screen.screenId)
    }
  },
  mutations: {
    compileScreens (state, inputData) {
      builder.fillData(inputData)
      state.compiledScreens = builder.compileScreens()
    },
    compileFlags (state) {
      state.PlayerFlagModule = builder.compileFlags()
    },
    moveItemsToInventory (state) {
      state.PlayerInventoryModule.inventoryData = builder.getInventoryData()
    },
    setConfiguration (state) {
      state.storyConfiguration = builder.getConfiguration()
    },
    loadScreen (state, screenIdToLoad) {
      state.lastLoadedScreenId = state.loadedScreen.screenId
      state.loadedScreen = state.compiledScreens.find(screen => screen.screenId === screenIdToLoad)
    },
    appendText (state, textObj) {
      state.loadedScreen.paragraphs.push(builder.compileSingleParagraph(textObj))
    },
    loadText (state, textKeyToLoad) {
      state.loadedScreen.text.getText(textKeyToLoad)
    }
  },
  actions: {
    loadStory ({ commit, state }, storyToLoad) {
      Vue.http.get('/static/stories/' + storyToLoad + '.json').then((response) => {
        commit('compileScreens', response.data)
        commit('setConfiguration')
        commit('compileFlags')
        commit('moveItemsToInventory')
        commit('loadScreen', state.storyConfiguration.startScreenId)
      })
    }
  },
  modules: {
    PlayerFlagModule,
    PlayerInventoryModule
  }
})
