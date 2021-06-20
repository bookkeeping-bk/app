/*
 * @Author: Mojie
 * @Date: 2021-06-18 16:09:16
 */

import { onMounted, ref } from 'vue'
import { getBillCategorys } from '@/api/bill-categorys'
import { getPaymentSources } from '@/api/payment-sources'
import { getBooks } from '@/api/books'
import useQuery from '@/hooks/use-query'
import { EditBillRequest } from '../types'

export const useRequest = (): EditBillRequest => {
  const queryData = useQuery()
  const billCategorys = ref<BillCategory[]>([])
  const paymentSources = ref<PaymentSources[]>([])
  const books = ref<Book[]>([])

  const params = { ...queryData, pageSize: 100 }

  /**
   * 获取账单分类数据
   */
  const fetchBillCategorys = async () => {
    if (billCategorys.value.length) return
    const { data } = await getBillCategorys(params)
    billCategorys.value = data.meta.list
  }

  /**
   * 获取支付来源数据
   */
  const fetchPaymentSources = async () => {
    if (paymentSources.value.length) return
    const { data } = await getPaymentSources(params)
    paymentSources.value = data.meta.list
  }

  /**
   * 获取账本数据
   */
  const fetchBooks = async () => {
    if (books.value.length) return
    const { data } = await getBooks(params)
    books.value = data.meta.list
  }

  onMounted(() => {
    fetchBillCategorys()
    fetchPaymentSources()
    fetchBooks()
  })

  return { billCategorys, paymentSources, books }
}
