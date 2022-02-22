/* 注册当前文件夹内容 */
const context = require.context('./', false, /\.js$/)
const urls = context.keys().filter(item => item !== './index.js')

urls.forEach(url => {
  context(url)
})
