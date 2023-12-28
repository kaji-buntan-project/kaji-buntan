## Rustの環境構築とビルドの方法

#### curlなどを利用してRustupをインストールする
インストールすると，cargoコマンドが使えるようになる．VS codeの拡張機能でrust-analyzerを利用すると便利．

#### 実装済みコードを実行する
wasm_rust_project/src/lib.rsにある実装済みのプログラムを動かすには
```bash
cargo run
```
とする．必要なクレート(ライブラリ)はCargo.tomlに書いてあり，実行時にダウンロードされる．

また，wasm_rust_project/src/lib.rsにあるテストコードを実行するには，
```bash
cargo test
```
または，wasm_rust_project/src/lib.rsの中で，上記の拡張機能を入れた状況でRun Testを押す．

#### ビルド
ウェブアセンブリ(wasm)としてReactで利用可能にするには，wasm_rust_project内で，ビルドする必要がある．そのコマンドは
```bash
cd /var/www/html/wasm_rust_project
wasm-pack build --target web
```
である．