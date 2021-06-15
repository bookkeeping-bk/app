/*
 * @Author: Mojie
 * @Date: 2021-06-11 10:08:02
 * 全局存储
 */

const TITLE = 'bookkeeping'
const AUTH_TOKEN = `${TITLE}-token`

/**
 * 获取用户token
 * @return { String } token
 */
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN)
}

/**
 * 设置用户token
 * @param { String } token
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN, token)
}

/**
 * 清除用户token
 */
export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN)
}
