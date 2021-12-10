<template>
  <v-container>
    <SideSampleCard />
    <SideSampleCard class="mt-4" />
    <SideSampleCard class="mt-4" />
    <SideSampleCard class="mt-4" />
    <SideSampleCard class="mt-4" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SideSampleCard from '@/components/organisms/SideSampleCard.vue'

export default defineComponent({
  name: 'SideContainer',

  components: {
    SideSampleCard
  }
})
</script>
