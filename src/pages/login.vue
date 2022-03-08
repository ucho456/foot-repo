<template>
  <v-card class="mx-auto" max-width="400" outlined>
    <v-card-title>
      <v-row justify="center">Foot-Repo(ロゴ予定)</v-row>
    </v-card-title>
    <v-card-text v-if="errFlg" class="error--text"
      >メールアドレスかパスワードが間違っています</v-card-text
    >
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
              <ButtonBlockBlue
                :disabled="invalid"
                :icon="'mdi-login'"
                :loading="isLoading"
                :text="'ログイン'"
                @click="submit('email')"
              />
            </v-col>
            <v-col cols="10">
              <ButtonTwitter :loading="isLoading" @click="submit('twitter')" />
            </v-col>
            <v-col cols="10">
              <ButtonGoogle :loading="isLoading" @click="submit('google')" />
            </v-col>
            <v-col cols="10">
              <ButtonBlockWhite :icon="'mdi-arrow-left'" :text="'戻る'" @click="back" />
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useRouter } from '@nuxtjs/composition-api'
import { signIn } from '@/composables/useLogin'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonBlockBlue from '@/components/molecules/ButtonBlockBlue.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBlockWhite from '@/components/molecules/ButtonBlockWhite.vue'

type SignInType = 'email' | 'twitter' | 'google'

export default defineComponent({
  name: 'Login',

  components: {
    TextFieldEmail,
    TextFieldPassword,
    ButtonBlockBlue,
    ButtonTwitter,
    ButtonGoogle,
    ButtonBlockWhite
  },

  layout: 'white',

  setup() {
    const inputData = reactive({ email: '', password: '' })
    const isLoading = ref(false)
    const errFlg = ref(false)
    const router = useRouter()
    const back = () => router.back()

    const submit = async (type: SignInType): Promise<void> => {
      try {
        isLoading.value = true
        const user = await signIn(type, inputData.email, inputData.password)
        console.log(user)
        router.push('/')
      } catch {
        errFlg.value = true
      } finally {
        isLoading.value = false
      }
    }

    return { inputData, isLoading, errFlg, back, submit }
  }
})
</script>
