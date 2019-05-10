const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@src': resolve('src'),
      '@example': resolve('example')
    }
  }
}
