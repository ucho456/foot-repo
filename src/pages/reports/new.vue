<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingSetUp" />
      <v-container v-if="!isLoadingSetUp && match">
        <RowMatchHeader v-bind="match" />
        <v-row>
          <v-col>
            <TextField
              v-model="inputReport.title"
              :icon="'mdi-format-title'"
              :label="'タイトル'"
              :maxlength="32"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" sm="5">
            <SelectHomeAway v-model="inputReport.selectTeam" />
          </v-col>
        </v-row>
        <v-row v-if="inputReport.selectTeam !== 'away'">
          <v-col>
            <v-img max-height="30" max-width="30" :src="match.homeTeam.imageUrl" />
          </v-col>
        </v-row>
        <div v-if="inputReport.selectTeam !== 'away'">
          <v-row v-for="reportItem in inputReport.homeTeamReportItems" :key="reportItem.id">
            <v-col cols="3"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
            <v-col cols="9">{{ reportItem.player.name }}</v-col>
            <v-col class="mt-n3" cols="3"><TextFieldPoint v-model="reportItem.point" /></v-col>
            <v-col class="mt-n5" cols="9">
              <Textarea v-model="reportItem.text" :maxlength="140" />
            </v-col>
          </v-row>
        </div>
        <v-row v-if="inputReport.selectTeam !== 'home'">
          <v-col>
            <v-img max-height="30" max-width="30" :src="match.awayTeam.imageUrl" />
          </v-col>
        </v-row>
        <div v-if="inputReport.selectTeam !== 'home'">
          <v-row v-for="reportItem in inputReport.awayTeamReportItems" :key="reportItem.id">
            <v-col cols="3"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
            <v-col cols="9">{{ reportItem.player.name }}</v-col>
            <v-col class="mt-n3" cols="3"><TextFieldPoint v-model="reportItem.point" /></v-col>
            <v-col class="mt-n5" cols="9">
              <Textarea v-model="reportItem.text" :maxlength="140" />
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col cols="10" sm="7">
            <SelectIdMom
              v-model="inputReport.momId"
              :away-team-report-items="inputReport.awayTeamReportItems"
              :home-team-report-items="inputReport.homeTeamReportItems"
              :select-team="inputReport.selectTeam"
            />
          </v-col>
        </v-row>
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
        <v-row justify="center">
          <v-col cols="10" sm="6">
            <ButtonSubmit
              :icon="'mdi-pencil-plus'"
              :text="'投稿'"
              :loading="isLoadingSend"
              @click="submitCreate"
            />
          </v-col>
          <v-col cols="10" sm="6">
            <ButtonSubmit
              :icon="'mdi-content-save'"
              :text="'一時保存'"
              :loading="isLoadingSend"
              @click="submitSave"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'
import useNew from '@/composables/reports/useNew'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import TextField from '@/components/molecules/TextField.vue'
import SelectHomeAway from '@/components/molecules/SelectHomeAway.vue'
import TextFieldPoint from '@/components/molecules/TextFieldPoint.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import SelectIdMom from '@/components/molecules/SelectIdMom.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'ReportNew',

  components: {
    ContainerLoading,
    RowMatchHeader,
    TextField,
    SelectHomeAway,
    TextFieldPoint,
    Textarea,
    SelectIdMom,
    ButtonSubmit
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const { inputReport, match, isLoadingSetUp, setUp, isLoadingSend, create, save } = useNew()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const matchId = route.value.query.matchId as string
      const result = await setUp(matchId)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    const submitCreate = async (): Promise<void> => {
      const res = await create()
      const message =
        res.result === 'success' ? '選手採点を作成しました。' : '選手採点の作成に失敗しました。'
      openSnackbar(res.result, message)
      if (res.result === 'success') {
        router.push(`/reports/${res.reportId}`)
      }
    }

    const submitSave = async (): Promise<void> => {
      await save()
    }

    return { inputReport, match, isLoadingSetUp, isLoadingSend, submitSave, submitCreate }
  }
})
</script>
