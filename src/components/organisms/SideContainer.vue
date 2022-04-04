<template>
  <v-card class="light-grey" elevation="0">
    <SideSampleCard />
    <SideSampleCard class="mt-4" />
    <SideSampleCard class="mt-4" />
    <SideSampleCard class="mt-4" />
    <SideSampleCard class="mt-4" />
  </v-card>
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

<style lang="scss" scoped>
.light-grey {
  background: #eceff1;
}
</style>
