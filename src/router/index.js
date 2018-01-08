import Vue from 'vue'
import Router from 'vue-router'
import test from '../view/test.vue'
import LjsContextMenuTest from '../view/LjsContextMenuTest.vue'
import LjsExpandTest from '../view/LjsExpandTest.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: test
    },
    {
      path: '/LjsContextMenuTest',
      name: 'LjsContextMenuTest',
      component: LjsContextMenuTest
    },
    {
      path: '/LjsExpandTest',
      name: 'LjsExpandTest',
      component: LjsExpandTest
    }
  ]
})
