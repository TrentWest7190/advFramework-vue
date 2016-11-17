import store from './store'
import _ from 'lodash'

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
  'displayText': function (target) {
    store.commit('appendText', target)
  }
}

export { logicalOperators, performableActions }
