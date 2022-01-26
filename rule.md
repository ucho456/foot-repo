# 短縮文字一覧

- 短縮文字を使用する場合は以下に記述
- database => db
- display => disp
- error => err
- flag => flg
- information => info
- man of the match => mom
- response => res
- request => req

# 型定義

- 関数の引数と戻り値には必ず型をつける
- 外部 API から取得したデータ(firebase 含む)には必ず型をつける
- 外部から取得したデータはアサーションで型定義する
- vue.props も可能な限りアサーションで正確な型を定義する
- d.ts ファイルに全て書く。
- ファイルは DB のテーブル毎 + footballData.d.ts
- 細かい定義 Hoge HogeListItem dispHoge HogeMap の順で書く

# props

- 可能な限り正確な型を付ける
- a-z 順で記入
- default 値
  - String ''
  - Number 0
  - Boolean false
  - 型が決まっているものはその中から

# html タグのプロパティ順

- v-if, v-else, v-show
- v-for :key
- v-model
- v-hoge
- class
- gridSystem cols md sm xs (xs < 600px < sm < 960px < md < 1264px < lg < 1904px < xl)
- v-bind(:) icon とか router
- v-on(@)

# components

- ロジック含め全て書いて良い
- atoms は装飾したい v-component
- modules は atoms を装飾したコンポーネント
- organisms はその他大きなコンポーネント
  - 命名は使用するページコンポーネントの冠を取る
  - 例外的にサイド用のコンポーネントのみ SideHoge.vue

# pages

- ロジックは composables に委託し、表示がメイン。
  - 例外的に router の役割、api の取得は記述。

# 命名規則

- db データを一覧画面に表示ように変換した時は複数系 hogeList、hogeItem
- 詳細画面に表示する際のデータは dispHoge
- db そのままのデータ構造の場合は hoge、hoges（登録画面、編集画面など）

# ループ

- v-for

  - List の場合 (hItem, index) in hogeList
  - hoges の場合 (h, index) in hoges
  - hogeItems の場合 (hItem, index) in hogeItems
  - key は id

- map などは hoges.map((h) => h.id)
