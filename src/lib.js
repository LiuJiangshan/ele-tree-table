import { installComponents } from './installUtils.js'
import LjsTreeTable from './lib/ljs-tree-table/LjsTreeTable'
import LjsTbody from './lib/ljs-tree-table/LjsTbody'
import LjsTr from './lib/ljs-tree-table/LjsTr'
import LjsInput from './lib/ljs-tree-table/LjsInput'
import LjsExpand from './lib/ljs-tree-table/LjsExpand'
import LjsCheckBox from './lib/ljs-tree-table/LjsCheckBox'
import LjsDeep from './lib/ljs-tree-table/LjsDeep'
import LjsTdHead from './lib/ljs-tree-table/LjsTdHead'
import LjsTextArea from './lib/ljs-tree-table/LjsTextArea'
import LjsContextMenu from './lib/ljs-tree-table/LjsContextMenu'

const components = {
  LjsTreeTable,
  LjsTbody,
  LjsTr,
  LjsInput,
  LjsExpand,
  LjsCheckBox,
  LjsDeep,
  LjsTdHead,
  LjsTextArea,
  LjsContextMenu
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
