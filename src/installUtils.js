export function installComponents (API, Vue, option = {debug: false}) {
  const log = function (msg) {
    if (option.debug) console.log(msg)
  }
  if (!API.install.installed) {
    log(`开始注册组件库>${API.name}`)
    for (let key in API.components) {
      let component = API.components[key]
      if (component.name) {
        Vue.component(component.name, component)
        log(`注册完成👌>${component.name}`)
      } else log(`为定义名称,不能组册该组件😂>${component}`)
    }
    API.install.installed = true
  } else log(`${API.name}>已经安装😂`)
}
