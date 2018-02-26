import Vue from 'vue'
import Router from 'vue-router'
import index from '../docs/index.vue'
import LoadServerData from '../docs/example/LoadServerData.vue'
import LoadLocalData from '../docs/example/LoadLocalData.vue'
import border from '../docs/example/border.vue'
import autoLine from '../docs/example/autoLine.vue'
import SubmitAllChange from '../docs/example/SubmitAllChange.vue'
import LjsContextMenuTest from '../docs/test/LjsContextMenuTest.vue'
import LjsExpandTest from '../docs/test/LjsExpandTest.vue'
import RateTest from '../docs/test/RateTest.vue'
import ResizeTest from '../docs/test/ResizeTest.vue'
import VueBindTest from '../docs/test/VueBindTest.vue'
import VueRefTest from '../docs/test/VueRefTest.vue'
import IviewInputTest from '../docs/test/IviewInputTest.vue'
import LjsInputTest from '../docs/test/LjsInputTest.vue'
import LjsTextAreaTest from '../docs/test/LjsTextAreaTest.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/LoadServerData',
      name: 'LoadServerData',
      component: LoadServerData
    },
    {
      path: '/LoadLocalData',
      name: 'LoadLocalData',
      component: LoadLocalData
    },
    {
      path: '/autoLine',
      name: 'autoLine',
      component: autoLine
    },
    {
      path: '/border',
      name: 'border',
      component: border
    },
    {
      path: '/SubmitAllChange',
      name: 'SubmitAllChange',
      component: SubmitAllChange
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
    },
    {
      path: '/RateTest',
      name: 'RateTest',
      component: RateTest
    },
    {
      path: '/ResizeTest',
      name: 'ResizeTest',
      component: ResizeTest
    },
    {
      path: '/VueBindTest',
      name: 'VueBindTest',
      component: VueBindTest
    },
    {
      path: '/VueRefTest',
      name: 'VueRefTest',
      component: VueRefTest
    },
    {
      path: '/IviewInputTest',
      name: 'IviewInputTest',
      component: IviewInputTest
    },
    {
      path: '/LjsInputTest',
      name: 'LjsInputTest',
      component: LjsInputTest
    },
    {
      path: '/LjsTextAreaTest',
      name: 'LjsTextAreaTest',
      component: LjsTextAreaTest
    }
  ]
})
