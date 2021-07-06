/*
 * @Author: Mojie
 * @Date: 2021-06-22 13:58:34
 */

import Axios from '@/plugins/axios'
import { AxiosResponse } from 'axios'

/**
 * 获取统计报表
 * @param { Object } params - 查询参数
 * @return Promise
 */
export const getStatsReport = (
  params: QueryStatsReport
): Promise<AxiosResponse<AxiosResult>> => {
  return Axios.get('/report', { params })
}
