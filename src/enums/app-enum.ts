/*
 * @Author: Mojie
 * @Date: 2021-06-17 16:22:26
 */

/**
 * 操作用户信息类型
 */
export enum UserInfoTypeEnum {
  /**
   * 获取用户信息
   */
  GET_USER_INFO = 'GET_USER_INFO',

  /**
   * 设置用户信息
   */
  SET_USER_INFO = 'SET_USER_INFO',
}

/**
 * 操作编辑账单类型
 */
export enum BillTypeEnum {
  /**
   * 编辑账单开关
   */
  SWITCH_DIALOG = 'SWITCH_DIALOG',

  /**
   * 重新加载账单数据
   */
  RELOAD_BILLS = 'RELOAD_BILLS',

  /**
   * 重新加载账单详情数据
   */
  RELOAD_BILL_DETAILS = 'RELOAD_BILL_DETAILS',

  /**
   * 设置编辑账单数据
   */
  SET_EDIT_BILL = 'SET_EDIT_BILL',
}
