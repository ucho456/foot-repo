<template>
  <v-snackbar
    :centered="true"
    :color="color"
    :timeout="timeout"
    :transition="'slide-x-reverse-transition'"
    :top="true"
    :value="show"
  >
    <span :style="`color: ${textColor}`">{{ message }}</span>
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
    textColor: { type: String, default: '' },
    timeout: { type: Number, default: 0 }
  }
})
</script>
