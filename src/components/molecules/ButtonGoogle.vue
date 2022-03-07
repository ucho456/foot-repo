<template>
  <BaseButton
    :block-flg="true"
    :color="'darkBlue'"
    :image="googleIcon"
    :outlined-flg="true"
    :text="'Googleアカウントでログイン'"
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
    icon: { type: String, default: '' },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const googleIcon = require('@/assets/google_icon.png')
    const handleClick = (): void => ctx.emit('click')
    return { googleIcon, handleClick }
  }
})
</script>
