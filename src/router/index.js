import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {
  setToken,
  getToken,
  setTitle
} from '@/libs/util'
import config from '@/config'
import storage from '@/libs/storage';
const {
  homeName
} = config

Vue.use(Router)
const router = new Router({
  routes,
  base: process.env.NODE_ENV === 'production'
    ? '/store/'
    : '/store/',
  mode: 'history'
  // mode: 'hash'
})
const LOGIN_PAGE_NAME = 'login'
const REGISTER_PAGE_NAME = 'register'

// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }
const turnTo = (to, access, next) => {
  if (access) next() // 有权限，可访问
  else {
    next({
      replace: true,
      name: 'error_401'
    })
  } // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    if (to.name == REGISTER_PAGE_NAME) {
      next();
    } else {
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    }
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    setToken('');
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else if (to.name === REGISTER_PAGE_NAME) {
    // 注册页
    next() // 跳转
  } else {
    if (store.state.user.hasGetInfo) {
      next();
    } else {
      const data = storage.getStorage('storeInfo');
      store.dispatch('getUserInfo', data).then(res => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, res, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router