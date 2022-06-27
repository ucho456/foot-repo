<template>
  <v-dialog max-width="330" persistent :value="isDialog" :width="'90%'">
    <v-card>
      <ContainerLoading :is-loading="isLoading" />
      <v-container v-if="!isLoading">
        <v-virtual-scroll :items="follwers" :item-height="100" height="300">
          <template #default="{ item }">
            <RowUser :image-url="item.user.imageUrl" :name="item.user.name" />
          </template>
        </v-virtual-scroll>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowUser from '@/components/organisms/RowUser.vue'

export default defineComponent({
  name: 'DialogFollowers',

  components: {
    ContainerLoading,
    RowUser
  },

  props: {
    isDialog: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    follwers: { type: Array as () => Follower[], default: () => [] }
  },

  setup() {
    return {}
  }
})
</script>
