<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <BaseTextarea
      :counter-flg="true"
      :err-message="errors[0]"
      :label="label"
      :maxlength="maxlength"
      :value="value"
      @input="handleInput"
    />
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseTextarea from '@/components/atoms/BaseTextarea.vue'

export default defineComponent({
  name: 'Textarea',

  components: {
    BaseTextarea
  },

  props: {
    label: { type: String, default: '' },
    maxlength: { type: Number, default: 0 },
    rules: { type: String, default: '' },
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
