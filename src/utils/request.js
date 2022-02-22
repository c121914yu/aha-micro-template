import { getToken, setToken, clearToken } from '@/utils/userManage'
import { notLogin } from '@/utils/postMessage'
import errCode from '@/constants/errResponse'
const aloneRequestList = {}

/**
 * 设置单独请求，会取消上次的请求
 */
function setAloneRequest(config) {
  const source = axios.CancelToken.source()

  if (typeof aloneRequestList[ config.url ] === 'function') {
    aloneRequestList[ config.url ]('取消请求')
  }
  aloneRequestList[ config.url ] = source.cancel
  config.cancelToken = source.token
  return config
}

/**
 * 请求开始
 */
function requestStart(config) {
  /* 设置全局请求参数 */
  Vue.prototype.$storesCommit('setLoading', true) // 全局请求状态，是否正在请求
  Vue.prototype.$storesCommit('addRequestingNum') // 全局正在进行的请求数量

  config.headers.Authorization = getToken()
  /* 有alone字段请求只能同时存在一条，旧请求会被取消 */
  if (config.alone) {
    config = setAloneRequest(config)
  }
  return config
}

/**
 * 请求成功,检查请求头
 */
function responseSuccess(response) {
  const config = response.config

  /* 请求结束，去掉单独请求记录 */
  if (config.alone) {
    aloneRequestList[ config.url ] = null
  }
  /* 如果有新的token，更新 */
  if (response.headers.authorization) {
    console.log('新token', response.headers.authorization)
    setToken(response.headers.authorization, true)
  }

  return response
}
/**
 * 响应数据检查
 */
function checkRes(res) {
  const data = res.data

  if (!data) {
    Vue.prototype.$error('服务器返回数据空')
  }

  return data
}

/**
 * 响应错误
 */
function responseError(err, url, data, config, method) {
  if (err.response) { // 有报错响应
    const res = err.response

    console.log('响应错误', res)
    /* token过期,判断请求token与本地是否相同，若不同需要重发 */
    if (res.data.code === 102 || res.data.code === 103) {
      /* 请求的token和本地token仍一致，说明token过期 */
      if (res.config.headers.Authorization === getToken()) {
        clearToken()
        notLogin()
      } else {
        console.log('重发')
        return request(url, data, config, method)
      }
    } else {
      Vue.prototype.$error(res.data.msg || errCode[ res.status ])
    }
  } else if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) { // 超时判断
    Vue.prototype.$error('请求超时')
  } else {
    Vue.prototype.$error('未知错误')
  }
  return Promise.reject(err)
}

/**
 * 请求结束
 */
function requestEnd() {
  /* 请求中数量-1 */
  Vue.prototype.$storesCommit('subRequestingNum')
  /* 如果请求数量等于0，关闭loading */
  if (Vue.prototype.$getState('requestStore', 'requestingNum') <= 0) {
    Vue.prototype.$storesCommit('setLoading', false)
  }
}

/* 创建请求实例 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 10000, // 超时时间
  headers: {
    'content-type': 'application/json',
  },
})

/* 请求拦截 */
instance.interceptors.request.use(requestStart, (err) => Promise.reject(err))
/* 响应拦截 */
instance.interceptors.response.use(responseSuccess, (err) => Promise.reject(err))

function request(url, data, config = {}, method) {
  /* 去空 */
  for (const key in data) {
    if (data[ key ] === null || data[ key ] === undefined) {
      delete data[ key ]
    }
  }
  return instance.request({
    url,
    method,
    data: method === 'GET' ? null : data,
    params: method === 'GET' ? data : null, // get请求不携带data，params放在url上
    ...config, // 用户自定义配置，可以覆盖前面的配置
  })
    .then(checkRes)
    .catch((err) => responseError(err, url, data, config, method))
    .finally(requestEnd)
}

/**
 * api请求方式
 * @param {String} url
 * @param {Any} params
 * @param {Object} config
 * @returns
 */
export function GET(url, params, config) {
  return request(
    url,
    params,
    config,
    'GET',
  )
}

export function POST(url, data, config) {
  return request(
    url,
    data,
    config,
    'POST',
  )
}

export function PUT(url, data, config) {
  return request(
    url,
    data,
    config,
    'PUT',
  )
}

export function DELETE(url, config) {
  return request(
    url,
    {},
    config,
    'DELETE',
  )
}
