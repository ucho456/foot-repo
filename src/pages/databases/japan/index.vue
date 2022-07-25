<template>
  <v-container>
    <v-card outlined>
      <v-container>
        <v-row>
          <v-col cols="8" sm="9" class="pt-5">
            <h1>日本代表戦日程</h1>
          </v-col>
          <v-col cols="4" sm="3">
            <SelectYear v-model="japan.season" />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <ContainerLoading :is-loading="isLoading" />
        <v-row v-if="!isLoading && japan.matchSchedule.length === 0">
          <v-col>対象の試合日程はありません。</v-col>
        </v-row>
        <v-list three-line>
          <div v-for="match in japan.matchSchedule" :key="match.id">
            <v-list-item exact router :to="{ path: `/databases/matches/${match.id}` }">
              <v-img
                max-height="40"
                max-width="40"
                :lazy-src="lazy"
                :src="match.homeTeam.imageUrl"
              />
              <v-list-item-content class="ml-3 mr-3">
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
                  {{ match.jstDate }} / {{ match.competition.name }} / {{ match.stage }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-img
                max-height="40"
                max-width="40"
                :lazy-src="lazy"
                :src="match.awayTeam.imageUrl"
              />
            </v-list-item>
          </div>
        </v-list>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/databases/japan/useIndex'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import SelectYear from '@/components/molecules/SelectYear.vue'

export default defineComponent({
  name: 'Japan',

  components: {
    ContainerLoading,
    SelectYear
  },
  props: {},
  setup() {
    const { isLoading, setUp } = useIndex()
    const { japan } = useStore()
    const lazy = require('@/assets/lazy.png')

    setUp()

    return { isLoading, japan, lazy }
  }
})
</script>
