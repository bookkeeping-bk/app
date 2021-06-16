<template>
  <svg class="be-iconfont" aria-hidden="true">
    <use :xlink:href="icon" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BeIconfont',
  props: { icon: String },
})
</script>

<style scoped>
.be-iconfont {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  vertical-align: -0.15em;
}
</style>
