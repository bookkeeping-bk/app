<template>
  <header class="header">
    <main class="header__main">
      <van-tabs v-model="active">
        <van-tab title="月账单">
          <p class="header__date">
            2021年6月
            <van-icon name="arrow-down" />
          </p>
        </van-tab>
        <van-tab title="年账单">
          <p class="header__date">
            2021年
            <van-icon name="arrow-down" />
          </p>
        </van-tab>
        <van-tab title="其它">
          <p class="header__date">
            20210年6月 ~ 2021年6月
            <van-icon name="arrow-down" />
          </p>
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
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { toThousands } from '@/utils/common'

export default defineComponent({
  name: 'BeStatsHeader',

  setup() {
    const active = ref()
    const details = computed(() => {
      return [
        { name: '收', amount: toThousands('￥19909.09') },
        { name: '支', amount: toThousands('￥19909.88') },
        { name: '结', amount: toThousands('￥199212.00') },
      ]
    })

    return { active, details }
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
