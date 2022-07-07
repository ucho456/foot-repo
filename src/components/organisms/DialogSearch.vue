<template>
  <v-dialog max-width="330" persistent :value="isDialog" :width="'90%'">
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
        <v-row v-if="!hideDate" justify="center">
          <v-col cols="10">
            <DialogYearMonth
              :year-month="searchOption.yearMonth"
              @input="inputYearMonth"
              @clear="clearYearMonth"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn color="'primary'" text @click="handleClose"> 閉じる </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="'primary'" text @click="handleSearch"> 検索 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SelectIdCompetition from '@/components/molecules/SelectIdCompetition.vue'
import SelectIdTeam from '@/components/molecules/SelectIdTeam.vue'
import DialogYearMonth from '@/components/organisms/DialogYearMonth.vue'

export default defineComponent({
  name: 'DialogSearch',

  components: {
    SelectIdCompetition,
    SelectIdTeam,
    DialogYearMonth
  },

  props: {
    hideDate: { type: Boolean, default: false },
    isDialog: { type: Boolean, default: false },
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
    const inputCompetitionId = (competitionId: string): void => {
      ctx.emit('input-competition-id', competitionId)
    }
    const inputTeamId = (teamId: string): void => {
      ctx.emit('input-team-id', teamId)
    }
    const inputYearMonth = (date: string): void => {
      ctx.emit('input-year-month', date)
    }
    const clearYearMonth = (): void => {
      ctx.emit('clear-year-month')
    }
    const handleClose = (): void => {
      ctx.emit('close')
    }
    const handleSearch = (): void => {
      ctx.emit('search')
    }

    return {
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      clearYearMonth,
      handleClose,
      handleSearch
    }
  }
})
</script>
