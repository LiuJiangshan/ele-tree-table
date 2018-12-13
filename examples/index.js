import Vue from 'vue'
import router from './router/index'
import app from './app'
import axios from 'axios'
import Message from 'iview/src/components/message'
import ljsTreeTable from '../src/index.js'
import '../packages/default-theme/index.scss'
// import vuetify from './vuetify.js'
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(vuetify)
Vue.use(ljsTreeTable)
Message.config({ top: 200 })

Vue.prototype.axios = axios
axios.defaults.headers['Client-Type'] = 'web'
window.apiUrl = '/api'
axios.interceptors.response.use(response => {
  if (response.data.ok) {
    Message.success(response.data.msg)
  } else {
    Message.error(response.data.msg)
  }
  return response
}, error => {
  let status = error.response.status
  if (error && error.response.data.msg) Message.info(status + ':' + error.response.data.msg)
  switch (status) {
    default:
      Message.error('与服务器通信失败:' + error.message)
      return Promise.reject(error)
  }
})
new Vue({
  router,
  render: h => h(app)
}).$mount('#app')
