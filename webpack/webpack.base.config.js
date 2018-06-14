const {join} = require('path')
const resolve = dir => join(__dirname, '..', dir)
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
          // 'eslint-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      // {
      //   enforce: 'pre',
      //   test: /\.vue$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          name: 'font/ljs_[name][contenthash:8].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/ljs_[name][contenthash:8].[ext]'
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/ljs_[name].[contenthash:8].css',
      allChunks: true
    })],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.less', '.scss'],
    modules: [resolve('src'), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~src': resolve('src'),
      '~components': resolve('src/components'),
      '~pages': resolve('src/pages'),
      '~assets': resolve('src/assets'),
      '~store': resolve('src/store'),
      '~static': resolve('src/static')
    }
  }
}
