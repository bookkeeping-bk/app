<template>
  <van-datetime-picker
    v-show="tabActiveIndex === 0"
    v-model="state.currentDate"
    item-height="1.17333rem"
    type="year-month"
    :min-date="minDate"
    :formatter="formatter"
    @confirm="onPickerConfirm"
    @cancel="parentState.showPicker = false"
  />

  <van-picker
    v-show="tabActiveIndex === 1"
    :columns="yearColumns"
    item-height="1.17333rem"
    @confirm="onPickerConfirm"
    @cancel="parentState.showPicker = false"
  />

  <div v-show="tabActiveIndex === 2">
    <p class="select-date">开始日期</p>
    <van-datetime-picker
      v-model="state.beginDate"
      type="date"
      :show-toolbar="false"
      :min-date="minDate"
      :formatter="formatter"
      @change="onBeginConfirm"
    />
    <p class="select-date">结束日期</p>
    <van-datetime-picker
      v-model="state.endDate"
      type="date"
      :show-toolbar="false"
      :min-date="minDate"
      :formatter="formatter"
      @change="onEndConfirm"
    />
    <van-button
      type="primary"
      block
      style="margin-top: 20px"
      @click="handleTimeInterval"
    >
      确 定
    </van-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive } from 'vue'
import { formatTime, getFirstAndLastDay } from '@/utils/common'

export default defineComponent({
  name: 'BeStatsPicker',
  props: {
    tabActiveIndex: { type: Number, default: 0 },
  },
  emits: ['confirm', 'time-interval'],

  setup(props, { emit }) {
    // 获取当前月的第一天和最后一天
    const { firstDay, lastDay } = getFirstAndLastDay(Date.now(), 'M')
    const state = reactive({
      currentDate: new Date(),
      beginDate: new Date(firstDay),
      endDate: new Date(lastDay),
      selectedBeginDate: '',
      selectedEndDate: '',
    })

    // 生成年份数据
    const yearColumns = computed(() => {
      const currentYear = ~~formatTime(Date.now(), 'YYYY')
      const yearArray = []
      let yearIndex = 0

      while (yearIndex <= 10) {
        // yearArray.push(currentYear - yearIndex) // 十年前
        yearArray.push(`${currentYear + yearIndex}年`) // 十年后
        yearIndex++
      }
      return yearArray
    })

    // 格式化时间选择器
    const formatter = (type: string, val: string) => {
      if (type === 'year') return `${val}年`
      if (type === 'month') return `${val}月`
      if (type === 'day') return `${val}日`
      return val
    }

    const onBeginConfirm = (date: string) => {
      state.selectedBeginDate = formatTime(date, 'YYYY-MM-DD')
    }

    const onEndConfirm = (date: string) => {
      state.selectedEndDate = formatTime(date, 'YYYY-MM-DD')
    }

    const onPickerConfirm = (date: string) => {
      emit('confirm', date)
    }

    const handleTimeInterval = () => {
      emit(
        'time-interval',
        state.selectedBeginDate || firstDay,
        state.selectedEndDate || lastDay
      )
    }

    const parentState = inject('state', { showPicker: false })

    return {
      state,
      parentState,
      minDate: new Date(2021, 0, 1),
      yearColumns,
      formatter,
      onPickerConfirm,
      onBeginConfirm,
      onEndConfirm,
      handleTimeInterval,
    }
  },
})
</script>

<style scoped>
.select-date {
  text-align: center;
  color: #000;
  font-size: 16px;
}
</style>
