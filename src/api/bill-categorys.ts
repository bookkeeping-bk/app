/*
 * @Author: Mojie
 * @Date: 2021-06-18 13:56:42
 */

import Axios from '@/plugins/axios'
import { AxiosResponse } from 'axios'

const BILL_CATEGORYS_URL = 'bill-categorys'

/**
 *
 * @param { Object } params - 查询参数
 * @return Promise
 */
export const getBillCategorys = (
  params: QueryBillCategory
): Promise<AxiosResponse<AxiosResult<CommonResponseData<BillCategory[]>>>> => {
  return Axios.get(BILL_CATEGORYS_URL, { params })
}
