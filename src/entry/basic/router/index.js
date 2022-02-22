import { getToken } from '@/utils/userManage'
import { destroyEvent } from '@/utils/eventBus'

Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    name: 'Basic',
    meta: {
      login: true,
      leftNav: true
    },
    component: () => import('@basic/pages/Basic'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      login: false,
      leftNav: false
    },
    component: () => import('@basic/pages/Login'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      login: false,
      leftNav: false
    },
    component: () => import('@basic/pages/404'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  base: '/',
})

window.$router = router

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  /* 如果发生了路由变化（不包括参数变化），清空iframe超时定时器和相关的订阅器 */
  if (to.name !== from.name) {
    Vue.prototype.$storesCommit('clearLoadTimer')
    destroyEvent(from.name)
  }

  if (to.meta.login && !getToken()) {
    Vue.prototype.$hideLoading()
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
