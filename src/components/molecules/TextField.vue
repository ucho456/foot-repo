<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <BaseTextField
      :counter-flg="true"
      :disabled="disabled"
      :err-message="errors[0]"
      :label="label"
      :maxlength="maxlength"
      :type="'text'"
      :value="value"
      @input="handleInput"
    />
  </ValidationProvider>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import BaseTextField from '@/components/atoms/BaseTextField.vue'

export default defineComponent({
  name: 'TextField',

  components: {
    BaseTextField
  },

  props: {
    disabled: { type: Boolean, default: false },
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
