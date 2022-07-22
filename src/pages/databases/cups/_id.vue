<template>
  <v-container>
    <v-card outlined>
      <v-container>
        <v-row>
          <v-col>
            <h1>{{ cup.name }}</h1>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <h2>順位表</h2>
        <v-row>
          <v-col>データが更新されるまで暫くお待ち下さい。</v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mt-4" outlined>
      <v-container>
        <h2>得点ランキング</h2>
        <v-row>
          <v-col>データが更新されるまで暫くお待ち下さい。</v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mt-4" outlined>
      <MatchSchedule
        v-model="cup.yearMonth"
        :is-loading="isLoadingMatches"
        :match-schedule="cup.matchSchedule"
        @click="readMatchSchedule"
      />
      <v-container>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="!cup.hasNext"
              :is-loading="isLoadingNextMatchSchedule"
              :text="'もっと読み込む'"
              @click="readNextMatchSchedule"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/cups/useShow'
import useStore from '@/utils/useStore'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import MatchSchedule from '@/components/organisms/MatchSchedule.vue'

export default defineComponent({
  name: 'LeagueShow',

  components: {
    ButtonSubmit,
    MatchSchedule
  },

  setup() {
    const {
      isLoadingMatches,
      isLoadingNextMatchSchedule,
      pushToTeamShow,
      readMatchSchedule,
      readNextMatchSchedule,
      setUp
    } = useShow()
    const { cup } = useStore()
    const lazy = require('@/assets/lazy.png')

    setUp()

    return {
      isLoadingMatches,
      isLoadingNextMatchSchedule,
      lazy,
      cup,
      pushToTeamShow,
      readMatchSchedule,
      readNextMatchSchedule
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>

<style lang="scss" scoped>
.o-standings {
  &:hover {
    cursor: pointer;
  }
}
.o-no-link {
  &:hover {
    background-color: transparent !important;
  }
}
</style>
