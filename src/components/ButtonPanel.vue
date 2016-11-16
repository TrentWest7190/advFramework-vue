<template>
<div id="button-panel">
    <button v-for="button in buttons">{{button.text}}</button>
</div>
</template>

<script>
import { buttonData } from '../data'
import _ from 'lodash'

export default {

  name: 'ButtonPanel',

  props: ['screenButtons'],

  data () {
    return {
      buttons: _.map(this.screenButtons, function (screenButton) {
        return _.merge(screenButton, _.find(buttonData, {'id': screenButton.id}))
      })
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