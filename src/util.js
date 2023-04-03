/** 
 * ユーティリティ関数・クラスを提供する
 * 
 * @module util
 */

/** 
 * options のメンバーのうち defaultValues にキーがあるものを obj 取り込む<br>
 * options にキーが無ければ defaultValues の値が入る
 * 
 * @param {Object} obj
 * @param {Object} options
 * @param {Object} defaultValues
 * @returns {Object} obj を返す
 * 
 * @example
 * // options.option1 や options.option2 が指定されていれば this.option1 や this.option2 に値を取り込む
 * // options に option1 が無ければ defaultValue1 が入る
 * importOptions(this, options, {
 *  option1: defaultValue1,
 *  option2: defaultValue2,
 * })
 * 
 */
export function importOptions(obj, options, defaultValues) {
  Object.keys(defaultValues).forEach( k => {
    if(options.hasOwnProperty(k)) {
      obj[k] = isNaN(options[k]) ? options[k] : Number(options[k]);
    } else {
      obj[k] = defaultValues[k];
    }
  });
  return obj;
}

/**
 * await することで ms ミリ秒待つ<br>
 * <a href="https://camp.trainocate.co.jp/magazine/howto-javascript-sleep/">
 * https://camp.trainocate.co.jp/magazine/howto-javascript-sleep/
 * </a> を参照
 * 
 * @param {number} ms - ミリ秒
 * @returns {Promise}
 * @example
 * await sleep(100)  // 100 ms 待つ
 */
export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** 
 * javascript オブジェクト this がガーベージコレクション(GC)される
 * 時に free すべき member を管理する 
 * <a href="https://www.google.com/search?q=FinalizationRegistry">FinalizationRegistry</a> 
 * を保持する。詳細はリンク先を参照。
 *
 * @example
 *  // this が GC されるときに manager.free(this.menber) するよう登録する
 *  // ３つ目の引数は unregister する際のキーとしてのみ用いられる
 *  // ２つ目の引数に this のメンバー関数を与えると永遠に GC されないので注意
  *  finalizer.register(this, [manager.free, [this.member]], this.member)
 *
 *  // 手動で finalize したら unregister すること
 *  manater.free(this.member)
 *  finalizer.unregister(member)
 *
 *  // unregister 用のキーに this を使っても構わない
 *  finalizer.register(this, [manager.free, [member]], this)
 *  finalizer.unregister(this)
 *
 *  // 複数のメンバーを解放することもできる
 *  // this が GC されるときに manager1.free(this.member1), manager2.free(this.member2) を呼ぶ
 *  finalizer.register(this, [
 *        [manager1.free, [this.member1]], 
 *        [manager2.free, [this.member2]],
 *      ], this)
 *
 */
export const finalizer = new FinalizationRegistry((destructor) => {
  if(Array.isArray(destructor[0])) {
    for(let d of destructor) {
      if(Array.isArray(d[1])) {
        d[0](...d[1])
      } else {
        d[0](d[1])
      }
    }
  } else {
    if(Array.isArray(destructor[1])) {
      destructor[0](...destructor[1])
    } else {
      destructor[0](destructor[1])
    }
  }
});

/**
 * wasm ファイルからモジュールを読み込む<br>
 * <br>
 * wasm で export された関数をメンバ関数として呼び出せるようになる<br>
 * メモリアクセス用のヘルパーを含めて返す<br>
 * 
 * @param {string} wasmFile - ファイル名を与える
 * @returns {Object}
 * @example
 * const wasm = loadWasm('example.wasm')
 * 
 * // ヒープメモリに直接アクセス
 * // (u64/i64/u32/i32/u16/i16/u8c/u8/i8/f32/f64) を選べる
 * console.log(wasm.mem.u32[addr / 4])
 * 
 * // ヒープからメモリを malloc して TypedArray として返す
 * // (u64/i64/u32/i32/u16/i16/u8c/u8/i8/f32/f64) を選べる
 * const mem = wasm.mem.u32.alloc(2)
 * mem[0] = 4
 * mem[1] = 5
 * 
 * // .wasm 内の関数が wasm のメンバ関数として登録される
 * // mem へのポインタを wasm 内の関数に渡す際には mem.ptr を参照すればよい
 * wasm.someFuncInWasm(mem.ptr)
 * 
 * // 解放する
 * mem.free()
 * 
 * // 手動で free() を呼ばなくても mem が GC されるときには free() されるので
 * // とても大きなブロック以外は free しなくても大丈夫
 * 
 */
