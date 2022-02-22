/* 注册当前文件夹内容 */
import '@/register'

const context = require.context('./', true, /\.js$/)
const urls = context.keys().filter(item => item !== './index.js')

urls.forEach(url => {
  context(url)
})
