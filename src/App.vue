<template>
  <div id="app">
  <PanelText></PanelText>
  </div>
</template>

<script>
import PanelText from './components/PanelText'

export default {
  name: 'app',
  components: {
    PanelText
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
