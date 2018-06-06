import Vue from 'vue'
import App from './app'
import router from './router'
import treetable from './components/index.js'
import '../tools/iview/styles/iview.css'
import iview from 'iview'
import axios from 'axios'

Vue.use(iview)

window.axios = axios
axios.defaults.headers['Client-Type'] = 'web'
window.contentPath = './plm'
window.apiUrl = window.contentPath + '/api'
window.axios.interceptors.response.use(response => {
  if (response.data.ok) window.app.$Message.success(response.data.msg)
  else window.app.$Message.error(response.data.msg)
  return response
}, error => {
  let status = error.response.status
  if (error && error.response.data.msg) window.app.$Message.info(status + ':' + error.response.data.msg)
  switch (status) {
    default:
      window.app.$Message.error('与服务器通信失败:' + error.message)
      return Promise.reject(error)
  }
})

Vue.config.productionTip = true
Vue.use(treetable)
/* eslint no-unused-vars: "off" */

window.axios({
  method: 'POST',
  url: window.apiUrl + '/user/login',
  params: {userName: 'user', passWord: '1234'}
}).catch(function () {
  window.app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
  })
})
