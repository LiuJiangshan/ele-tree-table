import LjsTreeTable from './LjsTreeTable/LjsTreeTable'
import LjsTbody from './LjsTreeTable/LjsTbody'
import LjsTr from './LjsTreeTable/LjsTr'
import LjsInput from './LjsTreeTable/LjsInput'
import LjsExpand from './LjsTreeTable/LjsExpand'
import LjsCheckBox from './LjsTreeTable/LjsCheckBox'
import LjsDeep from './LjsTreeTable/LjsDeep'
import LjsTdHead from './LjsTreeTable/LjsTdHead'
import LjsTextArea from './LjsTreeTable/LjsTextArea'
import LjsContextMenu from './LjsTreeTable/LjsContextMenu'
// import LjsLayout from './LjsLayout/LjsLayout'

function install (Vue) {
  Vue.component(LjsTreeTable.name, LjsTreeTable)
  Vue.component(LjsTbody.name, LjsTbody)
  Vue.component(LjsTr.name, LjsTr)
  Vue.component(LjsInput.name, LjsInput)
  Vue.component(LjsExpand.name, LjsExpand)
  Vue.component(LjsCheckBox.name, LjsCheckBox)
  Vue.component(LjsDeep.name, LjsDeep)
  Vue.component(LjsTdHead.name, LjsTdHead)
  Vue.component(LjsTextArea.name, LjsTextArea)
  Vue.component(LjsContextMenu.name, LjsContextMenu)
  // Vue.component(LjsLayout.name, LjsLayout)
}

const out = {install, 'version': '1.0'}
export default out