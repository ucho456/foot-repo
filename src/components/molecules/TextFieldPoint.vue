<template>
  <BaseTextField
    :dense-flg="true"
    :max="10"
    :min="0"
    :step="0.5"
    :type="'number'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseTextField from '@/components/atoms/BaseTextField.vue'

export default defineComponent({
  name: 'TextFieldPoint',

  components: {
    BaseTextField
  },

  props: {
    value: { type: String as () => ReportPoint, default: '6.5' }
  },

  setup(_, ctx) {
    const handleInput = (value: string): void => {
      // 6.0, 7.0 のように小数点第一位まで整数であっても表示する
      const point = value.length === 3 ? value : value + '.0'
      ctx.emit('input', point)
    }
    return { handleInput }
  }
})
</script>
