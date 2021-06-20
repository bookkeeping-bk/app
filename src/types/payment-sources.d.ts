/*
 * @Author: Mojie
 * @Date: 2021-06-17 15:03:32
 */

/**
 * 查询支付来源数据列表数据
 */
type QueryPaymentSources = Pagination

/**
 * 支付来源数据
 */
interface PaymentSources {
  id: number
  name: string
  remark: string
}
