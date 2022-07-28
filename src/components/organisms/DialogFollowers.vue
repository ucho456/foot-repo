<template>
  <v-dialog max-width="330" persistent :value="isDialog" :width="'90%'">
    <v-card>
      <ContainerLoading :is-loading="isLoading" />
      <v-container v-if="!isLoading">
        <v-virtual-scroll height="400" item-height="60" :items="follwers">
          <template #default="{ item }">
            <v-container>
              <v-row style="height: 36px">
                <ColUserImageName
                  :cols="7"
                  :sm="7"
                  :md="7"
                  :image-url="item.user.imageUrl"
                  :name="item.user.name"
                  :user-id="item.user.id"
                />
                <v-col v-if="item.follow !== undefined && item.user.id !== uid" cols="5">
                  <ButtonFollow
                    :disabled="isDisabled(item.user.id)"
                    :follow="item.follow"
                    :is-loading="isLoadingUpdateFollow(item.user.id)"
                    :user-id="item.user.id"
                    @click="handleFollow"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-virtual-scroll>
        <v-row class="mt-3" justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="!hasNext"
              :text="'もっと読み込む'"
              :is-loading="isLoadingButton"
              @click="handleNext"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#1a237e" text @click="handleHide"> 閉じる </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
/** check */
import { computed, defineComponent } from '@nuxtjs/composition-api'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ColUserImageName from '@/components/organisms/ColUserImageName.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'

export default defineComponent({
  name: 'DialogFollowers',

  components: {
    ButtonFollow,
    ButtonSubmit,
    ColUserImageName,
    ContainerLoading
  },

  props: {
    follwers: { type: Array as () => Follower[], default: () => [] },
    hasNext: { type: Boolean, default: false },
    isDialog: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    isLoadingButton: { type: Boolean, default: false },
    // isLoadingUpdateFollow: { type: Boolean, default: false },
    isUpdatingUserId: { type: String, default: '' },
    uid: { type: String, required: false, default: null }
  },

  setup(props, ctx) {
    const handleHide = (): void => ctx.emit('hide')
    const handleFollow = (userId: string): void => ctx.emit('follow', userId)
    const handleNext = (): void => ctx.emit('next')
    const isLoadingUpdateFollow = computed(() => (userId: string) => {
      return props.isUpdatingUserId === userId
    })
    const isDisabled = computed(() => (userId: string) => {
      if (props.isUpdatingUserId === '') return false
      return props.isUpdatingUserId !== userId
    })

    return { handleFollow, handleHide, handleNext, isDisabled, isLoadingUpdateFollow }
  }
})
</script>
