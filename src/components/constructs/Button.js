import Condition from './Condition'
import Action from './Action'

class Button {
  constructor (button) {
    this.buttonId = button.buttonId
    this.text = button.text
    this.action = button.action
    this.condition = button.condition
  }

  getCondition (playerFlag, playerInventory) {
    return new Condition(this.condition, playerFlag, playerInventory)
  }

  checkCondition (playerFlag, playerInventory) {
    return this.getCondition(playerFlag, playerInventory).checkConditions()
  }

  getAction () {
    return new Action(this.action)
  }

  performActions () {
    this.getAction().performActions()
  }
}

export default Button
