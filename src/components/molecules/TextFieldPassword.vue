<template>
  <ValidationProvider v-slot="{ errors }" rules="password|required">
    <BaseTextField
      :err-message="errors[0]"
      :icon="'mdi-lock'"
      :label="'パスワード'"
      :maxlength="20"
      :type="'password'"
      :value="value"
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
    const handleInput = (value: string): void => {
      ctx.emit('input', value)
    }

    return { handleInput }
  }
})
</script>
