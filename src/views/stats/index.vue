<template>
  <be-stats-header />
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
import { defineComponent } from 'vue'
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
    return {}
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
