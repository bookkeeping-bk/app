/*
 * @Author: Mojie
 * @Date: 2021-06-16 15:16:57
 */

/**
 * Axios HTTP 返回的结果
 */
interface AxiosResult<T = any> {
  message: string
  meta: T
}

/**
 * 公用分页参数
 */
interface Pagination {
  currentPage: number
  pageSize: number
}
