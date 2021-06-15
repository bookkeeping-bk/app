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
]

const router = createRouter({
  history: IS_HISTORY ? createWebHistory() : createWebHashHistory(),
  routes,
})

export default router
