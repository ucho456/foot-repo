<template>
  <v-dialog
    :max-width="maxWidth"
    :persistent="persistent"
    :value="show"
    width="90%"
    @input="handleClose"
  >
    <v-card>
      <slot></slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="handleClose"> 閉じる </v-btn>
        <v-btn v-if="decideButtonText !== ''" color="primary" text @click="handleDecide">
          {{ decideButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseDialog',

  props: {
    decideButtonText: { type: String, default: '' },
    maxWidth: { type: Number, default: 0 },
    persistent: { type: Boolean, default: false },
    show: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const handleDecide = (): void => ctx.emit('decide')
    const handleClose = (): void => ctx.emit('close')
    return { handleDecide, handleClose }
  }
})
</script>
