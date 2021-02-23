const aliasConfig = require('./alias.config.js')
const merge = require('webpack-merge')
module.exports = {
  publicPath: './',
  configureWebpack: merge(aliasConfig),
  css: { extract: true }
  // transpileDependencies: ['ele-tree-table']
}
