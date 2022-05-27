import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store.js'
import VueClipboard from 'vue-clipboard2'
import './vant.js'
import './fetch/axios.js'
import './utils/rem.js'
import './utils/filter.js'
import './assets/css/normalize.css'

Vue.config.productionTip = false

// Vue.prototype.$bus = new Vue();

Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')