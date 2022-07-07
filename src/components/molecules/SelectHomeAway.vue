<template>
  <BaseSelect :items="items" :label="'チーム選択'" :value="value" @input="handleInput" />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import BaseSelect from '@/components/atoms/BaseSelect.vue'

export default defineComponent({
  name: 'SelectHomeAway',

  components: {
    BaseSelect
  },

  props: {
    value: { type: String as () => HomeAway, default: 'home' }
  },

  setup(_, ctx) {
    const items = ['home', 'away', 'both']
    const handleInput = (value: string): void => ctx.emit('input', value)

    return { handleInput, items }
  }
})
</script>
