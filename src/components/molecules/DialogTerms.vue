<template>
  <v-dialog :max-width="380" :scrollable="true" :value="isDialog">
    <v-card>
      <v-card-title>利用規約</v-card-title>
      <v-card-text>{{ terms }}</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="handleClick">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogTerms',

  props: {
    isDialog: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const terms = 'あ'.repeat(500)
    const handleClick = (): void => {
      ctx.emit('click')
    }

    return { terms, handleClick }
  }
})
</script>
