<template>
<div id="text-panel">{{ displayText }}</div>
</template>

<script>
export default {

  name: 'TextPanel',

  props: ['textData'],

  computed: {
    displayText () {
      return this.textData.text
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