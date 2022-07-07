<template>
  <v-select
    :background-color="'white'"
    :item-text="'name'"
    :item-value="'id'"
    :items="items"
    :label="label"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseSelectId',

  props: {
    items: {
      type: Array as () => { id: string; name: string }[],
      default: () => []
    },
    label: { type: String, default: '' },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (id: string): void => ctx.emit('input', id)

    return { handleInput }
  }
})
</script>
