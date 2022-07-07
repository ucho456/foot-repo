<template>
  <BaseButton
    :block-flg="true"
    :color="'primary'"
    :disabled="disabled"
    :outlined-flg="true"
    :text="'戻る'"
    @click="handleClick"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonBack',

  components: {
    BaseButton
  },

  props: {
    disabled: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')

    return { handleClick }
  }
})
</script>
