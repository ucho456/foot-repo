<template>
  <BaseSelect
    :icon="'mdi-format-list-bulleted-type'"
    :items="items"
    :label="'チーム選択'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseSelect from '@/components/atoms/BaseSelect.vue'

export default defineComponent({
  name: 'SelectHomeAway',

  components: {
    BaseSelect
  },

  props: {
    value: { type: String as () => SelectTeam, default: 'Home team only' }
  },

  setup(_, ctx) {
    const items = ['Home team only', 'Away team only', 'Both teams']
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { items, handleInput }
  }
})
</script>
