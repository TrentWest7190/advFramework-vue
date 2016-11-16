<template>
<div id="button-panel">
    <singleButton v-for="button in buttonData" v-bind:button="button"></singleButton>
</div>
</template>

<script>
import SingleButton from './SingleButton'
import _ from 'lodash'

export default {

  name: 'ButtonPanel',
  components: {
    SingleButton
  },

  props: ['buttonData'],

  methods: {
    test (button) {
      console.log(button)
    }
  }
}
</script>

<style lang="css" scoped>
#button-panel {
    box-sizing: border-box;
    height: 25%;
    border: 1px solid red;
}
</style>