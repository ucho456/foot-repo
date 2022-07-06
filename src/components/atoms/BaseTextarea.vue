<template>
  <v-textarea
    :counter="counterFlg"
    :error-messages="errMessage"
    :label="label"
    :maxlength="maxlength"
    :outlined="true"
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
    label: { type: String, default: '' },
    maxlength: { type: Number, default: 0 },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => {
      ctx.emit('input', value)
    }

    return { handleInput }
  }
})
</script>
