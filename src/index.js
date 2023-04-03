/* https://github.com/osamutake/particle-life, @license MIT */
import '../node_modules/bulma/css/bulma.min.css'
import '../node_modules/@creativebulma/bulma-collapsible/dist/css/bulma-collapsible.min.css'
import '../node_modules/bulma-slider/dist/css/bulma-slider.min.css'

import * as riot from 'riot'

import recommendations from './recommendations.js'
import { i18n } from  './i18n.js'
import i18nDictionary from  './i18n-dictionary.js'
import { load as loadWasm } from './pl-wasm-loader.js'

// すべてのタグを含めコンパイルされたものを obj から読み込む
import { registerAllTags } from './riot/tags.js'

/**
 * 起動時に一度だけ呼ばれます
 */
async function main() {

  await loadWasm();

  i18n.setDictionary('ja', i18nDictionary);

  // riot タグを読み込み
  registerAllTags(riot);

  // body の横幅(スクロールバーを除いた値)を 
  // CSS から var(--100vw) で使えるようにする

  const measureWindowSize = ()=> 
      document.body.style.setProperty('--100vw', 
                  `${document.body.clientWidth}px`);
  window.addEventListener('resize', measureWindowSize);
  measureWindowSize();  // 始めに一回呼び出しておく

  // riot のバグのせいで <app></app> の中の要素が消えないので
  // 自分で消さなければならない
  document.querySelector('.loading').style.display = "none";

  riot.mount('app', {recommendations: recommendations});

  // 後から読み込むことで起動を早くしている
  /*
  setTimeout(() => {
    const script = document.createElement('script');
    script.src ='https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js';
    script.defer = true;
    script.type = 'module';
    document.head.appendChild(script);
  }, 100);
  */
}

window.addEventListener('load', () => {
  main()
})
