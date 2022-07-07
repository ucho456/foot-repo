<template>
  <BaseButton
    :block-flg="true"
    :color="color"
    :disabled="disabled"
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
  name: 'ButtonSubmit',

  components: {
    BaseButton
  },

  props: {
    color: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')

    return { handleClick }
  }
})
</script>
