## 環境構築

#### 1. docker desktop をインストールする

■docker公式サイト

https://docs.docker.com/get-docker/

※お使いのPCがmacの場合、CPUがIntelチップかM1チップかでインストールするプログラムが変わります

PCがIntelチップかM1チップかは、左上のりんごマークをクリックし、「このマックについて」から確認できます。

#### 2. コンテナの起動

プロジェクトのルートディレクトリで以下のコマンドを実行します

```bash
# .envファイルの作成
cp .env.example .env
# docker imageのbuild
docker compose build
# dockerコンテナの起動
docker compose up -d
# appコンテナに入る
docker compose exec app bash
# ライブラリをインストール
npm install
# js,cssをバンドル
npm run build
# appサーバーを起動
npm run start
```

http://localhost:3000 にアクセスし、ページが表示されたら環境構築成功です
