<template>
  <v-card>
    <v-container v-if="loading" class="pb-10">
      <v-row justify="center">
        <v-progress-circular color="primary" indeterminate />
      </v-row>
    </v-container>
    <v-container v-else-if="matchSchedule.length > 0">
      <v-row>
        <v-col cols="9" sm="9" align-self="center"><h3>試合日程</h3></v-col>
        <v-col cols="3" sm="3">
          <DialogYearMonth :year-month="value" @input="inputYearMonth" @click="handleClick" />
        </v-col>
      </v-row>
      <v-list three-line>
        <v-container v-for="match in matchSchedule" :key="match.id">
          <v-list-item
            :exact="true"
            :router="true"
            :to="{ path: `/databases/matches/${match.id}` }"
          >
            <v-list-item-avatar>
              <v-img :src="match.homeTeam.imageUrl" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-row>
                <v-col cols="6">
                  <v-list-item-title class="text-right">
                    {{ match.homeTeam.name }}
                  </v-list-item-title>
                </v-col>
                <v-col cols="6">
                  <v-list-item-title class="text-left">
                    {{ match.awayTeam.name }}
                  </v-list-item-title>
                </v-col>
              </v-row>
              <v-list-item-subtitle class="mt-n3 text-center">
                {{ match.homeTeam.score }} - {{ match.awayTeam.score }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-center">
                {{ match.jstDate }} / {{ match.competition.name }} / {{ match.matchday }}節
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-img :src="match.awayTeam.imageUrl" />
            </v-list-item-avatar>
          </v-list-item>
        </v-container>
      </v-list>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DialogYearMonth from '@/components/molecules/DialogYearMonth.vue'

export default defineComponent({
  name: 'MatchSchedule',

  components: {
    DialogYearMonth
  },

  props: {
    loading: { type: Boolean, default: false },
    matchSchedule: {
      type: Array as () => Match[],
      default: () => [
        {
          id: '',
          jstDate: '',
          matchday: 0,
          competition: { name: '' },
          homeTeam: { id: '', name: '', imageUrl: '', score: 0 },
          awayTeam: { id: '', name: '', imageUrl: '', score: 0 }
        }
      ]
    },
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const inputYearMonth = (yearMonth: string): void => {
      ctx.emit('input', yearMonth)
    }
    const handleClick = (): void => {
      ctx.emit('click')
    }

    return { inputYearMonth, handleClick }
  }
})
</script>
