<template>
  <ul class="tabbar__wrapper">
    <router-link
      v-for="item in tabbars"
      :to="item.path"
      :key="item.path"
      class="tabbar__item"
    >
      <button v-if="!item.path" class="tabbar__edit">
        <be-iconfont :icon="item.icon" class="tabbar__edit--icon" />
      </button>
      <template v-else>
        <be-iconfont :icon="item.icon" class="tabbar__item--icon" />
        {{ item.name }}
      </template>
    </router-link>
  </ul>
</template>

<script setup>
import { reactive } from 'vue'
import Iconfont from '@/components/iconfont/index.vue'

const tabbars = reactive([
  { path: '/bills', icon: '#icon-bill', name: '账单' },
  { path: '/account', icon: '#icon-account', name: '账户' },
  { path: '', icon: '#icon-puls', name: '' },
  { path: '/stats', icon: '#icon-stats', name: '统计' },
  { path: '/home', icon: '#icon-user', name: '我的' },
])
</script>
<script>
export default {
  name: 'BeTabbar',
  components: {
    [Iconfont.name]: Iconfont,
  },
}
</script>

<style lang="scss" scoped>
.tabbar {
  &__wrapper {
    width: 100%;
    height: $--tabbar-height;
    display: flex;
    background: $--tabbar-background-color;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    flex: 1;
    font-size: $--tabbar-font-size;
    font-weight: $--tabbar-font-weight;
    line-height: 2;
    position: relative;

    &.router-link-active {
      color: $--tabbar-active-color;
    }

    &--icon {
      font-size: $--tabbar-icon-font-size;
    }
  }

  &__edit {
    width: $--tabbar-height;
    height: $--tabbar-height;
    background: $--color-primary;
    border-radius: 50%;
    color: $--color-white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    left: auto;
    border: 0;

    &--icon {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
