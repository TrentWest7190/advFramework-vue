<template>
  <div id="option-panel">
    <select v-model="selectedStory">
      <option v-for="story in storyList">{{ story }}</option>
    </select>
    <button v-on:click="loadStory()">load story</button>
    <select v-model="selectedScreen">
      <option v-for="screen in screens">{{ screen }}</option>
    </select>
    <button v-on:click="loadScreen()">load screen</button>
  </div>
</template>

<script>
import config from '../config'

export default {

  name: 'OptionPanel',

  data () {
    return {
      storyList: config.storyList
    }
  },

  computed: {
    screens () {
      return this.$store.getters.getScreenIds
    }
  },

  methods: {
    loadStory () {
      this.$store.dispatch('loadStory', this.selectedStory)
    },
    loadScreen () {
      this.$store.commit('loadScreen', this.selectedScreen)
    }
  }

}
</script>

<style lang="css" scoped>
#option-panel {
  box-sizing: border-box;
  border: 1px solid red;
  height: 100%;
}
</style>