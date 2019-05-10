import Vue from 'vue'
import Router from 'vue-router'
import Home from '@example/view/home.vue'
import BaseElement from '@example/view/base-element.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Home,
      children: [
        {
          path: '/base-element',
          name: 'base-element',
          component: BaseElement
        }]
    }
  ]
})
