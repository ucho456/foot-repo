<template>
  <v-dialog :max-width="380" persistent :value="isDialog">
    <v-card>
      <v-card-title />
      <v-card-text class="font-weight-medium wrap">{{ text }}</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <v-btn block color="primary" outlined @click="handleGuest"
                >ゲストユーザーで続ける</v-btn
              >
            </v-col>
            <v-col cols="10">
              <v-btn block color="primary" outlined @click="handleLogin">ログインに進む</v-btn>
            </v-col>
            <v-col cols="10">
              <v-btn block color="primary" outlined @click="handleSignup">新規登録に進む</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogConfirmLogin',

  props: {
    isDialog: { type: Boolean, default: false },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const handleGuest = (): void => {
      ctx.emit('guest')
    }
    const handleLogin = (): void => {
      ctx.emit('login')
    }
    const handleSignup = (): void => {
      ctx.emit('signup')
    }

    return { handleGuest, handleLogin, handleSignup }
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  white-space: pre-wrap;
}
</style>
