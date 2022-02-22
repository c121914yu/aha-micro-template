export default {
  state: () => {
    return {
      loading: false, // 请求中
      requestingNum: 0, // 正在进行的请求
    }
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    addRequestingNum(state) {
      state.requestingNum++
    },
    subRequestingNum(state) {
      state.requestingNum--
    }
  },
}
