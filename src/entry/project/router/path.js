const context = require.context('../pages/', true, /index\.vue$/)
const routeName = {}
const routePath = {}

export default context.keys().map(key => {
  /* 取index的父级文件名作为路由名 */
  const keyArr = key.split('/')
  const pageConfig = context(key).default.route || {}

  /*
    计算路由路径：默认为相对于pages的路由
    每个数组的要满足小驼峰命名
  */
  const path = pageConfig.path || '/' + keyArr.slice(1, -1).map(item => item.replace(/./, (str) => str.toLowerCase())).join('/')

  if (routePath[ path ]) {
    console.error('路由路径重复', path)
  } else {
    routePath[ path ] = 1
  }

  /* 计算路由名 */
  const name = pageConfig.name || keyArr[ keyArr.length - 2 ]

  if (routeName[ name ]) {
    console.error('路由名重复', name)
  } else {
    routeName[ name ] = 1
  }

  /* 页面配置的路由数据 */
  return {
    path,
    name,
    ...pageConfig,
    component: context(key).default
  }
})
