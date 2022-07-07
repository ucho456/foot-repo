<template>
  <v-dialog max-width="380" scrollable :value="dialog">
    <v-card>
      <v-card-title>特定商取引法に基づく表示</v-card-title>
      <v-card-text> サンプル </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="handleHide">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogSpecifiedCommercialTransactionsLaw',

  props: {
    dialog: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const handleHide = (): void => ctx.emit('hide')

    return { handleHide }
  }
})
</script>
