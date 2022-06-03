/**
 * 向子应用发送数据
 */
import { getToken } from '@/utils/userManage'

let buffer = {
  token: getToken() || '', // token
}

export default function(data = {}) {
  buffer = {
    ...buffer,
    ...data
  }
  setChildGlobalData()
}

export function setChildGlobalData() {
  Array.from(window.frames).forEach(child => {
    child.postMessage(JSON.stringify({
      type: 'setGlobalData',
      data: JSON.stringify(buffer)
    }), '*')
  })
}
