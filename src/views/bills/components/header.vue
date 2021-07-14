<template>
  <be-header :month-bill-info="monthBillInfo">
    <p class="bill-header__time" @click="state.showPicker = true">
      {{ state.formatDate }}
      <van-icon name="arrow-down" />
    </p>
  </be-header>

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
import { defineComponent, PropType, reactive } from 'vue'
import { useParent } from '@vant/use'
import { formatTime } from '@/utils/common'
import Header from '@/components/header/index.vue'

export default defineComponent({
  name: 'BeBillHeader',

  components: {
    [Header.name]: Header,
  },

  props: {
    monthBillInfo: {
      type: Object as PropType<MonthBillInfo>,
      default: () => ({}),
    },
  },

  setup() {
    const { parent } = useParent('bills')
    const state = reactive({
      showPicker: false,
      currentDate: new Date(),
      formatDate: formatTime(Date.now(), 'YYYY年MM月'),
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
      minDate: new Date(2021, 1, 1),
      formatter,
      onPickerConfirm,
    }
  },
})
</script>

<style lang="scss" scoped>
.bill-header__time {
  font-size: $--font-size-medium;
  font-weight: $--font-weight-primary;
  text-align: center;
  margin: 20px 0 7vh;
}
</style>
