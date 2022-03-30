<template>
  <BaseFileInput
    :max-width-or-height="50"
    :placeholder="'プロフィール写真'"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseFileInput from '@/components/atoms/BaseFileInput.vue'

export default defineComponent({
  name: 'FileInputUserPhoto',

  components: {
    BaseFileInput
  },

  setup(_, ctx) {
    const handleChange = (imageFile: File): void => ctx.emit('change', imageFile)
    return { handleChange }
  }
})
</script>
