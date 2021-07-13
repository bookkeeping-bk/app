/*
 * @Author: Mojie
 * @Date: 2021-07-09 15:40:57
 */

import Axios from '@/plugins/axios'
import { AxiosResponse } from 'axios'

/**
 * 上传文件
 * @param { FormData } formData - 上传的文件
 * @return Promise
 */
export const uploadFile = (
  formData: FormData
): Promise<AxiosResponse<AxiosResult<unknown[]>>> => {
  return Axios.post('/file/upload', formData)
}
