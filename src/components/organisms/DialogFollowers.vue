<template>
  <v-dialog max-width="330" persistent :value="isDialog" :width="'90%'">
    <v-card>
      <ContainerLoading :is-loading="isLoading" />
      <v-container v-if="!isLoading">
        <v-virtual-scroll :items="follwers" :item-height="50" height="450">
          <template #default="{ item }">
            <v-container>
              <v-row style="height: 30px">
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
                    :follow="item.follow"
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
              :loading="isLoadingButton"
              @click="handleNext"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="'primary'" text @click="handleClose"> 閉じる </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ColUserImageName from '@/components/organisms/ColUserImageName.vue'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'DialogFollowers',

  components: {
    ContainerLoading,
    ColUserImageName,
    ButtonFollow,
    ButtonSubmit
  },

  props: {
    hasNext: { type: Boolean, default: false },
    isDialog: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    isLoadingButton: { type: Boolean, default: false },
    follwers: { type: Array as () => Follower[], default: () => [] },
    uid: { type: String, required: false, default: null }
  },

  setup(_, ctx) {
    const handleClose = (): void => ctx.emit('close')
    const handleFollow = (userId: string): void => ctx.emit('follow', userId)
    const handleNext = (): void => ctx.emit('next')

    return { handleClose, handleFollow, handleNext }
  }
})
</script>
