<template>
  <ValidationProvider v-slot="{ errors }" rules="required|minPassword:4">
    <BaseTextField
      :value="value"
      :icon="'mdi-lock'"
      :label="'パスワード'"
      :type="'password'"
      :error-message="errors[0]"
      @input="handleInput"
    />
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseTextField from '@/components/atoms/BaseTextField.vue'

export default defineComponent({
  name: 'TextFieldPassword',

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
