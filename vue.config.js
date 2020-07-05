const path = require('path')
const isProdMode = process.env.NODE_ENV === 'production'
/**
 * webpack的路径都是拼接的
 */
const config = {
  outputDir: 'dist', // 运行时生成的生产环境构建文件的目录
  publicPath: process.env.NODE_ENV === 'production'?
  '/monitor/': '/', // 应用部署在**/monitor/上
  assetsDir: './', // 给打包后的静态文件加上monitor前缀便于反向代理,css放入了monitor中
  css: {},
  filenameHashing: false,
  pluginOptions: {
    multipleModulesSingleRoutes: {
      useHash: false
    }
  }
}
if (!isProdMode) {
  config.css.extract = false
}

config.chainWebpack = webpackConfig => {
  webpackConfig.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
}
config.configureWebpack = () => ({
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js` // 给打包后的静态文件加上monitor前缀便于反向代理
  },
  plugins: [
  ]
})

module.exports = config
