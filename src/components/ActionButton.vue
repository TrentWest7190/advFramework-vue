<template>
<button v-if="buttonIsVisible" v-on:click="performAction">{{ button.text }}</button>
</template>

<script>
import Button from './constructs/Button'

export default {

  name: 'actionButton',

  props: ['button'],

  computed: {
    _button () {
      return new Button(this.button)
    },

    buttonIsVisible () {
      if (this._button.hasChildren()) {
        return this._button.checkChildrenConditions()
      } else {
        return this._button.checkCondition()
      }
    }
  },

  methods: {
    performAction () {
      if (this._button.hasChildren()) {
        this.$emit('loadChildren', this._button)
      } else {
        this._button.performActions()
      }
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