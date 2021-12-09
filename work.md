# wsl2 ネームサーバーが切れた時の対処法

- https://qiita.com/kkato233/items/1fc71bde5a6d94f1b982

# 環境構築

- wsl2, ubuntu, docker-desktop の環境を作成
- ubuntu に node14.18.2 をインストール
- /home/workspace/foot-repo で npx create-nuxt-app .
- git の初期設定
- Dockerfile, docker-compose を作成し、docker-compose up -d --build でコンテナを作成する
- https://voidproc.com/blog/archives/610に沿って.devcontainerを作成
- VSCode 左下より Reopen in Container を押してコンテナで VSCode を立ち上げる
- .vscode など自動整形の設定を行う。自動整形ができるか確認
- wsl2 側で VSCode を開きここのターミナルで ubuntu・コンテナ内両方開くと作業しやすい

# Nuxt 構築

- typescript, eslint, prettier, stylelint, axios, config.json

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

# alias の設定

- vim ~/.bashrc
  some more ls aliases <= コメントされてる目印
  alias ll='ls -alF'
  alias la='ls -A'
  alias l='ls -CF'
  alias dcu='docker-compose up -d'
  alias dcc='docker exec -it app sh'
  alias dcd='docker-compose down'
