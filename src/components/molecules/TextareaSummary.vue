<template>
  <ValidationProvider v-slot="{ errors }" rules="characterLimit">
    <BaseTextarea
      :error-message="errors[0]"
      :icon="'mdi-note-text-outline'"
      :label="'総評'"
      :value="value"
      @input="handleInput"
    />
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BaseTextarea from '@/components/atoms/BaseTextarea.vue'

export default defineComponent({
  name: 'TextareaSummary',

  components: {
    BaseTextarea
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
