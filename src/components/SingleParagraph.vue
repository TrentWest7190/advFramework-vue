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
      let playerFlags = this.$store.state.playerFlagModule
      let playerInventory = this.$store.state.playerInventoryModule.items
      return this._paragraph.checkCondition(playerFlags, playerInventory)
    }
  },

  methods: {
    replaceToken (fullMatch, replacementName) {
      let playerFlags = this.$store.state.playerFlagModule
      let playerInventory = this.$store.state.playerInventoryModule.items
      if (this._paragraph.checkConditionForReplacement(replacementName, playerFlags, playerInventory)) {
        return this._paragraph.getConditionEvalTrue(replacementName)
      } else {
        return this._paragraph.getConditionEvalFalse(replacementName)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.paragraph {
  font-family: "Lucida Console", Monaco, monospace;
  margin: 10px;
  font-size: ;
}
</style>