import App from './App.vue'
import router from './router'
import stores from './store'
import globalStores from '@/store'

Vue.config.productionTip = false

/* 挂载全局和局部依赖 */
require('./register')

new Vue({
  router,
  store: globalStores(stores),
  render: h => h(App)
}).$mount('#app')

