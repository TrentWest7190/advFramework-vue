<template>
  <div id="text-panel">
    <pre v-for="text in displayText">{{ text }}</pre>
  </div>
</template>

<script>
export default {

  name: 'TextPanel',

  props: ['textData'],

  computed: {
    displayText () {
      return this.textData.loadedText
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