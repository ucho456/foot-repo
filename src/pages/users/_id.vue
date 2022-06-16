<template>
  <v-container>
    <v-card outlined>
      {{ user }}
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/users/useShow'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'UserShow',

  components: {},

  props: {},

  setup() {
    const route = useRoute()
    const { user, isLoading, setUp } = useShow()
    const { loginUser } = useLoginUser()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const userId = route.value.params.id
      const result = await setUp(userId)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    return { user, isLoading, loginUser }
  }
})
</script>
