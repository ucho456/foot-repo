<template>
  <v-snackbar
    centered
    :color="color"
    text
    :timeout="timeout"
    transition="slide-x-reverse-transition"
    top
    :value="show"
  >
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseSnackbar',

  props: {
    color: { type: String, default: '' },
    message: { type: String, default: '' },
    show: { type: Boolean, default: false },
    timeout: { type: Number, default: -1 }
  }
})
</script>
