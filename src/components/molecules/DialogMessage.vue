<template>
  <BaseDialog :show="show" :max-width="380" @close="handleClose">
    <v-card-title class="text-h6"> {{ title }} </v-card-title>
    <v-card-text class="wrap">{{ message }} </v-card-text>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseDialog from '@/components/atoms/BaseDialog.vue'

export default defineComponent({
  name: 'DialogMessage',

  components: {
    BaseDialog
  },

  props: {
    message: { type: String, default: '' },
    show: { type: Boolean, default: false },
    title: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleClose = (): void => ctx.emit('close')
    return { handleClose }
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  white-space: pre-wrap;
}
</style>
