/* postMessage中心 */

/**
 * 路由上报
 *
 */
export function reportRoute(data) {
  top.postMessage(JSON.stringify({
    type: 'reportRoute',
    ...data
  }), '*')
}

/**
 * 登录失效，跳转登录页
 */
export function notLogin() {
  top.postMessage(JSON.stringify({
    type: 'notLogin'
  }), '*')
}

/**
 * 调用基座全屏loading
 * @param {Boolean} loading 是否显示加载动画
 * @param {String} loadText
 */
export function basicLoad(loading = false, loadText = '') {
  top.postMessage(JSON.stringify({
    type: 'setLoading',
    loading,
    loadText
  }), '*')
}

/**
 * token修改上报
 * @param {String} token
 * @param {Window} 窗口对象
 */
export function postToken(token, that = top) {
  that.postMessage(JSON.stringify({
    type: 'setToken',
    token
  }), '*')
}
