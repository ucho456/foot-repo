<template>
  <BaseButton
    :block-flg="true"
    :color="'#4285f4'"
    :image="googleIcon"
    :loading="loading"
    :text="'Googleアカウントでログイン'"
    :white-text-flg="true"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonGoogle',

  components: {
    BaseButton
  },

  props: {
    loading: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const googleIcon = require('@/assets/google_icon.png')
    const handleClick = (): void => ctx.emit('click')
    return { googleIcon, handleClick }
  }
})
</script>
