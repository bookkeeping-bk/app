/*
 * @Author: Mojie
 * @Date: 2021-06-16 15:16:57
 */

/**
 * Axios HTTP 返回的结果
 */
interface AxiosResult<T = unknown> {
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

/**
 * 公用获取列表请求返回统一数据结构
 */
interface CommonResponseData<T = unknown> extends Pagination {
  totalPage: number
  list: T
}
