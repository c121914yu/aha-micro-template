import routes from './path'
import { getToken } from '@/utils/userManage'
import { notLogin } from '@/utils/postMessage'
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
  console.log(to.meta)
  if (to.meta.needLogin && !getToken()) {
    console.log(getToken())

    notLogin()
  } else {
    next()
  }
})

export default router
