<template>
  <div class="pie-chart">
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import F2 from '@antv/f2/lib/index-all'

export default defineComponent({
  name: 'BeStatsPie',

  props: {
    chartId: { type: String, default: '' },
  },

  setup(props) {
    const data = [
      {
        name: '其他消费',
        y: 6371664,
        const: 'const',
      },
      {
        name: '生活用品',
        y: 7216301,
        const: 'const',
      },
      {
        name: '通讯物流',
        y: 1500621,
        const: 'const',
      },
      {
        name: '交通出行',
        y: 586622,
        const: 'const',
      },
      {
        name: '饮食',
        y: 900000,
        const: 'const',
      },
    ]

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

      chart.interval().position('const*y').adjust('stack').color('name')
      chart.pieLabel({
        activeShape: true,
        lineHeight: 62,
        label1: function label1(data) {
          return {
            text: '￥' + data.y,
            fill: '#999',
            fontSize: window.devicePixelRatio * 12,
          }
        },
        label2: function label2(data) {
          return {
            text: data.name,
            fill: '#999',
            fontSize: window.devicePixelRatio * 12,
          }
        },
      })
      chart.render()
    })

    return {}
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
