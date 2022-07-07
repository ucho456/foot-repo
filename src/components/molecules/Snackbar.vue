<template>
  <v-snackbar
    centered
    top
    :color="color"
    :value="show"
    :timeout="-1"
    :transition="'slide-x-reverse-transition'"
  >
    <span :style="`color: ${textColor}`">{{ message }}</span>
  </v-snackbar>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Snackbar',

  props: {
    color: { type: String, default: '' },
    message: { type: String, default: '' },
    show: { type: Boolean, default: false },
    textColor: { type: String, default: '' }
  }
})
</script>
