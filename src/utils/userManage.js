import { setStorage, getStorage, clearStorage } from './storage'
import { postToken } from './postMessage'

/**
 * 获取用户Token
 * @returns token
 */
export function getToken() {
  return getStorage('aha_token') || ''
}

/**
 * 设置用户token
 * @param {String} token
 * @param {Boolean} report 是否上报token，如果是刷新的token则上报，下发修改的话不再上报
 */
export function setToken(token, report = false) {
  if (token !== getToken()) {
    if (window === top) { // 基座，则向所有子项目广播更新token
      Array.from(window.frames).forEach(child => {
        postToken(token, child)
      })
    } else if (report) { // 如果是子项目，且需要上报，则向基座发送修改token信息
      postToken(token, top)
    }
    setStorage('aha_token', token)
  }
}

/**
 * 清除用户token
 */
export function clearToken() {
  clearStorage('aha_token')
}

