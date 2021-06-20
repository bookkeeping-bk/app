/*
 * @Author: Mojie
 * @Date: 2021-06-18 15:47:56
 */

import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useEvent } from './use-event'
import { useRequest } from './use-request'
import { useWatch } from './use-watch'
import { EditBillState, EditBillStateResult } from '../types'

export const useState = (): EditBillStateResult => {
  const {
    state: { bill, user },
  } = useStore()
  const request = useRequest()
  const show = computed(() => bill.show)
  const title = computed(() => (formData.value.id ? '修改账单' : '创建账单'))
  const billState: EditBillState = {
    type: 1,
    showPicker: false,
    pickerType: '',
    billCategoryName: '',
    paymentSourceName: '',
    bookName: '',
    currentDate: new Date(),
    selectDate: '',
    isSubLoading: false,
  }
  const state = reactive(billState)
  const formDataState: EditBill = {
    billCategoryId: 0,
    paymentSourceId: 0,
    userId: user.userInfo.id,
    bookId: 0,
    recordAt: '',
    money: '',
    images: '',
    remark: '',
  }
  const formData = ref({ ...formDataState })
  const columns = ref()
  useWatch({ state, formData, request })
  const event = useEvent({ state, columns, formData, request, formDataState })

  return {
    state,
    show,
    title,
    formData,
    columns,
    formDataState,
    ...event,
  }
}
