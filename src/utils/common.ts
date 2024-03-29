/*
 * @Author: Mojie
 * @Date: 2021-06-11 09:58:04
 */

import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import solarlunar from 'solarlunar'
import router from '@/router'
import { removeAuthToken } from './storage'
import { errorAlert } from './layer'

/**
 * HTTP 异常处理
 * @param { Object } response - 响应数据
 */
export const httpException = (response: AxiosResponse<AxiosResult>): void => {
  const { status, data, config } = response

  switch (status) {
    case 401:
      removeAuthToken()
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.value.fullPath },
      })
      break
    case 404:
      errorAlert(`【${status}】请求资源不存在 ${config.url}`)
      break
    case 400:
    case 403:
    case 405:
    case 408:
    case 422:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      errorAlert(`【${status}】${data.message}`)
      break
    default:
      errorAlert('网络未知错误')
      break
  }
}

/**
 * 格式化时间
 * @param { String | Number } date - 转换的时间戳或者字符串特殊格式
 * @param { String } format        - 转换的时间格式
 * @return { String } 转换后的时间
 */
export const formatTime = (
  date: string | number,
  format = 'YYYY-MM-DD HH:mm:ss'
): string => {
  return dayjs(date).format(format)
}

/**
 * 公历转成农历
 * @param { String | Number } date - 转换的时间戳或者字符串特殊格式
 * @return { String } 转换后的农历
 */
export const lunarCalendar = (date: string | number): string => {
  const params = formatTime(date, 'YYYY-MM-DD').split('-')
  const { monthCn, dayCn } = solarlunar.solar2lunar(...params)
  return `${formatTime(date, 'YYYY年MM月DD日')} - 农历${monthCn}${dayCn}`
}

/**
 * 给数字添加万位分隔符
 * @param { String | Number } num - 需要处理的数字
 * @return { String | Number } 处理好的数字
 */
export const toThousands = (num: string | number): string | number => {
  return (
    num &&
    num.toString().replace(/\d+/, (s) => s.replace(/(\d)(?=(\d{4})+$)/g, '$1,'))
  )
}

/**
 * 获取每年/月的第一天和最后一天
 * @param { String | Number } date - 指定时间
 * @param { String } unitType - 时间单位
 * @return { Object } - 处理好的时间
 */
export const getFirstAndLastDay = (
  date: string | number,
  unitType: dayjs.OpUnitType
): { firstDay: string; lastDay: string } => {
  const format = 'YYYY-MM-DD'
  const firstDay = dayjs(date).startOf(unitType).format(format)
  const lastDay = dayjs(date).endOf(unitType).format(format)
  return { firstDay, lastDay }
}
