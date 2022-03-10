<template>
  <BaseButton
    :block-flg="true"
    :color="'#1da1f2'"
    :icon="'mdi-twitter'"
    :left-flg="true"
    :loading="loading"
    :text="text"
    :white-text-flg="true"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonTwitter',

  components: {
    BaseButton
  },

  props: {
    loading: { type: Boolean, default: false },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')
    return { handleClick }
  }
})
</script>
