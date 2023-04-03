CC := ./emsdk/upstream/emscripten/emcc
ESBUILD := node ./config/riot-build.mjs

.PHONY: test release-build clean

debug-build: dist/particle-life.js dist/particle-life.wasm
	cp src/index.html dist/index.html

test: dist/particle-life.wasm obj/riot_tags.js
	mkdir -p spec/assets-generated
	cp dist/particle-life.wasm spec/assets-generated/
	cp obj/riot_tags.js spec/assets-generated/
	npx jasmine-browser-runner serve

dist/particle-life.wasm: src/particle-life.cpp
	$(CC) -o dist/particle-life.wasm -g src/particle-life.cpp -s EXPORTED_FUNCTIONS=_malloc,_free  --no-entry -s STANDALONE_WASM --profiling
	@# -fdebug-prefix-map=/path-replaced=/path-replacing    DWARF 情報をブラウザで見られない時に追加する

dist/particle-life.js: $(wildcard src/*.js) $(wildcard src/riot/*.js) $(wildcard src/riot/*.riot)
	$(ESBUILD) src/index.js --sourcemap=inline --outfile=dist/particle-life.js --bundle

release-build:
	$(CC) -o dist/particle-life.wasm -O3 src/particle-life.cpp -s EXPORTED_FUNCTIONS=_malloc,_free  --no-entry -s STANDALONE_WASM -sWASM_BIGINT -s TOTAL_MEMORY=128MB -flto
	$(ESBUILD) src/index.js --outfile=dist/particle-life.js --bundle --minify
	./config/inline-includs.rb > dist/index.html
	-rm dist/particle-life.js dist/particle-life.css
	@# dist/particle-life.wasm

clean:
	-rm dist/particle-life.wasm dist/particle-life.js dist/particle-life.css obj/* spec/assets-generated/*

rebuild: clean debug-build
