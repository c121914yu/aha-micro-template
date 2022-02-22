/* 获取当前文件夹内所有store进行合并 */
const context = require.context('./', false, /\.js$/)
const keys = context.keys().filter(item => item !== './index.js')

const globalStores = {}

keys.forEach((key) => {
  if (context(key).default) {
    const objKey = context(key).default.namespace || key.substring(2, key.lastIndexOf('.'))

    delete context(key).default.namespace
    Object.assign(globalStores, { [ objKey ]: context(key).default })
  }
})

let stores = null

export default function(partStore) {
  /* 创建全局唯一stores */
  if (!stores) {
    stores = new Vuex.Store({
      modules: {
        ...globalStores,
        ...partStore
      }
    })
  }

  return stores
}
