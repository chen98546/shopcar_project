import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './vant.js'
import './fetch/axios.js'
import './utils/rem.js'
import './utils/filter.js'
import store from './store/store.js'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')