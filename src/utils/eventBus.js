/* 事件总线 */
const event = new Vue()

const subMap = {} // 记录所有订阅的事件
const routeEvent = {} // 记录某个路由订阅的事件，在每次路由切换时会进行一次销毁

/* 每次执行，销毁一次注册的事件 */
for (const name in subMap) {
  event.$off(name)
  delete subMap[ name ]
}

/**
 * 订阅事件
 * @param {String} name 事件名
 * @param {Function} cb 回调
 * @param {Boolean} canDestroy 是否销毁
 */
export function subEvent(name, cb, canDestroy = true) {
  if (!name) {
    console.error('事件名不能为空')
    return
  }
  /* 判断是否有重名 */
  if (subMap[ name ]) {
    console.error('事件名重复', name)
    return
  }
  event.$on(name, cb)
  subMap[ name ] = true
  /* 判断是否可销毁，如果可销毁加入subMap中 */
  if (canDestroy && $router.app) {
    /* 获取路由 */
    const routeName = $router.app._route.name

    if (routeEvent[ routeName ]) {
      routeEvent[ routeName ].push(name)
    } else {
      routeEvent[ routeName ] = [name]
    }
  }
}

/**
 * 提交事件
 */
export function pubEvent(name, data = {}) {
  if (name) {
    event.$emit(name, data)
  }
}

/**
 * 销毁多余订阅
 */
export function destroyEvent(routeName) {
  /* 获取路由 */
  try {
    if (routeEvent[ routeName ]) {
      routeEvent[ routeName ].forEach(name => {
        event.$off(name)
        delete subMap[ name ]
      })
      delete routeEvent[ routeName ]
    }
  } catch (err) { err }
}

