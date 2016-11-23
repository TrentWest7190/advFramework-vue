import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config'
import _ from 'lodash'
import ScreenCompiler from './screenCompiler'

Vue.use(Vuex)

const playerFlagModule = {
  // state: flagCompiler(data.flagData),
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
    },
    useItem (state, itemData) {
      for (let index in state.items) {
        if (state.items[index].itemName === itemData.itemName) {
          state.items[index].amount -= itemData.subtractUses
          if (state.items[index].amount <= 0) state.items.splice(index, 1)
        }
      }
    }
  }
}

export default new Vuex.Store({
  state: {
    // compiledScreens: compiledScreens,
    loadedScreen: {}
  },
  getters: {
  },
  mutations: {
    compileScreens (state, inputData) {
      let compiler = new ScreenCompiler(inputData)
      state.compiledScreens = compiler.compileScreens()
      state.loadedScreen = getByAttribute(state.compiledScreens, config.startScreenId, 'screenId')
    },
    loadScreen (state, screenIdToLoad) {
      state.loadedScreen = getByAttribute(state.compiledScreens, screenIdToLoad, 'screenId')
    },
    appendText (state, textObj) {
      state.loadedScreen.text.addText(textObj.getLoadedText())
    },
    cycleText (state) {
      state.loadedScreen.text.incrementPointer()
    },
    loadText (state, textKeyToLoad) {
      state.loadedScreen.text.getText(textKeyToLoad)
    }
  },
  modules: {
    playerFlagModule,
    playerInventoryModule
  }
})

/* function screenCompiler (data) {
  let compiledScreens = _.map(data.screenData, function (screen) {
    let compiledScreen = _.cloneDeep(screen)
    compiledScreen.text = new Paragraph(getByAttribute(data.textData, screen.text.textId, 'textId'))
    compiledScreen.buttons = _.map(compiledScreen.buttons, compileButtons)
    return compiledScreen
  })
  return compiledScreens
}

function compileButtons (button) {
  let compiledButton = _.cloneDeep(button)
  _.merge(compiledButton, _.find(data.buttonData, {'id': button.id}))
  if (compiledButton.action) {
    compiledButton.action = _.map(compiledButton.action, compileAction)
  }
  return compiledButton
}

function compileAction (action) {
  if (action.type === 'displayText' && typeof action.target === 'number') {
    action.target = new Paragraph(getByAttribute(data.textData, action.target.id, 'textId'))
  } else if (typeof action.target === 'string') {
    action.target = new Paragraph(action.target, true)
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
*/
function getByAttribute (obj, match, attr) {
  return _.find(obj, function (child) { return child[attr] === match })
}

function compileItem () {
  return {}
}
