/**
 * 计算文件大小
 */
export function renderSize(fsize) {
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const srcsize = parseFloat(fsize)

  const index = Math.floor(Math.log(srcsize) / Math.log(1024))

  const size = (srcsize / Math.pow(1024, index)).toFixed(2)

  return size + unitArr[ index ]
}

