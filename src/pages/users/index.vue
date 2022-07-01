<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingSetUp" />
      <v-container v-if="!isLoadingSetUp">
        <v-row>
          <v-col>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
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
                  <v-list-item-subtitle> マイチーム：{{ user.team.name }} </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar size="36">
                  <v-img v-if="user.imageUrl" :src="user.imageUrl" />
                  <v-img v-else :src="noAvatarImage" />
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <v-col cols="6">
                  <ButtonFollow
                    v-if="loginUser && user.follow !== undefined"
                    :follow="user.follow"
                    :is-loading="isLoadingUpdateFollow"
                    :user-id="user.id"
                    @click="updateFollow"
                  />
                </v-col>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/users/useIndex'
import useLoginUser from '@/utils/useLoginUser'
import useStore from '@/utils/useStore'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'

export default defineComponent({
  name: 'Users',

  components: {
    ButtonFollow,
    ContainerLoading
  },

  setup() {
    const { isLoadingSetUp, isLoadingUpdateFollow, setUp, updateFollow } = useIndex()
    const { loginUser } = useLoginUser()
    const { users } = useStore()
    const noAvatarImage = require('@/assets/no_avatar.png')

    setUp()

    return { isLoadingSetUp, isLoadingUpdateFollow, loginUser, noAvatarImage, updateFollow, users }
  }
})
</script>
