const aliasConfig = require('./alias.config.js')
const merge = require('webpack-merge')
module.exports = {
  configureWebpack: merge(aliasConfig),
  transpileDependencies: ['js-utils', 'element-ui'],
  assetsDir: 'static',
  devServer: {
    host: '0.0.0.0',
    port: 1215,
    open: true,
    watchContentBase: true
  }
}
