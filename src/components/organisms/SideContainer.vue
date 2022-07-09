<template>
  <v-container>
    <!-- <v-card outlined>
      <v-container>
        <v-row>
          <v-col>
            <div class="gcse-search"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-card> -->
    <v-card outlined>
      <v-container>
        <v-row>
          <v-col>
            相互リンクパートナー・広告スポンサーを募集中です。
            <a
              ref="nofollow"
              class="hover"
              href="https://twitter.com/messages/compose?recipient_id=1500667275937927171"
              target="_blank"
            >
              こちら
            </a>
            よりご連絡お待ちしております。
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SideContainer',

  setup() {
    /** サンプル。詳しい設定はまたやる。 */
    // const createGoogleSearchScript = (): void => {
    //   const script = document.createElement('script')
    //   script.setAttribute('src', 'https://cse.google.com/cse.js?cx=396e2ac1911b23488')
    //   script.setAttribute('async', 'true')
    //   document.head.appendChild(script)
    // }
    if (process.client) {
      // createGoogleSearchScript()
    }
  }
})
</script>
