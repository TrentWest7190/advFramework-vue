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
      var tokenRegex = /%{(.*?)}/g
      var newText = textContent.replace(tokenRegex, this.replaceToken)
      return newText
    },
    textIsVisible () {
      let playerFlags = this.$store.state.PlayerFlagModule
      let playerInventory = this.$store.state.PlayerInventoryModule.items
      return this._paragraph.checkCondition(playerFlags, playerInventory)
    }
  },

  methods: {
    replaceToken (fullMatch, replacementName) {
      let playerFlags = this.$store.state.PlayerFlagModule
      let playerInventory = this.$store.state.PlayerInventoryModule.items
      if (this._paragraph.checkConditionForReplacement(replacementName, playerFlags, playerInventory)) {
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