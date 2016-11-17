<template>
<button v-if="displayButton" v-on:click="performActions(button.action)">{{ button.text }}</button>
</template>

<script>
import _ from 'lodash'
import * as utilFuncs from '../utilityFunctions'

export default {

  name: 'singleButton',

  props: ['button'],

  computed: {
    displayButton () {
      let playerFlags = this.$store.state.playerFlagModule
      let playerInventory = this.$store.state.playerInventoryModule.items
      return _.every(this.button.conditional, function (subCondition) {
        let conditionType = subCondition.condition
        let parameter
        if (subCondition.type === 'inventory') {
          parameter = playerInventory
        } else {
          parameter = playerFlags[subCondition.flag]
        }
        let value = subCondition.value
        return utilFuncs.logicalOperators[conditionType](parameter, value)
      })
    }
  },

  methods: {
    performActions: function (buttonActions) {
      _.each(buttonActions, function (subAction) {
        utilFuncs.performableActions[subAction.type](subAction.target)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>