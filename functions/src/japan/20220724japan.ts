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
    { player: { id: '1', name: '大迫 敬介' }, position: 'GK', shirtNumber: 1 },
    { player: { id: '25', name: '小池 龍太' }, position: 'DF', shirtNumber: 25 },
    { player: { id: '22', name: '荒木 隼人' }, position: 'DF', shirtNumber: 22 },
    { player: { id: '4', name: '中谷 進之介' }, position: 'DF', shirtNumber: 4 },
    { player: { id: '19', name: '佐々木 翔' }, position: 'DF', shirtNumber: 19 },
    { player: { id: '7', name: '野津田 岳人' }, position: 'MF', shirtNumber: 7 },
    { player: { id: '14', name: '脇坂 泰斗' }, position: 'MF', shirtNumber: 14 },
    { player: { id: '15', name: '橋本 拳人' }, position: 'MF', shirtNumber: 15 },
    { player: { id: '8', name: '森島 司' }, position: 'FW', shirtNumber: 8 },
    { player: { id: '20', name: '細谷 真大' }, position: 'FW', shirtNumber: 20 },
    { player: { id: '17', name: '宮市 亮' }, position: 'FW', shirtNumber: 17 }
  ]
  const japanSubstitutions: Player[] = [
    { player: { id: '13', name: '杉岡 大暉' }, position: 'DF', shirtNumber: 13 },
    { player: { id: '11', name: '町野 修斗' }, position: 'FW', shirtNumber: 11 },
    { player: { id: '21', name: '満田 誠' }, position: 'FW', shirtNumber: 21 },
    { player: { id: '16', name: '相馬 勇紀' }, position: 'MF', shirtNumber: 16 },
    { player: { id: '9', name: '西村 拓真' }, position: 'FW', shirtNumber: 9 }
  ]
  const japanBench: Player[] = [
    { player: { id: '23', name: '鈴木 彩艶' }, position: 'GK', shirtNumber: 23 },
    { player: { id: '12', name: '谷 晃生' }, position: 'GK', shirtNumber: 12 },
    { player: { id: '3', name: '谷口 彰悟' }, position: 'DF', shirtNumber: 3 },
    { player: { id: '2', name: '山根 視来' }, position: 'DF', shirtNumber: 2 },
    { player: { id: '5', name: '畠中 槙之輔' }, position: 'DF', shirtNumber: 5 },
    { player: { id: '13', name: '杉岡 大暉' }, position: 'DF', shirtNumber: 13 },
    { player: { id: '6', name: '岩田 智輝' }, position: 'MF', shirtNumber: 6 },
    { player: { id: '18', name: '水沼 宏太' }, position: 'MF', shirtNumber: 18 },
    { player: { id: '16', name: '相馬 勇紀' }, position: 'MF', shirtNumber: 16 },
    { player: { id: '24', name: '大南 拓磨' }, position: 'MF', shirtNumber: 24 },
    { player: { id: '26', name: '藤田 譲瑠チマ' }, position: 'MF', shirtNumber: 26 },
    { player: { id: '9', name: '西村 拓真' }, position: 'FW', shirtNumber: 9 },
    { player: { id: '10', name: '	岩崎 悠人' }, position: 'FW', shirtNumber: 10 },
    { player: { id: '21', name: '満田 誠' }, position: 'FW', shirtNumber: 21 },
    { player: { id: '11', name: '町野 修斗' }, position: 'FW', shirtNumber: 11 }
  ]
  const japanCoach: Player[] = [
    { player: { id: '0', name: '森保 一' }, position: 'HC', shirtNumber: null }
  ]

  const enemyTeam = {
    id: 'China',
    ref: admin.firestore().doc('teams/China'),
    name: '中国'
  }
  const enemyLineup: Player[] = [
    { player: { id: '1', name: 'ハン・ジャチー' }, position: 'GK', shirtNumber: 1 },
    { player: { id: '3', name: 'ウー・シャオツン' }, position: 'DF', shirtNumber: 3 },
    { player: { id: '5', name: 'チュー・チェンジェ' }, position: 'DF', shirtNumber: 5 },
    { player: { id: '6', name: 'ティアス・ブラウニング' }, position: 'DF', shirtNumber: 6 },
    { player: { id: '16', name: 'ウェン・ジャパオ' }, position: 'DF', shirtNumber: 16 },
    { player: { id: '18', name: 'ハ・ユーポン' }, position: 'DF', shirtNumber: 18 },
    { player: { id: '20', name: 'ファン・ハオ' }, position: 'DF', shirtNumber: 20 },
    { player: { id: '8', name: 'ダイ・ウェイチュン' }, position: 'MF', shirtNumber: 8 },
    { player: { id: '19', name: 'ファン・ジャフェイ' }, position: 'MF', shirtNumber: 19 },
    { player: { id: '11', name: 'タン・ノン' }, position: 'FW', shirtNumber: 11 },
    { player: { id: '14', name: 'チェン・グォカン' }, position: 'FW', shirtNumber: 14 }
  ]
  const enemySubstitutions: Player[] = [
    { player: { id: '17', name: 'シュ・ハオフォン' }, position: 'DF', shirtNumber: 17 },
    { player: { id: '13', name: 'シュ・ユエ' }, position: 'MF', shirtNumber: 13 },
    { player: { id: '7', name: 'タオ・ジャンノン' }, position: 'FW', shirtNumber: 7 },
    { player: { id: '24', name: 'スー・シーハオ' }, position: 'DF', shirtNumber: 24 },
    { player: { id: '22', name: 'リウ・ジュルン' }, position: 'FW', shirtNumber: 22 }
  ]
  const enemyBench: Player[] = [
    { player: { id: '12', name: 'ボン・ボン' }, position: 'GK', shirtNumber: 12 },
    { player: { id: '25', name: 'ファン・ズーハオ' }, position: 'GK', shirtNumber: 25 },
    { player: { id: '2', name: 'シェンナー・イェリージャン' }, position: 'DF', shirtNumber: 2 },
    { player: { id: '4', name: 'ジャン・ションノン' }, position: 'DF', shirtNumber: 4 },
    { player: { id: '17', name: 'シュ・ハオフォン' }, position: 'DF', shirtNumber: 17 },
    { player: { id: '24', name: 'スー・シーハオ' }, position: 'DF', shirtNumber: 24 },
    { player: { id: '13', name: 'シュ・ユエ' }, position: 'MF', shirtNumber: 13 },
    { player: { id: '15', name: 'トゥディ・ディリーミティ' }, position: 'MF', shirtNumber: 15 },
    { player: { id: '23', name: 'リャン・シャオウェン' }, position: 'MF', shirtNumber: 23 },
    { player: { id: '7', name: 'タオ・ジャンノン' }, position: 'FW', shirtNumber: 7 },
    { player: { id: '21', name: 'ヤオ・シュチェン' }, position: 'FW', shirtNumber: 21 },
    { player: { id: '22', name: 'リウ・ジュルン' }, position: 'FW', shirtNumber: 22 },
    { player: { id: '26', name: 'リウ・ルオファン' }, position: 'FW', shirtNumber: 26 }
  ]
  const enemyCoach: Player[] = [
    { player: { id: '0', name: 'アレクサンダル・ヤンコビッチ' }, position: 'HC', shirtNumber: null }
  ]

  const matchId = '20220724japan'
  const match: Match = {
    id: matchId,
    season: '2022',
    jstDate: '2022-07-24',
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
      score: 0,
      penalty: null
    },
    /** FIFA Code https://ja.wikipedia.org/wiki/FIFA%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E4%B8%80%E8%A6%A7 */
    /** Flag https://freesozai.jp/itemList.php?category=nation_flag&page=index&type=sozai */
    awayTeam: {
      ...enemyTeam,
      shortName: 'CHN',
      imageUrl: 'https://freesozai.jp/sozai/nation_flag/ntf_127.svg',
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
    goals: [],
    bookings: [
      {
        keyId: '1',
        minute: 20,
        team: enemyTeam,
        player: { id: '18', name: 'ハ・ユーポン' },
        card: 'yellow'
      },
      {
        keyId: '2',
        minute: 49,
        team: enemyTeam,
        player: { id: '19', name: 'ファン・ジャフェイ' },
        card: 'yellow'
      }
    ],
    substitutions: [
      {
        keyId: '1',
        minute: 55,
        team: enemyTeam,
        outPlayer: { id: '16', name: 'ウェン・ジャパオ' },
        inPlayer: { id: '17', name: 'シュ・ハオフォン' }
      },
      {
        keyId: '2',
        minute: 62,
        team: japanTeam,
        outPlayer: { id: '19', name: '佐々木 翔' },
        inPlayer: { id: '13', name: '杉岡 大暉' }
      },
      {
        keyId: '3',
        minute: 62,
        team: japanTeam,
        outPlayer: { id: '20', name: '細谷 真大' },
        inPlayer: { id: '11', name: '町野 修斗' }
      },
      {
        keyId: '4',
        minute: 67,
        team: enemyTeam,
        outPlayer: { id: '19', name: 'ファン・ジャフェイ' },
        inPlayer: { id: '13', name: 'シュ・ユエ' }
      },
      {
        keyId: '5',
        minute: 67,
        team: enemyTeam,
        outPlayer: { id: '14', name: 'チェン・グォカン' },
        inPlayer: { id: '7', name: 'タオ・ジャンノン' }
      },
      {
        keyId: '6',
        minute: 69,
        team: japanTeam,
        outPlayer: { id: '17', name: '宮市 亮' },
        inPlayer: { id: '21', name: '満田 誠' }
      },
      {
        keyId: '7',
        minute: 79,
        team: enemyTeam,
        outPlayer: { id: '18', name: 'ハ・ユーポン' },
        inPlayer: { id: '24', name: 'スー・シーハオ' }
      },
      {
        keyId: '8',
        minute: 79,
        team: enemyTeam,
        outPlayer: { id: '20', name: 'ファン・ハオ' },
        inPlayer: { id: '22', name: 'リウ・ジュルン' }
      },
      {
        keyId: '9',
        minute: 81,
        team: japanTeam,
        outPlayer: { id: '8', name: '森島 司' },
        inPlayer: { id: '16', name: '相馬 勇紀' }
      },
      {
        keyId: '10',
        minute: 81,
        team: japanTeam,
        outPlayer: { id: '14', name: '脇坂 泰斗' },
        inPlayer: { id: '9', name: '西村 拓真' }
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
