import { setStorage, getStorage, clearStorage } from './storage'
import { postToken } from './postMessage'

/**
 * 获取用户Token
 */
export function getToken() {
  if (window === top) {
    return getStorage('aha_token') || ''
  } else {
    return window.$data.token || ''
  }
}

/**
 * 设置用户token
 * @param {String} token
 */
export function setToken(token) {
  if (token !== getToken()) {
    if (window !== top) { // 子应用，触发基座修改token
      postToken('')
      window.$data.token = token
    } else { // 基座，修改本地缓存
      setStorage('aha_token', token)
    }
  }
  return token
}

/**
 * 清除用户token
 */
export function clearToken() {
  if (window === top) {
    clearStorage('aha_token')
  } else {
    window.$data.token = ''
  }
  postToken('null')
}
