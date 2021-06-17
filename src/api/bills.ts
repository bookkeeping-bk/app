/*
 * @Author: Mojie
 * @Date: 2021-06-16 15:07:54
 */

import Axios from '@/plugins/axios'
import { AxiosResponse } from 'axios'

const BILLS_URL = '/bills'

/**
 * 获取账单列表
 * @param { Object } params - 查询参数
 * @return Promise
 */
export const getBills = (
  params: QueryBills
): Promise<AxiosResponse<AxiosResult<BillData>>> => {
  return Axios.get(BILLS_URL, { params })
}

/**
 * 获取账单详情
 * @param { Number } id - 账单id
 * @return Promise
 */
export const getBillDetails = (
  id: number
): Promise<AxiosResponse<AxiosResult<Bill>>> => {
  return Axios.get(`${BILLS_URL}/${id}`)
}

/**
 * 删除账单
 * @param { Number } id - 账单id
 * @return Promise
 */
export const deleteBill = (id: number): Promise<AxiosResponse> => {
  return Axios.delete(`${BILLS_URL}/${id}`)
}
