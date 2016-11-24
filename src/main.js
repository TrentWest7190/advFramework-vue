import Vue from 'vue'
import App from './App'
import store from './store'
import config from './config'
import VueResource from 'vue-resource'

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App },

  created () {
    this.$http.get('/static/stories/' + config.storyToLoad + '.json').then((response) => {
      console.log(response)
      store.commit('compileScreens', response.body)
      store.commit('compileFlags')
      store.commit('loadScreen', config.startScreenId)
    })
  }
})
