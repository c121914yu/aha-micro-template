console.log('===全局注册方法===')

/* element相关全局方法，挂载在 */
import { Message, MessageBox, Loading } from 'element-ui'
import store from '@/store'
let loadingInstance

/**
 * 是否为开发环境
 */
Vue.prototype.$isDev = function() {
  return process.env.NODE_ENV === 'development'
}
/**
 * 全屏加载动画
 */
Vue.prototype.$loading = function(msg = '', showBg = true, dom = null) {
  Vue.prototype.$hideLoading()
  loadingInstance = Loading.service({
    target: dom,
    lock: true,
    text: msg,
    background: showBg ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0,0,0,0)',
  })
}
Vue.prototype.$hideLoading = function() {
  if (loadingInstance) {
    loadingInstance.close()
  }
}

/**
 * 轻提醒弹窗
 */
Vue.prototype.$success = function(msg, duration = 3000) {
  Message({
    message: msg,
    type: 'success',
    duration
  })
}
Vue.prototype.$warn = function(msg, duration = 3000) {
  Message({
    message: msg,
    type: 'warning',
    duration
  })
}
Vue.prototype.$error = function(msg, duration = 3000) {
  Message({
    message: msg,
    type: 'error',
    duration
  })
}

/**
 * 确认提示框
 * @param {String}  msg 提示内容
 * @param {Function}  success 确认后执行内容
 * @param {Function}  fail 取消后执行内容
 */
Vue.prototype.$confirm = function(msg, success, fail = null) {
  MessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  })
    .then(success)
    .catch(fail)
}

/**
 * 根据name跳转路由
 * @param {String} name 路由名
 */
Vue.prototype.$pushTo = function(name) {
  window.$router.push({ name })
}
/**
 * 根据name跳转路由
 * @param {String} name 路由名
 */
Vue.prototype.$replaceTo = function(name) {
  window.$router.replace({ name })
}

/**
 * 批量设置data
 * @param {Object} parmas
 */
Vue.prototype.$setData = function(parmas) {
  for (const key in parmas) {
    this[ key ] = parmas[ key ]
  }
}

/**
 * 获取对应桶state值
 * @param {String} name 存储桶名称
 * @param {String} key key值
 */
Vue.prototype.$getState = function(name, key) {
  const stores = store()

  // eslint-disable-next-line no-prototype-builtins
  if (stores.state.hasOwnProperty(name) && stores.state[ name ].hasOwnProperty(key)) {
    return stores.state[ name ][ key ]
  }
  return ''
}

/**
 * 获取对应桶getter值
 * @param {String} name getters名
 */
Vue.prototype.$storesGet = function(name) {
  const stores = store()

  // eslint-disable-next-line no-prototype-builtins
  if (stores.getters.hasOwnProperty(name)) {
    return stores.getters[ name ]
  }
  return ''
}

/**
 * commit方法
 * @param {String} name commit方法名！！
 * @param {Any} params 参数
 */
Vue.prototype.$storesCommit = function(name, params) {
  const stores = store()

  stores.commit(name, params)
}
/**
 * actions方法
 * @param {String} name action方法名!!
 * @param {Any} params 参数
 */
Vue.prototype.$storesAction = function(name, params) {
  const stores = store()

  return stores.dispatch(name, params)
}
