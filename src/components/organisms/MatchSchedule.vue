<template>
  <v-container>
    <v-row>
      <v-col cols="9" sm="9" align-self="center"><h2>試合日程</h2></v-col>
      <v-col cols="3" sm="3">
        <DialogYearMonth :year-month="value" @input="inputYearMonth" @click="handleClick" />
      </v-col>
    </v-row>
    <ContainerLoading :is-loading="isLoading" />
    <v-row v-if="!isLoading && matchSchedule.length === 0">
      <v-col>対象の試合日程はありません。</v-col>
    </v-row>
    <v-list class="mt-n4" three-line>
      <div v-for="match in matchSchedule" :key="match.id">
        <v-list-item exact router :to="{ path: `/databases/matches/${match.id}` }">
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
      </div>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DialogYearMonth from '@/components/molecules/DialogYearMonth.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'

export default defineComponent({
  name: 'MatchSchedule',

  components: {
    DialogYearMonth,
    ContainerLoading
  },

  props: {
    isLoading: { type: Boolean, default: false },
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
