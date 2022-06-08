<template>
  <v-container>
    <v-card class="mx-auto" max-width="400" outlined>
      <v-container>
        <v-row justify="center"><v-img max-width="240" :src="logo" /></v-row>
        <ValidationObserver v-slot="{ invalid }">
          <v-row class="mt-4" justify="center">
            <v-col cols="10">
              <TextFieldEmail v-model="user.email" />
            </v-col>
            <v-col cols="10">
              <TextFieldPassword v-model="user.password" />
            </v-col>
            <v-col cols="10">
              <ButtonSubmit
                :disabled="invalid"
                :icon="'mdi-send'"
                :loading="isLoading"
                :text="'ログイン'"
                @click="submitEmail"
              />
            </v-col>
            <v-col cols="10">
              <ButtonTwitter
                :loading="isLoading"
                :text="'Twitterアカウントでログイン'"
                @click="submitTwitter"
              />
            </v-col>
            <v-col cols="10">
              <ButtonGoogle
                :loading="isLoading"
                :text="'Googleアカウントでログイン'"
                @click="submitGoogle"
              />
            </v-col>
            <v-col cols="10">
              <ButtonBack @click="back" />
            </v-col>
            <NuxtLink class="text-caption hover mb-4" to="/signup"> 新規登録はこちらから </NuxtLink>
          </v-row>
        </ValidationObserver>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useLogin from '@/composables/useLogin'
import useSnackbar from '@/utils/useSnackbar'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'

export default defineComponent({
  name: 'Login',

  components: {
    TextFieldEmail,
    TextFieldPassword,
    ButtonSubmit,
    ButtonTwitter,
    ButtonGoogle,
    ButtonBack
  },

  layout: 'grey',

  setup() {
    const router = useRouter()
    const { user, isLoading, loginEmail, loginTwitter, loginGoogle } = useLogin()
    const { openSnackbar } = useSnackbar()

    const logo = require('@/assets/signup_logo.png')

    const submitEmail = async (): Promise<void> => {
      const result = await loginEmail()
      const message =
        result === 'success'
          ? 'ログインしました。'
          : result === 'no user'
          ? 'メールアドレス又はパスワードが間違っています。'
          : 'エラーが発生しました。'
      openSnackbar(result, message)
      if (result === 'success') {
        router.push('/')
      }
    }

    const submitTwitter = async (): Promise<void> => {
      const result = await loginTwitter()
      next(result)
    }

    const submitGoogle = async (): Promise<void> => {
      const result = await loginGoogle()
      next(result)
    }

    const next = (result: 'success' | 'failure' | 'no user'): void => {
      if (result === 'success' || result === 'no user') {
        const message = result === 'success' ? 'ログインしました。' : '認証が完了しました。'
        openSnackbar('success', message)
        result === 'success' ? router.push('/') : router.push({ name: 'users-new' })
      } else {
        openSnackbar(result, 'エラーが発生しました。')
      }
    }

    const back = (): void => {
      router.back()
    }

    return {
      user,
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
.hover {
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
