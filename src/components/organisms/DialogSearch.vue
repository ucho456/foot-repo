<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Use Google's location service? </v-card-title>
        <v-card-text
          >Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.</v-card-text
        >
        <v-card-actions>
          <v-btn color="green darken-1" text @click="handleClose"> 閉じる </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="handleSearch"> 検索 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

type SearchOption = {
  competitionId: string
  teamId: string
  jstDate: string
}

export default defineComponent({
  name: 'DialogSearch',

  components: {},

  props: {
    dialog: { type: Boolean, default: false },
    searchOption: {
      type: Object as () => SearchOption,
      default: () => {
        return {
          competitionId: '',
          teamId: '',
          jstDate: ''
        }
      }
    }
  },

  setup(_, ctx) {
    const handleClose = (): void => ctx.emit('close')
    const handleSearch = (): void => ctx.emit('search')
    return { handleClose, handleSearch }
  }
})
</script>
