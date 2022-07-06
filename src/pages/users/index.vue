<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingSetUp" />
      <v-container v-if="!isLoadingSetUp">
        <v-row>
          <v-col cols="9"><h2>ユーザー検索</h2></v-col>
          <v-col cols="3" class="text-right">
            <v-btn icon @click="showDialog">
              <v-icon>{{ mdiMagnify }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="users.data.length === 0">
          <v-col>対象のユーザーはいません。</v-col>
        </v-row>
        <v-row v-else>
          <v-col v-for="user in users.data" :key="user.id" cols="12" md="6">
            <v-card class="mx-auto" outlined>
              <v-list-item three-line :to="`/users/${user.id}`">
                <v-list-item-content>
                  <v-list-item-title class="mb-1"> {{ user.name }} </v-list-item-title>
                  <v-list-item-subtitle v-if="user.team.name">
                    マイチーム：{{ user.team.name }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else> マイチーム：未設定 </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar size="36">
                  <v-img v-if="user.imageUrl" :src="user.imageUrl" />
                  <v-img v-else :src="noAvatarImage" />
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <ButtonFollow
                  v-if="loginUser && user.follow !== undefined"
                  :follow="user.follow"
                  :is-loading="isLoadingUpdateFollow"
                  :user-id="user.id"
                  @click="updateFollow"
                />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="!hasNextUsers"
              :loading="isLoadingNextUsers"
              :text="'もっと読み込む'"
              @click="readNextUsers"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogSearch
      :hide-date="true"
      :is-dialog="isDialog"
      :search-option="users.searchOption"
      @input-competition-id="inputCompetitionId"
      @input-team-id="inputTeamId"
      @close="hideDialog"
      @search="search"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mdiMagnify } from '@mdi/js'
import useIndex from '@/composables/users/useIndex'
import useLoginUser from '@/utils/useLoginUser'
import useStore from '@/utils/useStore'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'

export default defineComponent({
  name: 'Users',

  components: {
    ButtonFollow,
    ButtonSubmit,
    ContainerLoading,
    DialogSearch
  },

  setup() {
    const {
      hasNextUsers,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      isDialog,
      isLoadingNextUsers,
      isLoadingSetUp,
      isLoadingUpdateFollow,
      readNextUsers,
      search,
      setUp,
      showDialog,
      updateFollow
    } = useIndex()
    const { loginUser } = useLoginUser()
    const { users } = useStore()
    const noAvatarImage = require('@/assets/no_avatar.png')

    setUp()

    return {
      hasNextUsers,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      isDialog,
      isLoadingNextUsers,
      isLoadingSetUp,
      isLoadingUpdateFollow,
      loginUser,
      mdiMagnify,
      noAvatarImage,
      readNextUsers,
      search,
      showDialog,
      updateFollow,
      users
    }
  }
})
</script>
