import Vue from 'vue'
import Vuex from 'vuex'
import * as data from '../data'
import config from '../config'
import _ from 'lodash'

const compiledScreens = screenCompiler(data)

Vue.use(Vuex)

const playerFlagModule = {
  state: flagCompiler(data.flagData),
  mutations: {
    plus (state, flagData) {
      state[flagData.flagName] += flagData.value
    },
    minus (state, flagData) {
      state[flagData.flagName] -= flagData.value
    },
    setValue (state, flagData) {
      state[flagData.flagName] = flagData.value
    },
    toggle (state, flagData) {
      if (typeof state[flagData.flagName] === 'boolean') {
        state[flagData.flagname] = !state[flagData.flagname]
      } else {
        console.warn('Subaction "toggle" can only be used on a boolean flag')
      }
    }
  }
}

const playerInventoryModule = {
  state: { items: [] },
  mutations: {
    addItem (state, itemData) {
      let item = compileItem(itemData)
      let existingItem = _.find(state.items, {'itemName': itemData.itemName})
      if (existingItem === undefined) {
        state.items.push(item)
      } else {
        existingItem.amount += itemData.amount
      }
    },
    removeItem (state, itemData) {
      for (let index in state.items) {
        if (state.items[index].itemName === itemData.itemName) {
          state.items.splice(index, 1)
        }
      }
    }
  }
}

export default new Vuex.Store({
  state: {
    loadedScreen: getById(compiledScreens, config.startScreenId)
  },
  getters: {
  },
  mutations: {
    loadScreen (state, screenIdToLoad) {
      console.log('loadScreen', screenIdToLoad)
      state.loadedScreen = getById(compiledScreens, screenIdToLoad)
    },
    appendText (state, textObj) {
      state.loadedScreen.text.text += ' ' + textObj.text
    }
  },
  modules: {
    playerFlagModule,
    playerInventoryModule
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
  if (compiledButton.action) {
    console.log('in')
    compiledButton.action = _.map(compiledButton.action, compileAction)
  }
  return compiledButton
}

function compileAction (action) {
  if (action.type === 'displayText') {
    action.target = getById(data.textData, action.target.id)
  }
  return action
}

function flagCompiler (flagData) {
  return _.reduce(flagData, function (endObj, flag) {
    endObj[flag.flagName] = flag.defaultValue
    return endObj
  }, {})
}

function compileItem (itemData) {
  let inventoryItem = _.cloneDeep(itemData)
  _.merge(inventoryItem, _.find(data.inventoryData, {'itemName': itemData.itemName}))
  return inventoryItem
}

function getById (obj, id) {
  return _.find(obj, {'id': id})
}
