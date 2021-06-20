/*
 * @Author: Mojie
 * @Date: 2021-06-18 16:57:35
 */

import Axios from '@/plugins/axios'
import { AxiosResponse } from 'axios'

const BOOKS_URL = '/books'

/**
 * 获取账本列表
 * @param { Object } params - 查询参数
 * @returns Promise
 */
export const getBooks = (
  params: QueryBook
): Promise<AxiosResponse<AxiosResult<CommonResponseData<Book[]>>>> => {
  return Axios.get(BOOKS_URL, { params })
}
