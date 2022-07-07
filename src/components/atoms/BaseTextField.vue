<template>
  <v-text-field
    :counter="counterFlg"
    :disabled="disabled"
    :error-messages="errMessage"
    :label="label"
    :maxlength="maxlength"
    :type="type"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseTextField',

  props: {
    counterFlg: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    errMessage: { type: String, default: '' },
    label: { type: String, default: '' },
    maxlength: { type: Number, default: 0 },
    type: { type: String, default: '' },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => ctx.emit('input', value)

    return { handleInput }
  }
})
</script>
