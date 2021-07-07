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
      parent.reports.value.forEach((item: Bill) => {
        if (item.billCategory.type === 1) {
          expend.push({
            ...item,
            const: 'const',
            money: parseFloat(item.money),
          })
        } else {
          revenue.push({
            ...item,
            const: 'const',
            money: parseFloat(item.money),
          })
        }
      })

      return { expend, revenue }
    })

    watch(
      () => chartData.value,
      () => {
        initChart()
      }
    )

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

        chart.interval().position('const*money').adjust('stack').color('id')
        chart.pieLabel({
          activeShape: true,
          lineHeight: 62,
          label1(data) {
            return {
              text: '￥' + toThousands(data.money.toFixed(2)),
              fill: '#999',
              fontSize: window.devicePixelRatio * 10,
            }
          },
          label2(data: Bill) {
            return {
              text: data.billCategory.name,
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
