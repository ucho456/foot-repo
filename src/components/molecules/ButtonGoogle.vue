<template>
  <BaseButton
    :block-flg="true"
    :color="'#4285f4'"
    :image="googleIcon"
    :is-loading="isLoading"
    :text="text"
    :white-text-flg="true"
    @click="handleClick"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonGoogle',

  components: {
    BaseButton
  },

  props: {
    isLoading: { type: Boolean, default: false },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const googleIcon = require('@/assets/google_icon.png')
    const handleClick = (): void => ctx.emit('click')

    return { googleIcon, handleClick }
  }
})
</script>
