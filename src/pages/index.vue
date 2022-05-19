<template>
  <v-container>
    {{ reports }}
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/useIndex'
import useStore from '@/utils/useStore'

export default defineComponent({
  name: 'Index',

  components: {},

  setup() {
    const { setUp } = useIndex()
    const { reports } = useStore()

    setUp()

    return { reports }
  }
})
</script>
