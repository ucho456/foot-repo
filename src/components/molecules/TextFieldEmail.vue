<template>
  <ValidationProvider v-slot="{ errors }" rules="email|required">
    <BaseTextField
      :err-message="errors[0]"
      :label="'メールアドレス'"
      :maxlength="255"
      :type="'email'"
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
  name: 'TextFieldEmail',

  components: {
    BaseTextField
  },

  props: {
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => ctx.emit('input', value)

    return { handleInput }
  }
})
</script>
