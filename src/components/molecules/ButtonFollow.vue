<template>
  <BaseButton
    :block-flg="true"
    :color="'primary'"
    :outlined-flg="!follow"
    :text="text"
    :white-text-flg="follow"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonFollow',

  components: {
    BaseButton
  },

  props: {
    follow: { type: Boolean, default: false }
  },

  setup(props, ctx) {
    const text = computed(() => (props.follow ? 'フォロー中' : 'フォロー'))
    const handleClick = (): void => ctx.emit('click')

    return { handleClick, text }
  }
})
</script>
