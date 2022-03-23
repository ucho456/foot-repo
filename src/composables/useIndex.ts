// import { markRaw } from '@nuxtjs/composition-api'

// export const makeReportList = (reports: Report[], users: User[]): ReportListItem[] => {
//   const userMap: UserMap = new Map(users.map((u) => [u.id, u]))
//   const reportList = reports.map((r) => {
//     const user = userMap.get(r.userId) || { name: r.guestName, imageUrl: '' }
//     return {
//       id: r.id,
//       title: r.title,
//       userName: user.name,
//       userImageUrl: user.imageUrl,
//       description: `${r.homeTeamName} ${r.homeTeamScore} vs ${r.awayTeamScore} ${r.awayTeamName} / ${r.competitionName} ${r.utcDate}`,
//       to: `reports/${r.id}`
//     }
//   })
//   return markRaw(reportList)
// }
