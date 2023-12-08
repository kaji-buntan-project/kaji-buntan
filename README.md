## 環境構築

#### 0. リポジトリをcloneする

#### 1. docker desktop をインストールする

■docker公式サイト

https://docs.docker.com/get-docker/

※お使いのPCがmacの場合、CPUがIntelチップかM1チップかでインストールするプログラムが変わります

PCがIntelチップかM1チップかは、左上のりんごマークをクリックし、「このマックについて」から確認できます。

#### 2. dockerを起動する

インストールしたdockerを起動します。

#### 3. コンテナの起動

プロジェクトのルートディレクトリで以下のコマンドを実行します

```bash
# .envファイルを作成する
cp .env.example .env
# docker imageをbuildする
docker compose build
# dockerコンテナを起動する
docker compose up -d
# appコンテナに入る(以降のコマンドはコンテナ内で実行します)
docker compose exec app bash
# appコンテナ内でライブラリをインストールする
npm install
# appコンテナ内でjs,cssをバンドルする
npm run build
# appコンテナ内でnextサーバーを起動する
npm run start
```

http://localhost:3000 にアクセスし、ページが表示されたら環境構築成功です。
