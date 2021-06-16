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

  // FIXME: 优化
  billCategory: object
  paymentSource: object
  user: object
  book: object

  /**
   * 记录时间
   */
  recordAt: string
}

/**
 * 账单数据
 */
interface BillData extends Pagination {
  totalPage: number
  monthInfo: MonthBillInfo
  list: object
}
