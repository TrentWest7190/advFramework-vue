<template>
<p v-if="textIsVisible && !isInput" class="paragraph">{{ displayText }}</p>
<input v-else v-on:keyup.enter="commitInput" v-model="inputValue" placeholder="Press enter when done">
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
    },
    isInput () {
      return this._paragraph.input
    }
  },

  methods: {
    replaceToken (fullMatch, replacementName) {
      if (this._paragraph.isConditionalReplacement(replacementName)) {
        return this._paragraph.getConditionEval(replacementName)
      } else {
        return this._paragraph.nonConditionalReplace(replacementName)
      }
    },

    commitInput (e) {
      this.$store.commit('setValue', {flagName: this._paragraph.bindTo, value: this.inputValue})
    }
  }
}
</script>

<style lang="sass" scoped>
.paragraph
  margin: 10px
</style>