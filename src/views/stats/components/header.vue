<template>
  <be-header :bills="reports">
    <van-tabs v-model:active="state.tabActiveIndex" @change="changeTab">
      <van-tab v-for="tab of tabs" :key="tab.title" :title="tab.title">
        <div class="header__date" @click="state.showPicker = true">
          {{ tab.formatDate }}
          <van-icon name="arrow-down" />
        </div>
      </van-tab>
    </van-tabs>
  </be-header>

  <van-popup v-model:show="state.showPicker" position="bottom">
    <be-stats-picker
      :tab-active-index="state.tabActiveIndex"
      @confirm="onPickerConfirm"
      @time-interval="handleTimeInterval"
    />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'
import { useParent } from '@vant/use'
import { formatTime, getFirstAndLastDay } from '@/utils/common'
import { errorAlert } from '@/utils/layer'
import Header from '@/components/header/index.vue'
import Picker from './picker.vue'

export default defineComponent({
  name: 'BeStatsHeader',

  components: {
    [Header.name]: Header,
    [Picker.name]: Picker,
  },

  setup() {
    const { parent } = useParent('stats-relation')
    const state = reactive({
      tabActiveIndex: 0,
      showPicker: false,
    })

    // 获取当前月的第一天和最后一天
    const { firstDay, lastDay } = getFirstAndLastDay(Date.now(), 'M')
    const tabs = reactive([
      {
        title: '月账单',
        date: new Date().toString(), // 加 toString() 避免TS类型报错
        formatDate: formatTime(Date.now(), 'YYYY年MM月'),
      },
      {
        title: '年账单',
        date: new Date().toString(),
        formatDate: formatTime(Date.now(), 'YYYY年'),
      },
      {
        title: '其它',
        date: [new Date(firstDay).toString(), new Date(lastDay).toString()],
        formatDate: `${firstDay} ~ ${lastDay}`,
      },
    ])

    const changeTab = () => {
      const date = tabs[state.tabActiveIndex].date as string
      const month = getFirstAndLastDay(date, 'M')
      const year = getFirstAndLastDay(date, 'y')
      const queryDate = {
        0: { begin: month.firstDay, end: month.lastDay },
        1: { begin: year.firstDay, end: year.lastDay },
        2: {
          begin: formatTime(date[0], 'YYYY-MM-DD'),
          end: formatTime(date[1], 'YYYY-MM-DD'),
        },
      }

      parent.queryParams.value = queryDate[state.tabActiveIndex]
      parent.fetchStatsReport()
    }

    // 处理搜索年/月账单
    const onPickerConfirm = (date: string) => {
      const format = state.tabActiveIndex === 0 ? 'YYYY年MM月' : 'YYYY年'
      const month = getFirstAndLastDay(date, 'M')
      const year = getFirstAndLastDay(date, 'y')
      tabs[state.tabActiveIndex].formatDate = formatTime(date, format)
      tabs[state.tabActiveIndex].date = date

      parent.queryParams.value = {
        begin: state.tabActiveIndex === 0 ? month.firstDay : year.firstDay,
        end: state.tabActiveIndex === 0 ? month.lastDay : year.lastDay,
      }
      parent.fetchStatsReport()

      state.showPicker = false
    }

    // 处理其它账单
    const handleTimeInterval = (beginDate: string, endDate: string) => {
      if (beginDate > endDate) return errorAlert('结束日期不能早于开始日期哦~')
      const begin = formatTime(beginDate, 'YYYY-MM-DD')
      const end = formatTime(endDate, 'YYYY-MM-DD')
      tabs[state.tabActiveIndex].formatDate = `${begin} ~ ${end}`
      tabs[state.tabActiveIndex].date = [beginDate, endDate]

      parent.queryParams.value = { begin, end }
      parent.fetchStatsReport()

      state.showPicker = false
    }

    provide('state', state)

    return {
      state,
      tabs,
      reports: parent.reports,
      changeTab,
      onPickerConfirm,
      handleTimeInterval,
    }
  },
})
</script>

<style lang="scss" scoped>
.header__date {
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin: 5px 0 20px;
}
</style>
