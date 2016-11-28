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

  getCondition () {
    return new Condition(this.condition)
  }

  checkCondition () {
    return this.getCondition().checkConditions()
  }

  getConditionForReplacement (replacementName) {
    return new Condition(this.replacements[replacementName].condition)
  }

  checkConditionForReplacement (replacementName) {
    return this.getConditionForReplacement(replacementName).checkConditions()
  }

  getConditionEvalTrue (replacementName) {
    return this.replacements[replacementName].evaluateTrue
  }

  getConditionEvalFalse (replacementName) {
    return this.replacements[replacementName].evaluateFalse
  }
}

export default Paragraph
