import Condition from './Condition'
import Action from './Action'

class Button {
  constructor (button) {
    this.buttonId = button.buttonId
    this.text = button.text
    this.action = button.action
    this.condition = button.condition
    this.children = button.children
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

  hasChildren () {
    return typeof this.children !== 'undefined'
  }

  getChildren () {
    return this.children
  }

  checkChildrenConditions () {
    if (this.hasChildren()) {
      return this.children.some(function (button) {
        let tempButton = new Button(button)
        return tempButton.checkChildrenConditions()
      }, this)
    } else {
      return this.checkCondition()
    }
  }
}

export default Button
