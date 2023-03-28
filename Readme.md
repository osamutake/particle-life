Particle Life
==
by Osamu Takeuchi <osamu@big.jp>

これは？
--
粒子間に簡単な相互作用を仮定してシミュレーションを行うことで、仮想世界に生成する「生命」を観察するプログラムです。

javascript + wasm で作られており、ウェブブラウザ上で動作します。

動作サイト：
http://dora.bk.tsukuba.ac.jp/~takeuchi/particle-life/

このプロジェクトでは、生成したワールドのシード値を含めた URL を SNS 等で共有することで、興味深いワールドの様子をみんなで楽しめるよう工夫されています。

ライセンス
--
MIT ライセンスとします。


ビルド＆デバッグ方法
--

事前準備として、``emcc``, ``npm`` (``node.js``), ``make`` が動作する環境が必要です。

``emcc`` は [GitHub - emscripten-core/emsdk: Emscripten SDK](https://github.com/emscripten-core/emsdk) から入れられます。

```
$ git clone https://github.com/emscripten-core/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
```
あとは、

```
$ npm install
$ npm run build
```

これで ``./dist`` をターゲットにデバッグ仕様のビルドが行われます。

```
$ npm run server
```

としてデバッグ用のサーバーを立ち上げてブラウザで ``http://localhost:8000/`` にアクセスすれば動作確認を行えます。

```
$ npm run release-build
```

でリリース用ビルドが行えます。

再びデバッグ用ビルドをするには、

```
$ npm run rebuild
```

とします。

最新のリリースビルドが残っているときは ``rebuild`` でないと上書きされません。``release-build`` はタイムスタンプを見ず必ずフルビルドが行われます。

```
$ npm test
```

とすると jasmine の https サーバーが ``http://localhost:8888/`` に立ち上がるので、ブラウザでアクセスするとテスト結果を確認できます。


謝辞
--
このプロジェクトは [シャポコ🌵 (@shapoco)](https://twitter.com/shapoco) さんの開発された [Particle Life \| シャポ庫](https://www.shapoco.net/particlelife/) （の初期バージョン）を改変する形で始まりました。非常に面白い題材をとっつきやすい形で紹介して下さったことに大変感謝しています。

Change Log
--
- 2023-03-15 v0.3.0
初期コミット

- 2023-03-18 v0.3.1
高速化

- 2023-03-24 v0.4.0
粒子の表示を改善、表示オプション増加、UI改善、おすすめ設定、揺動をオフ

- 2023-03-24 v0.5.0
Firefox での速度向上、フルスクリーン対応、画面サイズを URL に含めない、UI改善

- 2023-03-28 v0.6.0
riot の流儀に合わせて大幅改訂、英訳を加えた、URL を都度更新しないようにした、カラーをランダムにした、相互作用距離等を編集可能にした、数値入力UIのスマホ対応、全画面表示解像度の調整
