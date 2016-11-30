import Condition from './Condition'
import store from '../../store'

class Paragraph {
  constructor (paragraph) {
    if (typeof paragraph === 'string') {
      this.textContent = paragraph
    } else {
      this.paragraphId = paragraph.paragraphId
      this.textContent = paragraph.textContent
      this.replacements = paragraph.replacements
      this.condition = paragraph.condition
      this.input = paragraph.input
      this.bindTo = paragraph.bindTo
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

  isConditionalReplacement (replacementName) {
    return this.replacements[replacementName].condition !== undefined
  }

  getConditionEval (replacementName) {
    return this.checkConditionForReplacement(replacementName) ? this.getConditionEvalTrue(replacementName) : this.getConditionEvalFalse(replacementName)
  }

  getConditionEvalTrue (replacementName) {
    return this.replacements[replacementName].evaluateTrue
  }

  getConditionEvalFalse (replacementName) {
    return this.replacements[replacementName].evaluateFalse
  }

  nonConditionalReplace (replacementName) {
    let replacement = this.replacements[replacementName]
    if (replacement.replaceWith === 'flag') {
      return store.state.PlayerFlagModule[replacement.name]
    }
  }
}

export default Paragraph
