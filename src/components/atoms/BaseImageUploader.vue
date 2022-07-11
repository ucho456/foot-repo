<template>
  <div class="o-base-file-input">
    <label class="o-label" for="image-input-form" :class="{ 'o-no-event': disabled }">
      <v-avatar :size="imageSize">
        <v-img v-if="value" :lazy-src="lazy" :src="value" />
        <v-img v-else :lazy-src="lazy" :src="noAvatarImage" />
      </v-avatar>
    </label>
    <input
      id="image-input-form"
      :key="deletedTimes"
      class="o-input"
      accept="image/*"
      type="file"
      :disabled="disabled"
      @change="handleChange"
    />
    <v-btn v-if="!disabled" class="o-button" color="black" icon @click="handleClear">
      <v-icon>{{ mdiClose }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
/** check */
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { mdiClose } from '@mdi/js'

export default defineComponent({
  name: 'BaseImageUploader',

  props: {
    disabled: { type: Boolean, default: false },
    imageSize: { type: Number, default: 0 },
    maxWidthOrHeight: { type: Number, default: 0 },
    placeholder: { type: String, default: '' },
    value: { type: String, default: null, required: false }
  },

  setup(_, ctx) {
    const noAvatarImage = require('@/assets/no_avatar.png')
    const lazy = require('@/assets/lazy.png')

    const deletedTimes = ref(0)

    const resizeImage = (image) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const ratio = image.height / image.width
      const width = 100
      const height = width * ratio
      canvas.width = width
      canvas.height = height
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
      return canvas.toDataURL('image/png')
    }

    const handleChange = (e) => {
      const { target } = e
      if (!(target instanceof HTMLInputElement) || !target.files) return
      const file = target.files[0]
      if (!file.type.match(/^image\/(png|jpeg|gif)$/)) return
      const image = new Image()
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        image.src = e.target?.result
        image.onload = () => {
          const resizedImage = resizeImage(image)
          ctx.emit('change', resizedImage)
        }
      }
    }

    const handleClear = () => {
      deletedTimes.value++
      ctx.emit('clear')
    }

    return { deletedTimes, handleChange, handleClear, lazy, mdiClose, noAvatarImage }
  }
})
</script>

<style lang="scss" scoped>
.o-base-file-input {
  .o-label {
    display: block;
    text-align: center;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  .o-no-event {
    opacity: 0.8;
    &:hover {
      cursor: default;
    }
  }
  .o-input {
    display: none;
  }
  .o-button {
    display: block;
    margin: 10px auto 0;
  }
}
</style>
