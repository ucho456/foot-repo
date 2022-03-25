<template>
  <v-app class="light-grey">
    <v-app-bar class="white--text" app color="primary" fixed>
      <v-container class="align-center d-flex">
        <v-toolbar-title v-text="'Foot-Repo'" />
        <v-spacer />
        <v-btn class="white--text" icon @click.stop="toggleDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col md="9" sm="8"><nuxt /></v-col>
          <v-col md="3" sm="4"><SideContainer /></v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="showFlg" fixed right temporary>
      <v-list>
        <v-list-item class="px-2" :to="'/'">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item>
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
      </v-list>
      <template #append>
        <div class="px-5">
          <div>底</div>
        </div>
      </template>
    </v-navigation-drawer>
    <v-footer class="white--text" :absolute="true" app color="fotter">
      <v-container class="align-center d-flex">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-container>
    </v-footer>
    <Snackbar v-bind="snackbar" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SideContainer from '@/components/organisms/SideContainer.vue'
import { navigationDrawerItems } from '@/utils/navigationDrawerItems'
import Snackbar from '@/components/molecules/Snackbar.vue'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'Default',

  components: {
    SideContainer,
    Snackbar
  },

  setup() {
    const { snackbar } = useSnackbar()
    const showFlg = ref(false)
    const toggleDrawer = (): boolean => (showFlg.value = !showFlg.value)
    return { snackbar, navigationDrawerItems, showFlg, toggleDrawer }
  }
})
</script>

<style lang="scss" scoped>
.light-grey {
  background: #eceff1;
}
</style>
