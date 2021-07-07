<template>
  <header class="header">
    <main class="header__main">
      <van-tabs v-model:active="state.tabActiveIndex" @change="changeTab">
        <van-tab v-for="tab of tabs" :key="tab.title" :title="tab.title">
          <div class="header__date" @click="state.showPicker = true">
            {{ tab.formatDate }}
            <van-icon name="arrow-down" />
          </div>
        </van-tab>
      </van-tabs>

      <ul class="header__detail">
        <li
          v-for="item in details"
          :key="item.name"
          class="header__detail--item"
        >
          <em class="header__detail--font">{{ item.name }} </em>
          {{ item.amount }}
        </li>
      </ul>
    </main>
  </header>

  <van-popup v-model:show="state.showPicker" position="bottom">
    <be-stats-picker
      :tab-active-index="state.tabActiveIndex"
      @confirm="onPickerConfirm"
      @time-interval="handleTimeInterval"
    />
  </van-popup>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, provide, reactive } from 'vue'
import { useParent } from '@vant/use'
import { formatTime, toThousands, getFirstAndLastDay } from '@/utils/common'
import Picker from './picker.vue'
import { errorAlert } from '@/utils/layer'

export default defineComponent({
  name: 'BeStatsHeader',

  components: {
    [Picker.name]: Picker,
  },

  props: {
    // eslint-disable-next-line vue/require-valid-default-prop
    reports: { type: Array as PropType<Bill[]>, default: () => [] },
  },

  setup(props) {
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

    // 收支结余明细
    const details = computed(() => {
      let expend = 0
      let revenue = 0

      props.reports.forEach((item: Bill) => {
        if (item.billCategory.type === 1) {
          expend += parseFloat(item.money)
        } else {
          revenue += parseFloat(item.money)
        }
      })
      const balance = expend - revenue
      return [
        { name: '收', amount: toThousands(`￥${expend.toFixed(2)}`) },
        { name: '支', amount: toThousands(`￥${revenue.toFixed(2)}`) },
        { name: '结', amount: toThousands(`￥${balance.toFixed(2)}`) },
      ]
    })

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
      details,
      changeTab,
      onPickerConfirm,
      handleTimeInterval,
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 24vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background: url('@/assets/images/bg.jpeg') no-repeat center / cover;
    filter: blur(5px);
  }

  &__main {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
  }

  &__date {
    color: #fff;
    font-size: 14px;
    text-align: center;
    margin: 20px 0 30px;
  }

  &__detail {
    display: flex;
    font-size: 12px;

    &--item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:first-child {
        .header__detail--font {
          background: $--color-secondary;
        }
      }

      &:nth-child(2) {
        .header__detail--font {
          background: purple;
        }
      }
    }

    &--font {
      width: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      font-style: normal;
      color: #fff;
      font-size: 10px;
      background: green;
    }
  }
}
</style>
