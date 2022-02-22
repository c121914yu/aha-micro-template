/**
 * 解析路径参数
 * @param {String} str
 * @returns
 */
export function qs(str = window.location.href) {
  let params = str.split('?') // 截取?号后的字符串即name=itclanCoder&study=css

  if (params.length > 1) {
    params = params[ 1 ]
    const param = params.split('&') // 通过&符号进行分割即["name=itclanCoder", "study=css"]
    const obj = {} // 用一个对象存储目标值

    for (let i = 0; i < param.length; i++) {
      // 循环遍历截取出来的param数组
      const paramsA = param[ i ].split('=') // 通过split,=继续对数组params每一项进行分割,生成数组["name", "itclanCoder"]
      const key = paramsA[ 0 ] // 取数组项["name", "itclanCoder"]中第0位,即name
      const value = paramsA[ 1 ] // 取数组项["name", "itclanCoder"]中第1位,即itclanCoder

      obj[ key ] = value
    }
    return obj
  }
  return {}
}
/**
 * 对象转路由query
 * @param {Boolean} hasMask 是否有问号
 */
export function objToQeury(obj, hasMask = true) {
  let param = hasMask ? '?' : ''

  for (const key in obj) {
    if (obj[ key ] !== undefined && obj[ key ] !== null) {
      param += `${ key }=${ obj[ key ] }&`
    }
  }
  return param.slice(0, -1)
}
