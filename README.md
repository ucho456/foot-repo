# foot-repo

# 短縮文字一覧

- database => db
- display => disp
- error => err
- flag => flg
- information => info
- man of the match => mom
- response => res
- request => req
- reference => ref

# 型定義

- 後からコードを読み返した時にこの変数や関数はどんなデータなのか？が分かるように書いていく
- 関数の引数と戻り値には必ず型をつける
- 変数は直接定義時以外は ctrl ボタンで検索しやすいように定義する
- データベースのデータの型とそれに関連する型は types で定義する
- vue.props も可能な限りアサーションで正確な型を定義する
- ファイルは DB のテーブル毎に作成する
- 細かい定義 Hoge HogeListItem dispHoge HogeMap の順で書く

# props

- 可能な限り正確な型を付ける
- a-z 順で記入
- default 値
  - String ''
  - Number 0
  - Boolean false
  - 入る値が決まっている場合はその型から

# html タグのプロパティ順

- v-if, v-else, v-show
- v-for :key
- v-model
- v-hoge
- class
- gridSystem cols にスマホサイズ・sm にタブレットサイズ・md に PC サイズ
- v-bind(:) icon とか router など Vuetify 用の props も同じとして考える
- v-on(@)

# components

## 粒度

1. デザインを統一する為に分割する。デザインの再利用が確定したタイミングで分割する。ロジックは持たせない。
2. ロジックを境界として分割する。密結合で良い。基本的に再利用は考えない。

## pages

- ページを構成する各コンポーネントを配置する事を責務とする。
- VueRouter によるページ遷移とエラーハンドリングのロジックは記述して良い。
- その他のロジックに関しては基本的に composables に記述する。

## その他

- atoms は装飾したい v-component
- modules は atoms を装飾したコンポーネント
- organisms はその他大きなコンポーネント
  - 命名は使用するページコンポーネントの冠を取る
  - 例外的にサイド用のコンポーネントのみ SideHoge.vue

# 命名規則

- ~~db データを一覧画面に表示ように変換した時は複数系 hogeList、hogeListItem~~
- ~~詳細画面に表示する際のデータは dispHoge~~
- ~~db そのままのデータ構造の場合は hoge、hoges（登録画面、編集画面など）~~
- 可能な限りデータを弄らないで表示できるデータベース設計・デザイン設計を検討する

# ループ

- v-for

  - List の場合 (hItem, index) in hogeList
  - hoges の場合 (h, index) in hoges
  - hogeItems の場合 (hItem, index) in hogeItems
  - key は id

- map などは hogeFugas.map((hf) => hf.id)

# メモ

## やるべき事

reports のカラムに teamIds: Array を加える。
firebase のクエリ発行時に
where('teamIds', 'array-contains', teamId)
で or 検索ができるようになる為。
https://firebase.google.cn/docs/firestore/query-data/queries?hl=ja#array_membership

## github のアクセストークンが切れた際に行う作業

https://zerofromlight.com/blogs/detail/106/

## cloud functions で cron 処理をする記事

https://rooter.jp/web-crawling/set-cron-to-firebase/
https://qiita.com/nemutas/items/a2ccfb807cb00dcdeabe

# Report 検索仕様

- 初期表示 最新 Report 20 件くらい？
- フォローユーザーの記事のみ表示か全てを表示か選択できる。
- competitionId で検索
- 開催日前後 1 日を検索する。
- teamId で検索。

# Match 検索仕様

- 初期表示 最新のお気に入りチームの Match か最新の Match 20 件
- competitionId で検索
- 開催日前後 1 日を検索する。
- teamId で検索。
- Report の検索 Popup と同じものを使用する。ラジオボタンのやつは検討。

# 課題

- cloudrun の環境変数が使えない。(plugins で)
- functions 内にある package.json を無くして root のやつに統合したい。
- github actions のデプロイで firebase deploy --only hosting じゃないと失敗してしまう。

footballdata.org に関して
全ての表示するデータは firestore に保存する。
多少通信代がかかったとしてもレイテンシーが早くなるし、常に依存し続けると代替えが必要な時になにもできなくなってしまうので。
リアルタイムで必要なデータ。(大会の順位・ゴールランキングなどは１日に１回更新。更新時間を表示する。)

15 リーグ \* 1 日の試合数がループする。(許容)（１時間に１回）
status: "FINISHED"ではない場合、return
lastUpdated が同じ場合、return
matchId をそのまま id として使用する。
一覧で表示＆検索に使うデータを matches に。
サブコレクション homeTeamPlayers、awayTeamPlayers。
試合の詳細データもこれを使って表示する？だとしたらベンチメンバー必要になる。
/matches/matchId = {
matchId
competitionId(検索)
competitionName
seasonId
season
utcDate(表示・検索)
lastUpdated
teamIds(検索)
homeTeamId
homeTeamName
homeTeamScore
homeTeamPenalty
createdAt(並び順)(可能なら utcDate で代用？)
}
/matches/matchId/homeTeamPlayers/matchId = {
playerId
name
position
shirtNumber
goal
assist
card
out
in
order(並び順の保障の為)
}
GK => DF => MF => FW => 交代選手 => HC の順になるようにする。

□ 気になる事
・シーズンで id が変わったりしないか少し不安あるな。
・リーグ戦・カップ戦・W 杯で違ったりしないか。
・スケジュールが大きくなりすぎないか。

メニューのデータベースを選択
↓
◆ コンペティション選択画面。
footballOrg のやつパクっても良い位。
↓
コンペティションを選択
↓
順位表 competitions/{competitionId}/standings standings
得点ランキング competions/{competitionId}/scorers/limit30 scorers
スケジュール competions/{competitionId}/matches season で取得できるか？ schedules
が並んでる。
↓ チーム名を押すと
メンバー teams/{teamId}
チーム情報？
スケジュール 流石に共有するか
チーム採点一覧
↓
スケジュールを押すと
↓
試合情報 matches/{matchId} matches
選手採点一覧

必要なコレクション
/competitions/{competitionId} = {
id: number
name: string
imageUrl? id?
}
/standings = {
}

/scorers = {

}

/schedules = {

}

competitionId => PremierLeague2022
teamId
