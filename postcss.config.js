// // postcss.config.js
// module.exports = {
//     plugins: {
//         // postcss-pxtorem 插件的版本需要 >= 5.0.0
//         'postcss-pxtorem': {
//             rootValue({
//                 file
//             }) {
//                 return file.indexOf('vant') !== -1 ? 37.5 : 75;
//             },
//             propList: ['*'],
//         },
//     },
// };

module.exports = () => ({
    plugins: [
      require('autoprefixer')(),
      // require('postcss-px2rem')({ remUnit: 75 })
      require('postcss-pxtorem')({
        rootValue: 37.5,
        propList: ['*']
      })
    ]
  })