<template>
  <v-container>
    <v-card class="mx-auto" max-width="400" outlined>
      <v-container>
        <v-row class="mt-3" justify="center"><v-img max-width="240" :src="logo" /></v-row>
        <ValidationObserver v-slot="{ invalid }">
          <v-row justify="center">
            <v-col cols="10" class="mt-4">
              <TextFieldEmail v-model="user.email" />
            </v-col>
            <v-col cols="10">
              <TextFieldPassword v-model="user.password" />
            </v-col>
            <v-col cols="10" class="hover terms text-center" @click="openDialog">
              利用規約を表示する
            </v-col>
            <v-col cols="10">
              <ButtonSubmit
                :disabled="invalid"
                :loading="isLoading"
                :text="'登録する'"
                @click="submitEmail"
              />
            </v-col>
            <v-col cols="10">
              <ButtonTwitter
                :loading="isLoading"
                :text="'Twitterアカウントで登録'"
                @click="submitTwitter"
              />
            </v-col>
            <v-col cols="10">
              <ButtonGoogle
                :loading="isLoading"
                :text="'Googleアカウントで登録'"
                @click="submitGoogle"
              />
            </v-col>
            <v-col cols="10">
              <ButtonBack :disabled="isLoading" @click="back" />
            </v-col>
            <NuxtLink class="text-caption hover mb-4" to="/login">
              アカウントをお持ちの場合はログインから
            </NuxtLink>
          </v-row>
        </ValidationObserver>
      </v-container>
      <DialogTerms :is-dialog="isDialog" @click="closeDialog" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useSignup from '@/composables/useSignup'
import useSnackbar from '@/utils/useSnackbar'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'
import DialogTerms from '@/components/molecules/DialogTerms.vue'

export default defineComponent({
  name: 'Signup',

  components: {
    TextFieldEmail,
    TextFieldPassword,
    ButtonSubmit,
    ButtonTwitter,
    ButtonGoogle,
    ButtonBack,
    DialogTerms
  },

  layout: 'grey',

  setup() {
    const router = useRouter()
    const {
      user,
      isLoading,
      signupEmail,
      signupTwitter,
      signupGoogle,
      isDialog,
      openDialog,
      closeDialog
    } = useSignup()
    const { openSnackbar } = useSnackbar()
    const logo = require('@/assets/signup_logo.png')

    const submitEmail = async (): Promise<void> => {
      const result = await signupEmail()
      const message =
        result === 'success'
          ? '認証メールを送信しました。'
          : result === 'already used'
          ? '既に使用されているメールアドレスです。'
          : 'エラーが発生しました。'
      openSnackbar(result, message)
    }

    const submitTwitter = async (): Promise<void> => {
      const result = await signupTwitter()
      next(result)
    }

    const submitGoogle = async (): Promise<void> => {
      const result = await signupGoogle()
      next(result)
    }

    const next = (result: 'success' | 'failure' | 'already exist'): void => {
      if (result === 'success' || result === 'already exist') {
        const message = result === 'success' ? '認証が完了しました。' : 'ログインしました。'
        openSnackbar('success', message)
        result === 'success' ? router.push({ name: 'users-new' }) : router.push('/')
      } else {
        openSnackbar(result, 'エラーが発生しました。')
      }
    }

    const back = (): void => {
      router.back()
    }

    return {
      user,
      isDialog,
      openDialog,
      closeDialog,
      isLoading,
      logo,
      submitEmail,
      submitTwitter,
      submitGoogle,
      back
    }
  }
})
</script>

<style lang="scss" scoped>
.terms {
  font-size: 12px;
  color: #1a237e;
  text-decoration: underline;
}
</style>
