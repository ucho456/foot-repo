<template>
  <v-app class="grey">
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Grey'
})
</script>

<style lang="scss" scoped>
.grey {
  background: #eceff1;
}
</style>