export async function loadWasm(wasmFile, base64 = false) {

  let obj;
  if(base64) {  // wasm ファイルを base64 エンコードしたものが与えられた
    const raw = atob(wasmFile);                   // 生コードに直して
    const len = raw.length;
    const data = new Uint8Array(len);             // TypedArray に入れて
    for (let i = 0; i < len; i++) {
      data[i] = raw.charCodeAt(i);
    }
    obj = await WebAssembly.instantiate(data);    // インスタンス化する
  } else {      // wasm ファイルの URL が与えられた
    obj = await WebAssembly.instantiateStreaming(
      // preload した結果を使えるようパラメータを渡して fetch する
      // https://stackoverflow.com/questions/52635660/can-link-rel-preload-be-made-to-work-with-fetch
      fetch(wasmFile, {
        method: 'GET',
        credentials: 'include',
        mode: 'no-cors',
      }))
  }
  let wasm = {...obj.instance.exports};

  // ヒープメモリのユーティリティ
  
  let heap = {};
  heap.u32 = new Uint32Array(wasm.memory.buffer);
  heap.i32 = new Int32Array(wasm.memory.buffer);
  heap.u16 = new Uint16Array(wasm.memory.buffer);
  heap.i16 = new Int16Array(wasm.memory.buffer);
  heap.u8c = new Uint8ClampedArray(wasm.memory.buffer);
  heap.u8 = new Uint8Array(wasm.memory.buffer);
  heap.i8 = new Int8Array(wasm.memory.buffer);
  heap.i64 = new BigInt64Array(wasm.memory.buffer);
  heap.u64 = new BigUint64Array(wasm.memory.buffer);
  heap.f32 = new Float32Array(wasm.memory.buffer);
  heap.f64 = new Float64Array(wasm.memory.buffer);
  
  // 各 array に alloc というメソッドを追加
  // n 個の要素を malloc して TypedArray にラップして返す
  // その TypedArray がガーベージコレクションされる際には
  // 確保されたメモリも自動的に free される
  
  // mem.free で手動で解放
  // mem.ptr で C++ ポインタが得られる
  
  for(let key of Object.keys(heap)) {
    heap[key].alloc = (n) => {
      // 同じ型のクラスをインスタンス化
      const _Class = heap[key].constructor;
      let ptr;
      try {
        ptr = wasm.malloc(_Class.BYTES_PER_ELEMENT * n);
      } catch {
        ptr = null;
      }
      if(!ptr) {
        alert('out of memory');
        throw new Error('out of memory');
      }
      const mem = new _Class(wasm.memory.buffer, ptr, n)

      mem.ptr = mem.byteOffset; // シュガー

      // ガーベージコレクションされるときに free するよう登録
      finalizer.register(mem, [wasm.free, [mem.ptr]], mem);
      
      // 手動で free するための関数を用意
      mem.free = () => {
        finalizer.unregister(mem);
        wasm.free(mem.ptr);
      }
      return mem;
    }
  }

  return Object.assign(wasm, heap);
}

/** 
 * obj のデストラクタ .destructor() を呼ぶ 
 * @param {...Object} objs - null でないものに destructor が定義されていれば呼び出す
 * @example
 * let obj1 = new Object1()
 * let obj2 = new Object1()
 * destruct(obj1, obj2)
 */
export function destruct(...objs)
{
  for(const obj of objs)
    if(obj && obj.destructor) obj.destructor();
}

/**
 * obj が EventTarget として働くよう addEventListener / removeEventListener / dispatchEvent を定義する
 * 
 * @example
 * class MyObj {
 *   constructor() {
 *     implementEventTarget(this)
 *   }
 * }
 * 
 * let obj = new MyObj()
 * obj.addEventListener("trigger", (e)=> console.log(`triggered with data: ${e.detail}`))
 * obj.dispatchEvent("trigger", "data that is stored in e.detail")
 */
export function implementEventTarget(obj) {
  const eventTarget = new EventTarget();

  obj.addEventListener = (...args) =>
    eventTarget.addEventListener(...args);

  obj.removeEventListener = (...args) =>
    eventTarget.removeEventListener(...args);

  obj.dispatchEvent = (event, detail_content) =>
    eventTarget.dispatchEvent( new CustomEvent(event, { detail: detail_content }))
}

/**
 * ８桁の十六進数文字列を返す
 * @param {number} i
 */
