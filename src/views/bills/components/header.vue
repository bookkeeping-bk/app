<template>
  <header class="bill-header">
    <p class="bill-header__time" @click="state.showPicker = true">
      {{ state.formatDate }}
      <van-icon name="arrow-down" />
    </p>
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

  <van-popup v-model:show="state.showPicker" position="bottom">
    <van-datetime-picker
      v-model="state.currentDate"
      item-height="1.17333rem"
      type="year-month"
      :min-date="minDate"
      :formatter="formatter"
      @confirm="onPickerConfirm"
      @cancel="state.showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue'
import { useParent } from '@vant/use'
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
    const { parent } = useParent('bills')
    const state = reactive({
      showPicker: false,
      currentDate: new Date(),
      formatDate: formatTime(Date.now(), 'YYYY年MM月'),
    })

    const details = computed(() => {
      return [
        { name: '支出', value: toThousands(props.monthBillInfo.expend) },
        { name: '收入', value: toThousands(props.monthBillInfo.revenue) },
        { name: '结余', value: toThousands(props.monthBillInfo.balance) },
      ]
    })

    // 格式化时间选择器
    const formatter = (type: string, val: string) => {
      if (type === 'year') return `${val}年`
      if (type === 'month') return `${val}月`
      return val
    }

    const onPickerConfirm = (date: string) => {
      state.formatDate = formatTime(date, 'YYYY年MM月')
      parent.createdAt.value = formatTime(date, 'YYYY-MM')
      parent.initBills()
      state.showPicker = false
    }

    return {
      state,
      minDate: new Date(2021, 6, 1),
      details,
      formatter,
      onPickerConfirm,
    }
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
