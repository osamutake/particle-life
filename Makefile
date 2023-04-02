CC := ./emsdk/upstream/emscripten/emcc
RIOT := ./node_modules/.bin/riot
ESBUILD := ./node_modules/.bin/esbuild

debug-build: dist/particle-life.wasm dist/particle-life.js dist/index.html

.PHONY: test release-build clean

test: dist/particle-life.wasm obj/riot_tags.js
	mkdir -p spec/assets-generated
	cp dist/particle-life.wasm spec/assets-generated/
	cp obj/riot_tags.js spec/assets-generated/
	npx jasmine-browser-runner serve

dist/index.html: src/index.html
	cp $< $@

dist/particle-life.wasm: src/particle-life.cpp
	$(CC) -o dist/particle-life.wasm -g src/particle-life.cpp -s EXPORTED_FUNCTIONS=_malloc,_free  --no-entry -s STANDALONE_WASM --profiling
	@# -fdebug-prefix-map=/path-replaced=/path-replacing    DWARF 情報をブラウザで見られない時に追加する

obj/riot_tags.js: $(wildcard src/riot/*.js) $(wildcard src/riot/*.riot) src/canvas-renderer.js src/interaction-sets.js src/color-scale.js src/particle-life.js src/xorshift128.js src/help-contents.js
	mkdir -p obj
	$(RIOT) src/riot/tags.js -o obj/riot_tags.js --sourcemap inline -c config/riot.config.js

dist/particle-life.js: obj/riot_tags.js $(wildcard src/*.js)
	$(ESBUILD) src/index.js --bundle --outfile=dist/particle-life.js  --sourcemap=inline

release-build:
	$(CC) -o dist/particle-life.wasm -O3 src/particle-life.cpp -s EXPORTED_FUNCTIONS=_malloc,_free  --no-entry -s STANDALONE_WASM -sWASM_BIGINT -s TOTAL_MEMORY=128MB -flto
	$(RIOT) src/riot/tags.js -o obj/riot_tags.js -c config/riot.config.js
	$(ESBUILD) src/index.js --bundle --outfile=dist/particle-life.js --minify-whitespace --minify-whitespace
	cp src/index.html dist/index.html

clean:
	-rm dist/particle-life.wasm dist/particle-life.js obj/* spec/assets-generated/*

rebuild: clean debug-build
