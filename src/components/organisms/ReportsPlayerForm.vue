<template>
  <v-container>
    <v-row>
      <v-col cols="2"
        >{{ position }}<span v-if="shirtNumber" class="ml-2">{{ shirtNumber }}</span></v-col
      >
      <v-col cols="10">{{ playerName }}</v-col>
      <v-col class="mt-n6" cols="2"><TextFieldPoint :value="point" @input="inputPoint" /></v-col>
      <v-col class="mt-n6" cols="10"><Textarea :value="text" @input="inputText" /></v-col>
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
    id: { type: String, default: '' },
    playerName: { type: String, default: '' },
    point: { type: String as () => Point, default: '6.5' },
    position: { type: String as () => Position, default: 'GK' },
    shirtNumber: { type: Number || null, default: 0 },
    text: { type: String, default: '' }
  },

  setup(_, ctx) {
    const inputPoint = (point: Point): void => {
      ctx.emit('input-point', point)
    }
    const inputText = (text: string): void => {
      ctx.emit('input-text', text)
    }
    return { inputPoint, inputText }
  }
})
</script>
