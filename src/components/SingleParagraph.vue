<template>
<p class="paragraph">{{ displayText }}</p>
</template>

<script>
// import _ from 'lodash'
import * as utilFuncs from '../utilityFunctions'

export default {

  name: 'singleParagraph',

  props: ['paragraph'],

  computed: {
    displayText () {
      var textContent = this.paragraph.textContent
      var tokenRegex = /%{(.*?)}/g
      var newText = textContent.replace(tokenRegex, this.replaceToken)
      return newText
    }
  },

  methods: {
    replaceToken (fullMatch, replacementName) {
      let playerFlags = this.$store.state.playerFlagModule
      let playerInventory = this.$store.state.playerInventoryModule.items
      var replacementObject = this.paragraph.replacements[replacementName]
      if (utilFuncs.checkConditions(playerFlags, playerInventory, replacementObject.conditional)) {
        return replacementObject.evaluateTrue
      } else {
        return replacementObject.evaluateFalse
      }
    }
  }
}
</script>

<style lang="css" scoped>
.paragraph {
  font-family: "Lucida Console", Monaco, monospace;
  margin: 10px;
}
</style>