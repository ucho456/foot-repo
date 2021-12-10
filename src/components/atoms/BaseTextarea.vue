<template>
  <v-textarea
    :error-messages="errorMessage"
    :label="label"
    :outlined="true"
    :prepend-inner-icon="icon"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseTextarea',

  props: {
    errorMessage: { type: String, default: '' },
    label: { type: String, default: '' },
    icon: { type: String, default: '' },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { handleInput }
  }
})
</script>
