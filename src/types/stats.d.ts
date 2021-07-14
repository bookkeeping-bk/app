/*
 * @Author: Mojie
 * @Date: 2021-06-22 14:01:00
 */

/**
 * 查询统计报表数据
 */
interface QueryStatsReport {
  begin: string
  end: string
}

/**
 * 账单统计报表数据
 */
interface ReportStats {
  billCategoryMoney: string
  billCategoryName: string
  billCategoryType: number
  bills: Bill[]
}
