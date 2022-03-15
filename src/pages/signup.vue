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
    <DialogMessage v-bind="dialog" @close="closeDialog" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, useRouter } from '@nuxtjs/composition-api'
import useSignup from '@/composables/useSignup'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'
import DialogMessage from '@/components/molecules/DialogMessage.vue'

export default defineComponent({
  name: 'Login',

  components: {
    TextFieldEmail,
    TextFieldPassword,
    ButtonSubmit,
    ButtonTwitter,
    ButtonGoogle,
    ButtonBack,
    DialogMessage
  },

  layout: 'white',

  setup() {
    const { email, password, isLoading, signupEmail, signupTwitter, signupGoogle } = useSignup()

    const dialog = reactive({ message: '', show: false })
    const openDialog = (message: string): void => {
      dialog.message = message
      dialog.show = true
    }
    const closeDialog = (): void => {
      dialog.message = ''
      dialog.show = false
    }

    const submitEmail = async () => {
      const result = await signupEmail()
      result === 'success'
        ? openDialog('認証メールを送信しました。')
        : result === 'already used'
        ? openDialog('既に使用されているメールアドレスです。')
        : openDialog('エラーが発生しました。')
    }

    const router = useRouter()
    const next = (icu: InitCurrentUser): void => {
      router.push({
        name: 'public-profile-new',
        params: { uid: icu.uid, name: icu.name, photoUrl: icu.photoUrl }
      })
    }
    const back = (): void => router.back()

    const submitTwitter = async () => {
      const result = await signupTwitter()
      result === null
        ? back()
        : result === 'failure'
        ? openDialog('エラーが発生しました。')
        : next(result)
    }

    const submitGoogle = async () => {
      const result = await signupGoogle()
      result === null
        ? back()
        : result === 'failure'
        ? openDialog('エラーが発生しました。')
        : next(result)
    }

    return {
      email,
      password,
      isLoading,
      dialog,
      closeDialog,
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
