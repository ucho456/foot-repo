<template>
  <v-container v-if="isLoading" class="pb-10 pt-10">
    <v-row justify="center">
      <v-progress-circular aria-label="読込中" color="#1a237e" indeterminate />
    </v-row>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContainerLoading',

  props: {
    isLoading: { type: Boolean, default: false }
  }
})
</script>
