/*
 * @Author: Mojie
 * @Date: 2021-06-10 16:37:45
 */

import Axios, { AxiosError, AxiosResponse } from 'axios'
import { Dialog } from 'vant'
import { getAuthToken } from '@/utils/storage'
import { httpException } from '@/utils/common'

Axios.defaults.timeout = 30 * 1000
Axios.defaults.baseURL = import.meta.env.VITE_BASE_URL as string

Axios.interceptors.request.use(
  (config) => {
    if (getAuthToken()) {
      config.headers.Authorization = 'Bearer ' + getAuthToken()
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },

  async (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      try {
        await Dialog.confirm({ title: '请求超时', message: '是否重新请求' })
        Axios.request(error.config)
      } catch {
        return
      }
    } else {
      httpException(error.response as AxiosResponse)
    }

    return Promise.reject(error)
  }
)

export default Axios
