<template>
  <div class="card">
    <header class="card__header">
      {{ title }}
    </header>
    <main class="card__main">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BeCard',

  props: {
    title: { type: String, default: '' },
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  background: $--background-color-placeholder;
  border-radius: 5px;
  margin-bottom: 10px;

  &__header {
    padding-bottom: 10px;
    border-bottom: 0.5px solid #5d5e5f;
    font-size: 14px;
  }

  &__main {
    padding-top: 10px;
  }
}
</style>
