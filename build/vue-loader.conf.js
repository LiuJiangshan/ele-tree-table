var utils = require('./utils')
var config = require('../config')
var isProduction = (process.env.NODE_ENV === 'example' || process.env.NODE_ENV === 'umd')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config[process.env.NODE_ENV].productionSourceMap
      : config[process.env.NODE_ENV].cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
