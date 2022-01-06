<template>
  <BaseSelect
    :icon="'mdi-format-list-bulleted-type'"
    :items="formats"
    :label="'フォーマット'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseSelect from '@/components/atoms/BaseSelect.vue'

export default defineComponent({
  name: 'SelectFormat',

  components: {
    BaseSelect
  },

  props: {
    value: { type: String as () => FormatType, default: 'Home team only' }
  },

  setup(_, ctx) {
    const formats = ['Home team only', 'Away team only', 'Both teams']
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { formats, handleInput }
  }
})
</script>
