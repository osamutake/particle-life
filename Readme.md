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
$ npm build
```

これで ``./dist`` をターゲットにデバッグ仕様のビルドが行われます。

```
$ npm server
```

としてデバッグ用のサーバーを立ち上げてブラウザで ``http://localhost:8000/`` にアクセスすれば動作確認を行えます。

謝辞
--
このプロジェクトは [シャポコ🌵 (@shapoco)](https://twitter.com/shapoco) さんの開発された [Particle Life \| シャポ庫](https://www.shapoco.net/particlelife/) （の初期バージョン）を改変する形で始まりました。非常に面白い題材をとっつきやすい形で紹介して下さったことに大変感謝しています。

Change Log
--
- 2023-03-15 v0.3.0
初期コミット
