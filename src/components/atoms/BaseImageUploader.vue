<template>
  <div class="base-file-input">
    <label for="image-input-form">
      <v-avatar :size="imageSize">
        <v-img v-if="value" :src="value" />
        <v-img v-else :src="noAvatarImage" />
      </v-avatar>
    </label>
    <input
      id="image-input-form"
      :key="deletedTimes"
      type="file"
      accept="image/*"
      @change="handleChange"
    />
    <v-btn class="button" color="black" icon @click="handleClear">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import imageCompression from 'browser-image-compression'

export default defineComponent({
  name: 'BaseImageUploader',

  props: {
    imageSize: { type: Number, default: 0 },
    maxWidthOrHeight: { type: Number, default: 0 },
    placeholder: { type: String, default: '' },
    value: { type: String, required: false, default: null }
  },

  setup(props, ctx) {
    const noAvatarImage = require('@/assets/no_avatar.png')
    const deletedTimes = ref(0)

    const resizeImage = async (file: File): Promise<File> => {
      const resizedImageFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: props.maxWidthOrHeight
      })
      return resizedImageFile
    }

    const handleChange = async (e: Event): Promise<void> => {
      const { target } = e
      if (!(target instanceof HTMLInputElement) || !target.files) return
      const file = target.files[0]
      if (!file.type.match(/^image\/(png|jpeg|gif)$/)) return
      const resizedImageFile = await resizeImage(file)
      ctx.emit('change', resizedImageFile)
    }

    const handleClear = (): void => {
      deletedTimes.value++
      ctx.emit('clear')
    }

    return { noAvatarImage, deletedTimes, handleChange, handleClear }
  }
})
</script>

<style lang="scss" scoped>
.base-file-input {
  label {
    display: block;
    text-align: center;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  input {
    display: none;
  }
  .button {
    display: block;
    margin: 10px auto 0;
  }
}
</style>
