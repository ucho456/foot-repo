<template>
  <v-dialog max-width="380" scrollable :value="dialog">
    <v-card>
      <v-card-title>プライバシーポリシー</v-card-title>
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
  name: 'DialogPrivacyPolicy',

  props: {
    dialog: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const handleHide = (): void => ctx.emit('hide')

    return { handleHide }
  }
})
</script>
