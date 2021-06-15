/*
 * @Author: Mojie
 * @Date: 2021-06-15 15:20:07
 */

/**
 * Axios HTTP 返回的结果
 */
interface AxiosResult<T = any> {
  message: string
  meta: T
}
