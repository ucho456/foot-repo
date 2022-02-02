import { markRaw } from '@nuxtjs/composition-api'

export const makeMatchList = (matches: Match[]): MatchListItem[] => {
  const matchList = matches.map((m) => {
    return {
      id: m.id,
      homeTeamName: m.homeTeam.name,
      homeTeamImageUrl: `https://crests.football-data.org/${m.homeTeam.id}.svg`,
      awayTeamName: m.awayTeam.name,
      awayTeamImageUrl: `https://crests.football-data.org/${m.awayTeam.id}.svg`,
      score: `${m.homeTeamScore} - ${m.awayTeamScore}`,
      description: `${m.utcDate.substring(0, 10)} ${m.competitionName}`,
      to: { path: 'new', query: { matchId: m.id } }
    }
  })
  return markRaw(matchList)
}
