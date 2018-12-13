import mContentMenu from './m-context-menu.vue'
import Vue from 'vue'
import { removeMenu } from './menu'

/**
 * 创建一个单例右键菜单
 * @param $event 右键事件
 * @param items 菜单项:[{label:'菜单一',click(){}}]
 * */
mContentMenu.rightMenu = function (items, $event) {
  let x = $event.x
  let y = $event.y
  mContentMenu.removeMenu()
  const vueInstance = new Vue({
    render (h) {
      return h(mContentMenu, { props: { x: x, y: y, items: items } })
    }
  })
  window.nowMenu = vueInstance.$mount()
  document.body.appendChild(window.nowMenu.$el)
}
mContentMenu.removeMenu = removeMenu
export default mContentMenu
