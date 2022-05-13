<template>
  <v-dialog :max-width="330" :persistent="true" :value="dialog" :width="'90%'">
    <v-card>
      <v-container>
        <v-row justify="center">
          <v-col cols="10">
            <SelectIdCompetition :value="searchOption.competitionId" @input="inputCompetitionId" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <SelectIdTeam
              :competition-id="searchOption.competitionId"
              :value="searchOption.teamId"
              @input="inputTeamId"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <DialogDate :date="searchOption.jstDate" @input="inputDate" @clear="clearDate" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn :color="'primary'" :text="true" @click="handleClose"> 閉じる </v-btn>
        <v-spacer></v-spacer>
        <v-btn :color="'primary'" :text="true" @click="handleSearch"> 検索 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SelectIdCompetition from '@/components/molecules/SelectIdCompetition.vue'
import SelectIdTeam from '@/components/molecules/SelectIdTeam.vue'
import DialogDate from '@/components/molecules/DialogDate.vue'

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
          teamId: '',
          jstDate: ''
        }
      }
    }
  },

  setup(_, ctx) {
    const inputCompetitionId = (competitionId: string): void => {
      ctx.emit('input-competition-id', competitionId)
    }
    const inputTeamId = (teamId: string): void => {
      ctx.emit('input-team-id', teamId)
    }
    const inputDate = (date: string): void => {
      ctx.emit('input-date', date)
    }
    const clearDate = (): void => {
      ctx.emit('clear-date')
    }
    const handleClose = (): void => {
      ctx.emit('close')
    }
    const handleSearch = (): void => {
      ctx.emit('search')
    }

    return { inputCompetitionId, inputTeamId, inputDate, clearDate, handleClose, handleSearch }
  }
})
</script>
