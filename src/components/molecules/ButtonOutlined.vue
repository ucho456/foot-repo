<template>
  <BaseButton
    :block-flg="true"
    :color="'primary'"
    :outlined-flg="true"
    :text="text"
    @click="handleClick"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonOutlined',

  components: {
    BaseButton
  },

  props: {
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')

    return { handleClick }
  }
})
</script>
