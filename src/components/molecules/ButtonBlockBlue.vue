<template>
  <BaseButton
    :block-flg="true"
    :color="'darkBlue'"
    :disabled="disabled"
    :icon="icon"
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
  name: 'ButtonBlockBlue',

  components: {
    BaseButton
  },

  props: {
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')
    return { handleClick }
  }
})
</script>
