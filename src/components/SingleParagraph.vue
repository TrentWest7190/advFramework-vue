<template>
<p class="paragraph">{{ displayText }}</p>
</template>

<script>
// import _ from 'lodash'
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
    }
  },

  methods: {
    replaceToken (fullMatch, replacementName) {
      let playerFlags = this.$store.state.playerFlagModule
      let playerInventory = this.$store.state.playerInventoryModule.items
      let replacementCondition = this._paragraph.getCondition(replacementName)
      console.log(replacementCondition)
      replacementCondition.setPlayerData(playerFlags, playerInventory)
      if (replacementCondition.checkConditions()) {
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