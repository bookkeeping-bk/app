/*
 * @Author: Mojie
 * @Date: 2021-06-11 10:26:34
 */

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import store from '@/store'
import userStore from '@/store/modules/user'
import { getAuthToken } from '@/utils/storage'
import { UserInfoTypeEnum } from '@/enums/app-enum'

const IS_HISTORY = import.meta.env.VITE_ROUTER_HISTORY === 'true'

/**
 * 设置标题
 * @param { String } name - 每个页面的名字
 * @return { String } 标题加每个页面的名字
 */
const setTitle = (name: string) => {
  const title = import.meta.env.VITE_TITLE
  return `${title} - ${name}`
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    meta: { title: setTitle('登录') },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: 'bills',
    component: () =>
      import(/* webpackChunkName: "layouts" */ '@/layouts/index.vue'),
    children: [
      {
        path: 'bills',
        meta: { title: setTitle('账单') },
        component: () =>
          import(/* webpackChunkName: "bills" */ '@/views/bills/index.vue'),
      },
      {
        path: 'stats',
        meta: { title: setTitle('统计') },
        component: () =>
          import(/* webpackChunkName: "stats" */ '@/views/stats/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: IS_HISTORY ? createWebHistory() : createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string

  if (getAuthToken()) {
    if (!(userStore.state.userInfo as UserInfo).id) {
      store.dispatch(UserInfoTypeEnum.GET_USER_INFO)
    }
  }

  next()
})

export default router
