import { setToken, clearToken } from '@/utils/userManage'
import { userInfo as mockUserInfo } from '@root/constants/mock'
import { qs } from '@/utils/param'

export default {
  state: () => {
    return {
      isLogined: false,
      userInfo: {}
    }
  },
  getters: {
    /**
     * 获取管理员信息
     * @param {String} key 指定字段
     */
    getAdminInfo(state) {
      return JSON.parse(JSON.stringify(state.userInfo))
    }
  },
  mutations: {
    /**
     * 设置用户信息
     * @param {Object} userInfo
     */
    setUserInfo(state, userInfo) {
      state.userInfo = {
        ...state.userInfo,
        ...userInfo
      }
    },
    /**
     * 登录成功，验证码登录或者自动登录
     * @param {Object} userInfo 用户信息
     * @param {String} token 用户凭证
     */
    loginSuccess(state, { userInfo, token }) {
      if (token) {
        setToken(token)
      }
      state.userInfo = userInfo
      Vue.prototype.$success('登录成功')
      state.isLogined = true
    },
    /**
     * 退出登录
     */
    loginOut(state, msg = '') {
      clearToken()
      state.userInfo = {}
      state.isLogined = false
      Vue.prototype.$hideLoading()
      Vue.prototype.$warn(msg)
      Vue.prototype.$pushTo('Login')
    },
  },
  actions: {
    autoLogin({ commit }) {
      return commit('loginSuccess', {
        userInfo: mockUserInfo,
      })
    }
  }
}
