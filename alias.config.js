const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@e2e': resolve('tests/e2e/')
    }
  }
}
