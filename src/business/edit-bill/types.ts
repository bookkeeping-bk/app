/*
 * @Author: Mojie
 * @Date: 2021-06-19 21:09:18
 */

import { ComputedRef, Ref } from 'vue'
import { UploaderFileListItem } from 'vant'

/**
 * 选择器的类型
 */
export enum EditBillPickerType {
  /**
   * 账单分类
   */
  CATEGORY = 'category',

  /**
   * 支付来源
   */
  PAYMENT_SOURCE = 'paymentSource',

  /**
   * 账本
   */
  BOOK = 'book',

  /**
   * 账单记录时间
   */
  RECORD_AT = 'recordAt',
}

/**
 * 账单显示数据状态
 */
export interface EditBillState {
  /**
   * 账单类型
   */
  type: number

  /**
   * 是否开启选择器
   */
  showPicker: boolean

  /**
   * 选择器的类型
   */
  pickerType: EditBillPickerType | string

  /**
   * 账单类型名称
   */
  billCategoryName: string

  /**
   * 支付来源名称
   */
  paymentSourceName: string

  /**
   * 账本名称
   */
  bookName: string

  /**
   * 当前时间
   */
  currentDate: Date

  /**
   * 选择的账单记录时间
   */
  recordAt: string

  /**
   * 选择器默认选中项的索引
   */
  pickerDefaultIndex: number | string

  /**
   * 是否提交表单
   */
  isSubLoading: boolean

  /**
   * 上传图片
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileList: any[]
}

/**
 * 状态返回结果
 */
export interface EditBillStateResult extends EditBillEvent {
  state: EditBillState
  show: ComputedRef<boolean>
  title: ComputedRef<string>
  formData: Ref<EditBill>
  columns: Ref
}

/**
 * 操作的事件对象
 */
export interface EditBillEvent {
  handleClose: () => void
  formatter: (type: string, val: string) => string
  openShowPicker: (type: string) => void
  onPickerConfirm: (item: { id: number; name: string }) => void
  onPickerConfirmDate: (date: string) => void
  handleAfterRead: (files: UploaderFileListItem) => void
  onSubmit: () => void
}

/**
 * 请求返回结果
 */
export interface EditBillRequest {
  billCategorys: Ref<BillCategory[]>
  paymentSources: Ref<PaymentSources[]>
  books: Ref<Book[]>
}
