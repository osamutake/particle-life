CC := ./emsdk/upstream/emscripten/emcc
RIOT := ./node_modules/.bin/riot
ESBUILD := ./node_modules/.bin/esbuild

debug-build: dist/particle-life.wasm dist/particle-life.js dist/index.html

.PHONY: release-build clean

dist/index.html: src/index.html
	cp src/index.html dist/index.html

dist/particle-life.wasm: src/particle-life.cpp
	$(CC) -o dist/particle-life.wasm -g src/particle-life.cpp -s EXPORTED_FUNCTIONS=_malloc,_free  --no-entry -s STANDALONE_WASM

obj/riot_tags.js: src/riot/tags.js $(wildcard src/riot/*.riot)
	$(RIOT) src/riot/tags.js -o obj/riot_tags.js --sourcemap inline -c config/riot.config.js

dist/particle-life.js: obj/riot_tags.js $(wildcard src/*.js)
	$(ESBUILD) src/index.js --bundle --outfile=dist/particle-life.js  --sourcemap=inline

release-build:
	$(CC) -o dist/particle-life.wasm -O3 src/particle-life.cpp -s EXPORTED_FUNCTIONS=_malloc,_free  --no-entry -s STANDALONE_WASM
	$(RIOT) src/riot/tags.js -o obj/riot_tags.js -c config/riot.config.js
	$(ESBUILD) src/index.js --bundle --outfile=dist/particle-life.js --minify-whitespace --minify-whitespace

clean:
	-@rm dist/particle-life.wasm dist/particle-life.js obj/*

rebuild: clean debug-build
