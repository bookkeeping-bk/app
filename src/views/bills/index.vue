<template>
  <be-bill-header :month-bill-info="monthBillInfo" />

  <van-pull-refresh
    v-if="state.bills.length"
    v-model="state.refreshing"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <be-bill-list :bills="state.bills" @click="getDetails" />
    </van-list>
  </van-pull-refresh>

  <van-empty
    v-else-if="state.bills.length || state.finished"
    description="暂无数据"
  />

  <be-bill-details
    ref="billDetails"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import { Toast } from 'vant'
import { DialogAction } from 'vant/lib/dialog/Dialog'
import { deleteBill, getBills } from '@/api/bills'
import { confirmDelete } from '@/utils/layer'
import useQuery from '@/hooks/use-query'
import Header from './components/header.vue'
import List from './components/list.vue'
import Details from './components/details.vue'
import { BillTypeEnum } from '@/enums/app-enum'

export default defineComponent({
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Details.name]: Details,
  },

  setup() {
    const queryData = useQuery()
    const store = useStore()
    const billDetails = ref()
    const monthBillInfo = ref()
    const bills: Bill[] = []
    const state = reactive({
      bills,
      loading: false,
      finished: false,
      refreshing: false,
    })

    /**
     * 获取账单列表
     */
    const fetchBills = async () => {
      if (state.refreshing) {
        state.bills = []
        state.refreshing = false
      }
      const { data } = await getBills({
        ...queryData,
        book: 1,
        createdAt: dayjs().format('YYYY-MM'),
      })
      state.loading = false
      const { monthInfo, list } = data.meta
      monthBillInfo.value = monthInfo

      // 如果没有数据则加载结束
      if (!list.length) {
        state.bills = []
        state.finished = true
        return
      }

      // 最后一页不足 pageSize 条的情况
      if (list.length < queryData.pageSize) {
        state.finished = true
      }

      if (queryData.currentPage === 1) {
        state.bills = list
      } else {
        state.bills = state.bills.concat(list)
      }
    }

    const onLoad = () => {
      queryData.currentPage++
      fetchBills()
    }

    const onRefresh = () => {
      queryData.currentPage = 1
      state.loading = true
      state.finished = false
      return fetchBills()
    }

    /**
     * 获取账单详情
     */
    const getDetails = (bill: Bill) => {
      const { state } = billDetails.value
      state.show = true
      state.billId = bill.id
    }

    /**
     * 处理编辑账单
     */
    const handleEdit = (bill: Bill) => {
      store.commit(BillTypeEnum.SWITCH_DIALOG, true)
      store.commit(BillTypeEnum.SET_EDIT_BILL, bill)
    }

    /**
     * 处理删除账单
     */
    const handleDelete = async (bill: Bill) => {
      const { state } = billDetails.value
      const beforeClose = (action: DialogAction): Promise<boolean> => {
        return new Promise((resolve) => {
          if (action === 'confirm') {
            deleteBill(bill.id).then(() => {
              resolve(true)
            })
          } else {
            resolve(true)
          }
        })
      }

      try {
        await confirmDelete({ beforeClose })
        state.show = false
        Toast('删除成功')
        onRefresh()
      } catch {
        return false
      }
    }

    /**
     * 监听是否需要重新加载账单数据
     */
    watch(
      () => store.state.bill.reloadBills,
      async (value: boolean) => {
        if (value) {
          await onRefresh()
          store.commit(BillTypeEnum.RELOAD_BILLS, false)
        }
      }
    )

    onMounted(async () => {
      try {
        Toast.loading({ message: '加载中...', forbidClick: true, duration: 0 })
        await fetchBills()
      } finally {
        Toast.clear()
      }
    })

    return {
      state,
      monthBillInfo,
      billDetails,
      onLoad,
      onRefresh,
      getDetails,
      handleEdit,
      handleDelete,
    }
  },
})
</script>

<style lang="scss" scoped>
.van-pull-refresh {
  margin: 20vh 0 $--tabbar-height + 15px;
}
.van-empty {
  margin-top: 35vh;
}
</style>
