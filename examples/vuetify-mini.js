import OurVue from 'vue'
import application from 'vuetify/lib/components/Vuetify/mixins/application'
import breakpoint from 'vuetify/lib/components/Vuetify/mixins/breakpoint'
import theme from 'vuetify/lib/components/Vuetify/mixins/theme'
import icons from 'vuetify/lib/components/Vuetify/mixins/icons'
import options from 'vuetify/lib/components/Vuetify/mixins/options'
import genLang from 'vuetify/lib/components/Vuetify/mixins/lang'
import goTo from 'vuetify/lib/components/Vuetify/util/goTo'
// Utils
import { consoleError } from 'vuetify/lib/util/console'
var VuetifyMini = {
  install: function install (Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

    if (this.installed) return
    this.installed = true
    if (OurVue !== Vue) {
      consoleError('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this')
    }
    var lang = genLang(opts.lang)
    Vue.prototype.$vuetify = new Vue({
      mixins: [breakpoint],
      data: {
        application: application,
        dark: false,
        icons: icons(opts.iconfont, opts.icons),
        lang: lang,
        options: options(opts.options),
        rtl: opts.rtl,
        theme: theme(opts.theme)
      },
      methods: {
        goTo: goTo,
        t: lang.t.bind(lang)
      }
    })
    if (opts.directives) {
      for (var name in opts.directives) {
        Vue.directive(name, opts.directives[name])
      }
    }
  },
  version: '1.3.4'
}
export default VuetifyMini
// # sourceMappingURL=index.js.map