export function int2hex(i) {
  return ("000"+(((i|0) >>> 16)&0xffff).toString(16)).slice(-4) +
         ("000"+(((i|0)       )&0xffff).toString(16)).slice(-4) ;
}

//////////////////////////////////////////////////// WebGL Helpers

/** 
 * WebGL attribute のラッパークラス
 */
class glAttribute
{
  /** 
   * @param {WebGLRenderingContext} gl
   * @param {GLuint} loc - gl.getAttribLocation(program, name) の戻り値
   */
  constructor(gl, loc) {
    // これらも必要に応じて読み取れる

    /** @member {WebGLRenderingContext} */
    this.gl = gl;

    /** @member {GLuint} */
    this.loc = loc;
  }

  /** 
   * ポインタを割り当てる<br>
   * [vbuffer, size, type, normalized, stride, offset] を渡す
   * @type {any[]}
   */ 
  set ptr(arg) {
    if(isNaN(this.loc)) return;
    const [vbuffer, size, type, normalized, stride, offset] = arg;
    vbuffer.bind(()=> {
      this.gl.vertexAttribPointer(this.loc, size, type, normalized, stride, offset);
      this.gl.enableVertexAttribArray(this.loc);
    });
  }
  
  /** 
   * 浮動小数点数(1～４個)の書き込み
   * @type {number|number[]}
   */
  set f(arg) {
    if(isNaN(this.loc)) return;
    if(!Array.isArray(arg)) arg = [arg]
    switch(arg.length) {
      case 1: this.gl.vertexAttrib1fv(this.loc, arg); break;
      case 2: this.gl.vertexAttrib2fv(this.loc, arg); break;
      case 3: this.gl.vertexAttrib3fv(this.loc, arg); break;
      case 4: this.gl.vertexAttrib4fv(this.loc, arg); break;
      default: throw new Error(`${arg.length} parameters are given expecting 1 - 4`);
    }
  }
}

/** 
 * WebGL uniform のラッパークラス
 * 
 */
class glUniform
{
  /** 
   * @param {WebGLRenderingContext} gl
   * @param {WebGLUniformLocation} loc
   */
  constructor(gl, loc) {
    // これらも必要に応じて読み取れる
    /** @type {WebGLRenderingContext} */
    this.gl = gl;

    /** @type {WebGLUniformLocation} */
    this.loc = loc;
  }
  
  /** 
   * 浮動小数点数(1～４個)の書き込み
   * @type {number|number[]}
   */
  set f(arg) {
    if(!this.loc) return;
    if(!Array.isArray(arg)) arg = [arg]
    switch(arg.length) {
      case 1: this.gl.uniform1fv(this.loc, arg); break;
      case 2: this.gl.uniform2fv(this.loc, arg); break;
      case 3: this.gl.uniform3fv(this.loc, arg); break;
      case 4: this.gl.uniform4fv(this.loc, arg); break;
      default: throw new Error(`${arg.length} parameters are given expecting 1 - 4`);
    }
  }
  
  /** 
   * 整数値(1～４個)の書き込み
   * @type {number|number[]}
   */
  set i(arg) {
    if(!this.loc) return;
    if(!Array.isArray(arg)) arg = [arg]
    switch(arg.length) {
      case 1: this.gl.uniform1iv(this.loc, arg); break;
      case 2: this.gl.uniform2iv(this.loc, arg); break;
      case 3: this.gl.uniform3iv(this.loc, arg); break;
      case 4: this.gl.uniform4iv(this.loc, arg); break;
      default: throw new Error(`${arg.length} parameters are given expecting 1 - 4`);
    }
  }
  
  #matCore(transpose, values) {
    if(!this.loc) return;
    switch(values.length) {
      case  4: this.gl.uniformMatrix2fv(this.loc, transpose, values); break;
      case  9: this.gl.uniformMatrix3fv(this.loc, transpose, values); break;
      case 16: this.gl.uniformMatrix4fv(this.loc, transpose, values); break;
      default: throw new Error(`${arg.length} parameters are given expecting 4 or 9 or 16`);
    }
  }

  /** 
   * 浮動小数行列の書き込み (2x2, 3x3, 4x4)
   * @type {number[]}
   */
  set mat(values) {
    this.#matCore(false, values)
  }

  /** 
   * 浮動小数行列を転置して書き込み (2x2, 3x3, 4x4)
   * @type {number[]}
   */
  set matTrans(values) {
    this.#matCore(true, values)
  }
}

