// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './components/assets/style.less'
// import './components/Tree/LjsTreeTable/style.less'
//import iView from 'iview'

Vue.config.productionTip = false

// Vue.use(iView)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
