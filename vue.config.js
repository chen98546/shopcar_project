const {
  defineConfig
} = require('@vue/cli-service')


module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData : `@import "~@/assets/scss/common.scss";`
      }
    }
  },
  lintOnSave: false,
  transpileDependencies: true,
  publicPath: "./",
})