<template>
  <v-card class="mx-auto" max-width="400" outlined>
    <v-card-title>
      <v-row justify="center">Foot-Repo(ロゴ予定)</v-row>
    </v-card-title>
    <!-- <v-card-text v-if="isError" class="error--text"
      >メールアドレスかパスワードが間違っています</v-card-text
    > -->
    <ValidationObserver v-slot="{ invalid }">
      <v-container>
        <v-row justify="center">
          <v-col cols="10" class="mb-n4 mt-4">
            <TextFieldEmail v-model="inputData.email" />
          </v-col>
          <v-col cols="10">
            <TextFieldPassword v-model="inputData.password" />
          </v-col>
          <v-row class="mb-8" justify="center">
            <v-col cols="10">
              <ButtonSubmit
                :disabled="invalid"
                :icon="'mdi-account-plus'"
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
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, useRouter } from '@nuxtjs/composition-api'
import { useSignup } from '@/composables/useCurrentUser'
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

  layout: 'white',

  setup() {
    const inputData = reactive({ email: '', password: '' })
    const router = useRouter()
    const back = () => router.back()
    const { isLoading, isError, signupEmail, signupTwitter, signupGoogle } = useSignup()

    const submitEmail = async (): Promise<void> => {
      await signupEmail(inputData.email, inputData.password)
    }

    const submitTwitter = async (): Promise<void> => {
      const initCurrentUser = await signupTwitter()
      initCurrentUser
        ? router.push({ name: 'public-profile-new', params: { initCurrentUser } })
        : back()
    }

    const submitGoogle = async (): Promise<void> => {
      const initCurrentUser = await signupGoogle()
      initCurrentUser
        ? router.push({ name: 'public-profile-new', params: { initCurrentUser } })
        : back()
    }

    return { inputData, isLoading, isError, back, submitEmail, submitTwitter, submitGoogle }
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
