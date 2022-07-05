<template>
  <v-container class="pr-n6">
    <v-card outlined>
      <v-container>
        <v-row class="my-10" justify="center">
          <v-img max-width="240" :src="logo" />
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" class="hidden-xs-only">
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/foot-repo.appspot.com/o/audience.jpg?alt=media&token=ac30f1c9-b043-450a-9828-2661fb768c8a"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <h3>フットレポとは</h3>
            フットレポはどなたでも気軽に投稿できるサッカーの選手採点共有サービスです。
            サッカー経験や観戦歴の長さなどは問いません。
            あなたが試合を通じて感じた事を選手採点という形に変えて世界に発信しましょう！
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <h3>投稿する</h3>
            試合を観戦されたら選手採点を投稿しましょう。各選手・監督毎に10点満点方式の採点とコメント、そしてマン・オブ・ザ・マッチを選んであげましょう。
            ちなみにイタリア「ガゼッタ・デロ・スポルト」紙の基準では5.0は落第、5.5は不満足、6.0は及第点、6.5はまずまずOK、7.0なら上出来、8.0になると文句無し、採点は可能な限り4.0～8.5点の間に収めるのが暗黙の了解です。
            もちろんこの基準に従う必要もありません！あなたなりに選手を評価して下さい！
          </v-col>
          <v-col cols="12" sm="6" class="hidden-xs-only">
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/foot-repo.appspot.com/o/writing.jpg?alt=media&token=fd18ed5c-c767-437c-a936-e4f5a6128315"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="hidden-xs-only">
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/foot-repo.appspot.com/o/sns.jpg?alt=media&token=81c3a835-656f-470d-9443-e216e9bc1731"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <h3>共有する</h3>
            TwitterなどのSNSにシェアボタンを使ってあなたの選手採点を共有しましょう。
            沢山のサッカーファンに読んでもらい、イイネやコメントを頂いたり熱い議論を楽しみましょう！
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" class="text-center">
            <h3>あなたのご参加を楽しみにしています！</h3>
          </v-col>
          <v-col cols="10" sm="8">
            <ButtonOutlined :text="'新規会員登録'" @click="pushToSignup" />
          </v-col>
          <v-col cols="10" sm="8">
            <ButtonBack @click="back" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import ButtonBack from '@/components/molecules/ButtonBack.vue'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'

export default defineComponent({
  name: 'About',

  components: {
    ButtonBack,
    ButtonOutlined
  },

  layout: 'grey',

  setup() {
    const router = useRouter()
    const logo = require('@/assets/signup_logo.png')
    const sns = require('@/assets/sns.jpg')
    const a = require('@/assets/a.jpg')

    const pushToSignup = (): void => {
      router.push('/signup')
    }
    const back = (): void => router.back()

    return { back, logo, pushToSignup, sns, a }
  }
})
</script>

<style lang="scss" scoped>
.white {
  background: white;
}
</style>
