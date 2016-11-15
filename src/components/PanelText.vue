<template>
<div>{{ test }}</div>
</template>

<script>
import { textData } from '../data'
console.log(textData)
export default {

  name: 'panel-text',

  data () {
    return {
      test: 'test'
    }
  }
}
</script>

<style lang="css" scoped>
</style>