console.log('===全局注册组件===')
try {
  const context = require.context('../components', true, /index\.vue$/)
  const urls = context.keys()// 获取相对路径

  const names = {}

  urls.forEach(url => {
    /* 获取到文件名 */
    const name = url.match(/\.\/(\S*)\/index/)[ 1 ]

    if (names[ name ]) {
      console.error('全局组件重名', name)
    } else {
      names[ name ] = 1
    }
    Vue.component(name, context(url).default)
  })
} catch (err) {
  console.error('没有全局组件文件夹')
}

