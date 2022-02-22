const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV !== 'development'
const {
  VUE_APP_ENTRY, // 入口字段, 对应项目文件夹名
  port, // 端口号
  distPath, // 打包路径
  externals, // 无需打包的三方包
  VUE_APP_ORIGIN, // 根地址
  pages // 页面
} = process.env

module.exports = {
  devServer: {
    port, // 端口
    https: false, // 启用https
    proxy: { // 配置跨域
      '/api': {
        target: 'https://open.ahapocket.cn/api',
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  publicPath: isProduction ? `${ VUE_APP_ORIGIN }/${ VUE_APP_ENTRY }/` : './', // 生产环境要绝对路径，否则子应用无法找到
  outputDir: distPath,
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  productionSourceMap: false, // 不需要生产环境的 source map
  configureWebpack: {
    output: {
      library: `${ VUE_APP_ENTRY }-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${ VUE_APP_ENTRY }`,
    },
    externals: JSON.parse(externals),
    performance: isProduction
      ? {
        hints: 'warning',
        maxEntrypointSize: 1000 * 500, // 入口起点的最大体积
        maxAssetSize: 1000 * 1000, // 生成文件的最大体积
        assetFilter: function(assetFilename) { // 只给出 js 文件的性能提示
          return assetFilename.endsWith('.js')
        }
      }
      : {},
    plugins: isProduction
      ? [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']// 移除console
            }
          }
        }), new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.json$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8, // 压缩比
          deleteOriginalAssets: false, // 是否删除源文件
        })
      ]
      : []
  },
  chainWebpack: (config) => {
    /* 别名配置，set第一个参数：设置的别名，第二个参数：设置的路径 */
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set(`@${ VUE_APP_ENTRY }`, path.join(__dirname, `src/entry/${ VUE_APP_ENTRY }`))

    if (isProduction) {
      /* webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete */
      config.optimization.delete('splitChunks')

      /* 压缩图片 */
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
    }
  },
  css: {
    loaderOptions: {
      sass: { // 全局scss注入
        prependData: `
          @import "@/styles/common.scss";
          @import "@${ VUE_APP_ENTRY }/styles/common.scss";
        `
      }
    }
  },
  pages: JSON.parse(pages),
}
