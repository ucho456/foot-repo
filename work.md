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

Map
https://nulab.com/ja/blog/nulab/100times-faster-performance-improvement-set-map/
https://tcd-theme.com/2021/10/javascript-map-set.html
