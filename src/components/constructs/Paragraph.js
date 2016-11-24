// import _ from 'lodash'
import Condition from './Condition'

class Paragraph {
  constructor (paragraph) {
    if (typeof paragraph === 'string') {
      this.textContent = paragraph
    } else {
      this.paragraphId = paragraph.paragraphId
      this.textContent = paragraph.textContent
      this.replacements = paragraph.replacements
    }
  }

  getReplacement (replacementName) {
    return this.replacements[replacementName]
  }

  getCondition (replacementName) {
    return new Condition(this.replacements[replacementName].condition)
  }

  getConditionEvalTrue (replacementName) {
    return this.replacements[replacementName].evaluateTrue
  }

  getConditionEvalFalse (replacementName) {
    return this.replacements[replacementName].evaluateFalse
  }
}

export default Paragraph
