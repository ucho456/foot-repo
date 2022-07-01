<template>
  <v-container>
    <v-card class="mx-auto" max-width="400" outlined>
      <v-container>
        <v-row class="mt-3" justify="center">
          <v-img max-width="240" :src="logo" />
          <v-col cols="12" class="mt-4">
            <a
              class="hover"
              href="https://twitter.com/messages/compose?recipient_id=foot_repo"
              target="_blank"
            >
              Twitter公式アカウントのDMにてお問い合わせ下さい。
            </a>
          </v-col>
          <v-col cols="10">
            <ButtonBack @click="back" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import ButtonBack from '@/components/molecules/ButtonBack.vue'

export default defineComponent({
  name: 'Contact',

  components: {
    ButtonBack
  },

  layout: 'grey',

  setup() {
    const router = useRouter()
    const logo = require('@/assets/signup_logo.png')

    const back = (): void => router.back()

    return { back, logo }
  }
})
</script>
