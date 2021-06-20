/*
 * @Author: Mojie
 * @Date: 2021-06-17 16:12:19
 */

import { MutationTree } from 'vuex'
import { BillTypeEnum } from '@/enums/app-enum'

interface BillState {
  show: boolean
  editBill: EditBill
  reloadBills: boolean
}

const editBill: EditBill = {
  id: 0,
  billCategoryId: 0,
  paymentSourceId: 0,
  userId: 0,
  bookId: 0,
  recordAt: '',
  money: '',
  images: '',
  remark: '',
}

const state: BillState = {
  show: false,
  editBill: { ...editBill },
  reloadBills: false,
}

const mutations: MutationTree<BillState> = {
  [BillTypeEnum.SWITCH_DIALOG](state, show: boolean) {
    state.show = show

    // 关闭编辑账单弹窗时，清空编辑账单数据
    if (!show) {
      state.editBill = { ...editBill }
    }
  },

  [BillTypeEnum.SET_EDIT_BILL](state, bill: Bill) {
    state.editBill.id = bill.id
    state.editBill.billCategoryId = bill.billCategory.id
    state.editBill.paymentSourceId = bill.paymentSource.id as number
    state.editBill.userId = bill.user.id
    state.editBill.bookId = bill.book.id as number
    state.editBill.recordAt = bill.recordAt
    state.editBill.money = bill.money
    state.editBill.images = bill.images
    state.editBill.remark = bill.remark
  },

  [BillTypeEnum.RELOAD_BILLS](state, value: boolean) {
    state.reloadBills = value
  },
}

export default {
  namespace: true,
  state,
  mutations,
}
