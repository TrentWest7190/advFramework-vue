import store from '../../store'
import Condition from './Condition'

class Action {
  constructor (actionArray) {
    this.actionArray = actionArray
    console.log(this)
  }

  performActions () {
    if (Array.isArray(this.actionArray)) {
      this.actionArray.forEach(this.performSubaction)
    } else {
      this.performSubaction(this.actionArray)
    }
  }

  performSubaction (subAction) {
    let actionCondition = new Condition(subAction.condition)
    if (actionCondition.checkConditions()) {
      performableActions[subAction.type](subAction.target)
    }
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
  },
  'randomAction': function (target) {
    let randAction
    if (!target.weighted) {
      randAction = new Action(target.possibleActions[Math.floor(Math.random() * target.possibleActions.length)])
    }
    randAction.performActions()
  }
}

export default Action
