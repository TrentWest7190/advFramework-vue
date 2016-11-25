import Vue from 'vue'
import Vuex from 'vuex'
import ScreenCompiler from './screenCompiler'

Vue.use(Vuex)

const compiler = new ScreenCompiler()

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
      let item = compiler.compileItem(itemData)
      let existingItem = state.items.find(item => item.itemName === itemData.itemName)
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
      compiler.fillData(inputData)
      state.compiledScreens = compiler.compileScreens()
    },
    compileFlags (state) {
      state.playerFlagModule = compiler.compileFlags()
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
    playerFlagModule,
    playerInventoryModule
  }
})
