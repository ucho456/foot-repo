<template>
  <v-sheet>
    <v-toolbar flat>
      <v-toolbar-title>選手採点一覧</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleClick">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-if="loading" class="pb-10">
      <v-row justify="center">
        <v-progress-circular color="primary" indeterminate />
      </v-row>
    </v-container>
    <v-list v-else class="mt-n4" three-line>
      <v-container v-for="report in reports" :key="report.id">
        <v-list-item
          :exact="true"
          :router="true"
          :to="{ path: 'reports/show', query: { reportId: report.id } }"
        >
          <v-list-item-avatar>
            <v-img v-if="report.user.imageUrl" :src="report.user.imageUrl" />
            <v-img v-else :src="noAvatarImage" />
          </v-list-item-avatar>
          <div>aaa</div>
          <v-list-item-content>
            <v-list-item-title>{{ report.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ report.user.name }}</v-list-item-subtitle>
            <v-list-item-subtitle style="display: flex">
              <v-img
                class="rounded-circle"
                :max-height="16"
                :max-width="16"
                :src="`https://crests.football-data.org/${1}.svg`"
              />
              {{ report.homeTeam.score }}
              vs
              {{ report.awayTeam.score }}
              <v-img
                class="rounded-circle"
                :max-height="16"
                :max-width="16"
                :src="`https://crests.football-data.org/${1}.svg`"
              />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-img
          class="rounded-circle"
          :max-height="16"
          :max-width="16"
          :src="`https://crests.football-data.org/${1}.svg`"
        />
      </v-container>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MatchTable',

  props: {
    loading: { type: Boolean, default: false },
    reports: {
      type: Array as () => Report[],
      default: () => [
        {
          id: '',
          title: '',
          user: { name: '', imageUrl: '' },
          homeTeam: { name: '', score: 0 },
          awayTeam: { name: '', score: 0 },
          competition: { name: '' },
          jstDate: ''
        }
      ]
    }
  },

  setup(_, ctx) {
    const noAvatarImage = require('@/assets/no_avatar.png')

    const handleClick = (): void => {
      ctx.emit('click')
    }

    return { noAvatarImage, handleClick }
  }
})
</script>
