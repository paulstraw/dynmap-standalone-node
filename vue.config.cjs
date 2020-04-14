const path = require('path')

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/frontend-refresh/' : '/',
  outputDir: 'client-dist',
  devServer: {
    port: 3001,
    proxy: 'http://localhost:3000'
  },
  chainWebpack: config => {
    // https://vuejsdevelopers.com/2019/03/18/vue-cli-3-rename-src-folder/
    config
      .entry('app')
      .clear()
      .add('./client/main.js')
      .end()

    config.resolve.alias.set('@', path.join(__dirname, './client'))
  }
}
