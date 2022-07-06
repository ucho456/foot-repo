<template>
  <v-dialog max-width="260" scrollable :value="dialog">
    <v-card>
      <v-card-title>おめでとうございます！</v-card-title>
      <v-card-text> 選手採点をSNSで共有しましょう。 </v-card-text>
      <v-container>
        <v-row>
          <v-col class="text-center">
            <v-btn class="mr-5" icon color="#1da1f2" @click="handleTwitter">
              <v-icon>{{ mdiTwitter }}</v-icon>
            </v-btn>
            <v-btn icon color="#3b5998" @click="handleFacebook">
              <v-icon>{{ mdiFacebook }}</v-icon>
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
import { mdiFacebook, mdiTwitter } from '@mdi/js'

export default defineComponent({
  name: 'DialogPrivacyPolicy',

  props: {
    dialog: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')
    const handleFacebook = (): void => ctx.emit('facebook')
    const handleTwitter = (): void => ctx.emit('twitter')

    return { handleClick, handleFacebook, handleTwitter, mdiFacebook, mdiTwitter }
  }
})
</script>
