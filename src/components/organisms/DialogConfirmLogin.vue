<template>
  <v-dialog max-width="380" persistent :value="isDialog">
    <v-card>
      <v-card-title />
      <v-card-text class="font-weight-medium wrap">{{ text }}</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <ButtonOutlined :text="'ゲストユーザーで続ける'" @click="handleGuest" />
            </v-col>
            <v-col cols="10">
              <ButtonOutlined :text="'ログインに進む'" @click="pushToLogin" />
            </v-col>
            <v-col cols="10">
              <ButtonOutlined :text="'新規登録に進む'" @click="pushToSignup" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
/** check */
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'

export default defineComponent({
  name: 'DialogConfirmLogin',

  components: {
    ButtonOutlined
  },

  props: {
    isDialog: { type: Boolean, default: false },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const router = useRouter()

    const handleGuest = (): void => ctx.emit('guest')
    const pushToLogin = (): void => {
      router.push('/login')
    }
    const pushToSignup = (): void => {
      router.push('/signup')
    }

    return { handleGuest, pushToLogin, pushToSignup }
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  white-space: pre-wrap;
}
</style>
