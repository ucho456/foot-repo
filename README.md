# フットレポ
サッカーの選手採点を投稿しTwitterで記事をシェアできるサービスです。

<br />

## リンク

<s>https://foot-repo.com/</s>

サーバー代やAPI代で赤字なので現在サービスを停止しました。

<br />

## 使用技術一覧
Nuxt.js, Typescript, Vuetify, Firebase, Cloud Run, Docker, Github actions

<br />

## アーキテクチャ
```mermaid
graph TD;
  subgraph "開発環境"
    A[PC]
    B[WSL2]
    C[Docker]
    D[(Firebase emulator)]
  end
  E(GitHub)
  subgraph "Firebase"
    F{{Firebase Hosting}}
    G{{Firebase Authentication}}
    H[(Firebase Firestore)]
    I[(Firebase Storage)]
  end
  subgraph "GCP"
    J{{Cloud Build}}
    K{{Container Registry}}
    L{{Cloud Run}}
    M{{Cloud Functions}}
    J-->K;
    K-->L;
    J-->L;
  end
  N[Football.data.org]
  O[ユーザー]
  A--Git push-->E;
  E--Deploy-->F;
  E--Deploy-->J;
  F--Nuxtアプリ配信-->O;
  F<--リダイレクト-->L;
  G<--認証-->O;
  H<--DB読み書き-->O;
  I<--画像読み書き-->O;
  N--サッカー情報取得-->M;
  M--サッカー情報保存-->H;
```

<br />

## 主な機能
- サインイン・サインアウト
- 記事作成・編集・削除
- 記事いいね
- 記事コメント
- ユーザーフォロー
