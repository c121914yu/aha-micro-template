/* message通信层分发 */

const receiveCallback = {
  /**
   * 挂载路由上报事件，获取当前路由的参数
   * @param {Object} data 路由数据
   */
  reportRoute: function(data) {
    console.log('路由数据', data)
    /* 修改基座的路由参数 */
    Vue.prototype.$storesCommit('setNavParam', {
      showLeft: data.meta.leftNav,
      activeNav: data.meta.activeLeft,
      routeName: data.name,
    })
    /* 修改url */
    Vue.prototype.$pushTo('Basic', { route: data.name })
    /* 关闭加载动画 */
    Vue.prototype.$hideLoading()
  },
  /**
   * 挂载跳转登录页事件
   */
  notLogin: function() {
    Vue.prototype.$storesCommit('loginOut', '登录凭证失效')
  },
  /**
   * 设置加载动画
   */
  setLoading: function({ loading, loadText }) {
    if (loading) {
      Vue.prototype.$showLoading(loadText)
    } else {
      Vue.prototype.$hideLoading()
    }
  },
}

/* 挂载iframe通信 */
window.addEventListener('message', function(event) {
  try {
    const data = JSON.parse(event.data)

    typeof receiveCallback[ data.type ] === 'function' && receiveCallback[ data.type ](data)
  } catch (err) { err }
})
