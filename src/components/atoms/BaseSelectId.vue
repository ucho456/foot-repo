<template>
  <v-select
    :background-color="'white'"
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
      type: Array as () => { value: number; text: string }[],
      default: () => [{ value: 0, text: '' }]
    },
    label: { type: String, default: '' },
    value: { type: Number, default: 0 }
  },

  setup(_, ctx) {
    const handleInput = (value: number): void => {
      const id = value
      ctx.emit('input', id)
    }
    return { handleInput }
  }
})
</script>
