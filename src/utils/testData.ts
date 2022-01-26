/* 
  football-data.orgの有料プランを契約する前はこのファイルのデータを使用して開発する。
*/
export const testData: ResponseMatch = {
  head2head: {
    numberOfMatches: 1,
    totalGoals: 3,
    homeTeam: {
      wins: 0,
      draws: 0,
      losses: 1
    },
    awayTeam: {
      wins: 1,
      draws: 0,
      losses: 0
    }
  },
  match: {
    id: 204950,
    competition: {
      id: 2013,
      name: 'Série A'
    },
    season: {
      id: 15,
      startDate: '2018-04-14',
      endDate: '2018-12-02',
      currentMatchday: 25,
      availableStages: ['REGULAR_SEASON']
    },
    utcDate: '2018-08-13T23:00:00Z',
    status: 'FINISHED',
    minute: null,
    attendance: 14640,
    venue: 'Estadio Jornalista Mário Filho',
    matchday: 18,
    stage: 'REGULAR_SEASON',
    group: 'Regular Season',
    lastUpdated: '2018-08-19T20:01:26Z',
    homeTeam: {
      id: 1765,
      name: 'Fluminense FC',
      coach: {
        id: 73229,
        name: 'Marcelo Oliveira',
        countryOfBirth: 'Brazil',
        nationality: 'Brazil'
      },
      captain: {
        id: 1068,
        name: 'Gum',
        shirtNumber: 3
      },
      lineup: [
        {
          id: 1083,
          name: 'Jádson',
          position: 'Midfielder',
          shirtNumber: 16
        },
        {
          id: 1078,
          name: 'Junior Sornoza',
          position: 'Midfielder',
          shirtNumber: 10
        },
        {
          id: 1238,
          name: 'Digão',
          position: 'Defender',
          shirtNumber: 14
        },
        {
          id: 1066,
          name: 'Júlio César',
          position: 'Goalkeeper',
          shirtNumber: 22
        },
        {
          id: 1451,
          name: 'Dutra Júnior',
          position: 'Midfielder',
          shirtNumber: 11
        },
        {
          id: 1085,
          name: 'Airton',
          position: 'Midfielder',
          shirtNumber: 5
        },
        {
          id: 1068,
          name: 'Gum',
          position: 'Defender',
          shirtNumber: 3
        },
        {
          id: 1073,
          name: 'Gilberto Júnior',
          position: 'Defender',
          shirtNumber: 2
        },
        {
          id: 1088,
          name: 'Marcos Júnior',
          position: 'Attacker',
          shirtNumber: 35
        },
        {
          id: 1074,
          name: 'Ayrton Lucas',
          position: 'Defender',
          shirtNumber: 6
        },
        {
          id: 1077,
          name: 'Pedro Santos',
          position: 'Midfielder',
          shirtNumber: 9
        }
      ],
      bench: [
        {
          id: 2817,
          name: 'Bryan Cabezas',
          position: 'Attacker',
          shirtNumber: 8
        },
        {
          id: 1067,
          name: 'Rodolfo',
          position: 'Goalkeeper',
          shirtNumber: 39
        },
        {
          id: 42901,
          name: 'Luciano',
          position: 'Attacker',
          shirtNumber: 18
        },
        {
          id: 1075,
          name: 'Léo Morais',
          position: 'Defender',
          shirtNumber: 33
        },
        {
          id: 1087,
          name: 'Douglas',
          position: 'Midfielder',
          shirtNumber: 15
        },
        {
          id: 1091,
          name: 'Richard',
          position: 'Attacker',
          shirtNumber: 25
        },
        {
          id: 1094,
          name: 'João Carlos',
          position: 'Attacker',
          shirtNumber: 29
        },
        {
          id: 13604,
          name: 'Everaldo',
          position: 'Midfielder',
          shirtNumber: 37
        },
        {
          id: 1071,
          name: 'Frazan',
          position: 'Defender',
          shirtNumber: 13
        },
        {
          id: 1089,
          name: 'Matheus Alessandro',
          position: 'Attacker',
          shirtNumber: 28
        },
        {
          id: 11179,
          name: 'Joao Vitor',
          position: 'Defender',
          shirtNumber: 40
        },
        {
          id: 1081,
          name: 'Roger Ibanez',
          position: 'Midfielder',
          shirtNumber: 41
        }
      ]
    },
    awayTeam: {
      id: 6684,
      name: 'SC Internacional',
      coach: {
        id: 11147,
        name: 'Odair Hellmann',
        countryOfBirth: 'Brazil',
        nationality: 'Brazil'
      },
      captain: {
        id: 1575,
        name: 'Rodrigo Dourado',
        shirtNumber: 13
      },
      lineup: [
        {
          id: 22360,
          name: 'Jonatan Alvez',
          position: 'Attacker',
          shirtNumber: 86
        },
        {
          id: 1588,
          name: 'Nicolás López',
          position: 'Attacker',
          shirtNumber: 7
        },
        {
          id: 1572,
          name: 'Rodrigo Moledo',
          position: 'Defender',
          shirtNumber: 4
        },
        {
          id: 1562,
          name: 'Marcelo Lomba',
          position: 'Goalkeeper',
          shirtNumber: 12
        },
        {
          id: 1573,
          name: 'Fabiano Leismann',
          position: 'Defender',
          shirtNumber: 18
        },
        {
          id: 1580,
          name: 'Edenilson',
          position: 'Midfielder',
          shirtNumber: 8
        },
        {
          id: 1575,
          name: 'Rodrigo Dourado',
          position: 'Midfielder',
          shirtNumber: 13
        },
        {
          id: 1567,
          name: 'Víctor Cuesta',
          position: 'Defender',
          shirtNumber: 15
        },
        {
          id: 1590,
          name: 'William Pottker',
          position: 'Attacker',
          shirtNumber: 99
        },
        {
          id: 1582,
          name: 'Patrick Nascimento',
          position: 'Midfielder',
          shirtNumber: 88
        },
        {
          id: 1566,
          name: 'Iago',
          position: 'Defender',
          shirtNumber: 28
        }
      ],
      bench: [
        {
          id: 1578,
          name: "Andrés D'Alessandro",
          position: 'Midfielder',
          shirtNumber: 10
        },
        {
          id: 1179,
          name: 'Emerson Santos',
          position: 'Defender',
          shirtNumber: 20
        },
        {
          id: 1581,
          name: 'Camilo',
          position: 'Midfielder',
          shirtNumber: 21
        },
        {
          id: 1564,
          name: 'Uendel',
          position: 'Defender',
          shirtNumber: 6
        },
        {
          id: 1594,
          name: 'Lucca',
          position: 'Attacker',
          shirtNumber: 19
        },
        {
          id: 1570,
          name: 'Gabriel Dias',
          position: 'Defender',
          shirtNumber: 30
        },
        {
          id: 1593,
          name: 'Rossi',
          position: 'Attacker',
          shirtNumber: 22
        },
        {
          id: 1565,
          name: 'William Klaus',
          position: 'Defender',
          shirtNumber: 44
        },
        {
          id: 1584,
          name: 'Luis Eduardo Dudu',
          position: 'Midfielder',
          shirtNumber: 2
        },
        {
          id: 1563,
          name: 'Daniel',
          position: 'Goalkeeper',
          shirtNumber: 42
        },
        {
          id: 1579,
          name: 'Juan',
          position: 'Midfielder',
          shirtNumber: 47
        },
        {
          id: 1585,
          name: 'Brenner',
          position: 'Midfielder',
          shirtNumber: 48
        }
      ]
    },
    score: {
      winner: 'AWAY_TEAM',
      duration: 'REGULAR',
      fullTime: {
        homeTeam: 0,
        awayTeam: 3
      },
      halfTime: {
        homeTeam: 0,
        awayTeam: 3
      },
      extraTime: {
        homeTeam: null,
        awayTeam: null
      },
      penalties: {
        homeTeam: null,
        awayTeam: null
      }
    },
    goals: [
      {
        minute: 23,
        extraTime: null,
        type: 'REGULAR',
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        scorer: {
          id: 1588,
          name: 'Nicolás López'
        },
        assist: {
          id: 1575,
          name: 'Rodrigo Dourado'
        }
      },
      {
        minute: 39,
        extraTime: null,
        type: 'REGULAR',
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        scorer: {
          id: 22360,
          name: 'Jonatan Alvez'
        },
        assist: {
          id: 1566,
          name: 'Iago'
        }
      },
      {
        minute: 45,
        extraTime: 1,
        type: 'REGULAR',
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        scorer: {
          id: 1588,
          name: 'Nicolás López'
        },
        assist: null
      }
    ],
    bookings: [
      {
        minute: 3,
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        player: {
          id: 1567,
          name: 'Víctor Cuesta'
        },
        card: 'YELLOW_CARD'
      },
      {
        minute: 27,
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        player: {
          id: 22360,
          name: 'Jonatan Alvez'
        },
        card: 'YELLOW_CARD'
      },
      {
        minute: 28,
        team: {
          id: 1765,
          name: 'Fluminense FC'
        },
        player: {
          id: 1451,
          name: 'Dutra Júnior'
        },
        card: 'YELLOW_CARD'
      },
      {
        minute: 43,
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        player: {
          id: 1580,
          name: 'Edenilson'
        },
        card: 'YELLOW_CARD'
      },
      {
        minute: 90,
        team: {
          id: 1765,
          name: 'Fluminense FC'
        },
        player: {
          id: 1089,
          name: 'Matheus Alessandro'
        },
        card: 'YELLOW_CARD'
      },
      {
        minute: 90,
        team: {
          id: 1765,
          name: 'Fluminense FC'
        },
        player: {
          id: 1078,
          name: 'Junior Sornoza'
        },
        card: 'YELLOW_CARD'
      }
    ],
    substitutions: [
      {
        minute: 46,
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        playerOut: {
          id: 1588,
          name: 'Nicolás López'
        },
        playerIn: {
          id: 1578,
          name: "Andrés D'Alessandro"
        }
      },
      {
        minute: 46,
        team: {
          id: 1765,
          name: 'Fluminense FC'
        },
        playerOut: {
          id: 1088,
          name: 'Marcos Júnior'
        },
        playerIn: {
          id: 1089,
          name: 'Matheus Alessandro'
        }
      },
      {
        minute: 53,
        team: {
          id: 1765,
          name: 'Fluminense FC'
        },
        playerOut: {
          id: 1085,
          name: 'Airton'
        },
        playerIn: {
          id: 42901,
          name: 'Luciano'
        }
      },
      {
        minute: 65,
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        playerOut: {
          id: 22360,
          name: 'Jonatan Alvez'
        },
        playerIn: {
          id: 1593,
          name: 'Rossi'
        }
      },
      {
        minute: 73,
        team: {
          id: 1765,
          name: 'Fluminense FC'
        },
        playerOut: {
          id: 1451,
          name: 'Dutra Júnior'
        },
        playerIn: {
          id: 13604,
          name: 'Everaldo'
        }
      },
      {
        minute: 78,
        team: {
          id: 6684,
          name: 'SC Internacional'
        },
        playerOut: {
          id: 1573,
          name: 'Fabiano Leismann'
        },
        playerIn: {
          id: 1584,
          name: 'Luis Eduardo Dudu'
        }
      }
    ],
    referees: [
      {
        id: 11143,
        name: 'Savio Pereira',
        nationality: null
      },
      {
        id: 11144,
        name: 'Daniel Henrique da Silva Andrade',
        nationality: null
      },
      {
        id: 11145,
        name: 'Ciro Chaban Junqueira',
        nationality: null
      },
      {
        id: 18752,
        name: 'Lehi Sousa Silva',
        nationality: null
      }
    ]
  }
}

