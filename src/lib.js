import LjsTreeTable from './lib/LjsTreeTable/LjsTreeTable'
import LjsTbody from './lib/LjsTreeTable/LjsTbody'
import LjsTr from './lib/LjsTreeTable/LjsTr'
import LjsInput from './lib/LjsTreeTable/LjsInput'
import LjsExpand from './lib/LjsTreeTable/LjsExpand'
import LjsCheckBox from './lib/LjsTreeTable/LjsCheckBox'
import LjsDeep from './lib/LjsTreeTable/LjsDeep'
import LjsTdHead from './lib/LjsTreeTable/LjsTdHead'
import LjsTextArea from './lib/LjsTreeTable/LjsTextArea'
import LjsContextMenu from './lib/LjsTreeTable/LjsContextMenu'
import LjsLayout from './lib/LjsLayout/LjsLayout'

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
  LjsContextMenu,
  LjsLayout
}

function install (Vue, Opt = {debug: false}) {
  if (install.installed) return
  for (let key in components) {
    if (Opt.debug) console.log('install:' + key)
    let component = components[key]
    if (Opt.debug) console.log('name:' + component.name)
    Vue.component(component.name, component)
    if (Opt.debug) console.log('end:' + component.name)
  }
}

const API = {install, version: 0, components}
export default API
