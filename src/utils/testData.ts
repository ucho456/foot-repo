/*
  今後の方針
  userのauthをできるようにする。
  デプロイしたい。
  reportのセキュリティールールを作る。
  readから実装していく。
  フィールドの機密レベルを統一する
  セキュリティールールでの検証ができないので配列で持ちたいデータはなるべくサブコレクションにできないか検証する。(ReportItemsはサブコレクションにする)
  flgは持たないようにする。代わりに別のドキュメントに分ける。(例: 普通のusers, 退会済みのusers)
  リファレンスについて86ページ
  ドキュメント同士の関連を表現するのは原則リファレンス型
  非正規化されたフィールドの更新例91ページ
  https://zenn.dev/tentel/articles/ea7d5c03e68e6d142d98 クエリの参考
  https://webcache.googleusercontent.com/search?q=cache:gYdzhsUF-SoJ:https://zenn.dev/yucatio/articles/5427eede6c3e34+&cd=5&hl=ja&ct=clnk&gl=jp セキュリティールール
  https://blog.mogmet.com/firestore-implemation-security-rule-logic-introduce/ 設計書簡
  https://lyohe.github.io/post/2021-10-27-firestore-getting-started/
*/
/*
  user = {

  }
*/
/*
  reports = {
    title titleだとツールチップで出てしまうのでプロパティ名を変更する。
    user: {
      ref
      name
      imageUrl
    }
    guest
    matchRef 試合のデータ詳細ページでmatchRefを持つreportItemsを取得？
    competitionId 検索用
    competitionName
    date
    teamIds: [homeTeamId, awayTeamId] 検索用
    homeTeamName
    homeTeamScore
    awayTeamName
    awayTeamScore
    summary
    momId
    like
    createdAt
    likes: subCollection 
    comments: subCollection
    homeTeamReportItems: subCollection 
    awayTeamReportItems: subCollection 
  }
  ・検索ボックス曖昧検索ができないので諦める。
  ・title, likeの更新の必要があるがセキュリティールールよりクエリが単純になる事を優先する。
  ・reportDetailは現状summary, momIdしかないので不要。summaryも文字制限してしまえばそこまで大きなデータにはならない筈。
  ・userは1試合につき1つのレポートしか書けない。レポートがある場合は編集画面に飛ぶようにする。
  ・関連記事userの記事、同じ試合の記事なども表示したいな。

      likes = {
        userRef
      }
      ・userRefを持っておいてexist()で無かったらlikeを1足してuserRefを追加。あったらlikeを減らしてuserRefを削除？

      comments = {
        user: {
          ref
          name
          imageUrl
        }
        text
      }

      homeTeam&awayTeam
      reportItems = {
        matchRef
        homeAway
        playerId
        playerName
        positionId
        positionName
        shirtNumber
        point: string
        text
      }
      ・試合詳細で取得してpointの平均を出すのでmatchRefを使う。コレクショングループで対応できそう。96ページ
      ・並び順をどうするか。GK=>DF=>MF=>FW=>HCの順で。orderを持つ？
      ・homeTeamとawayTeamの間にチーム名や画像を差し込みたいので分けて持っておく。

      reportFormatsをmatchesと1対1リレーションにしておいてcloudFunctionで作成しておけば、フロントでreportを作成する処理をする必要がなくなるな。
*/

