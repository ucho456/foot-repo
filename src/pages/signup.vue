<template>
  <v-card class="mx-auto" max-width="400" outlined>
    <v-card-title>
      <v-row justify="center">Foot-Repo(ロゴ予定)</v-row>
    </v-card-title>
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
                @click="signupEmail"
              />
            </v-col>
            利用規約・プライバシーポリシー
            <v-col cols="10">
              <ButtonTwitter
                :loading="isLoading"
                :text="'Twitterアカウントで登録'"
                @click="signupTwitter"
              />
            </v-col>
            <v-col cols="10">
              <ButtonGoogle
                :loading="isLoading"
                :text="'Googleアカウントで登録'"
                @click="signupGoogle"
              />
            </v-col>
            <v-col cols="10">
              <ButtonBack @click="routerBack" />
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
import { defineComponent } from '@nuxtjs/composition-api'
import { useSignup } from '@/composables/useSignup'
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
    const {
      inputData,
      isLoading,
      dialog,
      routerBack,
      signupEmail,
      signupTwitter,
      signupGoogle,
      closeDialog
    } = useSignup()

    return {
      inputData,
      isLoading,
      dialog,
      routerBack,
      signupEmail,
      signupTwitter,
      signupGoogle,
      closeDialog
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