/** 
 * WebGLProgram のラッパークラス<br>
 * <br>
 * vsrc, fsrc をコンパイルして program を作成するとともに
 * attr, unif へアクセスするための手段を返す<br>
 * @example
 * let program = new glProgram(gl, vsrc, fsrc)
 * program.u_unif1.f = [1.0, 1.0, 1.0] // uniform にアクセスできる
 * program.use()
 *
 * // ここで描画処理
 *
 * destruct(program) // いらなくなったら解放する
 */
export class glProgram
{
  /**
   * @param {WebGLRenderingContext} gl
   * @param {string} vsrc - vertex shader プログラム
   * @param {string} fsrc - fragment shader プログラム
   * @param {Array} [attrs=[]] - attribute 名のリスト<br> 自動で検出するため通常は渡す必要はない。
   * @param {Array} [unifs=[]] - uniform 名のリスト<br> 自動で検出するため通常は渡す必要はない。
   */
  constructor(gl, vsrc, fsrc, attrs = [], unifs = []) {
    this.gl = gl;
    this.program = gl.createProgram();
    this.#glCreateShader(gl, vsrc, gl.VERTEX_SHADER,   this.program);
    this.#glCreateShader(gl, fsrc, gl.FRAGMENT_SHADER, this.program);
    gl.linkProgram(this.program);
    if(!gl.getProgramParameter(this.program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(this.program));
    
    // attribute, uniform をメンバーとして登録する
    // 宣言だけされていて実際にコードで使っていないものは削除されるので
    // アクセスしようとすると問題になることに注意が必要

    let nattr = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
    for(let i = 0; i < nattr; i++) {
      const {name} = gl.getActiveAttrib(this.program, i);
      const loc = gl.getAttribLocation(this.program, name);
      this[name] = new glAttribute(gl, loc);
    }
    attrs.forEach( (attr)=> {
      if(this[attr]) return;  // すでに登録されている
      const loc = gl.getAttribLocation(this.program, attr);
      this[attr] = new glAttribute(gl, loc);
    });
    
    let nunif = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for(let i = 0; i < nunif; i++) {
      const {name} = gl.getActiveUniform(this.program, i);
      const loc = gl.getUniformLocation(this.program, name);

      // null になる場合があるそうで
      // https://stackoverflow.com/questions/22307766/how-to-use-getactiveuniform-in-webgl#comment83528379_22314513
      if(loc == null) continue;
      this[name] = new glUniform(gl, loc);
    }
    unifs.forEach( (unif)=> {
      if(this[unif]) return;  // すでに登録されている
      const loc = gl.getUniformLocation(this.program, unif);
      this[unif] = new glUniform(gl, loc);
    });

  }
  
  /**
   * 解放する
   */
  destructor() {  // 手動で呼ぶ必要がある
    this.gl.deleteProgram(this.program);
  }

  // type : gl.VERTEX_SHADER / gl.FRAGMENT_SHADER
  #glCreateShader(gl, src, type, program = null) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
      throw new Error(gl.getShaderInfoLog(shader));
    if(!program) 
      return shader;
    
    // 割り当てまで行う
    gl.attachShader(program, shader); 
    gl.deleteShader(shader);  // いらなくなったら消してほしいと頼んでおく
    return null;
  }
  
  /**
   * useProgram する
   */
  use() {
    this.gl.useProgram(this.program);
  }
}

/** 
 * GPU との配列データのやり取りに使われる WebGLBuffer のラッパークラス<br>
 * bind(), unbind(), data(), subData() を行える<br>
 * GC 時に自動的にリソースを解放する（基本的には destructor() を呼んで手動で解放する方が良い）
 */
export class glBuffer 
{
  /**
   * @param {WebGLRenderingContext} gl
   * @param {GLenum} type - gl.ARRAY_BUFFER または gl.ELEMENT_ARRAY_BUFFER<br>
   *                        gl.bindBuffer に渡される
   */
  constructor(gl, type) {
    this.gl = gl;
    this.type = type;
    this.buffer = gl.createBuffer();

    finalizer.register(this, [gl.deleteBuffer, this.buffer], this)
  }

  /** 
   * リソースを解放する<br>
   * 呼ばなくても GC 時に自動的に開放するはずだが、いらなくなったら手動で呼ぶべき
   */
  destructor() {
    finalizer.unregister(this);
    this.gl.deleteBuffer(this.buffer);
  }

