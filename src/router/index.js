import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../docs/index'),
      children: [
        {
          path: 'LoadServerData',
          name: 'LoadServerData',
          component: () => import('../docs/example/LoadServerData')
        },
        {
          path: 'LoadLocalData',
          name: 'LoadLocalData',
          component: () => import('../docs/example/LoadLocalData')
        },
        {
          path: 'autoLine',
          name: 'autoLine',
          component: () => import('../docs/example/autoLine')
        },
        {
          path: 'border',
          name: 'border',
          component: () => import('../docs/example/border')
        },
        {
          path: 'SubmitAllChange',
          name: 'SubmitAllChange',
          component: () => import('../docs/example/SubmitAllChange')
        },
        {
          path: 'LjsContextMenuTest',
          name: 'LjsContextMenuTest',
          component: () => import('../docs/test/LjsContextMenuTest')
        },
        {
          path: 'LjsExpandTest',
          name: 'LjsExpandTest',
          component: () => import('../docs/test/LjsExpandTest')
        },
        {
          path: 'RateTest',
          name: 'RateTest',
          component: () => import('../docs/test/RateTest')
        },
        {
          path: 'ResizeTest',
          name: 'ResizeTest',
          component: () => import('../docs/test/ResizeTest')
        },
        {
          path: 'VueBindTest',
          name: 'VueBindTest',
          component: () => import('../docs/test/VueBindTest')
        },
        {
          path: 'VueRefTest',
          name: 'VueRefTest',
          component: () => import('../docs/test/VueRefTest')
        },
        {
          path: 'IviewInputTest',
          name: 'IviewInputTest',
          component: () => import('../docs/test/IviewInputTest')
        },
        {
          path: 'LjsInputTest',
          name: 'LjsInputTest',
          component: () => import('../docs/test/LjsInputTest')
        },
        {
          path: 'LjsTextAreaTest',
          name: 'LjsTextAreaTest',
          component: () => import('../docs/test/LjsTextAreaTest')
        },
        {
          path: 'LjsLayoutTest',
          name: 'LjsLayoutTest',
          component: () => import('../docs/test/LjsLayoutTest')
        }
      ]
    }
  ]
})
