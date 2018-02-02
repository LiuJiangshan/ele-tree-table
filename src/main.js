import Vue from 'vue'
import App from './app'
import router from './router'
import treetable from './components/index.js'
import LjsInput from './components/LjsTreeTable/LjsInput.vue'
import LjsDiv from './components/LjsTreeTable/LjsDiv.vue'
// import iView from 'iview'
import TreetableSelect from './components/treetable-select.vue'
// import 'iview/dist/styles/iview.css'

Vue.config.productionTip = true
Vue.use(treetable)
// Vue.use(iView)
Vue.component('treetable-select', TreetableSelect)
Vue.component('LjsDiv', LjsDiv)
Vue.component('LjsInput', LjsInput)
/* eslint no-unused-vars: "off" */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
