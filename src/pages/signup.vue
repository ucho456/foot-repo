<template>
  <v-card class="mx-auto" max-width="400" outlined>
    <v-card-title>
      <v-row justify="center">Foot-Repo(ロゴ予定)</v-row>
    </v-card-title>
    <ValidationObserver v-slot="{ invalid }">
      <v-container>
        <v-row justify="center">
          <v-col cols="10" class="mb-n4 mt-4">
            <TextFieldEmail v-model="email" />
          </v-col>
          <v-col cols="10">
            <TextFieldPassword v-model="password" />
          </v-col>
          <v-row class="mb-8" justify="center">
            <v-col cols="10">
              <ButtonSubmit
                :disabled="invalid"
                :icon="'mdi-send'"
                :loading="isLoading"
                :text="'登録する'"
                @click="submitEmail"
              />
            </v-col>
            利用規約・プライバシーポリシー
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
              <ButtonBack @click="back" />
            </v-col>
            <NuxtLink class="text-caption hover" to="/login">
              アカウントをお持ちの場合はログインから
            </NuxtLink>
          </v-row>
        </v-row>
      </v-container>
    </ValidationObserver>
    <Snackbar v-bind="snackbar" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useSignup from '@/composables/useSignup'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'
import Snackbar from '@/components/molecules/Snackbar.vue'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'Login',

  components: {
    TextFieldEmail,
    TextFieldPassword,
    ButtonSubmit,
    ButtonTwitter,
    ButtonGoogle,
    ButtonBack,
    Snackbar
  },

  layout: 'white',

  setup() {
    const { email, password, isLoading, signupEmail, signupTwitter, signupGoogle } = useSignup()
    const { snackbar, openSnackbar } = useSnackbar()

    const submitEmail = async () => {
      const result = await signupEmail()
      const message =
        result === 'success'
          ? '認証メールを送信しました。'
          : result === 'already used'
          ? '既に使用されているメールアドレスです。'
          : 'エラーが発生しました。'
      openSnackbar(result, message)
    }

    const router = useRouter()
    const back = (): void => router.back()

    const next = (result: 'success' | 'already exist' | 'failure'): void => {
      result === 'success'
        ? router.push({ name: 'public-profile-new' })
        : result === 'already exist'
        ? openSnackbar(result, '既に使用されているプロバイダーです。')
        : openSnackbar(result, 'エラーが発生しました。')
    }

    const submitTwitter = async () => {
      const result = await signupTwitter()
      next(result)
    }

    const submitGoogle = async () => {
      const result = await signupGoogle()
      next(result)
    }

    return {
      email,
      password,
      isLoading,
      snackbar,
      submitEmail,
      back,
      submitTwitter,
      submitGoogle
    }
  }
})
</script>

<style lang="scss" scoped>
.hover {
  &:hover {
    opacity: 0.8;
  }
}
</style>
