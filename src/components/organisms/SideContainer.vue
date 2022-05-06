<template>
  <v-card class="light-grey" elevation="0">
    <!-- <v-container>
      <v-row>
        <v-col>
          <a
            class="twitter-timeline"
            data-lang="en"
            data-height="500"
            href="https://twitter.com/FootRepo?ref_src=twsrc%5Etfw"
            >by FootRepo</a
          >
        </v-col>
      </v-row>
    </v-container>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SideContainer'
})
</script>

<style lang="scss" scoped>
.light-grey {
  background: #eceff1;
}
</style>
