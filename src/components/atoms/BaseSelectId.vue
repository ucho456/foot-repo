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
  name: 'BaseSelectId',

  props: {
    icon: { type: String, default: '' },
    items: {
      type: Array as () => { id: string; name: string }[],
      default: () => [{ id: '', name: '' }]
    },
    label: { type: String, default: '' },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (id: string): void => {
      ctx.emit('input', id)
    }

    return { handleInput }
  }
})
</script>
