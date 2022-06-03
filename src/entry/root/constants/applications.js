const isDev = process.env.NODE_ENV === 'development'

/* 获取其他子项目配置文件 */
const context = require.context('@/entry/', true, /config\.json$/)
const urls = context.keys().filter(item => item !== './root/config.json')
const result = []

/* 遍历子项目的config文件进行自动注册 */
urls.forEach(url => {
  const { port } = context(url)
  const name = url.split('/')[ 1 ]

  result.push({
    name, // app名称
    host: isDev ? `http://localhost:${ port }` : `${ process.env.VUE_APP_ROOT }/${ name }`, // 子应用根访问路径
    activeApp: `/${ name }`
  })
})

/* 其他框架应用接后面 */
export default [
  ...result
]
