/* 注册全局开发资源 */
import '@/register'

/* 注册当前文件夹内容 */
const context = require.context('./', true, /\.js$/)
const urls = context.keys().filter(item => item !== './index.js')

urls.forEach(url => {
  context(url)
})
