/*
 * @Author: Mojie
 * @Date: 2021-06-18 16:52:19
 */

import Axios from '@/plugins/axios'
import { AxiosResponse } from 'axios'

const PAYMENT_SOURCES = '/payment-sources'

/**
 * 获取支付来源列表
 * @param { Object } params - 查询参数
 * @returns Promise
 */
export const getPaymentSources = (
  params: QueryPaymentSources
): Promise<
  AxiosResponse<AxiosResult<CommonResponseData<PaymentSources[]>>>
> => {
  return Axios.get(PAYMENT_SOURCES, { params })
}
