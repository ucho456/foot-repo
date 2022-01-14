<template>
  <ValidationProvider v-slot="{ errors }" rules="characterLimit">
    <BaseTextarea
      :error-message="errors[0]"
      :icon="icon"
      :label="label"
      :value="value"
      @input="handleInput"
    />
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BaseTextarea from '@/components/atoms/BaseTextarea.vue'

export default defineComponent({
  name: 'Textarea',

  components: {
    BaseTextarea
  },

  props: {
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { handleInput }
  }
})
</script>
