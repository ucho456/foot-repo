<template>
  <BaseSelect :items="points" :label="'採点'" :value="value" @input="handleInput" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseSelect from '@/components/atoms/BaseSelect.vue'

export default defineComponent({
  name: 'SelectPoint',

  components: {
    BaseSelect
  },

  props: {
    value: { type: String as () => Point, default: '' }
  },

  setup(_, ctx) {
    const points: Point[] = [
      '',
      '0.0',
      '0.5',
      '1.0',
      '1.5',
      '2.0',
      '2.5',
      '3.0',
      '3.5',
      '4.0',
      '4.5',
      '5.0',
      '5.5',
      '6.0',
      '6.5',
      '7.0',
      '7.5',
      '8.0',
      '8.5',
      '9.0',
      '9.5',
      '10.0'
    ]
    const handleInput = (value: string): void => {
      ctx.emit('input', value)
    }

    return { points, handleInput }
  }
})
</script>
