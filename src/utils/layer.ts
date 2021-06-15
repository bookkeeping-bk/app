/*
 * @Author: Mojie
 * @Date: 2021-06-11 10:13:04
 * 全局弹窗
 */

import { Dialog, DialogOptions } from 'vant'

/**
 * 错误提示的弹窗
 * @param { String } message - 提示内容
 * @param { Object } [options] - Dialog 参数
 * @return Promise
 */
export const errorAlert = (message: string, options?: DialogOptions) => {
  return Dialog.alert({ title: '错误提示', message, ...options })
}

/**
 * 确认删除提示的弹窗
 * @param { Object } [options] - Dialog 参数
 * @return Promise
 */
export const confirmDelete = (options?: DialogOptions) => {
  return Dialog.confirm({
    title: '温馨提示',
    message: '此操作将永久删除该数据, 是否继续？',
    ...options,
  })
}
