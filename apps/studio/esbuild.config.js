const path = require('path')

module.exports = {
  exclude: ['**/*.ico', '**/*.png', '**/*.jpg'],
  resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  alias: {
    '@assets': path.resolve(__dirname, '../../packages/assets')
  },
  externals: ['assets/*'],
  loader: {
    '.ico': 'file',
    '.png': 'file',
    '.jpg': 'file'
  }
}