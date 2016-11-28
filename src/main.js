import Vue from 'vue'
import App from './App'
import store from './store'
import config from './config'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App },

  created () {
    store.dispatch('loadStory', config.storyToLoad)
  }
})
