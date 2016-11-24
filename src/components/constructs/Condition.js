class Condition {
  constructor (conditionArray) {
    this.conditionArray = conditionArray
  }

  checkConditions () {
    return this.conditionArray.every(this.checkSubCondition, this)
  }

  checkSubCondition (subCondition) {
    let parameter
    if (subCondition.type === 'flag') {
      parameter = this.flags[subCondition.playerObject]
    } else if (subCondition.type === 'inventory') {
      parameter = this.inventory
    }
    let value = subCondition.value
    console.log('checkSubCondition', parameter, subCondition.condition, value)
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
    console.log(parameter)
    return parameter.some(item => item.itemName === value)
  }
}

export default Condition
