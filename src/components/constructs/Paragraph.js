import Condition from './Condition'

class Paragraph {
  constructor (paragraph) {
    if (typeof paragraph === 'string') {
      this.textContent = paragraph
    } else {
      this.paragraphId = paragraph.paragraphId
      this.textContent = paragraph.textContent
      this.replacements = paragraph.replacements
      this.condition = paragraph.condition
    }
  }

  getReplacement (replacementName) {
    return this.replacements[replacementName]
  }

  getCondition (playerFlag, playerInventory) {
    return new Condition(this.condition, playerFlag, playerInventory)
  }

  checkCondition (playerFlag, playerInventory) {
    return this.getCondition(playerFlag, playerInventory).checkConditions()
  }

  getConditionForReplacement (replacementName, playerFlag, playerInventory) {
    return new Condition(this.replacements[replacementName].condition, playerFlag, playerInventory)
  }

  checkConditionForReplacement (replacementName, playerFlag, playerInventory) {
    return this.getConditionForReplacement(replacementName, playerFlag, playerInventory).checkConditions()
  }

  getConditionEvalTrue (replacementName) {
    return this.replacements[replacementName].evaluateTrue
  }

  getConditionEvalFalse (replacementName) {
    return this.replacements[replacementName].evaluateFalse
  }
}

export default Paragraph
