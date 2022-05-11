<template>
  <v-card class="text-center wrap" outlined>
    <v-container>
      <v-row>
        <v-col cols="12">{{ message }}</v-col>
        <v-col cols="12">
          <v-progress-circular color="primary" indeterminate />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
          router.push({ name: 'users-new' })
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
