<template>
  <div id="text-panel">
    <SingleParagraph v-for="paragraph in textData" v-bind:paragraph="paragraph"></SingelParagraph>
  </div>
</template>

<script>
import SingleParagraph from './SingleParagraph'

export default {
  components: {
    SingleParagraph
  },

  name: 'TextPanel',

  props: ['textData']

}
</script>

<style lang="css" scoped>
#text-panel {
  box-sizing: border-box;
  height: 75%;
  border: 1px solid red;
}
</style>