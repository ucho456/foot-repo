interface ReportItemForShow {
  id: number
  playerInformation: string
  point: string
  text: string
  momFlg: boolean
}

export const setUpReportItems = (report: Report): ReportItemForShow[] => {
  return report.homeTeamReportItems.concat(report.awayTeamReportItems).map((v) => {
    return {
      id: v.id,
      playerInformation: `${v.position} ${v.shirtNumber} ${v.playerName}`,
      point: v.point.toFixed(1),
      text: v.text,
      momFlg: report.mom === v.playerName
    }
  })
}
