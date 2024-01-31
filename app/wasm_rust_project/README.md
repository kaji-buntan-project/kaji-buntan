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
ウェブアセンブリ(wasm)として利用可能にするには，wasm_rust_project内で，ビルドする必要がある．そのコマンドは
```bash
cd /var/www/html/wasm_rust_project
wasm-pack build --target bundler
```
である．next.js向けにビルドされる．

さらに，buildが完了したら，以下のようにwasm_rust_projectの中にpkgができる．
```shell
├── wasm_rust_project
│   ├── pkg
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── wasm_rust_project_bg.js
│   │   ├── wasm_rust_project_bg.wasm
│   │   ├── wasm_rust_project_bg.wasm.d.ts
│   │   ├── wasm_rust_project.d.ts
│   │   └── wasm_rust_project.js
│   ├── src
│   │   └── lib.rs
│   ├── Cargo.toml
│   └── README.md
├── pages
└── src
```
ここで，Cargo.tomlを読み取り，package.jsonを作成しているが，その際，Cargo.tomlに記載の通り
```bash
[package.metadata.wasm-pack.profile.release]
wasm-opt = false
```
の設定で行なっている．

また，JSで読み取る際は，
```javascript
import * as wasm from "wasm_rust_project/pkg";
let RESULT = wasm.improved_adjusted_winner(INPUTS);
```
のように書く．