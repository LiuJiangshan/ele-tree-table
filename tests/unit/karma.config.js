var webpackConfig = require('../../node_modules/@vue/cli-service/webpack.config.js')

module.exports = function (config) {
  config.set({

    browsers: ['Chrome'],

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      './index.js'
    ],

    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },

    autoWatch: true,

    autoWatchBatchDelay: 100,

    singleRun: false,

    webpack: webpackConfig,
    client: {
      client: {
        clearContext: false
      }
    },
    color: true,
    reporters: ['spec']
  })
}
