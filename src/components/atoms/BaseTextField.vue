<template>
  <v-text-field
    :counter="counterFlg"
    :dense="denseFlg"
    :error-messages="errMessage"
    :label="label"
    :max="max"
    :maxlength="maxlength"
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
    counterFlg: { type: Boolean, default: false },
    denseFlg: { type: Boolean, default: false },
    errMessage: { type: String, default: '' },
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    max: { type: Number, default: 10 },
    maxlength: { type: Number, default: 255 },
    min: { type: Number, default: 0 },
    step: { type: Number, default: 1 },
    type: { type: String, default: '' },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { handleInput }
  }
})
</script>
