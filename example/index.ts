import Vue from 'vue'
import App from '@example/app.vue'
import router from '@example/router'
import elementUi from 'element-ui'

Vue.use(elementUi)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
