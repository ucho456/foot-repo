<template>
  <BaseButton
    :block-flg="true"
    :color="'#1da1f2'"
    :disabled="disabled"
    :icon="mdiTwitter"
    :left-flg="true"
    :is-loading="isLoading"
    :text="text"
    :white-text-flg="true"
    @click="handleClick"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import { mdiTwitter } from '@mdi/js'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonTwitter',

  components: {
    BaseButton
  },

  props: {
    disabled: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')

    return { handleClick, mdiTwitter }
  }
})
</script>
