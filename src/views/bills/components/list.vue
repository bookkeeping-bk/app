<template>
  <ul class="bills">
    <li
      v-for="bill in bills"
      :key="bill.id"
      class="bills__item"
      @click.stop="handleClick(bill)"
    >
      <i class="bills__icon">{{ bill.billCategory.name.substr(0, 1) }}</i>

      <div class="bills__info">
        <p class="bills__name">{{ bill.billCategory.name }}</p>
        <time>{{ toLunarCalendar(bill.recordAt) }}</time>
      </div>

      <span
        class="bills__money"
        :class="{ 'bills__money--balance': bill.billCategory.type === 1 }"
      >
        {{ bill.billCategory.type === 1 ? `+${bill.money}` : `-${bill.money}` }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { lunarCalendar } from '@/utils/common'

export default defineComponent({
  name: 'BeBillList',

  props: {
    bills: {
      type: Object as PropType<Bill>,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => [],
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const toLunarCalendar = (data: string) => lunarCalendar(data)
    const handleClick = (bill: Bill) => {
      emit('click', bill)
    }

    return { toLunarCalendar, handleClick }
  },
})
</script>

<style lang="scss" scoped>
.bills {
  padding: 0 10px;

  &__item {
    display: flex;
    padding: 10px 0;
    position: relative;
    z-index: 1;
    transition-property: all;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0, 0.85, 0.72, 0.86);
    transition-delay: 0;
    background: #202020;
  }

  &__icon {
    width: 25px;
    height: 25px;
    display: inline-block;
    line-height: 25px;
    text-align: center;
    background: $--color-primary;
    border-radius: 50%;
    color: $--color-white;
    margin-right: 5px;
    font-style: normal;
    font-weight: $--font-weight-primary;
  }

  &__info {
    flex: 1;
  }

  &__name {
    margin: 0;
    font-size: $--font-size-base;
  }

  &__money {
    align-self: center;
    font-size: $--font-size-medium;
    font-weight: $--font-weight-primary;

    &--balance {
      color: $--color-secondary;
    }
  }
}
</style>
