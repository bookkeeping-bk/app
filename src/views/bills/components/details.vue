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
          v-for="bill in state.billDetails"
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
import { defineComponent, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { getBillDetails } from '@/api/bills'
import { formatTime, lunarCalendar, toThousands } from '@/utils/common'
import Iconfont from '@/components/iconfont/index.vue'
import { BillTypeEnum } from '@/enums/app-enum'

interface BillDetails {
  name: string
  value: string | number
}

export default defineComponent({
  name: 'BeBillDetails',

  components: {
    [Iconfont.name]: Iconfont,
  },

  emits: ['edit', 'delete'],

  setup() {
    const billDetails: BillDetails[] = []
    const store = useStore()
    const state = reactive({
      show: false,
      billId: 0,
      bill: {},
      billDetails,
    })

    const fetchBillDetails = async () => {
      try {
        Toast.loading({ message: '加载中...', forbidClick: true, duration: 0 })
        const { data } = await getBillDetails(state.billId)
        const bill = data.meta

        const billCategoryType = bill.billCategory.type === 1 ? '收入' : '支出'
        const user = `${bill.user.username} - ${bill.user.mobile}`

        state.bill = bill
        state.billDetails = [
          {
            name: '类型',
            value: `${bill.billCategory.name}${billCategoryType}`,
          },
          { name: '金额', value: toThousands(`￥${bill.money}`) },
          { name: '账户', value: bill.paymentSource.name },
          { name: '账本', value: bill.book.name },
          { name: '记录人', value: user },
          { name: '记录时间', value: lunarCalendar(bill.recordAt) },
          { name: '创建时间', value: formatTime(bill.createdAt) },
          { name: '图片', value: bill.images },
          { name: '备注', value: bill.remark },
        ]
      } finally {
        Toast.clear()
      }
    }

    /**
     * 监听有账单ID的时候才请求接口
     */
    watch(
      () => state.billId,
      (val) => {
        if (val) {
          fetchBillDetails()
        }
      }
    )

    /**
     * 监听是否需要重新加载账单详情数据
     */
    watch(
      () => store.state.bill.reloadBillDetails,
      async (val) => {
        if (val) {
          await fetchBillDetails()
          store.commit(BillTypeEnum.RELOAD_BILL_DETAILS, false)
        }
      }
    )

    return { state }
  },
})
</script>

<style lang="scss" scoped>
$--footer-height: 50px;

.bill-details {
  padding: 10px;

  &__wrapper {
    background: $--background-color-placeholder;
    border-radius: 5px;
    font-size: $--font-size-base;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    &:last-child {
      flex-direction: column;

      .bill-details__desc {
        padding-bottom: 10px;
      }
    }
  }

  &__desc {
    color: $--color-text-secondary;
  }

  &__footer {
    width: 100%;
    height: $--footer-height;
    background: $--background-color-placeholder;
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
