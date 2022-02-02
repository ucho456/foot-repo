<template>
  <v-sheet>
    <v-toolbar flat>
      <v-toolbar-title>試合一覧</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleClick">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-if="isLoading" class="pb-10">
      <v-row justify="center">
        <v-progress-circular color="darkBlue" indeterminate />
      </v-row>
    </v-container>
    <v-list v-else class="mt-n4" three-line>
      <v-container v-if="err" class="mt-4">
        <v-row justify="center">
          {{ err }}
        </v-row>
      </v-container>
      <template v-for="mItem in matchList">
        <v-list-item :key="mItem.id" :to="mItem.to" exact router>
          <v-list-item-avatar>
            <v-img v-if="mItem.homeTeamImageUrl !== ''" :src="mItem.homeTeamImageUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-row>
              <v-col cols="6"
                ><v-list-item-title class="text-right">{{
                  mItem.homeTeamName
                }}</v-list-item-title></v-col
              >
              <v-col cols="6"
                ><v-list-item-title class="text-left">{{
                  mItem.awayTeamName
                }}</v-list-item-title></v-col
              >
            </v-row>
            <v-list-item-subtitle class="mt-n3 text-center">{{ mItem.score }}</v-list-item-subtitle>
            <v-list-item-subtitle class="text-center">{{ mItem.description }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-img v-if="mItem.awayTeamImage !== ''" :src="mItem.awayTeamImage" />
          </v-list-item-avatar>
        </v-list-item>
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ReportsMatchList',

  props: {
    err: { type: String, default: '' },
    isLoading: { type: Boolean, default: false },
    matchList: {
      type: Array as () => MatchListItem[],
      default: () => [
        {
          id: 0,
          homeTeamName: '',
          homeTeamImageUrl: '',
          awayTeamName: '',
          awayTeamImageUrl: '',
          score: '',
          description: '',
          to: {
            path: '',
            query: {
              matchId: 0
            }
          }
        }
      ]
    }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')
    return { handleClick }
  }
})
</script>
