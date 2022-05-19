<template>
  <v-card outlined>
    <v-container v-if="isLoadingSetUp" class="pb-10 pt-10">
      <v-row justify="center">
        <v-progress-circular color="primary" indeterminate />
      </v-row>
    </v-container>
    <v-container v-else>
      <ReportsHeader v-bind="match" />
      <v-container>
        <v-row>
          <v-col cols="12">
            <TextField
              v-model="inputReport.title"
              :icon="'mdi-format-title'"
              :label="'タイトル'"
              :maxlength="32"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="8" md="5" sm="5">
            <SelectHomeAway v-model="inputReport.selectTeam" />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="inputReport.selectTeam !== 'away'">
        <v-row>
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="60"
              max-width="60"
              :src="`https://crests.football-data.org/${match.homeTeam.id}.svg`"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="inputReport.selectTeam !== 'away'">
        <v-row v-for="reportItem in inputReport.homeTeamReportItems" :key="reportItem.id">
          <v-col cols="3"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
          <v-col cols="9">{{ reportItem.playerName }}</v-col>
          <v-col class="mt-n3" cols="3"><TextFieldPoint v-model="reportItem.point" /></v-col>
          <v-col class="mt-n5" cols="9">
            <Textarea v-model="reportItem.text" :maxlength="140" />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="inputReport.selectTeam !== 'home'">
        <v-row>
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="60"
              max-width="60"
              :src="`https://crests.football-data.org/${match.awayTeam.id}.svg`"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="inputReport.selectTeam !== 'home'">
        <v-row v-for="reportItem in inputReport.awayTeamReportItems" :key="reportItem.id">
          <v-col cols="3"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
          <v-col cols="9">{{ reportItem.playerName }}</v-col>
          <v-col class="mt-n3" cols="3"><TextFieldPoint v-model="reportItem.point" /></v-col>
          <v-col class="mt-n5" cols="9">
            <Textarea v-model="reportItem.text" :maxlength="140" />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="10" sm="5">
            <SelectIdMom
              v-model="inputReport.momId"
              :away-team-report-items="inputReport.awayTeamReportItems"
              :home-team-report-items="inputReport.homeTeamReportItems"
              :select-team="inputReport.selectTeam"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col>
            <Textarea
              v-model="inputReport.summary"
              :icon="'mdi-note-text-outline'"
              :label="'総評'"
              :maxlength="300"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row justify="center">
          <v-col cols="10" sm="4">
            <ButtonSubmit
              :icon="'mdi-pencil-plus'"
              :text="'投稿'"
              :loading="isLoading"
              @click="submitCreate"
            />
          </v-col>
          <v-col cols="10" sm="4">
            <ButtonSubmit
              :icon="'mdi-content-save'"
              :text="'一時保存'"
              :loading="isLoading"
              @click="submitSave"
            />
          </v-col>
          <v-col cols="10" sm="4">
            <ButtonBack @click="back" />
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'
import useNew from '@/composables/reports/useNew'
import useSnackbar from '@/utils/useSnackbar'
import ReportsHeader from '@/components/organisms/ReportsHeader.vue'
import TextField from '@/components/molecules/TextField.vue'
import SelectHomeAway from '@/components/molecules/SelectHomeAway.vue'
import TextFieldPoint from '@/components/molecules/TextFieldPoint.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import SelectIdMom from '@/components/molecules/SelectIdMom.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'

export default defineComponent({
  name: 'ReportNew',

  components: {
    ReportsHeader,
    TextField,
    SelectHomeAway,
    TextFieldPoint,
    Textarea,
    SelectIdMom,
    ButtonSubmit,
    ButtonBack
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const { inputReport, match, isLoadingSetUp, setUp, isLoading, save, create } = useNew()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const matchId = route.value.query.matchId as string
      const result = await setUp(matchId)
      if (result === 'failure') {
        openSnackbar(result, '試合データの取得に失敗しました。')
      }
    }
    setUpPage()

    const next = (result: 'success' | 'failure', message: string): void => {
      openSnackbar(result, message)
      if (result === 'success') {
        router.push('/')
      }
    }

    const submitCreate = async (): Promise<void> => {
      const result = await create()
      const message =
        result === 'success' ? '選手採点を作成しました。' : '選手採点の作成に失敗しました。'
      next(result, message)
    }

    const submitSave = async (): Promise<void> => {
      const result = await save()
      const message = result === 'success' ? '一時保存しました。' : '一時保存に失敗しました。'
      next(result, message)
    }

    const back = (): void => {
      router.back()
    }

    return { inputReport, match, isLoadingSetUp, back, isLoading, submitSave, submitCreate }
  }
})
</script>
