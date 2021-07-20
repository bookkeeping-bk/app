<template>
  <header class="header">
    <main class="header__main">
      <slot />

      <ul class="header__details">
        <li
          v-for="item in details"
          :key="item.name"
          class="header__details--item"
        >
          <em class="header__details--font" :style="{ background: item.color }">
            {{ item.name }}
          </em>
          <be-countup :content="item.amount" />
        </li>
      </ul>
    </main>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import Countup from '../countup/index.vue'

export default defineComponent({
  name: 'BeHeader',

  components: {
    [Countup.name]: Countup,
  },

  props: {
    bills: { type: Array as PropType<ReportStats[]>, default: () => [] },
    monthBillInfo: {
      type: Object as PropType<MonthBillInfo>,
      default: () => ({}),
    },
  },

  setup(props) {
    const details = computed(() => {
      let expend = 0
      let revenue = 0

      props.bills.forEach((bill) => {
        if (bill.billCategoryType === 1) {
          revenue += parseFloat(bill.billCategoryMoney)
        } else {
          expend += parseFloat(bill.billCategoryMoney)
        }
      })

      const revenueAmount = props.monthBillInfo.revenue
        ? parseFloat(props.monthBillInfo.revenue)
        : revenue
      const expendAmount = props.monthBillInfo.expend
        ? parseFloat(props.monthBillInfo.expend)
        : expend
      const balanceAmount = props.monthBillInfo.balance
        ? parseFloat(props.monthBillInfo.balance)
        : revenue - expend

      return [
        { name: '收', color: '#f57403', amount: revenueAmount },
        { name: '支', color: '#409eff', amount: expendAmount },
        { name: '结', color: '#008000', amount: balanceAmount },
      ]
    })

    return { details }
  },
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 20vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background: url('@/assets/images/bg.jpeg') no-repeat center / cover;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background: url('@/assets/images/bg.jpeg') no-repeat center / cover;
    filter: blur(5px);
  }

  &__main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
  }

  &__details {
    display: flex;
    font-size: 12px;

    &--item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &--font {
      width: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      font-style: normal;
      color: #fff;
      font-size: 10px;
    }
  }
}
</style>
