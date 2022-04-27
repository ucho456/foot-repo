import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { ForReport, Match, MatchDetail, Player } from '../@types/matches'
import { forReportConverter, matchConverter, matchDetailConverter } from '../converters'
import { convertJST, convertPosition, footballUrl, config } from '../utils'

const getFbMatches = async (competitionId: number): Promise<FbMatch[]> => {
  const utcDate = new Date().toISOString().substring(0, 10)
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/matches?dateFrom=${utcDate}&dateTo=${utcDate}`,
    config
  )
  const matches = res.data.matches as FbMatch[]
  return matches
}

const makeMatch = (fbMatch: FbMatch): Match => {
  return {
    id: String(fbMatch.id),
    season: fbMatch.season.startDate.substring(0, 4),
    jstDate: convertJST(fbMatch.utcDate),
    matchday: fbMatch.matchday,
    status: fbMatch.status,
    teamIds: [fbMatch.homeTeam.id, fbMatch.awayTeam.id],
    homeTeam: {
      ref: admin.firestore().doc(`teams/${fbMatch.homeTeam.id}`),
      id: fbMatch.homeTeam.id,
      name: fbMatch.homeTeam.name,
      score: fbMatch.score.fullTime.homeTeam,
      penalty: fbMatch.score.penalties.homeTeam,
      goalPlayers: fbMatch.goals.flatMap((g) => {
        if (g.team.id !== fbMatch.homeTeam.id) return []
        return { minute: g.minute, name: g.scorer.name }
      })
    },
    awayTeam: {
      ref: admin.firestore().doc(`teams/${fbMatch.awayTeam.id}`),
      id: fbMatch.awayTeam.id,
      name: fbMatch.awayTeam.name,
      score: fbMatch.score.fullTime.awayTeam,
      penalty: fbMatch.score.penalties.awayTeam,
      goalPlayers: fbMatch.goals.flatMap((g) => {
        if (g.team.id !== fbMatch.awayTeam.id) return []
        return { minute: g.minute, name: g.scorer.name }
      })
    },
    lastUpdated: fbMatch.lastUpdated
  }
}

const makeMatchDetail = (fbMatch: FbMatch): MatchDetail => {
  const homeLineup = fbMatch.homeTeam.lineup.map((l) => {
    return { ...l, position: convertPosition(l.position) }
  })
  const homeBench = fbMatch.homeTeam.bench.map((b) => {
    return { ...b, position: convertPosition(b.position) }
  })
  const awayLineup = fbMatch.awayTeam.lineup.map((l) => {
    return { ...l, position: convertPosition(l.position) }
  })
  const awayBench = fbMatch.awayTeam.bench.map((b) => {
    return { ...b, position: convertPosition(b.position) }
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
    homeCoach: { id: fbMatch.homeTeam.coach.id, name: fbMatch.homeTeam.coach.name },
    awayLineup,
    awayBench,
    awayCoach: { id: fbMatch.awayTeam.coach.id, name: fbMatch.awayTeam.coach.name },
    goals,
    bookings,
    substitutions
  }
}

const makeForReport = (fbMatch: FbMatch): ForReport => {
  // const homeAway = ['homeTeam', 'awayTeam']
  // const [homePlayers, awayPlayers] =
  const inPlayerIds = fbMatch.substitutions.map((s) => s.playerIn.id)
  const homelineup: Player[] = fbMatch.homeTeam.lineup.map((l) => {
    return { ...l, position: convertPosition(l.position) }
  })
  const homeInPlayers: Player[] = fbMatch.homeTeam.bench.flatMap((b) => {
    if (!inPlayerIds.includes(b.id)) return []
    return { ...b, position: convertPosition(b.position) }
  })
  const homeCoach: Player = {
    id: fbMatch.homeTeam.coach.id,
    name: fbMatch.homeTeam.coach.name,
    position: 'HC',
    shirtNumber: null
  }
  const homePlayers = homelineup.concat(homeInPlayers).concat([homeCoach])

  const awaylineup: Player[] = fbMatch.awayTeam.lineup.map((l) => {
    return { ...l, position: convertPosition(l.position) }
  })
  const awayInPlayers: Player[] = fbMatch.awayTeam.bench.flatMap((b) => {
    if (!inPlayerIds.includes(b.id)) return []
    return { ...b, position: convertPosition(b.position) }
  })
  const awayCoach: Player = {
    id: fbMatch.awayTeam.coach.id,
    name: fbMatch.awayTeam.coach.name,
    position: 'HC',
    shirtNumber: null
  }
  const awayPlayers = awaylineup.concat(awayInPlayers).concat([awayCoach])
  return { id: String(fbMatch.id), homePlayers, awayPlayers }
}

const setMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 60 minutes')
  .onRun(async () => {
    const competitions = [
      // { id: 2119, collectionId: 'J-League' },
      { id: 2021, collectionId: 'Premier-League' }
    ]
    const batch = admin.firestore().batch()
    for (const competition of competitions) {
      const fbMatches = await getFbMatches(competition.id)
      for (const fbMatch of fbMatches) {
        const mRef = admin.firestore().doc(`matches/${fbMatch.id}`).withConverter(matchConverter)
        const mSnapshot = await mRef.get()
        console.log('あああ')
        if (mSnapshot.exists && fbMatch.lastUpdated !== mSnapshot.data()?.lastUpdated) {
          console.log('いいい')
          const match = makeMatch(fbMatch)
          batch.set(mRef, match)
          const mdRef = admin
            .firestore()
            .doc(`matches/${fbMatch.id}/match-detail/${fbMatch.id}`)
            .withConverter(matchDetailConverter)
          const matchDetail = makeMatchDetail(fbMatch)
          console.log(matchDetail)
          batch.set(mdRef, matchDetail)
          const frRef = admin
            .firestore()
            .doc(`matches/${fbMatch.id}/for-report/${fbMatch.id}`)
            .withConverter(forReportConverter)
          const forReport = makeForReport(fbMatch)
          batch.set(frRef, forReport)
        }
      }
    }
    await batch.commit()
    return `success setMatches ${new Date()}`
  })

export default setMatches
