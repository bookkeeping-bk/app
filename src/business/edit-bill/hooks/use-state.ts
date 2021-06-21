/*
 * @Author: Mojie
 * @Date: 2021-06-18 15:47:56
 */

import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { lunarCalendar } from '@/utils/common'
import { useEvent } from './use-event'
import { useRequest } from './use-request'
import { useWatch } from './use-watch'
import { EditBillState, EditBillStateResult } from '../types'

export const useState = (): EditBillStateResult => {
  const {
    state: { bill, user },
  } = useStore()
  const show = computed(() => {
    if (bill.show) {
      // 处理选择时间
      if (formData.value.recordAt) {
        state.recordAt = lunarCalendar(formData.value.recordAt)
      } else {
        state.recordAt = lunarCalendar(Date.now())
      }
    }
    return bill.show
  })
  const title = computed(() => (formData.value.id ? '修改账单' : '创建账单'))
  const columns = ref()

  const state = reactive<EditBillState>({
    type: 1,
    showPicker: false,
    pickerType: '',
    billCategoryName: '',
    paymentSourceName: '',
    bookName: '',
    currentDate: new Date(),
    recordAt: '',
    pickerDefaultIndex: 0,
    isSubLoading: false,
  })

  const initFormData: EditBill = {
    billCategoryId: 0,
    paymentSourceId: 0,
    userId: user.userInfo.id,
    bookId: 0,
    recordAt: '',
    money: '',
    images: '',
    remark: '',
  }
  const formData = ref(initFormData)

  const request = useRequest({ state, formData })
  const event = useEvent({ state, columns, formData, request, initFormData })
  useWatch({ state, formData, request })

  return { state, show, title, formData, columns, ...event }
}
