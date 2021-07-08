/*
 * @Author: Mojie
 * @Date: 2021-06-19 18:16:46
 */

import { nextTick, Ref, watch } from 'vue'
import { useStore } from 'vuex'
import { lunarCalendar } from '@/utils/common'
import { EditBillRequest, EditBillState } from '../types'

type WatchParams = {
  state: EditBillState
  formData: Ref<EditBill>
  request: EditBillRequest
}

export const useWatch = ({ state, formData, request }: WatchParams): void => {
  const { billCategorys, paymentSources, books } = request
  const store = useStore()

  /**
   * 监听账单分类类型，如果切换则清除数据
   */
  watch(
    () => state.type,
    (val) => {
      if (val) {
        state.billCategoryName = ''
        formData.value.billCategoryId = 0
      }
    }
  )

  /**
   * 监听是否修改账单
   */
  watch([request.books, () => store.state.bill.editBill.id], (values) => {
    if ((values[0].length, values[1])) {
      const editBill: EditBill = store.state.bill.editBill
      formData.value = { ...editBill }

      billCategorys.value.forEach((item) => {
        if (item.id === editBill.billCategoryId) {
          state.type = item.type
          nextTick(() => {
            state.billCategoryName = item.name
          })
        }
      })

      paymentSources.value.forEach((item) => {
        if (item.id === editBill.paymentSourceId) {
          state.paymentSourceName = item.name
        }
      })

      books.value.forEach((item) => {
        if (item.id === editBill.bookId) {
          state.bookName = item.name
        }
      })

      state.recordAt = lunarCalendar(editBill.recordAt)
    }
  })
}
