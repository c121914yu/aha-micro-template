console.log('===局部注册组件===')
try {
  const context = require.context('../components', true, /index\.vue$/)
  const urls = context.keys()// 获取相对路径

  const names = {}

  console.log(urls)

  urls.forEach(url => {
    /* 获取到文件名 */
    const name = url.match(/\.\/(\S*)\/index/)[ 1 ]

    if (names[ name ]) {
      console.error('局部组件重名', name)
    } else {
      names[ name ] = 1
    }
    Vue.component(name, context(url).default)
  })
} catch (err) {
  console.error('没有局部组件文件夹')
}

