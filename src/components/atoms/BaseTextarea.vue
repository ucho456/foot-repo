<template>
  <v-textarea
    :counter="counterFlg"
    :error-messages="errMessage"
    :label="label"
    :maxlength="maxlength"
    outlined
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
    counterFlg: { type: Boolean, default: false },
    errMessage: { type: String, default: '' },
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    maxlength: { type: Number, default: 255 },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { handleInput }
  }
})
</script>
