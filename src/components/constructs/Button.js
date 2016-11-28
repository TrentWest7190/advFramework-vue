import Condition from './Condition'
import Action from './Action'

class Button {
  constructor (button) {
    this.buttonId = button.buttonId
    this.text = button.text
    this.action = button.action
    this.condition = button.condition
  }

  getCondition () {
    return new Condition(this.condition)
  }

  checkCondition () {
    return this.getCondition().checkConditions()
  }

  getAction () {
    return new Action(this.action)
  }

  performActions () {
    this.getAction().performActions()
  }
}

export default Button
