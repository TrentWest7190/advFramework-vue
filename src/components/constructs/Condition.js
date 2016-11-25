class Condition {
  constructor (conditionArray, playerFlag, playerInventory) {
    this.conditionArray = conditionArray
    this.setPlayerData(playerFlag, playerInventory)
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
    if (subCondition.type === 'flag') {
      parameter = this.flags[subCondition.flag]
    } else if (subCondition.type === 'inventory') {
      parameter = this.inventory
    } else {
      console.warn('There is an invalid condition type')
      return false
    }
    let value = subCondition.value
    return logicalOperators[subCondition.condition](parameter, value)
  }

  setPlayerData (playerFlags, playerInventory) {
    this.flags = playerFlags
    this.inventory = playerInventory
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
