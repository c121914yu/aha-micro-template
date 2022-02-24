export default {
  state: () => {
    return {
      showLeft: true,
      routeName: '', // 当前路由名
      selectApp: { // 选中的子应用
        activeApp: '', // 活跃的app
        host: '', // 主机地址。主机+活跃app=选中对应的子应用
        name: '', // 子应用名
        path: '', // 子应用内的路由地址
      },
    }
  },
  mutations: {
    setNavParam(state, data = {}) {
      for (const key in data) {
        state[ key ] = data[ key ]
      }
    }
  }
}
