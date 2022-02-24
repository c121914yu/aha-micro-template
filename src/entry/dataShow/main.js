import App from './App.vue'
import router from './router'
import stores from './store'
import globalStores from '@/store'

Vue.config.productionTip = false

/* 挂载全局和局部依赖 */
require('./register')

/* 需要等待基座发送全局数据后再加载页面 */
const loadTimer = setInterval(() => {
  if (window.$data) {
    clearInterval(loadTimer)
    new Vue({
      router,
      store: globalStores(stores),
      render: h => h(App)
    }).$mount('#app')
  }
}, 100)

