/*
 * @Author: Mojie
 * @Date: 2021-06-17 15:00:45
 */

/**
 * 查询账单分类列表数据
 */
type QueryBillCategory = Pagination

/**
 * 账单分类列表数据
 */
interface BillCategory {
  id: number
  name: string

  /**
   * 账单分类类型
   */
  type: number
}
