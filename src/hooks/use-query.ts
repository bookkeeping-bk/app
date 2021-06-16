/*
 * @Author: Mojie
 * @Date: 2021-06-16 15:24:52
 * 公用请求参数
 */

import { reactive } from 'vue'

const useQuery = () => {
  const state: Pagination = reactive({
    currentPage: 1,
    pageSize: 10,
  })

  return { ...state }
}

export default useQuery
