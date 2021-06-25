<template>
  <header class="bill-header">
    <p class="bill-header__time">{{ formatDate }}</p>
    <ul class="bill-header__detail">
      <li
        v-for="item in details"
        :key="item.name"
        class="bill-header__detail-item"
      >
        <em class="bill-header__detail-count">￥{{ item.value }}</em>
        {{ item.name }}
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { formatTime, toThousands } from '@/utils/common'

export default defineComponent({
  name: 'BeBillHeader',

  props: {
    monthBillInfo: {
      type: Object as PropType<MonthBillInfo>,
      default: () => ({}),
    },
  },

  setup(props) {
    const formatDate = computed(() => formatTime(Date.now(), 'YYYY年MM月'))
    const details = computed(() => {
      return [
        { name: '支出', value: toThousands(props.monthBillInfo.expend) },
        { name: '收入', value: toThousands(props.monthBillInfo.revenue) },
        { name: '结余', value: toThousands(props.monthBillInfo.balance) },
      ]
    })

    return { formatDate, details }
  },
})
</script>

<style lang="scss" scoped>
.bill-header {
  width: 100%;
  height: 20vh;
  overflow: hidden;
  background: url('@/assets/images/bg.jpeg') no-repeat center / cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  &__time {
    font-size: $--font-size-medium;
    font-weight: $--font-weight-primary;
    text-align: center;
    margin: 20px 0 0;
  }

  &__detail {
    display: flex;
    align-items: center;
    padding-top: 7vh;

    &-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &-count {
      font-size: $--font-size-base;
      font-style: normal;
    }
  }
}
</style>
