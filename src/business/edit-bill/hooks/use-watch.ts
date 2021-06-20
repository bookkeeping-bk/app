/*
 * @Author: Mojie
 * @Date: 2021-06-19 18:16:46
 */

import { nextTick, Ref, watch } from 'vue'
import { useStore } from 'vuex'
import { formatTime, lunarCalendar } from '@/utils/common'
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
   * 监听类型，如果切换则清除数据
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
   * 设置默认账本
   */
  watch(
    () => books.value,
    (books) => {
      const { id, name } = books[0]
      state.bookName = name
      formData.value.bookId = id
    }
  )

  /**
   * 监听选择时间，进行初始化，再格式化
   */
  watch(
    () => state.currentDate,
    () => {
      state.selectDate = lunarCalendar(Date.now())
      formData.value.recordAt =
        formData.value.recordAt || formatTime(Date.now(), 'YYYY-MM-DD')
    },
    { immediate: true }
  )

  /**
   * 监听是否修改账单
   */
  watch(
    () => store.state.bill.editBill.id,
    (val) => {
      if (val) {
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

        state.selectDate = lunarCalendar(editBill.recordAt)
      }
    }
  )
}
