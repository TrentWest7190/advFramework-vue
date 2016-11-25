import store from '../../store'

class Action {
  constructor (actionArray) {
    this.actionArray = actionArray
  }

  performActions () {
    this.actionArray.forEach(function (subAction) {
      performableActions[subAction.type](subAction.target)
    })
  }

}

const performableActions = {
  'loadScreen': function (target) {
    store.commit('loadScreen', target)
  },
  'setFlag': function (target) {
    store.commit(target.operation, target)
  },
  'getItem': function (target) {
    store.commit('addItem', target)
  },
  'dropItem': function (target) {
    store.commit('removeItem', target)
  },
  'useItem': function (target) {
    store.commit('useItem', target)
  },
  'displayText': function (target) {
    store.commit('appendText', target)
  }
}

export default Action
