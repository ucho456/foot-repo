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
              :maxlength="100"
            />
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
            <v-col class="mt-n3" cols="3"><SelectPoint v-model="reportItem.point" /></v-col>
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
            <v-col class="mt-n3" cols="3"><SelectPoint v-model="reportItem.point" /></v-col>
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
              :text="inputReport.publish ? '更新する' : '更新して公開する'"
              :loading="isLoadingSend"
              @click="submitUpdate"
            />
          </v-col>
          <v-col cols="10" sm="6">
            <ButtonSubmit
              :disabled="inputReport.publish"
              :icon="'mdi-content-save'"
              :text="'非公開にして一時保存する'"
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
import useEdit from '@/composables/reports/useEdit'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import TextField from '@/components/molecules/TextField.vue'
import SelectPoint from '@/components/molecules/SelectPoint.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import SelectIdMom from '@/components/molecules/SelectIdMom.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'ReportEdit',

  components: {
    ContainerLoading,
    RowMatchHeader,
    TextField,
    SelectPoint,
    Textarea,
    SelectIdMom,
    ButtonSubmit
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const { inputReport, match, isLoadingSetUp, setUp, isLoadingSend, update, save } = useEdit()
    const { loginUser } = useLoginUser()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const reportId = route.value.query.reportId as string
      const result = await setUp(reportId, loginUser.value?.uid!)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      } else if (result === 'unauthorized access') {
        openSnackbar(result, '不正なアクセスが発生した為、ホーム画面に遷移しました。')
        router.push('/')
      }
    }
    setUpPage()

    const submitUpdate = async (): Promise<void> => {
      const result = await update()
      const message =
        result === 'success' ? '選手採点を編集しました。' : '選手採点の編集に失敗しました。'
      openSnackbar(result, message)
      if (result === 'success') {
        const reportId = route.value.query.reportId as string
        router.push(`/reports/${reportId}`)
      }
    }

    const submitSave = async (): Promise<void> => {
      const result = await save()
      const message =
        result === 'success' ? '選手採点を一時保存しました。' : '選手採点の一時保存に失敗しました。'
      openSnackbar(result, message)
      if (result === 'success') {
        const reportId = route.value.query.reportId as string
        router.push(`/reports/${reportId}`)
      }
    }

    return { inputReport, match, isLoadingSetUp, isLoadingSend, submitUpdate, submitSave }
  }
})
</script>
