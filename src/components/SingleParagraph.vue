<template>
<p v-if="textIsVisible" class="paragraph">{{ displayText }}</p>
</template>

<script>
import Paragraph from './constructs/Paragraph'

export default {

  name: 'singleParagraph',

  props: ['paragraph'],

  computed: {
    _paragraph () {
      return new Paragraph(this.paragraph)
    },
    displayText () {
      var textContent = this._paragraph.textContent
      if (textContent === undefined) return `ERROR: NO TEXT FOR PARAGRAPH ID ${this._paragraph.paragraphId}`
      var tokenRegex = /%{(.*?)}/g
      var newText = textContent.replace(tokenRegex, this.replaceToken)
      return newText
    },
    textIsVisible () {
      return this._paragraph.checkCondition()
    }
  },

  methods: {
    replaceToken (fullMatch, replacementName) {
      if (this._paragraph.checkConditionForReplacement(replacementName)) {
        return this._paragraph.getConditionEvalTrue(replacementName)
      } else {
        return this._paragraph.getConditionEvalFalse(replacementName)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.paragraph
  margin: 10px
</style>