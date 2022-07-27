import * as admin from 'firebase-admin'

const useJapanMatchData = () => {
  /** common */
  const lastUpdated = '2022-07-27'
  const japanTeam = {
    id: 'Japan',
    ref: admin.firestore().doc('teams/Japan'),
    name: '日本'
  }
  const japanLineup: Player[] = [
    { player: { id: '23', name: '鈴木 彩艶' }, position: 'GK', shirtNumber: 23 },
    { player: { id: '2', name: '山根 視来' }, position: 'DF', shirtNumber: 2 },
    { player: { id: '3', name: '谷口 彰悟' }, position: 'DF', shirtNumber: 3 },
    { player: { id: '5', name: '畠中 槙之輔' }, position: 'DF', shirtNumber: 5 },
    { player: { id: '13', name: '杉岡 大暉' }, position: 'DF', shirtNumber: 13 },
    { player: { id: '6', name: '岩田 智輝' }, position: 'MF', shirtNumber: 6 },
    { player: { id: '18', name: '水沼 宏太' }, position: 'MF', shirtNumber: 18 },
    { player: { id: '26', name: '藤田 譲瑠チマ' }, position: 'MF', shirtNumber: 26 },
    { player: { id: '9', name: '西村 拓真' }, position: 'FW', shirtNumber: 9 },
    { player: { id: '11', name: '町野 修斗' }, position: 'FW', shirtNumber: 11 },
    { player: { id: '16', name: '相馬 勇紀' }, position: 'FW', shirtNumber: 16 }
  ]
  const japanSubstitutions: Player[] = [
    { player: { id: '4', name: '中谷 進之介' }, position: 'DF', shirtNumber: 4 },
    { player: { id: '14', name: '脇坂 泰斗' }, position: 'MF', shirtNumber: 14 },
    { player: { id: '10', name: '岩崎 悠人' }, position: 'FW', shirtNumber: 10 },
    { player: { id: '17', name: '宮市 亮' }, position: 'FW', shirtNumber: 17 },
    { player: { id: '24', name: '大南 拓磨' }, position: 'MF', shirtNumber: 24 }
  ]
  const japanBench: Player[] = [
    { player: { id: '1', name: '大迫 敬介' }, position: 'GK', shirtNumber: 1 },
    { player: { id: '12', name: '谷 晃生' }, position: 'GK', shirtNumber: 12 },
    { player: { id: '4', name: '中谷 進之介' }, position: 'DF', shirtNumber: 4 },
    { player: { id: '19', name: '佐々木 翔' }, position: 'DF', shirtNumber: 19 },
    { player: { id: '22', name: '荒木 隼人' }, position: 'DF', shirtNumber: 22 },
    { player: { id: '23', name: '小池 龍太' }, position: 'DF', shirtNumber: 23 },
    { player: { id: '7', name: '野津田 岳人' }, position: 'MF', shirtNumber: 7 },
    { player: { id: '8', name: '森島 司' }, position: 'MF', shirtNumber: 8 },
    { player: { id: '14', name: '脇坂 泰斗' }, position: 'MF', shirtNumber: 14 },
    { player: { id: '15', name: '橋本 拳人' }, position: 'MF', shirtNumber: 15 },
    { player: { id: '24', name: '大南 拓磨' }, position: 'MF', shirtNumber: 24 },
    { player: { id: '10', name: '岩崎 悠人' }, position: 'FW', shirtNumber: 10 },
    { player: { id: '17', name: '宮市 亮' }, position: 'FW', shirtNumber: 17 },
    { player: { id: '20', name: '	細谷 真大' }, position: 'FW', shirtNumber: 20 },
    { player: { id: '21', name: '満田 誠' }, position: 'FW', shirtNumber: 21 }
  ]
  const japanCoach: Player[] = [
    { player: { id: '0', name: '森保 一' }, position: 'HC', shirtNumber: null }
  ]

  const enemyTeam = {
    id: 'HongKong',
    ref: admin.firestore().doc('teams/HongKong'),
    name: '香港'
  }
  const enemyLineup: Player[] = [
    { player: { id: '18', name: 'パウロ・セザール' }, position: 'GK', shirtNumber: 18 },
    { player: { id: '5', name: 'ツェ・シーンカケウン' }, position: 'DF', shirtNumber: 5 },
    { player: { id: '7', name: 'ロー・ツチュン' }, position: 'DF', shirtNumber: 7 },
    { player: { id: '12', name: 'リャン・クウォンチュン' }, position: 'DF', shirtNumber: 12 },
    { player: { id: '21', name: 'ユエ・ツェナム' }, position: 'DF', shirtNumber: 21 },
    { player: { id: '22', name: 'ヴァス・ヌニェス' }, position: 'DF', shirtNumber: 22 },
    { player: { id: '8', name: 'ウー・チュンミン' }, position: 'MF', shirtNumber: 8 },
    { player: { id: '10', name: 'ウォン・ワイ' }, position: 'MF', shirtNumber: 10 },
    { player: { id: '24', name: 'ジュー・インジー' }, position: 'MF', shirtNumber: 24 },
    { player: { id: '9', name: 'マット・オア' }, position: 'FW', shirtNumber: 9 },
    { player: { id: '23', name: 'スン・ミンヒム' }, position: 'FW', shirtNumber: 23 }
  ]
  const enemySubstitutions: Player[] = [
    { player: { id: '3', name: 'ツイ・ワンキット' }, position: 'DF', shirtNumber: 3 },
    { player: { id: '6', name: 'タン・タンチュンロク' }, position: 'MF', shirtNumber: 6 },
    { player: { id: '17', name: 'ジャハーンギール・カーン' }, position: 'FW', shirtNumber: 17 },
    { player: { id: '11', name: 'チェン・チンルン' }, position: 'MF', shirtNumber: 11 },
    { player: { id: '25', name: '市川 聡悟' }, position: 'MF', shirtNumber: 25 }
  ]
  const enemyBench: Player[] = [
    { player: { id: '1', name: 'ンー・ワイヒム' }, position: 'GK', shirtNumber: 1 },
    { player: { id: '19', name: 'チャン・カホ' }, position: 'GK', shirtNumber: 19 },
    { player: { id: '3', name: 'ツイ・ワンキット' }, position: 'DF', shirtNumber: 3 },
    { player: { id: '4', name: 'トーマス・マロネージ' }, position: 'DF', shirtNumber: 4 },
    { player: { id: '13', name: 'ラウ・ホクミン' }, position: 'DF', shirtNumber: 13 },
    { player: { id: '20', name: '	イウ・ホーミン' }, position: 'DF', shirtNumber: 20 },
    { player: { id: '26', name: 'ツァン・イーハン・エリソン' }, position: 'DF', shirtNumber: 26 },
    { player: { id: '6', name: 'タン・タンチュンロク' }, position: 'MF', shirtNumber: 6 },
    { player: { id: '11', name: 'チェン・チンルン' }, position: 'MF', shirtNumber: 11 },
    { player: { id: '25', name: '市川 聡悟' }, position: 'MF', shirtNumber: 25 },
    { player: { id: '16', name: 'チェン・シウクワン' }, position: 'FW', shirtNumber: 16 },
    { player: { id: '17', name: 'ジャハーンギール・カーン' }, position: 'FW', shirtNumber: 17 }
  ]
  const enemyCoach: Player[] = [
    { player: { id: '0', name: 'ヨルン・アンデルセン' }, position: 'HC', shirtNumber: null }
  ]

  const matchId = '20220719japan'
  const match: Match = {
    id: matchId,
    season: '2022',
    jstDate: '2022-07-19',
    yearMonth: '2022-07',
    matchday: 1 /** all 1 */,
    status: 'FINISHED',
    stage: 'EAFF E-1フットボールチャンピオンシップ',
    venue: 'カシマスタジアム',
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
      score: 6,
      penalty: null
    },
    awayTeam: {
      ...enemyTeam,
      shortName: 'HKG',
      imageUrl: 'https://freesozai.jp/sozai/nation_flag/ntf_151.svg',
      score: 0,
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
      {
        keyId: '1',
        minute: 2,
        team: japanTeam,
        scorer: { id: '16', name: '相馬 勇紀' },
        assist: null
      },
      {
        keyId: '2',
        minute: 20,
        team: japanTeam,
        scorer: { id: '11', name: '町野 修斗' },
        assist: { id: '2', name: '山根 視来' }
      },
      {
        keyId: '3',
        minute: 22,
        team: japanTeam,
        scorer: { id: '9', name: '西村 拓真' },
        assist: { id: '16', name: '相馬 勇紀' }
      },
      {
        keyId: '4',
        minute: 40,
        team: japanTeam,
        scorer: { id: '9', name: '西村 拓真' },
        assist: { id: '26', name: '藤田 譲瑠チマ' }
      },
      {
        keyId: '5',
        minute: 55,
        team: japanTeam,
        scorer: { id: '16', name: '相馬 勇紀' },
        assist: { id: '2', name: '山根 視来' }
      },
      {
        keyId: '6',
        minute: 57,
        team: japanTeam,
        scorer: { id: '11', name: '町野 修斗' },
        assist: null
      }
    ],
    bookings: [
      {
        keyId: '1',
        minute: 82,
        team: enemyTeam,
        player: { id: '21', name: 'ユエ・ツェナム' },
        card: 'yellow'
      }
    ],
    substitutions: [
      {
        keyId: '1',
        minute: 46,
        team: enemyTeam,
        outPlayer: { id: '23', name: 'スン・ミンヒム' },
        inPlayer: { id: '17', name: 'ジャハーンギール・カーン' }
      },
      {
        keyId: '2',
        minute: 46,
        team: enemyTeam,
        outPlayer: { id: '24', name: 'ジュー・インジー' },
        inPlayer: { id: '6', name: 'タン・タンチュンロク' }
      },
      {
        keyId: '3',
        minute: 46,
        team: enemyTeam,
        outPlayer: { id: '12', name: 'リャン・クウォンチュン' },
        inPlayer: { id: '3', name: 'ツイ・ワンキット' }
      },
      {
        keyId: '4',
        minute: 46,
        team: japanTeam,
        outPlayer: { id: '3', name: '谷口 彰悟' },
        inPlayer: { id: '4', name: '中谷 進之介' }
      },
      {
        keyId: '5',
        minute: 65,
        team: japanTeam,
        outPlayer: { id: '16', name: '相馬 勇紀' },
        inPlayer: { id: '17', name: '宮市 亮' }
      },
      {
        keyId: '6',
        minute: 65,
        team: japanTeam,
        outPlayer: { id: '9', name: '西村 拓真' },
        inPlayer: { id: '10', name: '岩崎 悠人' }
      },
      {
        keyId: '7',
        minute: 65,
        team: japanTeam,
        outPlayer: { id: '18', name: '水沼 宏太' },
        inPlayer: { id: '14', name: '脇坂 泰斗' }
      },
      {
        keyId: '8',
        minute: 74,
        team: japanTeam,
        outPlayer: { id: '2', name: '山根 視来' },
        inPlayer: { id: '24', name: '大南 拓磨' }
      },
      {
        keyId: '9',
        minute: 77,
        team: enemyTeam,
        outPlayer: { id: '7', name: 'ロー・ツチュン' },
        inPlayer: { id: '25', name: '市川 聡悟' }
      },
      {
        keyId: '10',
        minute: 78,
        team: enemyTeam,
        outPlayer: { id: '10', name: 'ウォン・ワイ' },
        inPlayer: { id: '11', name: 'チェン・チンルン' }
      }
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
