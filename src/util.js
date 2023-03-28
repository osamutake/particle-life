// ****************************************
/// ユーティリティ関数群
// ****************************************

// obj に options を取り込む
export function importOptions(obj, options, default_values) {
  Object.keys(default_values).forEach( k => {
    if(options.hasOwnProperty(k)) {
      obj[k] = isNaN(options[k]) ? options[k] : Number(options[k]);
    } else {
      obj[k] = default_values[k];
    }
  });
  return obj;
}

// Sleep 関数
// https://camp.trainocate.co.jp/magazine/howto-javascript-sleep/
export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// javascript オブジェクト this がガーベージコレクションされる
// 時に free すべき member を管理する
//
//  finalizer.register(this, [manager.free, [member]], member)
//
// のように使う
// manager が this だと永遠に GC されないので注意
//
// 手動で finalize したら
//
//  finalizer.unregister(member)
//
// すること
//
// あるいは、
//  finalizer.register(this, [manager.free, [member]], this)
//  finalizer.unregister(this)
// でも良い
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

// wasm ファイルからモジュールを読み込む
// メモリアクセス用のヘルパーを含めて返す
export async function loadWasm(wasmFile) {
  let obj = await WebAssembly.instantiateStreaming(fetch(wasmFile), {})
  let wasm = Object.assign({}, obj.instance.exports);

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

// obj のデストラクタを呼ぶ
export function destruct(...objs)
{
  for(const obj of objs)
    if(obj && obj.destructor) obj.destructor();
}

// EventTarget として働くようにする
// dispatchEvent の定義が違うので注意
export function implementEventTarget(obj) {
  const eventTarget = new EventTarget();

  obj.addEventListener = (...args) =>
    eventTarget.addEventListener(...args);

  obj.removeEventListener = (...args) =>
    eventTarget.removeEventListener(...args);

  obj.dispatchEvent = (event, detail_content) =>
    eventTarget.dispatchEvent( new CustomEvent(event, { detail: detail_content }))
}

export function int2hex(i) {
  return ("000"+(((i|0) >>> 16)&0xffff).toString(16)).slice(-4) +
         ("000"+(((i|0)       )&0xffff).toString(16)).slice(-4) ;
}

//////////////////////////////////////////////////// WebGL Helpers

// attribute のラッパークラス
class glAttribute
{
  constructor(gl, loc) {
    // これらも必要に応じて読み取れる
    this.gl = gl;
    this.loc = loc;
  }
  
  // ポインタの割り当て
  set ptr(arg) {
    const [vbuffer, size, type, normalized, stride, offset] = arg;
    vbuffer.bind(()=> {
      this.gl.vertexAttribPointer(this.loc, size, type, normalized, stride, offset);
      this.gl.enableVertexAttribArray(this.loc);
    });
  }
  
  // 浮動小数点数(1～４個)の書き込み
  set f(arg) {
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

// uniform のラッパークラス
class glUniform
{
  constructor(gl, loc) {
    // これらも必要に応じて読み取れる
    this.gl = gl;
    this.loc = loc;
  }
  
  // 浮動小数点数(1～４個)の書き込み
  set f(arg) {
    if(!Array.isArray(arg)) arg = [arg]
    switch(arg.length) {
      case 1: this.gl.uniform1fv(this.loc, arg); break;
      case 2: this.gl.uniform2fv(this.loc, arg); break;
      case 3: this.gl.uniform3fv(this.loc, arg); break;
      case 4: this.gl.uniform4fv(this.loc, arg); break;
      default: throw new Error(`${arg.length} parameters are given expecting 1 - 4`);
    }
  }
  
  // 整数値(1～４個)の書き込み
  set i(arg) {
    if(!Array.isArray(arg)) arg = [arg]
    switch(arg.length) {
      case 1: this.gl.uniform1iv(this.loc, arg); break;
      case 2: this.gl.uniform2iv(this.loc, arg); break;
      case 3: this.gl.uniform3iv(this.loc, arg); break;
      case 4: this.gl.uniform4iv(this.loc, arg); break;
      default: throw new Error(`${arg.length} parameters are given expecting 1 - 4`);
    }
  }
  
  // 浮動小数行列の書き込み (2x2, 3x3, 4x4)
  #matCore(transpose, values) {
    switch(values.length) {
      case  4: this.gl.uniformMatrix2fv(this.loc, transpose, values); break;
      case  9: this.gl.uniformMatrix3fv(this.loc, transpose, values); break;
      case 16: this.gl.uniformMatrix4fv(this.loc, transpose, values); break;
      default: throw new Error(`${arg.length} parameters are given expecting 4 or 9 or 16`);
    }
  }

  set mat(values) {
    this.#matCore(false, values)
  }

  set matTrans(values) {
    this.#matCore(true, values)
  }
}

// vsrc, fsrc をコンパイルして program を作成し
// また attr, unif へアクセスするための手段を返す
export class glProgram
{
  constructor(gl, vsrc, fsrc, attrs = [], unifs = []) {
    this.gl = gl;
    this.program = gl.createProgram();
    this.#glCreateShader(gl, vsrc, gl.VERTEX_SHADER,   this.program);
    this.#glCreateShader(gl, fsrc, gl.FRAGMENT_SHADER, this.program);
    gl.linkProgram(this.program);
    if(!gl.getProgramParameter(this.program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(this.program));
    
    // attribute, uniform をメンバーとして登録する
    attrs.forEach( (attr)=> {
      const loc = gl.getAttribLocation(this.program, attr);
      this[attr] = new glAttribute(gl, loc);
    });
    
    unifs.forEach( (unif)=> {
      const loc = gl.getUniformLocation(this.program, unif);
      this[unif] = new glUniform(gl, loc);
    });
  }
  
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
  
  use() {
    this.gl.useProgram(this.program);
  }
}

// type = gl.ARRAY_BUFFER / gl.ELEMENT_ARRAY_BUFFER
// bind(), unbind(), data(), subData() を行える
export class glBuffer 
{
  constructor(gl, type) {
    this.gl = gl;
    this.type = type;
    this.buffer = gl.createBuffer();

    util.finalizer.register(this, [gl.deleteBuffer, this.buffer], this)
  }

  destructor() {  // 手動で呼ぶ必要がある
    util.finalizer.unregister(this);
    this.gl.deleteBuffer(this.buffer);
  }

  bind(func) {
    if (func && typeof func === 'function') {
      this.bind();
      try { func(); } finally { this.unbind(); }
    } else {
      this.gl.bindBuffer(this.type, this.buffer);
    }
  }
  
  unbind() {
    this.gl.bindBuffer(this.type, null);
  }
  
  // mode : gl.STATIC_DRAW / gl.DYNAMIC_DRAW
  data(float32Array, mode) {
    this.bind(()=>{
      this.gl.bufferData(this.type, float32Array, mode);
    });
    this.dataLength = float32Array.length;
  }
  
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

export class glFrameBuffer
{
  constructor(gl, width, height, depth = true) {
    this.gl = gl;
    this.width = width;
    this.height = height;
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
      util.finalizer.register(this, [
        [gl.deleteFramebuffer, this.frameBuffer],
        [gl.deleteRenderbuffer, this.depthBuffer],
        [gl.deleteTexture, this.texture],
      ], this)
    } else {
      util.finalizer.register(this, [
        [gl.deleteFramebuffer, this.frameBuffer],
        [gl.deleteTexture, this.texture],
      ], this)
    }
  }

  destructor() {  // 手動で呼ぶ必要がある
    util.finalizer.unregister(this);

    if(this.depthBuffer)
      this.gl.deleteRenderBuffer(this.depthBuffer);
    if(this.teture)
      this.gl.deleteTexture(this.texture);
    this.gl.deleteFramebuffer(this.frameBuffer);
  }

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

  bind(func) {
    if (func && typeof func === 'function') {
      this.bind();
      try { func(); } finally { this.unbind(); }
    } else {
      const {gl, frameBuffer} = this;
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    }
  }

  unbind() {
    const {gl, frameBuffer} = this;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
};

// 与えられたテクスチャを 2D で加工して表示するためのシェーダ
export class glTextureRenderer
{
  // fsrc の u_texture にテクスチャが読み込まれる
  constructor(gl, fsrc, u_list = []) {
    this.gl = gl;

    const vsrc = `
      attribute vec3 a_pos;
      void main() {
        gl_Position = vec4( a_pos, 1.0 );
      }
    `;

    //   const fsrcOffset = `
    //   precision mediump float;
    //   uniform sampler2D u_texture;
    //   uniform vec2 u_size;
    //   uniform vec2 u_offset;
    //   void main(void){
    //     // ここで uv から gl_FragColor を求める
    //     vec2 uv = gl_FragCoord.xy / u_size + u_offset;
    //     uv.x -= floor(uv.x);
    //     uv.y -= floor(uv.y);
    //     gl_FragColor = texture2D(u_texture, uv);
    //   }
    // `;

    this.program = new glProgram(gl, vsrc, fsrc, 
      ["a_pos"], ["u_texture", ...u_list]);
    
    // 画面いっぱいを覆う四角形
    this.vbuffer = new glBuffer(gl, gl.ARRAY_BUFFER);
    this.vbuffer.data(new Float32Array(
        [ -1, -1,   1, -1,   -1, 1,     // １つ目の三角形
           1, -1,   1,  1,   -1, 1 ]),  // ２つ目の三角形
        gl.STATIC_DRAW);
  }

  destructor() {
    util.destruct(this.program);
    util.destruct(this.vbuffer);
  }

  render(n_texture, texture, preparation, destBuffer = null) {
    // 出力先がフレームバッファーなら割り当てる
    if(destBuffer) {
      destBuffer.bind(()=>
        this.#renderCore(n_texture, texture, preparation)
      );
    } else {
      this.#renderCore(n_texture, texture, preparation)
    }
  }

  #renderCore(n_texture, texture, preparation) {
    const {gl, program, vbuffer} = this;
    program.use();
    program.u_texture.i = n_texture;

    // gl.TEXTUREn の n に n_texture をあてはめる
    gl.activeTexture(gl[`TEXTURE${n_texture}`]);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    // コールバック
    preparation(gl, program);

//  // canvas を初期化
//  gl.clearColor(0.0, 0.0, 0.0, 1.0);
//  // gl.clearDepth(1.0);
//  gl.disable(gl.DEPTH_TEST);
//  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//
//  必要な u_ 変数を設定したりとか
//
    // 頂点データ
    program.a_pos.ptr = [vbuffer, 2, gl.FLOAT, false, 0, 0];
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.flush();
  }
}

