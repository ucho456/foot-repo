<template>
  <BaseButton
    :block-flg="true"
    :color="'primary'"
    :disabled="disabled"
    :outlined-flg="true"
    :text="text"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonOutlined',

  components: {
    BaseButton
  },

  props: {
    disabled: { type: Boolean, default: false },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleClick = (): void => {
      ctx.emit('click')
    }

    return { handleClick }
  }
})
</script>
