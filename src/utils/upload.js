
/**
 * cos文件上传
 * @param {String} file 文件
 * @param {Object} signature 签名
 * @param {Function} updateCb 上传回调，返回上传进度
 */
export function cosUpload(file, signature, updateCb = null) {
  return new Promise((resolve, reject) => {
    /* 构造表单数据 */
    const formData = new FormData()

    formData.append('key', signature.filename)
    formData.append('policy', signature.policy)
    formData.append('q-sign-algorithm', 'sha1')
    formData.append('q-ak', signature.secretId)
    formData.append('q-key-time', signature.keyTime)
    formData.append('q-signature', signature.signature)
    formData.append('file', file)
    axios({
      url: `https://${ signature.bucketName }.cos.${ signature.region }.myqcloud.com`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => { // 监听上传进度
        if (updateCb) {
          updateCb(Math.round(progressEvent.loaded / progressEvent.total * 100) || 0)
        }
      }
    })
      .then(res => {
        if (res.status === 204) {
          resolve(res.config.url + signature.filename)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
