import { markRaw } from '@nuxtjs/composition-api'

const setUpDispReportItems = (report: Report): DispReportItem[] => {
  const dispReportItems = report.homeTeamReportItems
    .concat(report.awayTeamReportItems)
    .map((ri) => {
      return {
        id: ri.id,
        playerInfo: `${ri.position} ${ri.shirtNumber} ${ri.playerName}`,
        point: ri.point,
        text: ri.text,
        momFlg: report.mom === ri.playerName
      }
    })
  return dispReportItems
}

export const setUpDispReport = (report: Report, user: User): DispReport => {
  const dispReportItems = setUpDispReportItems(report)
  const dispReport = {
    userId: user.id,
    userName: user.name,
    userImageUrl: user.imageUrl,
    title: report.title,
    competitionName: report.competitionName,
    utcDate: report.utcDate,
    homeTeamId: report.homeTeamId,
    homeTeamName: report.homeTeamName,
    homeTeamScore: report.homeTeamScore,
    awayTeamId: report.awayTeamId,
    awayTeamName: report.awayTeamName,
    awayTeamScore: report.awayTeamScore,
    dispReportItems,
    summary: report.summary
  }
  return markRaw(dispReport)
}
