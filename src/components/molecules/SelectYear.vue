<template>
  <BaseSelect :items="years" :label="'年'" :value="value" @input="handleInput" />
</template>

<script lang="ts">
/** check */
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
    const years: string[] = []
    const thisYear = new Date().getFullYear()
    for (let i = 2022; i <= thisYear; i++) {
      years.push(String(i))
    }
    const handleInput = (value: string): void => ctx.emit('input', value)

    return { handleInput, years }
  }
})
</script>
