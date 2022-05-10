<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="330">
      <v-card>
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <SelectIdCompetition />
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <SelectIdTeam />
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <DialogDate :date="searchOption.jstDate" @input="inputDate" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" text @click="handleClose"> 閉じる </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handleSearch"> 検索 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SelectIdCompetition from '@/components/molecules/SelectIdCompetition.vue'
import SelectIdTeam from '@/components/molecules/SelectIdTeam.vue'
import DialogDate from '@/components/molecules/DialogDate.vue'
import { SearchOption } from '@/types/matches'

export default defineComponent({
  name: 'DialogSearch',

  components: {
    SelectIdCompetition,
    SelectIdTeam,
    DialogDate
  },

  props: {
    dialog: { type: Boolean, default: false },
    searchOption: {
      type: Object as () => SearchOption,
      default: () => {
        return {
          status: '',
          competitionId: '',
          teamIds: [],
          jstDate: ''
        }
      }
    }
  },

  setup(_, ctx) {
    const handleClose = (): void => ctx.emit('close')
    const handleSearch = (): void => ctx.emit('search')
    const inputDate = (date: string) => ctx.emit('input-date', date)
    return { handleClose, handleSearch, inputDate }
  }
})
</script>
