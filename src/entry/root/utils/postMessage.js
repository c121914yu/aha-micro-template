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
  Array.from(window.frames).forEach(child => {
    child.postMessage(JSON.stringify({
      type: 'setGlobalData',
      data: buffer
    }), '*')
  })
  console.log(`共${ Array.from(window.frames).length }个子应用`)
}

export function getChildData() {
  return JSON.parse(JSON.stringify(buffer))
}
