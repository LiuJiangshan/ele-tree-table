require('./check-versions')()

process.env.NODE_ENV = 'umd'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.umd.conf')

const spinner = ora('正在编译umd库...')
spinner.start()

rm(path.join(config[process.env.NODE_ENV].assetsRoot, config[process.env.NODE_ENV].assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: Now you are ready to publish your library to npm.\n' +
      '  Then users can import it as an es6 module: import ljsTreeTable from \'ljs-tree-table\'\n'
    ))
  })
})
