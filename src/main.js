import Vue from 'vue'
import App from './app'
import router from './router'
import treetable from './components/index.js'
import '../tools/iview/styles/iview.css'
import iview from 'iview'
import '../tools/jquery-ui/jquery-ui.js'

Vue.config.productionTip = true
Vue.use(treetable)
Vue.use(iview)
/* eslint no-unused-vars: "off" */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