  /** 
   * コンストラクタに渡した gl.ARRAY_BUFFER または gl.ELEMENT_ARRAY_BUFFER を使って bindBuffer する
   * @param {function(...any): any?} [func] - func が渡されれば bind して func に args を与えてを呼んだ後 unbind する<br>
   * 渡されなければ bind するだけなので後で必要に応じて別途 unbind すること
   * @param {...any} [args] - func へ与える引数
  */
  bind(func, ...args) {
    if (func && typeof func === 'function') {
      this.bind();
      try { func(...args) } finally { this.unbind(); }
    } else {
      this.gl.bindBuffer(this.type, this.buffer);
    }
  }
  
  /** 
   * 
   */
  unbind() {
    this.gl.bindBuffer(this.type, null);
  }
  
  /**
   * バッファーにデータを割り当てる<br>
   * this.dataLength に割り当てたデータの数が入る
   * @param {TypedArray} array - バッファーに転送するデータ
   * @param {GLenum} mode - gl.STATIC_DRAW や gl.DYNAMIC_DRAW
   */
  data(array, mode) {
    this.bind(()=>{
      this.gl.bufferData(this.type, array, mode);
    });

    /**
     * subData() 時に参照するため data() で割り当てたデータの要素数が入る<br>
     * @type {number?}
     */
    this.dataLength = array.length;
  }

  /**
   * バッファーのデータを書き換える
   * @param {number} offset - オフセット位置
   * @param {TypedArray} [array] - 置き換えるデータ<br>
   *    省略時にはすでに割り当てたデータの途中 (offset位置) から使うよう指定する
   */
  subData(offset, float32Array = null) {
    this.bind(()=>{
      if(float32Array) {
        this.gl.bufferSubData(this.type, offset, float32Array);
      } else {
        this.gl.bufferSubData(this.type, offset);
      }
    });
  }
  
}

/**
 * WebGLFrameBuffer のラッパークラス
 */
export class glFrameBuffer
{
  /**
   * @param {WebGLRenderingContext} gl
   * @param {number} width
   * @param {number} height
   * @param {boolean} [depth=true] - 深度バッファーを確保するかどうか
   */
  constructor(gl, width, height, depth = true) {
    this.gl = gl;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.frameBuffer = gl.createFramebuffer();

    this.bind(()=> {
      if(depth) { // 深度バッファ
        this.depthBuffer = gl.createRenderbuffer();
        this.resizeDepthBuffer();
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
      }
      
      // テクスチャ
      this.texture = gl.createTexture();
      this.#resizeTeture();
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    });

    if(this.depthBuffer) {
      finalizer.register(this, [
        [gl.deleteFramebuffer, this.frameBuffer],
        [gl.deleteRenderbuffer, this.depthBuffer],
        [gl.deleteTexture, this.texture],
      ], this)
    } else {
      finalizer.register(this, [
        [gl.deleteFramebuffer, this.frameBuffer],
        [gl.deleteTexture, this.texture],
      ], this)
    }
  }

  /** 
   * リソースを解放する
   */
  destructor() {  // 手動で呼ぶ必要がある
    finalizer.unregister(this);

    if(this.depthBuffer)
      this.gl.deleteRenderBuffer(this.depthBuffer);
    if(this.teture)
      this.gl.deleteTexture(this.texture);
    this.gl.deleteFramebuffer(this.frameBuffer);
  }

  /** 
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    if(this.width == width && this.height == height) return;
    this.width = width;
    this.height = height;
    this.#resizeDepthBuffer();
    this.#resizeTeture();
  }

  #resizeDepthBuffer() {
    const {gl, depthBuffer, width, height} = this;
    if(depthBuffer) {
      gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
      try {
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
      } finally {
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
      }
    }
  }

  #resizeTeture() {
    const {gl, texture, width, height} = this;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } finally {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
  }

  /** 
   * @param {function(...any): any?} [func] - func が渡されれば bind して func に args を与えてを呼んで unbind する
   * 渡されなければ bind するだけなので後で必要に応じて別途 unbind すること
   * @param {...any} [args]
  */
  bind(func, ...args) {
    if (func && typeof func === 'function') {
      this.bind();
      try { func(...args); } finally { this.unbind(); }
    } else {
      const {gl, frameBuffer} = this;
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    }
  }

