let timer = null

export default {
  state: () => {
    return {
      time: 0,
      canSend: true,
    }
  },
  getters: {
    getCodeText(state) {
      if (state.time <= 0) {
        return '发送验证码'
      }
      if (state.time < 10) {
        return `0${ state.time }s后重新获取`
      }
      return `${ state.time }s后重新获取`
    }
  },
  mutations: {
    startSend(state) {
      if (state.time <= 0) {
        state.time = 60
        state.canSend = false
        timer = setInterval(() => {
          state.time--
          if (state.time <= 0) {
            clearInterval(timer)
            state.canSend = true
          }
        }, 1000)
      }
    }
  },
}
