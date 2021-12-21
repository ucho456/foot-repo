<template>
  <v-card outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="mb-4 overline">OVERLINE</div>
        <v-list-item-title class="headline mb-1"> Headline 5 </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar color="grey" size="80" tile></v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-btn outlined rounded text> Button </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SideSampleCard'
})
</script>
