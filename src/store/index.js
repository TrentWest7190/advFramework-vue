import Vue from 'vue'
import Vuex from 'vuex'
import * as data from '../data'
import config from '../config'
import _ from 'lodash'
console.log(data)

Vue.use(Vuex)

const playerFlagModule = {
  state: {},
  mutations: {
    setFlag (state, flagData) {
      state[flagData.flagName] = flagData.flagValue
    }
  }
}

export default new Vuex.Store({
  state: {
    screenToLoad: config.startScreenId,
    compiledScreens: screenCompiler(data),
    playerFlags: flagCompiler(data.flagData)
  },
  getters: {
  },
  mutations: {
    setScreenToLoad (state, screenIdToLoad) {
      state.screenToLoad = screenIdToLoad
    }
  },
  modules: {
    playerFlagModule
  }
})

function screenCompiler (data) {
  let compiledScreens = _.map(data.screenData, function (screen) {
    let compiledScreen = _.cloneDeep(screen)
    compiledScreen.text = _.find(data.textData, {'id': screen.text})
    compiledScreen.buttons = _.map(compiledScreen.buttons, compileButtons)
    return compiledScreen
  })
  return compiledScreens
}

function compileButtons (button) {
  let compiledButton = _.cloneDeep(button)
  _.merge(compiledButton, _.find(data.buttonData, {'id': button.id}))
  return compiledButton
}

function flagCompiler (flagData) {
  return _.reduce(flagData, function (endObj, flag) {
    endObj[flag.flagName] = flag.defaultValue
    return endObj
  }, {})
}
