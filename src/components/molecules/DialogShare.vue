<template>
  <v-dialog max-width="380" scrollable :value="dialog">
    <v-card>
      <v-card-title>おめでとうございます！</v-card-title>
      <v-card-text> あなたの選手採点をSNSで共有しましょう。 </v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-btn icon color="#1da1f2" @click="handleTwitter">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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
  name: 'DialogPrivacyPolicy',

  props: {
    dialog: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const handleTwitter = (): void => ctx.emit('twitter')
    const handleClick = (): void => ctx.emit('click')

    return { handleClick, handleTwitter }
  }
})
</script>
