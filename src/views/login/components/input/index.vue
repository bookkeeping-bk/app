<template>
  <input
    v-model="currentValue"
    :type="type"
    :placeholder="placeholder"
    class="be-input"
    @input="updateValue"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BeInput',

  props: {
    modelValue: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
  },

  // eslint-disable-next-line vue/no-setup-props-destructure
  setup({ modelValue }, { emit }) {
    const currentValue = ref(modelValue || '')

    const updateValue = (event: Event) => {
      const targetValue = (event.target as HTMLInputElement).value
      currentValue.value = targetValue
      // eslint-disable-next-line vue/require-explicit-emits
      emit('update:modelValue', targetValue)
    }

    return { currentValue, updateValue }
  },
})
</script>

<style lang="scss" scoped>
.be-input {
  width: $--input-width;
  height: $--input-height;
  outline: 0;
  border: $--input-border;
  border-radius: $--input-border-radius;
  appearance: none;
  transition: $--border-transition-base;
  background: $--input-background-color;
  padding: 0 15px;
  color: $--input-font-color;
  font-size: $--input-font-size;
  display: inline-block;
  &:focus {
    border-color: $--input-focus-border;
  }
}
</style>
