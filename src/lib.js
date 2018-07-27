import { installComponents } from './installUtils.js'
import treeTable from './lib/ljs-tree-table/ljs-tree-table'

const components = {
  treeTable
}

let API

function install (Vue, option) {
  installComponents(API, Vue, option)
}

/** cdn引用方式安装 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default API = {name: 'ljs-tree-table', install, version: 0, ...components, components}
