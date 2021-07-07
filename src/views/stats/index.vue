<template>
  <be-stats-header :reports="reports" />
  <main class="stats">
    <be-card title="收入分类">
      <be-stats-pie chart-id="revenue" />
    </be-card>

    <be-card title="支出分类">
      <be-stats-pie chart-id="expend" />
    </be-card>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Toast } from 'vant'
import { useChildren } from '@vant/use'
import { getFirstAndLastDay } from '@/utils/common'
import { getStatsReport } from '@/api/stats'
import Header from './components/header.vue'
import Card from './components/card.vue'
import Pie from './components/pie.vue'

export default defineComponent({
  components: {
    [Header.name]: Header,
    [Card.name]: Card,
    [Pie.name]: Pie,
  },

  setup() {
    const { linkChildren } = useChildren('stats-relation')
    const reports = ref<Bill[]>([])
    // 获取当前月的第一天和最后一天
    const { firstDay, lastDay } = getFirstAndLastDay(Date.now(), 'M')
    const queryParams = ref({ begin: firstDay, end: lastDay })

    const fetchStatsReport = async () => {
      Toast.loading({ message: '加载中...', forbidClick: true, duration: 0 })
      const { data } = await getStatsReport(queryParams.value)
      reports.value = data.meta as Bill[]
      Toast.clear()
    }

    linkChildren({ queryParams, fetchStatsReport })

    onMounted(() => {
      fetchStatsReport()
    })

    return { reports }
  },
})
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
.stats {
  padding: 10px;
  margin: 24vh 0 $--tabbar-height;
}
</style>
