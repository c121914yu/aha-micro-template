export default {
  state: () => {
    return {
      initFinish: false,
    }
  },
  mutations: {
    initSuccess(state) {
      state.initFinish = true
    },
  },
}
