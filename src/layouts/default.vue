<template>
  <v-app class="light-grey">
    <v-app-bar class="white--text" app color="primary" fixed>
      <v-container class="align-center d-flex">
        <v-toolbar-title class="hover" @click="pushToHome" v-text="'Foot-Repo'" />
        <v-spacer />
        <v-btn class="white--text" color="accent" elevation="0" to="/reports/search"> 投稿 </v-btn>
        <v-list-item-avatar class="hover" @click.stop="toggleDrawer">
          <client-only>
            <v-img v-if="currentUser && currentUser.imageUrl" :src="currentUser.imageUrl"></v-img>
            <v-img v-else :src="noAvatarImage"></v-img>
          </client-only>
        </v-list-item-avatar>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" md="9"><Nuxt /></v-col>
          <v-col cols="12" sm="4" md="3"><SideContainer /></v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="white--text" absolute app color="fotter">
      <v-container class="align-center d-flex">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-container>
    </v-footer>
    <v-navigation-drawer v-model="showFlg" fixed right temporary>
      <client-only>
        <v-list>
          <v-list-item
            v-for="item in navigationDrawerItems"
            :key="item.id"
            :to="item.to"
            exact
            router
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="currentUser" class="px-2 ml-2" @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'ログアウト'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </client-only>
    </v-navigation-drawer>
    <Snackbar v-bind="snackbar" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed, ref, useRouter } from '@nuxtjs/composition-api'
import { getAuth, signOut } from 'firebase/auth'
import SideContainer from '@/components/organisms/SideContainer.vue'
import useCurrentUser from '@/utils/useCurrentUser'
import Snackbar from '@/components/molecules/Snackbar.vue'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'Default',

  components: {
    SideContainer,
    Snackbar
  },

  setup() {
    const { currentUser } = useCurrentUser()
    const noAvatarImage = require('@/assets/no_avatar.png')
    const router = useRouter()
    const pushToHome = () => router.push('/')
    const { snackbar, openSnackbar } = useSnackbar()

    const navigationDrawerItems = computed(() => {
      const home = { icon: 'mdi-home', title: 'ホーム', to: '/' }
      const myPage = { icon: 'mdi-account', title: 'マイページ', to: '/my-page' }
      const reportNew = { icon: 'mdi-pencil-plus', title: '選手採点投稿', to: '/reports/search' }
      const database = { icon: 'mdi-chart-bar', title: 'データベース', to: '/databases/' }
      const chatRoom = { icon: 'mdi-chat-processing', title: 'チャットルーム', to: '/rooms/' }
      const contact = { icon: 'mdi-face-agent', title: '問い合わせ', to: '/contact' }
      const login = { icon: 'mdi-login', title: 'ログイン', to: '/login' }
      const about = { icon: 'mdi-information', title: '当サイトについて', to: '/about' }
      const signup = { icon: 'mdi-account-plus', title: '新規登録', to: '/signup' }
      return currentUser && currentUser.value
        ? [
            { id: 1, ...home },
            { id: 2, ...myPage },
            { id: 3, ...reportNew },
            { id: 4, ...database },
            { id: 5, ...chatRoom },
            { id: 6, ...about },
            { id: 7, ...contact }
          ]
        : [
            { id: 1, ...home },
            { id: 2, ...login },
            { id: 3, ...signup },
            { id: 4, ...reportNew },
            { id: 5, ...database },
            { id: 6, ...chatRoom },
            { id: 7, ...about },
            { id: 8, ...contact }
          ]
    })
    const showFlg = ref(false)
    const toggleDrawer = (): boolean => (showFlg.value = !showFlg.value)

    const auth = getAuth()
    const logout = (): void => {
      signOut(auth)
        .then(() => {
          showFlg.value = false
          router.push('/')
          openSnackbar('success', 'ログアウトしました。')
        })
        .catch(() => openSnackbar('failure', 'ログアウトに失敗しました。'))
    }
    return {
      currentUser,
      noAvatarImage,
      snackbar,
      navigationDrawerItems,
      showFlg,
      toggleDrawer,
      pushToHome,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.light-grey {
  background: #eceff1;
}
.hover {
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