  /** */
  unbind() {
    const {gl, frameBuffer} = this;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
};

/**
 * 与えられたテクスチャを 2D で加工して表示するためのシェーダを使うためのユーティリティクラス  
 */ 
export class glTextureRenderer
{
  /**
   * @param {WebGLRenderingContext} gl
   * @param {string} fsrc - フラグメントシェーダのソースコード<br>
   *                        uniform sampler2D u_texture に render に渡されるテクスチャが読み込まれる
   * @param {function(WebGLRenderingContext, glProgram, any): any} preparation - render 時に呼び出されるコールバック関数
   * 
   * @example
   *  // 輝度を factor 倍するレンダラー
   *  const frameRendererFactor = new glTextureRenderer(gl, `
   *      precision mediump float;
   *      uniform sampler2D u_texture; // ここに render に渡されるテクスチャが読み込まれる
   *      uniform vec2 u_size;
   *      uniform float u_factor;
   *      void main(void){
   *        vec2 uv = gl_FragCoord.xy / u_size;   // 座標を [0, 1) に直す
   *        vec4 c = texture2D(u_texture, uv)     // テクスチャの値を読む
   *        gl_FragColor = u_factor * c;          // factor 倍して返す
   *      }
   *    `, (gl, program, arg)=> {
   *      const {width, height, factor} = arg;
   *      gl.disable(gl.BLEND);
   *      program.u_size.f = [width, height];
   *      program.u_factor.f = factor
   *  });
   * 
   *  // テクスチャ src を factor 倍して canvas へ描画
   *  frameRendererFactor.render(0, src, {
   *      width: canvas.width, 
   *      height: canvas.height, 
   *      factor: factor
   *  });
   * 
   *  // テクスチャ src を factor 倍してフレームバッファー dest へ描画
   *  frameRendererFactor.render(0, src, {
   *      width: canvas.width, 
   *      height: canvas.height, 
   *      factor: factor
   *  }, dest);
   * 
   *  // 解放する
   *  frameRendererFactor.destructor(); 
   *   
   */ 
  constructor(gl, fsrc, preparation) {

    /** @type {WebGLRenderingContext} */
    this.gl = gl;

    // 領域全体を覆うための頂点シェーダプログラム
    const vsrc = `
      attribute vec3 a_pos;
      void main() {
        gl_Position = vec4( a_pos, 1.0 );
      }
    `;

    /** @type {WebGLProgram} */
    this.program = new glProgram(gl, vsrc, fsrc);

    /** @type {function} */
    this.preparation = preparation;
    
    // 画面いっぱいを覆う四角形
    this.vbuffer = new glBuffer(gl, gl.ARRAY_BUFFER);
    this.vbuffer.data(new Float32Array(
        [ -1, -1,   1, -1,   -1, 1,     // １つ目の三角形
           1, -1,   1,  1,   -1, 1 ]),  // ２つ目の三角形
        gl.STATIC_DRAW);
  }

  /** */
  destructor() {
    destruct(this.program);
    destruct(this.vbuffer);
  }

  /**
   * 描画する
   * @param {number} n_texture - 使用するテクスチャ番号
   * @param {WebGLTexture|glFrameBuffer} texture - u_texture として参照するテクスチャあるいは glFrameBuffer
   * @param {any} preparationArg - preparation に与える引数
   * @param {glFrameBuffer} [destBuffer = null] - 与えられれば destBuffer が出力先になる。与えなければ canvas が出力先になる。
   */
  render(n_texture, texture, preparationArg, destBuffer = null) {
    
    if(texture.constructor.name == glFrameBuffer.name)
      texture= texture.texture; // フレームバッファーからテクスチャを取り出す

    const {gl, program, vbuffer} = this;
    program.use();

    // 出力先がフレームバッファーなら割り当てる
    // 出力先のサイズに合わせて viewport を設定する
    if(destBuffer) {
      destBuffer.bind();
      gl.viewport(0, 0, destBuffer.width, destBuffer.height);
    } else {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    try {

      // gl.TEXTUREn の n に n_texture をあてはめる
      program.u_texture.i = n_texture;
      gl.activeTexture(gl[`TEXTURE${n_texture}`]);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.disable(gl.DEPTH_TEST);
      
      // コールバック
      this.preparation(gl, program, preparationArg);

      // 頂点データを与えて描画する
      program.a_pos.ptr = [vbuffer, 2, gl.FLOAT, false, 0, 0];
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.flush();

    } finally {
      if(destBuffer) destBuffer.unbind();
    }
  }
}


export function camelCase(str) {
  return str.split('-').map((w,i) => 
    (i === 0) ? w.toLowerCase() 
              : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  ).join('')
}

export function kebabCase(str) {
  return str.split(/(?=[A-Z])/).join('-').toLowerCase()
}

