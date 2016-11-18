import store from './store'
import _ from 'lodash'

const checkConditions = function (playerFlags, playerInventory, conditions) {
  return _.every(conditions, function (subCondition) {
    let conditionType = subCondition.condition
    let parameter
    if (subCondition.type === 'inventory') {
      parameter = playerInventory
    } else {
      parameter = playerFlags[subCondition.flag]
    }
    let value = subCondition.value
    return logicalOperators[conditionType](parameter, value)
  })
}

const logicalOperators = {
  'is': function (parameter, value) {
    return parameter === value
  },
  'greaterThan': function (parameter, value) {
    return parameter > value
  },
  'lessThan': function (parameter, value) {
    return parameter < value
  },
  'has': function (parameter, value) {
    console.log(parameter)
    return _.some(parameter, {'itemName': value})
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
  'cycleText': function () {
    store.commit('cycleText')
  },
  'loadText': function (target) {
    store.commit('loadText', target)
  }
}

export { logicalOperators, performableActions, checkConditions }