export const reports = [
  {
    id: 1,
    title: 'ダービーマッチ！！！',
    userId: 1,
    guestName: '',
    matchId: 1,
    competitionId: 1,
    competitionName: 'Jリーグ',
    seasonId: 1,
    seasonStartDate: '2021-12-12',
    seasonEndDate: '2022-12-12',
    utcDate: '2018-08-13T23:00:00Z',
    japanDate: '2018-08-13T23:00:00Z',
    selectTeam: 'Both teams',
    homeTeamId: 1,
    homeTeamName: 'ガンバ大阪',
    homeTeamScore: 2,
    homeTeamReportItems: [
      {
        id: 1,
        homeAway: 'home',
        playerName: 'あいうえお',
        position: 'GK',
        positionId: 1,
        shirtNumber: 1,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 2,
        homeAway: 'home',
        playerName: 'かきくけこ',
        position: 'DF',
        positionId: 2,
        shirtNumber: 2,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 3,
        homeAway: 'home',
        playerName: 'さしすせそ',
        position: 'MF',
        positionId: 3,
        shirtNumber: 3,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 4,
        homeAway: 'home',
        playerName: 'たちつてと',
        position: 'FW',
        positionId: 4,
        shirtNumber: 4,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 5,
        homeAway: 'home',
        playerName: 'なにぬねの',
        position: 'HC',
        positionId: 5,
        shirtNumber: 5,
        point: '7.0',
        text: '良かった'
      }
    ],
    awayTeamId: 2,
    awayTeamName: '浦和レッズ',
    awayTeamScore: 1,
    awayTeamReportItems: [
      {
        id: 101,
        homeAway: 'away',
        playerName: 'はひふへほ',
        position: 'GK',
        positionId: 1,
        shirtNumber: 1,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 102,
        homeAway: 'away',
        playerName: 'かきくけこ',
        position: 'DF',
        positionId: 2,
        shirtNumber: 2,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 103,
        homeAway: 'away',
        playerName: 'さしすせそ',
        position: 'MF',
        positionId: 3,
        shirtNumber: 3,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 104,
        homeAway: 'away',
        playerName: 'たちつてと',
        position: 'FW',
        positionId: 4,
        shirtNumber: 4,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 105,
        homeAway: 'away',
        playerName: 'なにぬねの',
        position: 'HC',
        positionId: 5,
        shirtNumber: 5,
        point: '7.0',
        text: '良かった'
      }
    ],
    summary: '総評だよ',
    mom: 'はひふへほ'
  },
  {
    id: 2,
    title: 'ダービーマッチ！！！',
    userId: 2,
    guestName: '',
    matchId: 1,
    competitionId: 1,
    competitionName: 'Jリーグ',
    seasonId: 1,
    seasonStartDate: '2021-12-12',
    seasonEndDate: '2022-12-12',
    utcDate: '2018-08-13T23:00:00Z',
    japanDate: '2018-08-13T23:00:00Z',
    selectTeam: 'Both teams',
    homeTeamId: 1,
    homeTeamName: 'ガンバ大阪',
    homeTeamScore: 2,
    homeTeamReportItems: [
      {
        id: 1,
        homeAway: 'home',
        playerName: 'あいうえお',
        position: 'GK',
        positionId: 1,
        shirtNumber: 1,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 2,
        homeAway: 'home',
        playerName: 'かきくけこ',
        position: 'DF',
        positionId: 2,
        shirtNumber: 2,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 3,
        homeAway: 'home',
        playerName: 'さしすせそ',
        position: 'MF',
        positionId: 3,
        shirtNumber: 3,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 4,
        homeAway: 'home',
        playerName: 'たちつてと',
        position: 'FW',
        positionId: 4,
        shirtNumber: 4,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 5,
        homeAway: 'home',
        playerName: 'なにぬねの',
        position: 'HC',
        positionId: 5,
        shirtNumber: 5,
        point: '7.0',
        text: '良かった'
      }
    ],
    awayTeamId: 2,
    awayTeamName: '浦和レッズ',
    awayTeamScore: 1,
    awayTeamReportItems: [
      {
        id: 101,
        homeAway: 'away',
        playerName: 'はひふへほ',
        position: 'GK',
        positionId: 1,
        shirtNumber: 1,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 102,
        homeAway: 'away',
        playerName: 'かきくけこ',
        position: 'DF',
        positionId: 2,
        shirtNumber: 2,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 103,
        homeAway: 'away',
        playerName: 'さしすせそ',
        position: 'MF',
        positionId: 3,
        shirtNumber: 3,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 104,
        homeAway: 'away',
        playerName: 'たちつてと',
        position: 'FW',
        positionId: 4,
        shirtNumber: 4,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 105,
        homeAway: 'away',
        playerName: 'なにぬねの',
        position: 'HC',
        positionId: 5,
        shirtNumber: 5,
        point: '7.0',
        text: '良かった'
      }
    ],
    summary: '総評だよ',
    mom: 'はひふへほ'
  },
  {
    id: 3,
    title: 'ダービーマッチ！！！',
    userId: 0,
    guestName: 'ゲスト太郎',
    matchId: 1,
    competitionId: 1,
    competitionName: 'Jリーグ',
    seasonId: 1,
    seasonStartDate: '2021-12-12',
    seasonEndDate: '2022-12-12',
    utcDate: '2018-08-13T23:00:00Z',
    japanDate: '2018-08-13T23:00:00Z',
    selectTeam: 'Both teams',
    homeTeamId: 1,
    homeTeamName: 'ガンバ大阪',
    homeTeamScore: 2,
    homeTeamReportItems: [
      {
        id: 1,
        homeAway: 'home',
        playerName: 'あいうえお',
        position: 'GK',
        positionId: 1,
        shirtNumber: 1,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 2,
        homeAway: 'home',
        playerName: 'かきくけこ',
        position: 'DF',
        positionId: 2,
        shirtNumber: 2,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 3,
        homeAway: 'home',
        playerName: 'さしすせそ',
        position: 'MF',
        positionId: 3,
        shirtNumber: 3,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 4,
        homeAway: 'home',
        playerName: 'たちつてと',
        position: 'FW',
        positionId: 4,
        shirtNumber: 4,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 5,
        homeAway: 'home',
        playerName: 'なにぬねの',
        position: 'HC',
        positionId: 5,
        shirtNumber: 5,
        point: '7.0',
        text: '良かった'
      }
    ],
    awayTeamId: 2,
    awayTeamName: '浦和レッズ',
    awayTeamScore: 1,
    awayTeamReportItems: [
      {
        id: 101,
        homeAway: 'away',
        playerName: 'はひふへほ',
        position: 'GK',
        positionId: 1,
        shirtNumber: 1,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 102,
        homeAway: 'away',
        playerName: 'かきくけこ',
        position: 'DF',
        positionId: 2,
        shirtNumber: 2,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 103,
        homeAway: 'away',
        playerName: 'さしすせそ',
        position: 'MF',
        positionId: 3,
        shirtNumber: 3,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 104,
        homeAway: 'away',
        playerName: 'たちつてと',
        position: 'FW',
        positionId: 4,
        shirtNumber: 4,
        point: '7.0',
        text: '良かった'
      },
      {
        id: 105,
        homeAway: 'away',
        playerName: 'なにぬねの',
        position: 'HC',
        positionId: 5,
        shirtNumber: 5,
        point: '7.0',
        text: '良かった'
      }
    ],
    summary: '総評だよ',
    mom: 'はひふへほ'
  }
] as Report[]

export const users = [
  {
    id: 1,
    name: '鈴木太郎',
    imageUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
  },
  {
    id: 2,
    name: '画像無し',
    imageUrl: ''
  }
] as User[]
