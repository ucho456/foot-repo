<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <label>{{ label }}</label>
    <v-textarea
      class="o-textarea"
      counter
      outlined
      :error-messages="errors[0]"
      :maxlength="maxlength"
      :value="value"
      @input="handleInput"
    />
  </ValidationProvider>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Textarea',

  props: {
    label: { type: String, default: '' },
    maxlength: { type: Number, default: 0 },
    rules: { type: String, default: '' },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => ctx.emit('input', value)

    return { handleInput }
  }
})
</script>

<style lang="scss" scoped>
.o-textarea {
  ::v-deep textarea {
    margin: 5px 0 !important;
  }
}
</style>
