/* 子项目独有的部分 */
import { setToken } from '@/utils/userManage'
import { qs } from '@/utils/param'

if (window !== top) {
  /* 首次进入检查路径有无token，有则写入 */
  const token = qs().token

  if (token) {
    setToken(token, false)
  }
}
