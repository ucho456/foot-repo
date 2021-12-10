<template>
  <v-text-field
    :dense="denseFlg"
    :error-messages="errorMessage"
    :label="label"
    :max="max"
    :min="min"
    :prepend-inner-icon="icon"
    :step="step"
    :type="type"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseTextField',

  props: {
    denseFlg: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    max: { type: Number, default: 10 },
    min: { type: Number, default: 0 },
    step: { type: Number, default: 1 },
    type: { type: String, default: 'text' },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { handleInput }
  }
})
</script>
