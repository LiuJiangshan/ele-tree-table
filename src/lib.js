import { installComponents } from './installUtils.js'
import ljsTreeTable from './lib/ljs-tree-table'
import mContextMenu from './lib/m-context-menu'

const components = {
  ljsTreeTable
}

let API

function install (Vue, option) {
  installComponents(API, Vue, option)
  Vue.prototype.$menu = mContextMenu
}

/** cdn引用方式安装 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default API = {name: 'ljs-tree-table', install, version: 0, ...components, components}
