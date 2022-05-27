const {
  defineConfig
} = require('@vue/cli-service')


module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/assets/scss/common.scss";`
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  lintOnSave: false,
  transpileDependencies: true,
  publicPath: "./",

})