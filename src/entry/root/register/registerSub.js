import { setToken } from '@/utils/userManage'
import { setGlobalData } from '@root/utils/postMessage'
/* 子应用向基座postMessage */
const receiveCallback = {
  /**
   * 设置全局数据
   */
  setGlobalData,
  /**
   * 设置token
   */
  setToken: function(token) {
    console.log(token, '设置token')
    setToken(token)
    setChildGlobal({ token })
  },
  /**
   * 挂载路由上报事件，获取当前路由的参数
   * @param {Object} data 路由数据
   */
  reportRoute: function(data) {
    console.log('路由数据', data)
    /* 修改基座的路由参数 */
    Vue.prototype.$storesCommit('setNavParam', {
      showLeft: true,
      routeName: data.name,
    })
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
    const { type, data } = JSON.parse(event.data)

    console.log('收到子应用信息', { type, data })

    typeof receiveCallback[ type ] === 'function' && receiveCallback[ type ](data)
  } catch (err) { err }
})

