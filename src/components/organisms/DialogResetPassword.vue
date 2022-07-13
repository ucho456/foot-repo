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
          <v-btn color="primary" text :disabled="invalid" @click="resetPassword">送信</v-btn>
          <v-btn color="primary" text @click="handleHide">閉じる</v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
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

    const email = ref('')
    const resetPassword = () => {
      const auth = getAuth()
      sendPasswordResetEmail(auth, email.value)
        .then(() => openSnackbar('success', '成功'))
        .catch(() => openSnackbar('failure', '失敗'))
    }
    const handleHide = (): void => ctx.emit('hide')

    return { email, handleHide, resetPassword }
  }
})
</script>
