import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => Promise.resolve((require('../index'))),
      children: [
        {
          path: 'LoadServerData',
          name: 'LoadServerData',
          component: () => Promise.resolve(require('../example/LoadServerData'))
        },
        {
          path: 'LoadLocalData',
          name: 'LoadLocalData',
          component: () => Promise.resolve(require('../example/LoadLocalData'))
        },
        {
          path: 'autoLine',
          name: 'autoLine',
          component: () => Promise.resolve(require('../example/autoLine'))
        },
        {
          path: 'border',
          name: 'border',
          component: () => Promise.resolve(require('../example/border'))
        },
        {
          path: 'SubmitAllChange',
          name: 'SubmitAllChange',
          component: () => Promise.resolve(require('../example/SubmitAllChange'))
        },
        {
          path: 'LjsContextMenuTest',
          name: 'LjsContextMenuTest',
          component: () => Promise.resolve(require('../test/LjsContextMenuTest'))
        },
        {
          path: 'LjsExpandTest',
          name: 'LjsExpandTest',
          component: () => Promise.resolve(require('../test/LjsExpandTest'))
        },
        {
          path: 'RateTest',
          name: 'RateTest',
          component: () => Promise.resolve(require('../test/RateTest'))
        },
        {
          path: 'ResizeTest',
          name: 'ResizeTest',
          component: () => Promise.resolve(require('../test/ResizeTest'))
        },
        {
          path: 'VueBindTest',
          name: 'VueBindTest',
          component: () => Promise.resolve(require('../test/VueBindTest'))
        },
        {
          path: 'VueRefTest',
          name: 'VueRefTest',
          component: () => Promise.resolve(require('../test/VueRefTest'))
        },
        {
          path: 'IviewInputTest',
          name: 'IviewInputTest',
          component: () => Promise.resolve(require('../test/IviewInputTest'))
        },
        {
          path: 'LjsInputTest',
          name: 'LjsInputTest',
          component: () => Promise.resolve(require('../test/LjsInputTest'))
        },
        {
          path: 'LjsTextAreaTest',
          name: 'LjsTextAreaTest',
          component: () => Promise.resolve(require('../test/LjsTextAreaTest'))
        },
        {
          path: 'mCheckBoxTest',
          name: 'mCheckBoxTest',
          component: () => Promise.resolve(require('../test/mCheckBoxTest.vue'))
        },
        {
          path: 'TreeNodeTest',
          name: 'TreeNodeTest',
          component: () => Promise.resolve(require('../test/TreeNodeTest.vue'))
        },
        {
          path: 'mExpandTest',
          name: 'mExpandTest',
          component: () => Promise.resolve(require('../test/mExpandTest.vue'))
        }
      ]
    }
  ]
})
