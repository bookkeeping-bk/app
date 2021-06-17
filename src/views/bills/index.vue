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

  <be-bill-details ref="billDetails" @edit="handleEdit" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { Toast } from 'vant'
import { getBills } from '@/api/bills'
import useQuery from '@/hooks/use-query'
import Header from './components/header.vue'
import List from './components/list.vue'
import Details from './components/details.vue'

export default defineComponent({
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Details.name]: Details,
  },

  setup() {
    const bills: Bill[] = []
    const queryData = useQuery()
    const billDetails = ref()
    const monthBillInfo = ref()
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
      fetchBills()
    }

    /**
     * 获取账单详情
     */
    const getDetails = (bill: Bill) => {
      const { state } = billDetails.value
      state.show = true
      state.bill = bill
    }

    const handleEdit = (bill: Bill) => {
      console.log(bill)
    }

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
