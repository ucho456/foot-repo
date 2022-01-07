<template>
  <BaseTextField
    :dense-flg="true"
    :max="10"
    :min="0"
    :step="0.5"
    :type="'number'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseTextField from '@/components/atoms/BaseTextField.vue'

export default defineComponent({
  name: 'TextFieldPoint',

  components: {
    BaseTextField
  },

  props: {
    value: { type: Number, default: 6.5 }
  },

  setup(_, ctx) {
    const handleInput = (value: number): void => ctx.emit('input', value)
    return { handleInput }
  }
})
</script>
