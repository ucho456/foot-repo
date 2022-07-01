<template>
  <v-container>
    <v-card class="mx-auto" max-width="400" outlined>
      <v-container>
        <v-row class="mt-3" justify="center">
          <v-img max-width="240" :src="logo" />
          <h2 class="mt-4">当サイトについて</h2>
          <v-col cols="12" class="mt-4">
            使い方 利用規約 プライバシーポリシー 特定商取引法に基づく表示</v-col
          >
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
  name: 'About',

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
