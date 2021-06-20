/*
 * @Author: Mojie
 * @Date: 2021-06-19 18:57:13
 */

import { Ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { useRoute } from 'vue-router'
import { BillTypeEnum } from '@/enums/app-enum'
import { formatTime, lunarCalendar } from '@/utils/common'
import { createBill, updateBill } from '@/api/bills'
import {
  EditBillEvent,
  EditBillPickerType,
  EditBillRequest,
  EditBillState,
} from '../types'

type EventParams = {
  state: EditBillState
  columns: Ref
  formData: Ref<EditBill>
  request: EditBillRequest
  formDataState: EditBill
}

export const useEvent = ({
  state,
  columns,
  formData,
  request,
  formDataState,
}: EventParams): EditBillEvent => {
  const store = useStore()
  const route = useRoute()
  const { billCategorys, paymentSources, books } = request

  /**
   * 处理关闭编辑账单弹窗
   */
  const handleClose = () => {
    // 关闭弹窗清除表单数据
    formData.value = { ...formDataState }
    store.commit(BillTypeEnum.SWITCH_DIALOG, false)
  }

  /**
   * 格式化时间选择器格式
   * @param type
   * @param val
   * @return
   */
  const formatter = (type: string, val: string) => {
    if (type === 'year') return val + '年'
    if (type === 'month') return val + '月'
    if (type === 'day') return val + '日'
    return val
  }

  /**
   * 打开选择器弹窗
   * @param { String } type - 选择的类型
   */
  const openShowPicker = (type: string) => {
    state.pickerType = type
    state.showPicker = true

    if (type === EditBillPickerType.CATEGORY) {
      if (state.type === 1) {
        columns.value = billCategorys.value.filter(
          (item: BillCategory) => item.type === 1
        )
      } else {
        columns.value = billCategorys.value.filter(
          (item: BillCategory) => item.type === 2
        )
      }
    } else if (type === EditBillPickerType.PAYMENT_SOURCE) {
      columns.value = paymentSources.value
    } else if (type === EditBillPickerType.BOOK) {
      columns.value = books.value
    }
  }

  /**
   * 处理选择器选中的数据
   * @param { Object } item - 各项数据
   */
  const onPickerConfirm = (item: { id: number; name: string }) => {
    if (state.pickerType === EditBillPickerType.CATEGORY) {
      state.billCategoryName = item.name
      formData.value.billCategoryId = item.id
    } else if (state.pickerType === EditBillPickerType.PAYMENT_SOURCE) {
      state.paymentSourceName = item.name
      formData.value.paymentSourceId = item.id
    } else if (state.pickerType === EditBillPickerType.BOOK) {
      state.bookName = item.name
      formData.value.bookId = item.id
    }
    state.showPicker = false
  }

  /**
   * 处理选择的时间
   * @param { String } date - 时间
   */
  const onPickerConfirmDate = (date: string) => {
    state.showPicker = false
    state.selectDate = lunarCalendar(date)
    formData.value.recordAt = formatTime(date, 'YYYY-MM-DD')
  }

  /**
   * 处理提交表单数据
   */
  const onSubmit = async () => {
    try {
      state.isSubLoading = true

      if (formData.value.id) {
        await updateBill(formData.value)
      } else {
        await createBill(formData.value)
      }
      Toast(formData.value.id ? '修改成功' : '创建成功！')
      handleClose()

      // 判断当前路由是不是账单页面，如果是则需要重新加载账单列表数据
      if (route.path === '/bills') {
        store.commit(BillTypeEnum.RELOAD_BILLS, true)
      }
    } finally {
      state.isSubLoading = false
    }
  }

  return {
    handleClose,
    formatter,
    openShowPicker,
    onPickerConfirm,
    onPickerConfirmDate,
    onSubmit,
  }
}
