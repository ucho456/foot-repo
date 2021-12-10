<template>
  <v-select
    :background-color="'white'"
    :item-text="'name'"
    :item-value="'id'"
    :items="items"
    :label="label"
    :prepend-inner-icon="icon"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseSelect',

  props: {
    icon: { type: String, default: '' },
    items: { type: Array as () => string | number[], default: () => [''] },
    label: { type: String, default: '' },
    value: { type: [String, Number], default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string | number): void => ctx.emit('input', value)
    return { handleInput }
  }
})
</script>
