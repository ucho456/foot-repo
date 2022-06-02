<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingReport" />
      <v-container v-if="report && match">
        <v-row>
          <v-col>
            <h1>{{ report.title }}</h1>
          </v-col>
        </v-row>
        <RowUserImageName :image-url="report.user.imageUrl" :name="report.user.name" />
        <RowMatchHeader v-bind="match" />
        <v-row v-if="report.selectTeam !== 'away'">
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="30"
              max-width="30"
              :src="match.homeTeam.imageUrl"
            />
          </v-col>
        </v-row>
        <v-row v-if="report.selectTeam !== 'away'">
          <v-container>
            <v-row v-for="htrItem in homeTeamReportItems" :key="htrItem.id">
              <v-col cols="12">
                {{ htrItem.position }} {{ htrItem.shirtNumber }} {{ htrItem.player.name }}
                <span v-if="report && report.momId === htrItem.player.id" class="mom">☆MOM</span>
              </v-col>
              <v-col class="mt-n6" cols="12"> {{ htrItem.point }} </v-col>
              <v-col class="caption mb-5 mt-n6" cols="12">{{ htrItem.text }}</v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row v-if="report.selectTeam !== 'home'">
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="30"
              max-width="30"
              :src="match.awayTeam.imageUrl"
            />
          </v-col>
        </v-row>
        <v-row v-if="report.selectTeam !== 'home'">
          <v-container>
            <v-row v-for="atrItem in awayTeamReportItems" :key="atrItem.id">
              <v-col cols="12">
                {{ atrItem.position }} {{ atrItem.shirtNumber }} {{ atrItem.player.name }}
                <span v-if="report && report.momId === atrItem.player.id" class="mom">☆MOM</span>
              </v-col>
              <v-col class="mt-n6" cols="12"> {{ atrItem.point }} </v-col>
              <v-col class="caption mb-5 mt-n6" cols="12">{{ atrItem.text }}</v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row>
          <v-col cols="12">総評：{{ report.summary }}</v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingReport" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingUser && !user" />
      <v-container v-if="user">
        <RowUserImageName :image-url="user.imageUrl" :name="user.name" />
        <v-row>
          <v-col class="ml-10 mt-n5">{{ user.teamId }}<br />{{ user.greet }}</v-col>
        </v-row>
      </v-container>
    </v-card>
    <client-only>
      <v-card v-if="currentUser && !isLoadingReport && !isLoadingUser" class="mt-4" outlined>
        <v-container>
          <RowUserImageName :image-url="currentUser.imageUrl" :name="currentUser.name" />
          <v-row>
            <v-col cols="12"><Textarea /></v-col>
            <v-col cols="6" class="mt-n10">
              <ButtonSubmit :loading="false" :icon="'mdi-home'" :text="'コメントを投稿'" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </client-only>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/reports/useShow'
import useCurrentUser from '@/utils/useCurrentUser'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/molecules/ContainerLoading.vue'
import RowUserImageName from '@/components/organisms/RowUserImageName.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ContainerLoading,
    RowUserImageName,
    RowMatchHeader,
    Textarea,
    ButtonSubmit
  },

  setup() {
    const route = useRoute()
    const {
      report,
      homeTeamReportItems,
      awayTeamReportItems,
      match,
      user,
      isLoadingReport,
      isLoadingUser,
      setUp
    } = useShow()
    const { currentUser } = useCurrentUser()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const reportId = route.value.params.id as string
      const result = await setUp(reportId)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    return {
      report,
      homeTeamReportItems,
      awayTeamReportItems,
      match,
      user,
      isLoadingReport,
      isLoadingUser,
      currentUser
    }
  }
})
</script>

<style lang="scss" scoped>
.mom {
  background: linear-gradient(transparent 70%, yellow 70%);
}
</style>
