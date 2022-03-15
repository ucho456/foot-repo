<template>
  <v-app class="light-gray">
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
  name: 'Gray'
})
</script>

<style lang="scss" scoped>
.light-gray {
  background: #eceff1;
}
</style>
