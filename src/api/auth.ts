/*
 * @Author: Mojie
 * @Date: 2021-06-11 18:07:38
 */

import { AxiosResponse } from 'axios'
import Axios from '@/plugins/axios'

/**
 * 获取登录令牌
 * @param { Object } params - 提交参数
 * @return Promise
 */
export const login = (
  params: LoginFormData
): Promise<AxiosResponse<AxiosResult>> => {
  return Axios.post('/auth/login', params)
}
