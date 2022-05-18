import applications from '@root/constants/applications'
Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@root/pages/Login'),
  },
  {
    path: `/*`,
    name: `Root`,
    component: () => import('@root/pages/Root'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

window.$router = router

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  setIframeSrc(to.path)
  next()
})

export default router

function setIframeSrc(path) {
  const app = applications.find(item => path.startsWith(item.activeApp))

  if (!app) {
    console.log('子应用路径未匹配====')
    return ''
  }
  setTimeout(() => {
    Vue.prototype.$storesCommit && Vue.prototype.$storesCommit('setNavParam', {
      selectApp: {
        path: path.replace(app.activeApp, ''),
        ...app
      }
    })
  })
}
