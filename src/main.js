import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './vant.js'
import './utils/rem.js'
import './fetch/axios.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')