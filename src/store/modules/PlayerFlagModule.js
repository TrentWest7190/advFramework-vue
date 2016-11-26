export default {
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
