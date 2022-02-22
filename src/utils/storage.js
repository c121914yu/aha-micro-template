/* 本地存储封装 */
/**
 * 设置本地缓存
 * @param {String} key
 * @param {String} data
 * @param {Boolean} tempory 是否临时缓存
 */
export function setStorage(key, data = '', tempory = false) {
  if (tempory) {
    sessionStorage.setItem(key, data)
  } else {
    localStorage.setItem(key, data)
  }
}

/**
 * 获取缓存，先从sessionStorage中获取，若为空，再从localStorage中获取
 * @param {String} key
 * @return {String}
 */
export function getStorage(key) {
  let data = sessionStorage.getItem(key)

  if (!data) {
    data = localStorage.getItem(key)
  }
  return data
}

/**
 * 同时清除sessionStorage和localStorage缓存
 * @param {String} key
 */
export function clearStorage(key) {
  sessionStorage.removeItem(key)
  localStorage.removeItem(key)
}

/**
 * 清除所有缓存
 */
export function clearAllStorage() {
  sessionStorage.clear()
  localStorage.clear()
}

/**
 * 设置cookie
 * @param {String} name
 * @param {String} value
 * @param {String} exdays
 */
export function setCookie(name, value = '', exdays = 30) {
  const d = new Date()

  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()

  document.cookie = name + '=' + value + '; ' + expires
}
// 获取cookie
export function getCookie(name) {
  name = name + '='

  const cookies = document.cookie.split(';')

  const cookie = cookies.find(item => {
    item = item.trim()
    if (item.startsWith(name)) {
      return true
    }
    return false
  })

  if (cookie) {
    return cookie.substr(cookie.indexOf('=') + 1)
  }
  return ''
}
// 清除cookie
export function clearCookie(name) {
  setCookie(name, '', -1)
}
