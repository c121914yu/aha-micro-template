/* 注册通用的message */
import { setToken } from '@/utils/userManage'

const messageMap = {
  /**
   * 设置token
   */
  setToken: function({ token }) {
    token && setToken(token, false)
  }
}
/* 挂载iframe通信 */

window.addEventListener('message', function(event) {
  try {
    const data = JSON.parse(event.data)

    typeof messageMap[ data.type ] === 'function' && messageMap[ data.type ](data)
  } catch (err) { err }
})
