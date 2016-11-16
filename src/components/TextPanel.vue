<template>
<div id="text-panel">{{ displayText }}</div>
</template>

<script>
import { textData } from '../data'
import _ from 'lodash'

export default {

  name: 'TextPanel',

  props: ['textId'],

  data () {
    return {
      displayText: _.find(textData, {'id': this.textId})
    }
  }
}
</script>

<style lang="css" scoped>
#text-panel {
  box-sizing: border-box;
  height: 75%;
  border: 1px solid red;
}
</style>