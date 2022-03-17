<template>
  <v-container class="wrap">
    <v-col class="text-center">{{ message }}</v-col>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, useRoute, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EmailAction',

  layout: 'grey',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const mode = route.value.query.mode
    const message = ref('')
    switch (mode) {
      case 'verifyEmail': {
        message.value = 'メール認証が完了しました。\n3秒後に登録画面に遷移します。'
        setTimeout(() => {
          router.push({ name: 'public-profile-new' })
        }, 3 * 1000)
        break
      }
    }

    return { message }
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  white-space: pre-wrap;
}
</style>
