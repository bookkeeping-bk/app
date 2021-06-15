/*
 * @Author: Mojie
 * @Date: 2021-06-11 14:04:45
 */

interface User {
  userId: string
  username: string
  password: string
  avatar: string
  role?: string
  tag?: string
  createTime: number
  online?: 1 | 0 // 是否在线
}
