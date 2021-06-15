/*
 * @Author: Mojie
 * @Date: 2021-06-11 18:09:21
 */

import { AxiosResponse } from 'axios'
import Axios from '@/plugins/axios'

/**
 * 获取当前登录用户信息
 * @return Promise
 */
export const getUserInfo = (): Promise<AxiosResponse<AxiosResult>> => {
  return Axios.get('/users')
}
