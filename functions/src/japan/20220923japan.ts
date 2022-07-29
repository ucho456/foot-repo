import * as admin from 'firebase-admin'

/*
  { player: { id: '12', name: '谷 晃生' }, position: 'GK', shirtNumber: 12 },
*/

const useJapanMatchData = () => {
  /** common */
  const lastUpdated = '2022-07-29'
  const japanTeam = {
    id: 'Japan',
    ref: admin.firestore().doc('teams/Japan'),
    name: '日本'
  }
  const japanLineup: Player[] = []
  const japanSubstitutions: Player[] = []
  const japanBench: Player[] = []
  const japanCoach: Player[] = [
    { player: { id: '0', name: '森保 一' }, position: 'HC', shirtNumber: null }
  ]

  const enemyTeam = {
    id: 'America',
    ref: admin.firestore().doc('teams/America'),
    name: 'アメリカ'
  }
  const enemyLineup: Player[] = []
  const enemySubstitutions: Player[] = []
  const enemyBench: Player[] = []
  const enemyCoach: Player[] = []

  const matchId = '20220923japan'
  const match: Match = {
    id: matchId,
    season: '2022',
    jstDate: '2022-09-23',
    yearMonth: '2022-09',
    matchday: 1 /** all 1 */,
    status: 'SCHEDULED',
    stage: '親善試合',
    venue: '',
    teamIds: ['Japan'],
    competition: {
      id: 'Japan',
      ref: admin.firestore().doc('competition/Japan'),
      name: '日本代表戦',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg'
    },
    homeTeam: {
      ...japanTeam,
      shortName: 'JPN',
      imageUrl: 'https://freesozai.jp/sozai/nation_flag/ntf_131.svg',
      score: null,
      penalty: null
    },
    /** FIFA Code https://ja.wikipedia.org/wiki/FIFA%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E4%B8%80%E8%A6%A7 */
    /** Flag https://freesozai.jp/itemList.php?category=nation_flag&page=index&type=sozai */
    awayTeam: {
      ...enemyTeam,
      shortName: 'USA',
      imageUrl: 'https://freesozai.jp/sozai/nation_flag/ntf_401.svg',
      score: null,
      penalty: null
    },
    lastUpdated,
    promptUpdateTime: admin.firestore.Timestamp.now()
  }
  const matchDetail: MatchDetail = {
    id: matchId,
    homeLineup: japanLineup,
    homeBench: japanBench.concat(japanCoach),
    awayLineup: enemyLineup,
    awayBench: enemyBench.concat(enemyCoach),
    goals: [
      // {
      //   keyId: '1',
      //   minute: 49,
      //   team: japanTeam,
      //   scorer: { id: '16', name: '相馬 勇紀' },
      //   assist: { id: '26', name: '藤田 譲瑠チマ' }
      // },
    ],
    bookings: [
      // {
      //   keyId: '1',
      //   minute: 0,
      //   team: enemyTeam,
      //   player: { id: '', name: '' },
      //   card: 'yellow'
      // }
    ],
    substitutions: [
      // {
      //   keyId: '1',
      //   minute: 58,
      //   team: japanTeam,
      //   outPlayer: { id: '18', name: '水沼 宏太' },
      //   inPlayer: { id: '17', name: '宮市 亮' }
      // },
    ],
    lastUpdated
  }
  const forReport: ForReport = {
    id: matchId,
    homeTeamReportItems: japanLineup
      .concat(japanSubstitutions)
      .concat(japanCoach)
      .map((p, i) => {
        return { id: p.player.id, ...p, point: '6.0', text: '', order: i + 1 }
      }),
    awayTeamReportItems: enemyLineup
      .concat(enemySubstitutions)
      .concat(enemyCoach)
      .map((p, i) => {
        return { id: p.player.id, ...p, point: '6.0', text: '', order: i + 1 }
      }),
    lastUpdated
  }

  return { forReport, match, matchDetail, matchId }
}

export default useJapanMatchData
