<template>
  <v-file-input accept="image/*" :placeholder="placeholder" @change="handleChange" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import imageCompression from 'browser-image-compression'

export default defineComponent({
  name: 'BaseFileInput',

  props: {
    maxWidthOrHeight: { type: Number, default: 0 },
    placeholder: { type: String, default: '' }
  },

  setup(props, ctx) {
    const resizeImage = async (file: File): Promise<File> => {
      const resizedImage = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: props.maxWidthOrHeight
      })
      return resizedImage
    }

    const encodeBase64 = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result)
        }
      })
    }

    const handleChange = async (file: File): Promise<void> => {
      if (!file.type.match(/^image\/(png|jpeg|gif)$/)) return
      const resizedImage = await resizeImage(file)
      const base64 = await encodeBase64(resizedImage)
      ctx.emit('change', base64)
    }

    return { handleChange }
  }
})
</script>
