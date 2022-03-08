<template>
  <BaseButton
    :block-flg="true"
    :color="'primary'"
    :icon="icon"
    :left-flg="true"
    :outlined-flg="true"
    :text="text"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonBlockWhite',

  components: {
    BaseButton
  },

  props: {
    icon: { type: String, default: '' },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')
    return { handleClick }
  }
})
</script>
