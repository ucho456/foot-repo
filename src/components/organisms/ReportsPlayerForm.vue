<template>
  <v-container>
    <v-row>
      <v-col cols="2"
        >{{ position }}<span v-if="shirtNumber !== 0" class="ml-2">{{ shirtNumber }}</span
        ><TextFieldPoint :value="point" @input="inputPoint"
      /></v-col>
      <v-col cols="10"><Textarea :value="text" :label="playerName" @input="inputText" /></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TextFieldPoint from '@/components/molecules/TextFieldPoint.vue'
import Textarea from '@/components/molecules/Textarea.vue'

export default defineComponent({
  name: 'ReportsPlayerForm',

  components: {
    TextFieldPoint,
    Textarea
  },

  props: {
    id: { type: Number, default: 0 },
    homeAway: { type: String as () => HomeAway, default: 'home' },
    playerName: { type: String, default: '' },
    position: { type: String as () => Position, default: 'GK' },
    positionId: { type: Number as () => PositionId, default: 1 },
    shirtNumber: { type: Number, default: 0 },
    point: { type: Number, default: 6.5 },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const inputPoint = (point: number): void => ctx.emit('input-point', point)
    const inputText = (text: string): void => ctx.emit('input-text', text)
    return { inputPoint, inputText }
  }
})
</script>
