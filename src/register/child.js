/* 子项目独有的接受postMessage方法 */
if (window !== top) {
  const receiveCallback = {
    /**
     * 设置全局数据
     */
    setGlobalData: (data) => {
      window.$data = JSON.parse(data)
      Vue.prototype.$storesCommit('initSuccess')
    }
  }

  /* 挂载iframe通信 */
  window.addEventListener('message', function(event) {
    try {
      const { type, data } = JSON.parse(event.data)

      console.log('收到基座信息', { type, data })

      typeof receiveCallback[ type ] === 'function' && receiveCallback[ type ](data)
    } catch (err) { err }
  })
}
