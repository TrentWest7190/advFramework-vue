<template>
<button v-if="displayButton" v-on:click="performActions(button.action)">{{ button.text }}</button>
</template>

<script>
import _ from 'lodash'

export default {

  name: 'singleButton',

  props: ['button'],

  computed: {
    displayButton () {
      let playerFlags = this.$store.state.playerFlags
      return _.every(this.button.conditional, function (subCondition) {
        let logicalOperators = {
          'is': function (parameter, value) {
            return parameter === value
          },
          'greaterThan': function (parameter, value) {
            return parameter > value
          },
          'lessThan': function (parameter, value) {
            return parameter < value
          }
        }
        logicalOperators[subCondition.condition](playerFlags[subCondition.flag], subCondition.value)
      })
    }
  },

  methods: {
    performActions: function (buttonActions) {
      let that = this
      let possibleActions = {
        'loadScreen': function (target) {
          that.$store.commit('setScreenToLoad', target)
        }
      }
      _.each(buttonActions, function (subAction) {
        possibleActions[subAction.type](subAction.target)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>