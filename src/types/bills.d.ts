/*
 * @Author: Mojie
 * @Date: 2021-06-16 15:18:57
 */

/**
 * 查询账单列表数据
 */
interface QueryBills extends Pagination {
  /**
   * 账本ID
   */
  book: number
  createdAt: string
}

/**
 * 月账单收支明细详情
 */
interface MonthBillInfo {
  /**
   * 支出
   */
  expend: string

  /**
   * 收入
   */
  revenue: string

  /**
   * 结余
   */
  balance: string
}

/**
 * 账单列表数据
 */
interface Bill {
  id: number
  money: string
  images: string
  remark: string
  createdAt: string
  billCategory: BillCategory
  paymentSource: PaymentSources
  user: UserInfo
  book: Book

  /**
   * 记录时间
   */
  recordAt: string
}

/**
 * 账单数据
 */
interface BillData extends CommonResponseData<Bill[]> {
  monthInfo: MonthBillInfo
}

/**
 * 编辑账单数据
 */
interface EditBill {
  id?: number

  /**
   * 账单分类ID
   */
  billCategoryId: number

  /**
   * 支付来源ID
   */
  paymentSourceId: number

  /**
   * 记录用户ID
   */
  userId: number

  /**
   * 账本ID
   */
  bookId: number

  /**
   * 记录时间
   */
  recordAt: string

  /**
   * 金额
   */
  money: string | number

  /**
   * 图片
   */
  images?: string

  /**
   * 备注
   */
  remark?: string
}