export const matches: Match[] = [
  {
    id: 204950,
    competitionId: 2013,
    competitionName: 'Série A',
    seasonId: 15,
    season: '2018',
    section: 25,
    utcDate: '2018-08-13T23:00:00Z',
    status: 'FINISHED',
    venue: 'Estadio Jornalista Mário Filho',
    homeTeam: {
      id: 1765,
      name: 'Fluminense FC',
      lineup: [
        {
          id: 1083,
          name: 'Jádson',
          positionId: 3,
          position: 'MF',
          shirtNumber: 16,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1078,
          name: 'Junior Sornoza',
          positionId: 3,
          position: 'MF',
          shirtNumber: 10,
          goal: 0,
          assist: 0,
          card: 'YELLOW_CARD',
          out: 0,
          in: 0
        },
        {
          id: 1238,
          name: 'Digão',
          positionId: 2,
          position: 'DF',
          shirtNumber: 14,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1066,
          name: 'Júlio César',
          positionId: 1,
          position: 'GK',
          shirtNumber: 22,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1451,
          name: 'Dutra Júnior',
          positionId: 3,
          position: 'MF',
          shirtNumber: 11,
          goal: 0,
          assist: 0,
          card: 'YELLOW_CARD',
          out: 73,
          in: 0
        },
        {
          id: 1085,
          name: 'Airton',
          positionId: 3,
          position: 'MF',
          shirtNumber: 5,
          goal: 0,
          assist: 0,
          card: '',
          out: 53,
          in: 0
        },
        {
          id: 1068,
          name: 'Gum',
          positionId: 2,
          position: 'DF',
          shirtNumber: 3,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1073,
          name: 'Gilberto Júnior',
          positionId: 2,
          position: 'DF',
          shirtNumber: 2,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1088,
          name: 'Marcos Júnior',
          positionId: 4,
          position: 'FW',
          shirtNumber: 35,
          goal: 0,
          assist: 0,
          card: '',
          out: 46,
          in: 0
        },
        {
          id: 1074,
          name: 'Ayrton Lucas',
          positionId: 2,
          position: 'DF',
          shirtNumber: 6,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1077,
          name: 'Pedro Santos',
          positionId: 3,
          position: 'MF',
          shirtNumber: 9,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        }
      ],
      bench: [
        {
          id: 2817,
          name: 'Bryan Cabezas',
          positionId: 4,
          position: 'FW',
          shirtNumber: 8,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1067,
          name: 'Rodolfo',
          positionId: 1,
          position: 'GK',
          shirtNumber: 39,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 42901,
          name: 'Luciano',
          positionId: 4,
          position: 'FW',
          shirtNumber: 18,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 53
        },
        {
          id: 1075,
          name: 'Léo Morais',
          positionId: 2,
          position: 'DF',
          shirtNumber: 33,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1087,
          name: 'Douglas',
          positionId: 3,
          position: 'MF',
          shirtNumber: 15,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1091,
          name: 'Richard',
          positionId: 4,
          position: 'FW',
          shirtNumber: 25,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1094,
          name: 'João Carlos',
          positionId: 4,
          position: 'FW',
          shirtNumber: 29,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 13604,
          name: 'Everaldo',
          positionId: 3,
          position: 'MF',
          shirtNumber: 37,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 73
        },
        {
          id: 1071,
          name: 'Frazan',
          positionId: 2,
          position: 'DF',
          shirtNumber: 13,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1089,
          name: 'Matheus Alessandro',
          positionId: 4,
          position: 'FW',
          shirtNumber: 28,
          goal: 0,
          assist: 0,
          card: 'YELLOW_CARD',
          out: 0,
          in: 46
        },
        {
          id: 11179,
          name: 'Joao Vitor',
          positionId: 2,
          position: 'DF',
          shirtNumber: 40,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1081,
          name: 'Roger Ibanez',
          positionId: 3,
          position: 'MF',
          shirtNumber: 41,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        }
      ],
      coach: {
        id: 73229,
        name: 'Marcelo Oliveira',
        positionId: 5,
        position: 'HC',
        shirtNumber: 0,
        goal: 0,
        assist: 0,
        card: '',
        out: 0,
        in: 0
      }
    },
    homeTeamScore: 0,
    homeTeamPenalty: 0,
    awayTeam: {
      id: 6684,
      name: 'SC Internacional',
      lineup: [
        {
          id: 22360,
          name: 'Jonatan Alvez',
          positionId: 4,
          position: 'FW',
          shirtNumber: 86,
          goal: 1,
          assist: 0,
          card: 'YELLOW_CARD',
          out: 65,
          in: 0
        },
        {
          id: 1588,
          name: 'Nicolás López',
          positionId: 4,
          position: 'FW',
          shirtNumber: 7,
          goal: 2,
          assist: 0,
          card: '',
          out: 46,
          in: 0
        },
        {
          id: 1572,
          name: 'Rodrigo Moledo',
          positionId: 2,
          position: 'DF',
          shirtNumber: 4,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1562,
          name: 'Marcelo Lomba',
          positionId: 1,
          position: 'GK',
          shirtNumber: 12,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1573,
          name: 'Fabiano Leismann',
          positionId: 2,
          position: 'DF',
          shirtNumber: 18,
          goal: 0,
          assist: 0,
          card: '',
          out: 78,
          in: 0
        },
        {
          id: 1580,
          name: 'Edenilson',
          positionId: 3,
          position: 'MF',
          shirtNumber: 8,
          goal: 0,
          assist: 0,
          card: 'YELLOW_CARD',
          out: 0,
          in: 0
        },
        {
          id: 1575,
          name: 'Rodrigo Dourado',
          positionId: 3,
          position: 'MF',
          shirtNumber: 13,
          goal: 0,
          assist: 1,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1567,
          name: 'Víctor Cuesta',
          positionId: 2,
          position: 'DF',
          shirtNumber: 15,
          goal: 0,
          assist: 0,
          card: 'YELLOW_CARD',
          out: 0,
          in: 0
        },
        {
          id: 1590,
          name: 'William Pottker',
          positionId: 4,
          position: 'FW',
          shirtNumber: 99,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1582,
          name: 'Patrick Nascimento',
          positionId: 3,
          position: 'MF',
          shirtNumber: 88,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1566,
          name: 'Iago',
          positionId: 2,
          position: 'DF',
          shirtNumber: 28,
          goal: 0,
          assist: 1,
          card: '',
          out: 0,
          in: 0
        }
      ],
      bench: [
        {
          id: 1578,
          name: "Andrés D'Alessandro",
          positionId: 3,
          position: 'MF',
          shirtNumber: 10,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 46
        },
        {
          id: 1179,
          name: 'Emerson Santos',
          positionId: 2,
          position: 'DF',
          shirtNumber: 20,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1581,
          name: 'Camilo',
          positionId: 3,
          position: 'MF',
          shirtNumber: 21,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1564,
          name: 'Uendel',
          positionId: 2,
          position: 'DF',
          shirtNumber: 6,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1594,
          name: 'Lucca',
          positionId: 4,
          position: 'FW',
          shirtNumber: 19,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1570,
          name: 'Gabriel Dias',
          positionId: 2,
          position: 'DF',
          shirtNumber: 30,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1593,
          name: 'Rossi',
          positionId: 4,
          position: 'FW',
          shirtNumber: 22,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 65
        },
        {
          id: 1565,
          name: 'William Klaus',
          positionId: 2,
          position: 'DF',
          shirtNumber: 44,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1584,
          name: 'Luis Eduardo Dudu',
          positionId: 3,
          position: 'MF',
          shirtNumber: 2,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 78
        },
        {
          id: 1563,
          name: 'Daniel',
          positionId: 1,
          position: 'GK',
          shirtNumber: 42,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1579,
          name: 'Juan',
          positionId: 3,
          position: 'MF',
          shirtNumber: 47,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        },
        {
          id: 1585,
          name: 'Brenner',
          positionId: 3,
          position: 'MF',
          shirtNumber: 48,
          goal: 0,
          assist: 0,
          card: '',
          out: 0,
          in: 0
        }
      ],
      coach: {
        id: 11147,
        name: 'Odair Hellmann',
        positionId: 5,
        position: 'HC',
        shirtNumber: 0,
        goal: 0,
        assist: 0,
        card: '',
        out: 0,
        in: 0
      }
    },
    awayTeamScore: 3,
    awayTeamPenalty: 0
  }
]

export const reports = [
  {
    id: 1,
    title: 'ダービーマッチ!',
    userId: 1,
    guestName: '',
    matchId: 1,
    competitionId: 1,
    competitionName: 'Jリーグ',
    seasonId: 1,
    season: '2021',
    utcDate: '2018-08-13T23:00:00Z',
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
    momId: 105
  },
  {
    id: 2,
    title: 'ダービーマッチ!',
    userId: 2,
    guestName: '',
    matchId: 1,
    competitionId: 1,
    competitionName: 'Jリーグ',
    seasonId: 1,
    season: '2021',
    utcDate: '2018-08-13T23:00:00Z',
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
    momId: 105
  },
  {
    id: 3,
    title: 'ダービーマッチ!',
    userId: 0,
    guestName: 'ゲスト太郎',
    matchId: 1,
    competitionId: 1,
    competitionName: 'Jリーグ',
    seasonId: 1,
    season: '2021',
    utcDate: '2018-08-13T23:00:00Z',
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
    momId: 105
  }
] as Report[]

export const users = [
  {
    uid: 'aaa',
    name: '鈴木太郎',
    photoUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
  },
  {
    uid: 'bbb',
    name: '画像無し',
    photoUrl: ''
  }
]
