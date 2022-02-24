/* 临时数据缓存 */

/* 比赛信息 */
import { competitions as mockComp } from '@/constants/mock'
let competitions = mockComp

export function getCompetitions() {
  if (competitions.length === 0) {
    return getComps({
      pageNum: 1,
      pageSize: 200
    }).then(res => {
      competitions = res.data.pageData
      return competitions
    })
  }
  return competitions
}

