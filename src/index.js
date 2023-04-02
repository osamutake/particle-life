/* https://github.com/osamutake/particle-life, @license MIT */
import * as riot from 'riot'
import * as util from './util.js'

import recommendations from './recommendations.js'
import { PLSpeciesDistribution } from './pl-species-distribution.js'
import { i18n } from  './i18n.js'
import i18nDictionary from  './i18n-dictionary.js'

// すべてのタグを含めコンパイルされたものを obj から読み込む
import { registerAllTags } from '../obj/riot_tags.js'

/**
 * 起動時に一度だけ呼ばれます
 */
async function main() {

  // グローバル変数を設定
  let wasm = await util.loadWasm('particle-life.wasm');
  window.wasm = wasm;
  window.util = util;
  window.PLSpeciesDistribution = PLSpeciesDistribution;
  window.i18n = i18n; i18n.setDictionary('ja', i18nDictionary);

  // riot タグを読み込み
  registerAllTags(riot);

  // body の横幅(スクロールバーを除いた値)を 
  // CSS から var(--100vw) で使えるようにする

  const measureWindowSize = ()=> 
      document.body.style.setProperty('--100vw', 
                  `${document.body.clientWidth}px`);
  window.addEventListener('resize', measureWindowSize);
  measureWindowSize();

  document.getElementById('locale-en').addEventListener('click', ()=>{
    i18n.setLocale('en');
  })

  document.getElementById('locale-ja').addEventListener('click', ()=>{
    i18n.setLocale('ja');
  })

  riot.mount('app', {recommendations: recommendations});
}

window.addEventListener('load', () => {
  main()
})
