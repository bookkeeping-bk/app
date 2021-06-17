/*
 * @Author: Mojie
 * @Date: 2021-06-15 14:37:57
 */

import { ActionTree, MutationTree } from 'vuex'
import { getUserInfo } from '@/api/user'
import { UserInfoTypeEnum } from '@/enums/app-enum'

type UserState = {
  userInfo: UserInfo | unknown
}

const state: UserState = {
  userInfo: {},
}

const mutations: MutationTree<UserState> = {
  [UserInfoTypeEnum.SET_USER_INFO](state: UserState, userInfo: UserInfo) {
    state.userInfo = userInfo
  },
}

const actions: ActionTree<unknown, unknown> = {
  async [UserInfoTypeEnum.GET_USER_INFO]({ commit }) {
    const { data } = await getUserInfo()
    commit(UserInfoTypeEnum.SET_USER_INFO, data.meta)
  },
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
}
