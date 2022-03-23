<template>
  <v-container>
    <!-- <v-sheet>
      <v-container>
        <ReportsHeader v-bind="dispReport" />
        <ReportsShowBody v-bind="dispReport" />
      </v-container>
    </v-sheet> -->
  </v-container>
</template>

<script lang="ts">
// import { defineComponent } from '@vue/composition-api'
// import ReportsHeader from '@/components/organisms/ReportsHeader.vue'
// import ReportsShowBody from '@/components/organisms/ReportsShowBody.vue'
// import { setUpDispReport } from '@/composables/useReportsShow'
// import { reports, users } from '@/utils/testData'

// export default defineComponent({
//   name: 'ReportShow',

//   components: {
//     ReportsHeader,
//     ReportsShowBody
//   },

//   setup() {
//     // const id = Number(ctx.root.$route.params.id)
//     const user = users[0]
//     const report = reports[0]
//     const dispReport = setUpDispReport(report, user)
//     return { dispReport }
//   }
// })
</script>

<style lang="scss" scoped>
.user-name {
  line-height: 30px;
}
.mom {
  background: linear-gradient(transparent 70%, yellow 70%);
}
@media (max-width: $tabletBreakpoints) {
  h1 {
    font-size: 20px;
  }
}
</style>
