import store from '../../store'

class Condition {
  constructor (conditionArray) {
    this.conditionArray = conditionArray
  }

  checkConditions () {
    if (typeof this.conditionArray !== 'undefined') {
      return this.conditionArray.every(this.checkSubCondition, this)
    } else {
      return true
    }
  }

  checkSubCondition (subCondition) {
    let parameter
    let orBool = false
    if (subCondition.type === 'flag') {
      parameter = store.state.PlayerFlagModule[subCondition.flag]
    } else if (subCondition.type === 'inventory') {
      parameter = store.state.PlayerInventoryModule
    } else {
      console.warn('There is an invalid condition type')
      return false
    }
    let value = subCondition.value
    if (subCondition.or) {
      let orCondition = new Condition(subCondition.or)
      orBool = orCondition.checkConditions()
    }
    return logicalOperators[subCondition.condition](parameter, value) || orBool
  }
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
    return parameter.some(item => item.itemName === value)
  }
}

export default Condition
