import Vue from 'vue'
import Router from 'vue-router'
import Simple from '@/example/view/simple.vue'
import BaseElement from '@/example/view/baseElement.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/simple',
      name: 'simple',
      component: Simple
    },
    {
      path: '/base-element',
      name: 'baseElement',
      component: BaseElement
    }
  ]
})
