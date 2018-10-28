import Vue from 'vue'
import router from './router/index'
import App from './App'
import axios from 'axios'
import Message from 'iview/src/components/message'
import ljsTreeTable from '../src/index.js'
import '../packages/default-theme/index.scss'

Vue.use(ljsTreeTable)
Message.config({top: 200})

Vue.prototype.axios = axios
axios.defaults.headers['Client-Type'] = 'web'
// static api
window.contentPath = './plm'
// window.contentPath = '/plm'
window.apiUrl = window.contentPath + '/api'
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

window.app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
