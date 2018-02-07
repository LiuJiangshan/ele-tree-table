import Vue from 'vue'
import Router from 'vue-router'
import index from '../docs/index.vue'
import LoadServerData from '../docs/LoadServerData.vue'
import LjsContextMenuTest from '../docs/LjsContextMenuTest.vue'
import LjsExpandTest from '../docs/LjsExpandTest.vue'
import RateTest from '../docs/RateTest.vue'
import ResizeTest from '../docs/ResizeTest.vue'
import VueBindTest from '../docs/VueBindTest.vue'
import VueRefTest from '../docs/VueRefTest.vue'
import IviewInputTest from '../docs/IviewInputTest.vue'
import LoadLocalData from '../docs/LoadLocalData.vue'

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
      path: '/LoadLocalData',
      name: 'LoadLocalData',
      component: LoadLocalData
    },
    {
      path: '/IviewInputTest',
      name: 'IviewInputTest',
      component: IviewInputTest
    }
  ]
})
