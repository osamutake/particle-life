import {implementEventTarget} from './util.js'

class I18n {
  constructor(){
    implementEventTarget(this)
    this.setLocale()
  }

  translate(src) {
    return this.t(src)
  }

  // id が指定されれば `id_${id}` というキーを探す
  t(src, id) {
    const key = id ? `id_${id}` : src
    for(let loc of this.locales) {
      if(loc == this.originalLocale)
        return src
      if(this.dictionary[loc] && this.dictionary[loc][key])
        return this.dictionary[loc][key]
    }
    for(let loc of this.locales) {
      loc = loc.split('-')[0]
      if(loc == this.originalLocale)
        return src
      if(this.dictionary[loc] && this.dictionary[loc][key]) 
        return this.dictionary[loc][key]
    }
    return src
  }

  // i18n.tag`brabra ${a} booboo ${b}.`
  // translation from 'brabra __arg1__ booboo __arg2__.' to
  //               to 'woofuu __arg2__ papaaa __arg1__.' is possible.
  
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

  browserLocales() {
    return navigator.languages || [
      navigator.language ||
      navigator.userLanguage ||
      navigator.browserLanguage
    ]  
  }

  setDictionary(originalLocale, dict) {
    this.originalLocale = originalLocale;
    this.dictionary = dict;
    this.dispatchEvent("update", {});
  }

  setLocale(loc = this.browserLocales()) {
    if(Array.isArray(loc)) {
      this.locales = loc;
    } else {
      this.locales = [loc];
    }
    this.dispatchEvent("update", {});
  }
}

export const i18n = new I18n();
