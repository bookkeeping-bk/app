/*
 * @Author: Mojie
 * @Date: 2021-06-15 14:37:57
 */

import { ActionTree, MutationTree } from 'vuex'
import { getUserInfo } from '@/api/user'

export enum UserTypes {
  GET_USER_INFO = 'GET_USER_INFO',
  SET_USER_INFO = 'SET_USER_INFO',
}

type UserState = {
  userInfo: UserInfo | object
}

const state: UserState = {
  userInfo: {},
}

const mutations: MutationTree<UserState> = {
  [UserTypes.SET_USER_INFO](state: UserState, userInfo: UserInfo) {
    state.userInfo = userInfo
  },
}

const actions: ActionTree<any, any> = {
  async [UserTypes.GET_USER_INFO]({ commit }) {
    const { data } = await getUserInfo()
    commit(UserTypes.SET_USER_INFO, data.meta)
  },
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
}
