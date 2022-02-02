# github のアクセストークンが切れた際に行う作業

- https://zerofromlight.com/blogs/detail/106/

# VSCode 拡張機能

- Auto Close Tag
- Auto Complete Tag
- Auto Rename Tag
- Bracket Pair Colorizer
- ESLint
- GitLens
- JavaScript(ES6)code snippets
- npm
- npm Intellisense
- Path Intellisense
- Prettier
- seti-icons
- TypeScript Vue Plugin(Volar)
- Vetur
- Visual Studio IntelliCode
- VSCode Essentials Snippets
- Vue 3 Snippets
- Vue Language Features(Volar)
- Vue Peek
- Vue VSCode Snippets
- Vue.js Extension Pack
- zenkaku

# 作業前・作業後にやる事

- docker-compose up -d
- docker exec -it app sh
- docker-compose down

# コード規約

- v-if 存在
- v-〇〇
- class スタイル
- gridSystem cols md sm xs
- :(v-bind)
- icon とか router とか
- @(v-on)

# 型定義

- api を経由するデータは types に定義する

# メモ

- firebase 導入前に今実装できている部分を整理する。
- mom セレクトボックスでホームチームから選択 => awayTeamOnly にすると homeTeam のままになっている。
- reportItem の id の決め方
- utcDate について日本時間にすべきか検討

# report 検索条件案

userId(フォローしてるユーザー)
matchId(その試合直)
competitionId(リーグ名・大会名)
seasonId(シーズンで検索)
teamId(チームで検索)

# match 検索条件案

matchId()

入力ボックスをどうするか。
who scores のデータサイトなどがどのようにしているか調べてみる。

matchList の初期表示。
ログイン中かつお気に入りチームを登録している場合
お気に入りチームの試合を最新順で表示。

その他
日本代表(J リーグ)の試合を最新順で表示

検索
セレクトボックス 3 つ
コンペティション＋日本代表＋お気に入りチーム 検索 (初期値がお気に入りチーム又は日本代表)
シーズン (初期値が今シーズン)
チーム (初期値が空。日本代表・お気に入りチームの場合は選択できない。)

# matches を firebase に保存する。

firebase の定期実行の関数を利用して、
matches を保存する。一時間に一回？
(最新の試合のデータは試合終了後どのくらいで反映されるのか確認する)
コンペティションでマッチ DB を分けるのは有かも。match の検索条件案をよく検討する。
https://rooter.jp/web-crawling/set-cron-to-firebase/
https://qiita.com/nemutas/items/a2ccfb807cb00dcdeabe

コーチと選手の ID が被ってない事が分かったので使用していく。
Mom とか
