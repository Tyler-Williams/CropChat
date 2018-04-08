// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuefire from 'vuefire'
import { database } from './services/firebase'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(Vuefire)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  firebase: {
    cat: database.ref('cat').orderByChild('created_at')
  },
  router,
  template: '<App/>',
  components: { App }
})
