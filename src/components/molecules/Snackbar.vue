<template>
  <BaseSnackbar
    :color="color"
    :message="message"
    :show="show"
    :text-color="textColor"
    :timeout="-1"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseSnackbar from '@/components/atoms/BaseSnackbar.vue'

export default defineComponent({
  name: 'Snackbar',

  components: {
    BaseSnackbar
  },

  props: {
    color: { type: String, default: '' },
    message: { type: String, default: '' },
    show: { type: Boolean, default: false },
    textColor: { type: String, default: '' }
  }
})
</script>
