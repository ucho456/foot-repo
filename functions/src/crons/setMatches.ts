/** check */
/** 8/1に13行目を復活予定 */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import axios, { AxiosResponse } from 'axios'
import { makeMatch } from '../calls/createMatches'
import { forReportConverter, matchConverter, matchDetailConverter } from '../converters'
import { competitionMap, config, convertPosition, footballUrl } from '../utils'

const getMatchInfos = async (
  competitionId: number
): Promise<{ id: string; status: string; lastUpdated: string }[]> => {
  const utcDate = new Date().toISOString().substring(0, 10)
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/matches?dateFrom=${utcDate}&dateTo=${utcDate}`,
    config
  )
  const matches = res.data.matches as FbMatch[]
  const matchInfos = matches.flatMap((m) => {
    if (
      m.stage !== 'REGULAR_SEASON' &&
      m.stage !== 'GROUP_STAGE' &&
      m.stage !== 'LAST_16' &&
      m.stage !== 'QUARTER_FINALS' &&
      m.stage !== 'SEMI_FINALS' &&
      m.stage !== 'THIRD_PLACE' &&
      m.stage !== 'FINAL'
    ) {
      return []
    }
    return { id: String(m.id), status: m.status, lastUpdated: m.lastUpdated }
  })
  return matchInfos
}

export const getFbMatch = async (matchId: string): Promise<FbMatch> => {
  const res: AxiosResponse<any, any> = await axios.get(footballUrl + `matches/${matchId}`, config)
  const fbMatch = res.data as FbMatch
  return fbMatch
}

export const makeMatchDetail = (fbMatch: FbMatch): MatchDetail => {
  const homeLineup: Player[] = fbMatch.homeTeam.lineup.map((l) => {
    return {
      player: {
        id: String(l.id),
        name: l.name
      },
      position: convertPosition(l.position),
      shirtNumber: l.shirtNumber
    }
  })
  const homeBench: Player[] = fbMatch.homeTeam.bench.map((b) => {
    return {
      player: {
        id: String(b.id),
        name: b.name
      },
      position: convertPosition(b.position),
      shirtNumber: b.shirtNumber
    }
  })
  homeBench.push({
    player: {
      id: String(fbMatch.homeTeam.coach.id),
      name: fbMatch.homeTeam.coach.name
    },
    position: 'HC',
    shirtNumber: null
  })
  const awayLineup: Player[] = fbMatch.awayTeam.lineup.map((l) => {
    return {
      player: {
        id: String(l.id),
        name: l.name
      },
      position: convertPosition(l.position),
      shirtNumber: l.shirtNumber
    }
  })
  const awayBench: Player[] = fbMatch.awayTeam.bench.map((b) => {
    return {
      player: {
        id: String(b.id),
        name: b.name
      },
      position: convertPosition(b.position),
      shirtNumber: b.shirtNumber
    }
  })
  awayBench.push({
    player: {
      id: String(fbMatch.awayTeam.coach.id),
      name: fbMatch.awayTeam.coach.name
    },
    position: 'HC',
    shirtNumber: null
  })
  const goals = fbMatch.goals.map((g, i) => {
    return {
      keyId: String(i),
      minute: g.minute,
      team: {
        id: String(g.team.id),
        ref: admin.firestore().doc(`teams/${g.team.id}`),
        name: g.team.name
      },
      scorer: {
        id: String(g.scorer.id),
        name: g.scorer.name
      },
      assist: g.assist ? { id: String(g.assist.id), name: g.assist.name } : null
    }
  })
  const bookings = fbMatch.bookings.map((b, i) => {
    const card: 'red' | 'yellow' = b.card === 'RED_CARD' ? 'red' : 'yellow'
    return {
      keyId: String(i),
      minute: b.minute,
      team: {
        id: String(b.team.id),
        ref: admin.firestore().doc(`teams/${b.team.id}`),
        name: b.team.name
      },
      player: {
        id: String(b.player.id),
        name: b.player.name
      },
      card
    }
  })
  const substitutions = fbMatch.substitutions.map((s, i) => {
    return {
      keyId: String(i),
      minute: s.minute,
      team: {
        id: String(s.team.id),
        ref: admin.firestore().doc(`teams/${s.team.id}`),
        name: s.team.name
      },
      outPlayer: {
        id: String(s.playerOut.id),
        name: s.playerOut.name
      },
      inPlayer: {
        id: String(s.playerIn.id),
        name: s.playerIn.name
      }
    }
  })
  return {
    id: String(fbMatch.id),
    homeLineup,
    homeBench,
    awayLineup,
    awayBench,
    goals,
    bookings,
    substitutions,
    lastUpdated: fbMatch.lastUpdated
  }
}

export const makeForReport = (fbMatch: FbMatch): ForReport => {
  const inPlayerIds = fbMatch.substitutions.map((s) => s.playerIn.id)
  const homelineup: ReportItem[] = fbMatch.homeTeam.lineup.map((l) => {
    return {
      id: String(l.id),
      player: {
        id: String(l.id),
        name: l.name
      },
      position: convertPosition(l.position),
      shirtNumber: l.shirtNumber,
      point: '6.0',
      text: '',
      order: 0
    }
  })
  const homeInPlayers: ReportItem[] = fbMatch.homeTeam.bench.flatMap((b) => {
    if (!inPlayerIds.includes(b.id)) return []
    return {
      id: String(b.id),
      player: {
        id: String(b.id),
        name: b.name
      },
      position: convertPosition(b.position),
      shirtNumber: b.shirtNumber,
      point: '6.0',
      text: '',
      order: 0
    }
  })
  const homeCoach: ReportItem = {
    id: String(fbMatch.homeTeam.coach.id),
    player: {
      id: String(fbMatch.homeTeam.coach.id),
      name: fbMatch.homeTeam.coach.name
    },
    position: 'HC',
    shirtNumber: null,
    point: '6.0',
    text: '',
    order: 0
  }
  const homeTeamReportItems = homelineup
    .concat(homeInPlayers)
    .concat([homeCoach])
    .map((ri, i) => {
      return { ...ri, order: i + 1 }
    })

  const awaylineup: ReportItem[] = fbMatch.awayTeam.lineup.map((l) => {
    return {
      id: String(l.id),
      player: {
        id: String(l.id),
        name: l.name
      },
      position: convertPosition(l.position),
      shirtNumber: l.shirtNumber,
      point: '6.0',
      text: '',
      order: 0
    }
  })
  const awayInPlayers: ReportItem[] = fbMatch.awayTeam.bench.flatMap((b) => {
    if (!inPlayerIds.includes(b.id)) return []
    return {
      id: String(b.id),
      player: {
        id: String(b.id),
        name: b.name
      },
      position: convertPosition(b.position),
      shirtNumber: b.shirtNumber,
      point: '6.0',
      text: '',
      order: 0
    }
  })
  const awayCoach: ReportItem = {
    id: String(fbMatch.awayTeam.coach.id),
    player: {
      id: String(fbMatch.awayTeam.coach.id),
      name: fbMatch.awayTeam.coach.name
    },
    position: 'HC',
    shirtNumber: null,
    point: '6.0',
    text: '',
    order: 0
  }
  const awayTeamReportItems = awaylineup
    .concat(awayInPlayers)
    .concat([awayCoach])
    .map((ri, i) => {
      return { ...ri, order: i + 1 }
    })
  return {
    id: String(fbMatch.id),
    homeTeamReportItems,
    awayTeamReportItems,
    lastUpdated: fbMatch.lastUpdated
  }
}

const setMatches = async (competition: { id: number; collectionId: string; name: string }) => {
  const batch = admin.firestore().batch()
  const fbMatchInfos = await getMatchInfos(competition.id)
  for (const fbMatchInfo of fbMatchInfos) {
    if (fbMatchInfo.status === 'FINISHED') {
      const fbMatch = await getFbMatch(fbMatchInfo.id)
      const mRef = admin.firestore().doc(`matches/${fbMatchInfo.id}`).withConverter(matchConverter)
      const mSnapshot = await mRef.get()
      if (mSnapshot.data()?.lastUpdated !== fbMatchInfo.lastUpdated) {
        const match = makeMatch(fbMatch, competition)
        batch.set(mRef, match)
      }
      const mdRef = admin
        .firestore()
        .doc(`matches/${fbMatchInfo.id}/match-detail/${fbMatchInfo.id}`)
        .withConverter(matchDetailConverter)
      const mdSnapshot = await mdRef.get()
      if (!mdSnapshot.exists || mdSnapshot.data()?.lastUpdated !== fbMatchInfo.lastUpdated) {
        const matchDetail = makeMatchDetail(fbMatch)
        batch.set(mdRef, matchDetail)
      }
      const frRef = admin
        .firestore()
        .doc(`matches/${fbMatchInfo.id}/for-report/${fbMatchInfo.id}`)
        .withConverter(forReportConverter)
      const frSnapshot = await frRef.get()
      if (!frSnapshot.exists || frSnapshot.data()?.lastUpdated !== fbMatchInfo.lastUpdated) {
        const forReport = makeForReport(fbMatch)
        batch.set(frRef, forReport)
      }
    }
  }
  await batch.commit()
}

export const setBundesligaMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('3 */1 * * *')
  .onRun(async () => {
    const competition = competitionMap.get('Bundesliga')!
    await setMatches(competition)
    return null
  })

export const setChampionsLeagueMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('6 */1 * * *')
  .onRun(async () => {
    const competition = competitionMap.get('Champions-League')!
    await setMatches(competition)
    return null
  })

export const setJLeagueMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('9 */1 * * *')
  .onRun(async () => {
    const competition = competitionMap.get('J-League')!
    await setMatches(competition)
    return null
  })

export const setLaLigaMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('12 */1 * * *')
  .onRun(async () => {
    const competition = competitionMap.get('La-Liga')!

    await setMatches(competition)
    return null
  })

export const setLigue1Matches = functions
  .region('asia-northeast1')
  .pubsub.schedule('15 */1 * * *')
  .onRun(async () => {
    const competition = competitionMap.get('Ligue-1')!
    await setMatches(competition)
    return null
  })

export const setPremierLeagueMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('18 */1 * * *')
  .onRun(async () => {
    const competition = competitionMap.get('Premier-League')!
    await setMatches(competition)
    return null
  })

export const setSerieAMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('21 */1 * * *')
  .onRun(async () => {
    const competition = competitionMap.get('Serie-A')!
    await setMatches(competition)
    return null
  })

export const setWorldCupMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('24 */1 * * *')
  .onRun(async () => {
    const competition = competitionMap.get('World-Cup')!
    await setMatches(competition)
    return null
  })
