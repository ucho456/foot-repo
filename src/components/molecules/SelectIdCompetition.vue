<template>
  <BaseSelectId
    :items="competitions"
    :icon="'mdi-tournament'"
    :label="'コンペティション'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseSelectId from '@/components/atoms/BaseSelectId.vue'

export default defineComponent({
  name: 'SelectIdCompetition',

  components: {
    BaseSelectId
  },

  props: {
    number: { type: Number, default: 0 },
    value: { type: Number, default: 0 }
  },

  setup(props, ctx) {
    const competitions = [
      { value: 0, text: '未選択' },
      { value: 1, text: 'プレミアリーグ' },
      { value: 2, text: 'リーガエスパニョーラ' },
      { value: 3, text: 'セリエA' },
      { value: 4, text: 'ブンデスリーガ' },
      { value: 5, text: 'リーグアン' }
    ]
    const handleInput = (id: number): void => ctx.emit('input', { number: props.number, id })
    return { competitions, handleInput }
  }
})
</script>
