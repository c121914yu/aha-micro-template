export default {
  state: () => {
    return {
      showLeft: true,
      selectApp: {
        activeApp: '', // 活跃的app
        host: '', // 主机地址。主机+活跃app=选中对应的子应用
        name: '', // 子应用名
        path: '', // 子应用内的路由地址
      },
      routeName: '', // 当前路由名
      loadTimer: null
    }
  },
  mutations: {
    setNavParam(state, data = {}) {
      for (const key in data) {
        state[ key ] = data[ key ]
      }
      clearTimeout(state.loadTimer)
    },
    clearLoadTimer(state) {
      clearTimeout(state.loadTimer)
    },
    /**
     * 加载iframe的定时器，超过3s后关闭加载动画
     */
    setLoadTimer(state) {
      state.loadTimer = setTimeout(() => {
        Vue.prototype.$hideLoading()
        Vue.prototype.$warn('加载页面失败')
      }, 3000)
    }
  }
}
