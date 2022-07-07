<template>
  <BaseImageUploader
    :disabled="disabled"
    :image-size="60"
    :max-width-or-height="100"
    :placeholder="'プロフィール写真'"
    :value="value"
    @change="handleChange"
    @clear="handleClear"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import BaseImageUploader from '@/components/atoms/BaseImageUploader.vue'

export default defineComponent({
  name: 'ImageUploaderUserImage',

  components: {
    BaseImageUploader
  },

  props: {
    disabled: { type: Boolean, default: false },
    value: { type: String, required: false, default: null }
  },

  setup(_, ctx) {
    const handleChange = (imageFile: File): void => ctx.emit('change', imageFile)
    const handleClear = (): void => ctx.emit('clear')

    return { handleChange, handleClear }
  }
})
</script>
