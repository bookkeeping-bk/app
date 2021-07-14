<template>
  <span ref="countup"></span>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { CountUp } from 'countup.js'
import { toThousands } from '@/utils/common'

export default defineComponent({
  name: 'BeCountup',

  props: {
    content: { type: Number, default: 0 },
  },

  setup(props) {
    const countup = ref()

    watch(
      () => props.content,
      () => {
        initCountUp()
      }
    )

    const initCountUp = () => {
      const countUp = new CountUp(countup.value, props.content, {
        decimalPlaces: 2,
        formattingFn(n) {
          return toThousands(`￥${n.toFixed(2)}`) as string
        },
      })
      countUp.start()
    }

    return { countup }
  },
})
</script>
