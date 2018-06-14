const {join} = require('path')
const merge = require('webpack-merge')
const basicConfig = require('./webpack.base.config')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const resolve = dir => join(__dirname, '..', dir)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = merge(basicConfig, {
  entry: {
    app: './src/components/index.js'
  },
  devtool: false,
  output: {
    path: resolve('dist'),
    filename: 'index.js',
    library: 'LjsTreeTable',
    libraryTarget: 'umd'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: resolve('./')
    }),
    //gz压缩
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + ['js', 'css', 'svg', 'jpg', 'png', 'git', 'html'].join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})
