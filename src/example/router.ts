import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/example/view/home.vue'
import BaseElement from '@/example/view/baseElement.vue'
import Simple from '@/example/view/simple.vue'
import AutoSizeTest from '@/example/view/autoSizeTest.vue'

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
          name: 'baseElement',
          component: BaseElement
        },
        {
          path: '/simple',
          name: 'simple',
          component: Simple
        },
        {
          path: '/autosize-test',
          name: 'autosize-test',
          component: AutoSizeTest
        }]
    }
  ]
})
