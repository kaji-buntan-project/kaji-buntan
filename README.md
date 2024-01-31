## 環境構築

#### 0. リポジトリをcloneする

#### 1. docker desktop をインストールする

■docker公式サイト

https://docs.docker.com/get-docker/

※お使いのPCがmacの場合、CPUがIntelチップかM1チップかでインストールするプログラムが変わります

PCがIntelチップかM1チップかは、左上のりんごマークをクリックし、「このマックについて」から確認できます。

#### 2. dockerを起動する

インストールしたdockerを起動します。

#### 3. コンテナの起動 ~ フロントエンドの環境構築

プロジェクトのルートディレクトリで以下のコマンドを実行します

```bash
# .env.exampleの内容をコピーし、.envファイルを作成する
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
http://localhost:8000/  にアクセスし、ページが表示されたら環境構築成功です。

#### 4. バックエンドの環境構築

dockerコンテナが起動した状態で、プロジェクトのルートディレクトリで以下のコマンドを実行します
```bash
# apiコンテナに入る(以降のコマンドはコンテナ内で実行します)
docker compose exec api bash
# apiコンテナ内で.env.exampleの内容をコピーし、.envファイルを作成する
cp .env.example .env
# apiコンテナ内で必要なライブラリをインストールする
composer install
# apiコンテナ内で .env にAPP_KEYを生成する
php artisan key:generate
# apiコンテナ内でテーブルを作成するコマンドを実行する
php artisan migrate
# apiコンテナ内でopenapiを作成するコマンドを実行する
php artisan openapi:generate > housework_sharing_openapi.json
```

http://localhost:8000/api にアクセスし、hello worldと表示されたら環境構築成功です。

また、http://localhost:8081 にアクセスすることで、DBの内容を確認できます。