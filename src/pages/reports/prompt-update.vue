<template>
  <v-container>
    <v-card min-height="600" outlined>
      <ContainerLoading :is-loading="isLoadingSetUp" />
      <v-container v-if="!isLoadingSetUp && matches.length === 0">
        <v-row>
          <v-col> 更新されていない試合はありませんでした。 </v-col>
        </v-row>
      </v-container>
      <v-container v-if="!isLoadingSetUp && matches.length > 0">
        <v-row>
          <v-col> 以下にあるのが・・・。 </v-col>
        </v-row>
        <v-list class="mt-n4" three-line>
          <div v-for="match in matches" :key="match.id">
            <v-list-item exact router @click="promptUpdateMatch(match.id)">
              <v-list-item-avatar>
                <v-img :lazy-src="lazy" :src="match.homeTeam.imageUrl" />
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
                <v-img :lazy-src="lazy" :src="match.awayTeam.imageUrl" />
              </v-list-item-avatar>
            </v-list-item>
          </div>
        </v-list>
      </v-container>
    </v-card>
    <v-overlay :value="isLoadingUpdate">
      <v-container>
        <v-row>
          <v-col>試合データの更新をリクエストしています。暫くお待ち下さい。</v-col>
        </v-row>
      </v-container>
      <ContainerLoading :is-loading="isLoadingUpdate" />
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import usePromptUpdate from '@/composables/reports/usePromptUpdate'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'

export default defineComponent({
  name: 'ReportPromptUpdate',
  components: {
    ContainerLoading
  },
  props: {},
  setup() {
    const { isLoadingSetUp, isLoadingUpdate, matches, promptUpdateMatch, setUp } = usePromptUpdate()
    const lazy = require('@/assets/lazy.png')

    setUp()

    return {
      isLoadingSetUp,
      isLoadingUpdate,
      lazy,
      matches,
      promptUpdateMatch
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
