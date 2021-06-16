<template>
  <be-bill-header :month-bill-info="monthBillInfo" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { getBills } from '@/api/bills'
import useQuery from '@/hooks/use-query'
import Header from './components/header.vue'

export default defineComponent({
  setup() {
    const queryData = useQuery()
    const state = reactive({
      bills: [],
      loading: false,
      finished: false,
      refreshing: false,
    })
    const monthBillInfo = ref()

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
      const { monthInfo, list, totalPage } = data.meta
      monthBillInfo.value = monthInfo
    }
    fetchBills()

    return { state, monthBillInfo }
  },

  components: {
    [Header.name]: Header,
  },
})
</script>
