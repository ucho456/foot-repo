<template>
  <BaseButton
    :block-flg="true"
    :color="'#1a237e'"
    :is-loading="isLoading"
    :outlined-flg="!follow"
    :text="text"
    :white-text-flg="follow"
    @click="handleClick"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent, computed } from '@nuxtjs/composition-api'
import BaseButton from '@/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'ButtonFollow',

  components: {
    BaseButton
  },

  props: {
    follow: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    userId: { type: String, default: '' }
  },

  setup(props, ctx) {
    const text = computed(() => (props.follow ? 'フォロー中' : 'フォロー'))
    const handleClick = (): void => ctx.emit('click', props.userId)

    return { handleClick, text }
  }
})
</script>
