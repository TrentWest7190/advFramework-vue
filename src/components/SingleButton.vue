<template>
<button v-if="buttonIsVisible" v-on:click="_button.performActions()">{{ button.text }}</button>
</template>

<script>
import Button from './constructs/Button'

export default {

  name: 'singleButton',

  props: ['button'],

  computed: {
    _button () {
      return new Button(this.button)
    },

    buttonIsVisible () {
      return this._button.checkCondition()
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