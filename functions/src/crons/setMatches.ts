import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { ForReport, MatchDetail, Player } from '../@types/matches'
import { makeMatch } from '../calls/createMatches'
import { forReportConverter, matchConverter, matchDetailConverter } from '../converters'
import { config, convertPosition, footballUrl, leagueCompetitions } from '../utils'

const getFbMatches = async (competitionId: number): Promise<FbMatch[]> => {
  const utcDate = new Date().toISOString().substring(0, 10)
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/matches?dateFrom=${utcDate}&dateTo=${utcDate}`,
    config
  )
  const matches = res.data.matches as FbMatch[]
  return matches
}

const makeMatchDetail = (fbMatch: FbMatch): MatchDetail => {
  const homeLineup = fbMatch.homeTeam.lineup.map((l) => {
    return { name: l.name, position: convertPosition(l.position), shirtNumber: l.shirtNumber }
  })
  const homeBench = fbMatch.homeTeam.bench.map((b) => {
    return { name: b.name, position: convertPosition(b.position), shirtNumber: b.shirtNumber }
  })
  const awayLineup = fbMatch.awayTeam.lineup.map((l) => {
    return { name: l.name, position: convertPosition(l.position), shirtNumber: l.shirtNumber }
  })
  const awayBench = fbMatch.awayTeam.bench.map((b) => {
    return { name: b.name, position: convertPosition(b.position), shirtNumber: b.shirtNumber }
  })
  const goals = fbMatch.goals.map((g) => {
    return {
      minute: g.minute,
      teamName: g.team.name,
      goalPlayerName: g.scorer.name,
      assistPlayerName: g.assist?.name || null
    }
  })
  const bookings = fbMatch.bookings.map((b) => {
    const card: 'red' | 'yellow' = b.card === 'RED_CARD' ? 'red' : 'yellow'
    return {
      minute: b.minute,
      teamName: b.team.name,
      playerName: b.player.name,
      card
    }
  })
  const substitutions = fbMatch.substitutions.map((s) => {
    return {
      minute: s.minute,
      teamName: s.team.name,
      outPlayerName: s.playerOut.name,
      inPlayerName: s.playerIn.name
    }
  })
  return {
    id: String(fbMatch.id),
    homeLineup,
    homeBench,
    homeCoachName: fbMatch.homeTeam.coach.name,
    awayLineup,
    awayBench,
    awayCoachName: fbMatch.awayTeam.coach.name,
    goals,
    bookings,
    substitutions,
    lastUpdated: fbMatch.lastUpdated
  }
}

const makeForReport = (fbMatch: FbMatch): ForReport => {
  const inPlayerIds = fbMatch.substitutions.map((s) => s.playerIn.id)
  const homelineup: Player[] = fbMatch.homeTeam.lineup.map((l) => {
    return { name: l.name, position: convertPosition(l.position), shirtNumber: l.shirtNumber }
  })
  const homeInPlayers: Player[] = fbMatch.homeTeam.bench.flatMap((b) => {
    if (!inPlayerIds.includes(b.id)) return []
    return { name: b.name, position: convertPosition(b.position), shirtNumber: b.shirtNumber }
  })
  const homeCoach: Player = {
    name: fbMatch.homeTeam.coach.name,
    position: 'HC',
    shirtNumber: null
  }
  const homePlayers = homelineup.concat(homeInPlayers).concat([homeCoach])

  const awaylineup: Player[] = fbMatch.awayTeam.lineup.map((l) => {
    return { name: l.name, position: convertPosition(l.position), shirtNumber: l.shirtNumber }
  })
  const awayInPlayers: Player[] = fbMatch.awayTeam.bench.flatMap((b) => {
    if (!inPlayerIds.includes(b.id)) return []
    return { name: b.name, position: convertPosition(b.position), shirtNumber: b.shirtNumber }
  })
  const awayCoach: Player = {
    name: fbMatch.awayTeam.coach.name,
    position: 'HC',
    shirtNumber: null
  }
  const awayPlayers = awaylineup.concat(awayInPlayers).concat([awayCoach])
  return { id: String(fbMatch.id), homePlayers, awayPlayers, lastUpdated: fbMatch.lastUpdated }
}

const setMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 60 minutes')
  .onRun(async () => {
    try {
      const batch = admin.firestore().batch()
      for (const competition of leagueCompetitions) {
        const fbMatches = await getFbMatches(competition.id)
        for (const fbMatch of fbMatches) {
          if (fbMatch.status === 'FINISHED') {
            const mRef = admin
              .firestore()
              .doc(`matches/${fbMatch.id}`)
              .withConverter(matchConverter)
            const mSnapshot = await mRef.get()
            if (mSnapshot.data()?.lastUpdated !== fbMatch.lastUpdated) {
              const match = makeMatch(fbMatch)
              batch.set(mRef, match)
            }

            const mdRef = admin
              .firestore()
              .doc(`matches/${fbMatch.id}/match-detail/${fbMatch.id}`)
              .withConverter(matchDetailConverter)
            const mdSnapshot = await mdRef.get()
            if (!mdSnapshot.exists || mdSnapshot.data()?.lastUpdated !== fbMatch.lastUpdated) {
              const matchDetail = makeMatchDetail(fbMatch)
              batch.set(mdRef, matchDetail)
            }

            const frRef = admin
              .firestore()
              .doc(`matches/${fbMatch.id}/for-report/${fbMatch.id}`)
              .withConverter(forReportConverter)
            const frSnapshot = await frRef.get()
            if (!frSnapshot.exists || frSnapshot.data()?.lastUpdated !== fbMatch.lastUpdated) {
              const forReport = makeForReport(fbMatch)
              batch.set(frRef, forReport)
            }
          }
        }
      }
      await batch.commit()
      return `success setMatches ${new Date()}`
    } catch {
      return `error setMatches ${new Date()}`
    }
  })

export default setMatches
