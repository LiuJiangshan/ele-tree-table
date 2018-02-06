import Vue from 'vue'
import App from './app'
import router from './router'
import treetable from './components/index.js'
import LjsInput from './components/LjsTreeTable/LjsInput.vue'
import LjsDiv from './components/LjsTreeTable/LjsDiv.vue'

Vue.config.productionTip = true
Vue.use(treetable)
Vue.component('LjsDiv', LjsDiv)
Vue.component('LjsInput', LjsInput)
/* eslint no-unused-vars: "off" */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
