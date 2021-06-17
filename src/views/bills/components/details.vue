<template>
  <van-popup
    v-model:show="state.show"
    class="popup-fullscreen"
    position="right"
  >
    <van-nav-bar
      title="账单详情"
      left-text="返回"
      left-arrow
      @click-left="state.show = false"
    />

    <main class="bill-details">
      <ul class="bill-details__wrapper">
        <li
          v-for="bill in billInfo"
          :key="bill.name"
          class="bill-details__item"
        >
          <span class="bill-details__desc">{{ bill.name }}</span>
          {{ bill.value }}
        </li>
      </ul>
    </main>

    <ul class="bill-details__footer">
      <li class="bill-details__edit" @click="$emit('edit', state.bill)">
        <be-iconfont icon="#icon-edit" />
        修改
      </li>
      <li class="bill-details__delete" @click="$emit('delete', state.bill)">
        <be-iconfont icon="#icon-delete" />
        删除
      </li>
    </ul>
  </van-popup>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { formatTime, lunarCalendar } from '@/utils/common'
import Iconfont from '@/components/iconfont/index.vue'

export default defineComponent({
  name: 'BeBillDetails',

  components: {
    [Iconfont.name]: Iconfont,
  },

  emits: ['edit', 'delete'],

  setup() {
    const state = reactive({
      show: false,
      bill: {},
    })
    const billInfo = computed(() => {
      const bill = state.bill as Bill
      const type = bill.billCategory.type
      const amount = type === 1 ? `+${bill.money}` : `-${bill.money}`

      return [
        { name: '类型', value: bill.billCategory.name },
        { name: '金额', value: amount },
        { name: '账户', value: bill.paymentSource.name },
        { name: '账本', value: bill.book.name },
        { name: '记录人', value: bill.user.mobile },
        { name: '记录时间', value: lunarCalendar(bill.recordAt) },
        { name: '创建时间', value: formatTime(bill.createdAt) },
        { name: '图片', value: bill.images },
        { name: '备注', value: bill.remark },
      ]
    })

    return { state, billInfo }
  },
})
</script>

<style lang="scss" scoped>
$--background-color: #303030;

.bill-details {
  padding: 10px;

  &__wrapper {
    background: $--background-color;
    border-radius: 5px;
    font-size: $--font-size-base;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  &__desc {
    color: $--color-text-secondary;
  }

  &__footer {
    width: 100%;
    height: 40px;
    background: $--background-color;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    font-weight: $--font-weight-primary;
  }

  &__edit {
    color: $--color-success;
    @extend %li;
  }
  &__delete {
    color: $--color-danger;
    @extend %li;
  }
}

%li {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  .be-iconfont {
    margin-right: 10px;
  }
}
</style>
