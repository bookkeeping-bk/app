<template>
  <div class="pie-chart">
    <canvas
      v-if="chartData.expend.length || chartData.revenue.length"
      :id="chartId"
    ></canvas>
    <van-empty v-else description="暂无数据" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, watch } from 'vue'
import { useParent } from '@vant/use'
import F2 from '@antv/f2/lib/index-all'
import { toThousands } from '@/utils/common'

export default defineComponent({
  name: 'BeStatsPie',

  props: {
    chartId: { type: String, default: '' },
  },

  setup(props) {
    const { parent } = useParent('stats-relation')

    const chartData = computed(() => {
      const expend = []
      const revenue = []
      parent.reports.value.forEach((item: ReportStats) => {
        if (item.billCategoryType === 1) {
          revenue.push({
            ...item,
            const: 'const',
            money: parseFloat(item.billCategoryMoney),
          })
        } else {
          expend.push({
            ...item,
            const: 'const',
            money: parseFloat(item.billCategoryMoney),
          })
        }
      })

      return { revenue, expend }
    })

    watch(chartData, () => {
      initChart()
    })

    const initChart = () => {
      const data = chartData.value[props.chartId]

      if (!data.length) return

      nextTick(() => {
        const chart = new F2.Chart({
          id: props.chartId,
          pixelRatio: window.devicePixelRatio,
        })

        chart.source(data)
        chart.coord('polar', { transposed: true, radius: 0.75 })
        chart.axis(false)
        chart.legend(false)
        chart.tooltip(false)

        chart
          .interval()
          .position('const*money')
          .adjust('stack')
          .color('billCategoryName', [
            '#1890FF',
            '#13C2C2',
            '#2FC25B',
            '#FACC14',
            '#f57403',
            '#F04864',
            '#8543E0',
          ])
          .animate({ appear: { duration: 1200, easing: 'bounceOut' } })

        chart.pieLabel({
          activeShape: true,
          lineHeight: 62,
          label1(data: ReportStats) {
            return {
              text: '￥' + toThousands(data.billCategoryMoney),
              fill: '#999',
              fontSize: window.devicePixelRatio * 10,
            }
          },
          label2(data: ReportStats) {
            return {
              text: data.billCategoryName,
              fill: '#999',
              fontSize: window.devicePixelRatio * 10,
            }
          },
        })

        chart.render()
      })
    }

    return { chartData }
  },
})
</script>

<style scoped>
.pie-chart {
  height: 300px;
  margin: 0 -10px;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
