import {implementEventTarget} from './util.js'

/**
 * @module i18n
 */

/**
 * UI の国際化を行うためのユーティリティクラス<br>
 * モジュールに唯一のインスタンスが i18n として定義されているのでそれを使う 
 * 
 * @example
 * import i18n from "i18n.js"
 * 
 * const dict = { // ロケールがキーになる
 *   ja: {        // 翻訳元の文言がキーになる
 *     hello: "こんにちは",
 *     bye: "さようなら",
 *     id_love: "愛しています",
 *   },
 *   zh: {
 *     hello: "你好",
 *     bye: "再见",
 *     id_love: "我愛你",
 *   },
 * }
 * 
 * i18n.setDictionary('en', dict)
 * let t = i18n.t
 * console.log(t('hello'));  // ブラウザの設定により表示言語が選ばれる
 * console.log(t('I love you.', 'love'));  // id を指定
 *
 * let t = i18n.tag
 * console.log(t`hello`)    // これでも動作する( ` に注意)
 * 
 * i18n.setLocale('ja')
 * console.log(t`hello`));  // 日本語に変換される
 * 
 * // i18n の辞書やロケール設定が変更されたら呼び出される
 * i18n.addEventListener('update', ()=> this.update())
 * 
 */
class I18n {
  constructor(){
    implementEventTarget(this)
    this.setLocale()
    this.missingMessageShown = {}
  }

  /**
   * @property {function(string, function(CustomEvent))} addEventListener
   * @property {function(string, function(CustomEvent))} removeEventListener
   */

  /**
   * 与えられたテキストを現在のロケールに翻訳して返す<br>
   * this.t(src) は同じ機能の別名
   * @param {string} src - 翻訳元のテキスト
   * @param {string} [id] - 与えた場合、辞書から src ではなく `id_${id}` というキーを探す
   */
  translate(src, id) {
    return this.t(src, id)
  }

  /**
   * 与えられたテキストを現在のロケールに翻訳して返す<br>
   * this.translate(src) は同じ機能の別名<br>
   * 翻訳が見つからないものがあれば console.log に表示する
   * @param {string} src - 翻訳元のテキスト
   * @param {string} [id] - 与えた場合、辞書から src ではなく `id_${id}` というキーを探す
   */
  t(src, id) {
    const key = id ? `id_${id}` : src
    for(let loc of this.locales) {
      if(loc == this.originalLocale)
        return src
      if(this.dictionary[loc] && this.dictionary[loc][key])
        return this.dictionary[loc][key]
    }
    this.#showTranslationMissingMessageFor(key, src)
    return src
  }

  // 翻訳が見つからないものがあれば console.log に表示する
  #showTranslationMissingMessageFor(key, src) {
    if(this.missingMessageShown[key]) return;
    if(Object.keys(this.missingMessageShown).length == 0) {
      console.log(`i18n: translation(s) are missing for locale "${this.locales.join(', ')}":`);
    }
    this.missingMessageShown[key] = true;
    if(key != src) {
      src.split(/\n/).forEach( line => 
        console.log(`    // ${line}`)
      );
    }
    console.log(`    '${key}':`)
    console.log("    '',")
  }

  /**
   * i18n.tag`brabra ${a} booboo ${b}.` のように使い、内部に変数を展開するための文字列を翻訳する手段を与える<br>
   * 辞書には<br>
   *  'brabra __arg1__ booboo __arg2__.' というキーに対して<br>
   *  'woofuu __arg2__ papaaa __arg1__.' という翻訳を与えておけばよい<br>
   * 変数展開がない場合にも const t = i18n.tag として t`brabra` のように短く翻訳を書くのもアリかも
   */
  tag(template, ...args) {
    let str = template[0]
    for(let i = 1; i < template.length; i++) {
      str += `_arg${i}_`
      str += template[i]
    }
    str = this.t(str)
    for(let i = 1; i < template.length; i++) {
      str = str.replace(`_arg${i}_`, args[i-1])
    }
    return str
  }

  #browserLocales() {
    return navigator.languages || [
      navigator.language ||
      navigator.userLanguage ||
      navigator.browserLanguage
    ]  
  }

  /**
   * 辞書を与える<br>
   * I18n クラスの使用例を参照
   * @param {string} originalLocale - 辞書のキーになる翻訳元言語を表すロケール
   * @param {object} dict - 辞書情報
   * 
   */
  setDictionary(originalLocale, dict) {
    this.originalLocale = originalLocale;
    this.dictionary = dict;
    this.dispatchEvent("update", {});
    this.missingMessageShown = {}
  }

  /**
   * @param {string|string[]} [loc] - 省略した場合にはブラウザの設定が読まれる<br>
   * 複数指定した場合には優先順位が適用される
   */
  setLocale(loc = [...this.#browserLocales()]) {
    if(!Array.isArray(loc)) loc = [loc];
    this.locales = [];
    loc.forEach((l)=>{
      this.locales.push(l);
      if(l.split('-').length > 1)
        this.locales.push(l.split('-')[0]);
    })
    this.locales.push('en');  // the last hope
    this.dispatchEvent("update", {});
    this.missingMessageShown = {}
  }
}

/** @type {I18n} */
export const i18n = new I18n();
