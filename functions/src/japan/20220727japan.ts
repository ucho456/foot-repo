import * as admin from 'firebase-admin'

/**
  
*/

/**
  
*/

const useJapanMatchData = () => {
  /** common */
  const lastUpdated = '2022-07-27'
  const japanTeam = {
    id: 'Japan',
    ref: admin.firestore().doc('teams/Japan'),
    name: '日本'
  }
  const japanLineup: Player[] = [
    { player: { id: '12', name: '谷 晃生' }, position: 'GK', shirtNumber: 12 },
    { player: { id: '25', name: '小池 龍太' }, position: 'DF', shirtNumber: 25 },
    { player: { id: '3', name: '谷口 彰悟' }, position: 'DF', shirtNumber: 3 },
    { player: { id: '5', name: '畠中 槙之輔' }, position: 'DF', shirtNumber: 5 },
    { player: { id: '19', name: '佐々木 翔' }, position: 'DF', shirtNumber: 19 },
    { player: { id: '26', name: '藤田 譲瑠チマ' }, position: 'MF', shirtNumber: 26 },
    { player: { id: '6', name: '岩田 智輝' }, position: 'MF', shirtNumber: 6 },
    { player: { id: '18', name: '水沼 宏太' }, position: 'MF', shirtNumber: 18 },
    { player: { id: '16', name: '相馬 勇紀' }, position: 'MF', shirtNumber: 16 },
    { player: { id: '9', name: '西村 拓真' }, position: 'FW', shirtNumber: 9 },
    { player: { id: '11', name: '町野 修斗' }, position: 'FW', shirtNumber: 11 }
  ]
  const japanSubstitutions: Player[] = [
    { player: { id: '17', name: '宮市 亮' }, position: 'FW', shirtNumber: 17 },
    { player: { id: '8', name: '森島 司' }, position: 'FW', shirtNumber: 8 },
    { player: { id: '14', name: '脇坂 泰斗' }, position: 'MF', shirtNumber: 14 },
    { player: { id: '15', name: '橋本 拳人' }, position: 'MF', shirtNumber: 15 },
    { player: { id: '21', name: '満田 誠' }, position: 'FW', shirtNumber: 21 }
  ]
  const japanBench: Player[] = [
    { player: { id: '1', name: '大迫 敬介' }, position: 'GK', shirtNumber: 1 },
    { player: { id: '23', name: '鈴木 彩艶' }, position: 'GK', shirtNumber: 23 },
    { player: { id: '2', name: '山根 視来' }, position: 'DF', shirtNumber: 2 },
    { player: { id: '13', name: '杉岡 大暉' }, position: 'DF', shirtNumber: 13 },
    { player: { id: '22', name: '荒木 隼人' }, position: 'DF', shirtNumber: 22 },
    { player: { id: '4', name: '中谷 進之介' }, position: 'DF', shirtNumber: 4 },
    { player: { id: '7', name: '野津田 岳人' }, position: 'MF', shirtNumber: 7 },
    { player: { id: '14', name: '脇坂 泰斗' }, position: 'MF', shirtNumber: 14 },
    { player: { id: '15', name: '橋本 拳人' }, position: 'MF', shirtNumber: 15 },
    { player: { id: '24', name: '大南 拓磨' }, position: 'MF', shirtNumber: 24 },
    { player: { id: '8', name: '森島 司' }, position: 'FW', shirtNumber: 8 },
    { player: { id: '20', name: '細谷 真大' }, position: 'FW', shirtNumber: 20 },
    { player: { id: '17', name: '宮市 亮' }, position: 'FW', shirtNumber: 17 },
    { player: { id: '10', name: '	岩崎 悠人' }, position: 'FW', shirtNumber: 10 },
    { player: { id: '21', name: '満田 誠' }, position: 'FW', shirtNumber: 21 }
  ]
  const japanCoach: Player[] = [
    { player: { id: '0', name: '森保 一' }, position: 'HC', shirtNumber: null }
  ]

  const enemyTeam = {
    id: 'Korea',
    ref: admin.firestore().doc('teams/Korea'),
    name: '韓国'
  }
  const enemyLineup: Player[] = [
    { player: { id: '23', name: 'チョ・ヒョヌ' }, position: 'GK', shirtNumber: 23 },
    { player: { id: '15', name: 'キム・ムンファン' }, position: 'DF', shirtNumber: 15 },
    { player: { id: '4', name: 'チョ・ユミン' }, position: 'DF', shirtNumber: 4 },
    { player: { id: '18', name: 'パク・ジス' }, position: 'DF', shirtNumber: 18 },
    { player: { id: '3', name: 'キム・ジンス' }, position: 'DF', shirtNumber: 3 },
    { player: { id: '22', name: 'クォン・チャンフン' }, position: 'MF', shirtNumber: 22 },
    { player: { id: '20', name: 'クォン・ギョンウォン' }, position: 'MF', shirtNumber: 20 },
    { player: { id: '10', name: 'キム・ジンギュ' }, position: 'MF', shirtNumber: 10 },
    { player: { id: '11', name: 'オム・ウォンサン' }, position: 'FW', shirtNumber: 11 },
    { player: { id: '9', name: 'チョ・ギュソン' }, position: 'FW', shirtNumber: 9 },
    { player: { id: '7', name: 'ナ・サンホ' }, position: 'FW', shirtNumber: 7 }
  ]
  const enemySubstitutions: Player[] = [
    { player: { id: '17', name: 'チョ・ヨンウク' }, position: 'FW', shirtNumber: 17 },
    { player: { id: '5', name: 'イ・ヨンジェ' }, position: 'MF', shirtNumber: 5 },
    { player: { id: '16', name: 'キム・ドンヒョン' }, position: 'MF', shirtNumber: 16 }
  ]
  const enemyBench: Player[] = [
    { player: { id: '1', name: 'キム・ドンジュン' }, position: 'GK', shirtNumber: 1 },
    { player: { id: '12', name: 'ソン・ボムグン' }, position: 'GK', shirtNumber: 12 },
    { player: { id: '2', name: 'ユン・ジョンギュ' }, position: 'DF', shirtNumber: 2 },
    { player: { id: '14', name: 'ホン・チョル' }, position: 'DF', shirtNumber: 14 },
    { player: { id: '19', name: 'イ・ジェイク' }, position: 'DF', shirtNumber: 19 },
    { player: { id: '24', name: 'キム・ジュソン' }, position: 'DF', shirtNumber: 24 },
    { player: { id: '5', name: 'イ・ヨンジェ' }, position: 'MF', shirtNumber: 5 },
    { player: { id: '8', name: 'ペク・スンホ' }, position: 'MF', shirtNumber: 8 },
    { player: { id: '13', name: 'ソン・ミンギュ' }, position: 'MF', shirtNumber: 13 },
    { player: { id: '16', name: 'キム・ドンヒョン' }, position: 'MF', shirtNumber: 16 },
    { player: { id: '23', name: 'コ・ヨンジュン' }, position: 'MF', shirtNumber: 23 },
    { player: { id: '25', name: 'イ・ギヒョク' }, position: 'MF', shirtNumber: 25 },
    { player: { id: '26', name: 'カン・ソンジン' }, position: 'MF', shirtNumber: 26 },
    { player: { id: '17', name: 'チョ・ヨンウク' }, position: 'FW', shirtNumber: 17 }
  ]
  const enemyCoach: Player[] = [
    { player: { id: '0', name: 'パウロ ベント' }, position: 'HC', shirtNumber: null }
  ]

  const matchId = '20220727japan'
  const match: Match = {
    id: matchId,
    season: '2022',
    jstDate: '2022-07-27',
    yearMonth: '2022-07',
    matchday: 1 /** all 1 */,
    status: 'FINISHED',
    stage: 'EAFF E-1フットボールチャンピオンシップ',
    venue: '豊田スタジアム',
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
      score: 3,
      penalty: null
    },
    /** FIFA Code https://ja.wikipedia.org/wiki/FIFA%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E4%B8%80%E8%A6%A7 */
    /** Flag https://freesozai.jp/itemList.php?category=nation_flag&page=index&type=sozai */
    awayTeam: {
      ...enemyTeam,
      shortName: 'KOR',
      imageUrl: 'https://freesozai.jp/sozai/nation_flag/ntf_125.svg',
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
        minute: 49,
        team: japanTeam,
        scorer: { id: '16', name: '相馬 勇紀' },
        assist: { id: '26', name: '藤田 譲瑠チマ' }
      },
      {
        keyId: '2',
        minute: 63,
        team: japanTeam,
        scorer: { id: '19', name: '佐々木 翔' },
        assist: { id: '16', name: '相馬 勇紀' }
      },
      {
        keyId: '3',
        minute: 72,
        team: japanTeam,
        scorer: { id: '11', name: '町野 修斗' },
        assist: { id: '25', name: '小池 龍太' }
      }
    ],
    bookings: [
      {
        keyId: '1',
        minute: 0,
        team: enemyTeam,
        player: { id: '', name: '' },
        card: 'yellow'
      }
    ],
    substitutions: [
      {
        keyId: '1',
        minute: 58,
        team: japanTeam,
        outPlayer: { id: '18', name: '水沼 宏太' },
        inPlayer: { id: '17', name: '宮市 亮' }
      },
      {
        keyId: '2',
        minute: 67,
        team: enemyTeam,
        outPlayer: { id: '18', name: 'パク・ジス' },
        inPlayer: { id: '17', name: 'チョ・ヨンウク' }
      },
      {
        keyId: '3',
        minute: 67,
        team: enemyTeam,
        outPlayer: { id: '22', name: 'クォン・チャンフン' },
        inPlayer: { id: '5', name: 'イ・ヨンジェ' }
      },
      {
        keyId: '4',
        minute: 77,
        team: japanTeam,
        outPlayer: { id: '17', name: '宮市 亮' },
        inPlayer: { id: '8', name: '森島 司' }
      },
      {
        keyId: '5',
        minute: 77,
        team: japanTeam,
        outPlayer: { id: '9', name: '西村 拓真' },
        inPlayer: { id: '14', name: '脇坂 泰斗' }
      },
      {
        keyId: '6',
        minute: 84,
        team: enemyTeam,
        outPlayer: { id: '10', name: 'キム・ジンギュ' },
        inPlayer: { id: '16', name: 'キム・ドンヒョン' }
      },
      {
        keyId: '7',
        minute: 86,
        team: japanTeam,
        outPlayer: { id: '26', name: '藤田 譲瑠チマ' },
        inPlayer: { id: '15', name: '橋本 拳人' }
      },
      {
        keyId: '8',
        minute: 86,
        team: japanTeam,
        outPlayer: { id: '16', name: '相馬 勇紀' },
        inPlayer: { id: '21', name: '満田 誠' }
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
