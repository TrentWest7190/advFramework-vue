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
      return utilFuncs.checkConditions(playerFlags, playerInventory, this.button.conditional)
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
button {
  width: 25%;
  height: 50%;
  text-align: center;
  border: 1px solid red;
  float: left;
  outline: none;
}
</style>