const {join} = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const basicConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const resolve = dir => join(__dirname, '..', dir)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(basicConfig, {
  entry: {
    'js/app': './src/main.js'
    // 'js/vendor': ['vue', 'vue-router'],
    // 'js/vue': 'vue',
    // 'js/vue-router': 'vue-router',
    // 'js/dateformat': 'dateformat',
    // '/js/jquery': 'jquery',
    // '/js/jquery-ui': 'jquery-ui',
    // '/js/LjsTreeTable': './src/components/index.js'
  },
  devtool: false,
  output: {
    path: resolve('docs'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'js/ljs_[name].[chunkhash:8].js',
    publicPath: './'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: '/js/common' // 指定公共 bundle 的名称。
    // }),
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(['docs'], {
      root: resolve('./')
    })
  ]
})
