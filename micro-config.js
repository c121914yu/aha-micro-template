/* 静态数据 */
exports.css = [ // 通用css
  'https://unpkg.com/element-ui/lib/theme-chalk/index.css', // element主题
  'https://at.alicdn.com/t/font_2757021_7s2hwtb5mg7.css?spm=a313x.7781069.1998910419.43&file=font_2757021_7s2hwtb5mg7.css', // 阿里图标库
]
exports.js = [ // 优先同步加载的js
  'https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.min.js',
  'https://cdn.bootcdn.net/ajax/libs/vue-router/3.4.8/vue-router.min.js',
  'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',
  'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
  'https://unpkg.com/element-ui/lib/index.js', // element
  'https://cdn.staticfile.org/moment.js/2.24.0/moment.min.js', // moment时间转化
]
exports.deferJs = [ // 延迟执行的js
]

exports.externals = { // 不打包文件，'别名' : '原名'
  'Vue': 'Vue',
  'VueRouter': 'VueRouter',
  'Vuex': 'Vuex',
  'axios': 'axios',
  'moment': 'moment',
  'element-ui': 'ELEMENT',
}

/* 可打包环境 */
exports.envs = [
  { name: '测试环境', value: 'test' },
  { name: '生成环境', value: 'production' },
]

/* 打包的目录 */
exports.distPath = 'dist/'

/*
  发布相关数据, 发布环境应该和打包环境对称
  最终部署路径： ${webDir}/${入口目录名}
*/
exports.deployConfig = {
  projectName: 'Aha口袋后台管理系统', // 项目名
  test: {
    host: '1.116.111.206', // 服务器地址
    port: 22, // 服务器端口号
    webDir: '/home/web_project/wwwTest/ahaManagement', // 服务器部署路径（不可为空或'/'，不需要尾'/'）
  },
  production: {
    host: '1.116.111.206', // 服务器地址
    port: 22, // 服务器端口号
    webDir: '/home/web_project/wwwTest/ahaManagement', // 服务器部署路径（不可为空或'/'）
  }
}
