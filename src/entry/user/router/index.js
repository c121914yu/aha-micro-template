import routes from './path'
import { getToken } from '@/utils/userManage'
import { reportRoute, notLogin } from '@/utils/postMessage'
Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  mode: 'hash',
  routes,
  base: '/',
  linkExactActiveClass: 'route-active',
})

window.$router = router

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  /* 每次路由变化，需要把新路由的参数上报 */
  reportRoute(to)
  next()
})

export default router
