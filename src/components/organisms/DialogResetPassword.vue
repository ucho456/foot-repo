<template>
  <v-dialog max-width="380" scrollable :value="isDialog">
    <v-card>
      <v-card-title />
      <v-card-text>メールアドレスを入力し、送信ボタンを押して下さい。</v-card-text>
      <ValidationObserver v-slot="{ invalid }">
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <TextFieldEmail v-model="email" />
            </v-col>
          </v-row>
        </v-container>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="#1a237e"
            text
            :disabled="invalid"
            :loading="isLoading"
            @click="resetPassword"
          >
            送信
          </v-btn>
          <v-btn color="#1a237e" :disabled="isLoading" text @click="handleHide">閉じる</v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
/** check */
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import useSnackbar from '@/utils/useSnackbar'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'

export default defineComponent({
  name: 'DialogResetPassword',

  components: {
    TextFieldEmail
  },

  props: {
    isDialog: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const { openSnackbar } = useSnackbar()

    const handleHide = (): void => ctx.emit('hide')

    const email = ref('')
    const isLoading = ref(false)
    const resetPassword = async () => {
      try {
        isLoading.value = true
        const auth = getAuth()
        await sendPasswordResetEmail(auth, email.value)
        openSnackbar('success', 'パスワード再設定メールを送信しました。')
      } catch (error) {
        error instanceof Error && error.message.includes('auth/user-not-found')
          ? openSnackbar('failure', '登録されていないメールアドレスです。')
          : openSnackbar('failure', '通信エラーが発生しました。')
      } finally {
        isLoading.value = false
        handleHide()
      }
    }

    return { email, handleHide, isLoading, resetPassword }
  }
})
</script>
