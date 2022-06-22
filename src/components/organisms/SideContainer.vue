<template>
  <v-container>
    <v-card outlined>
      <v-container>
        <a
          class="twitter-timeline"
          data-height="400"
          data-lang="ja"
          data-dnt="true"
          href="https://twitter.com/FootRepo?ref_src=twsrc%5Etfw"
        ></a>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SideContainer',

  setup() {
    const createTweetScript = () => {
      const tweetScript = document.createElement('script')
      tweetScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
      tweetScript.setAttribute('async', 'true')
      document.head.appendChild(tweetScript)
    }
    if (process.client) {
      createTweetScript()
    }
  }
})
</script>
