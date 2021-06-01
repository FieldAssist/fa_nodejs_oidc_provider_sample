// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../server/dist/client'),
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
