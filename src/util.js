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

// wasm ファイルからモジュールを読み込む
// メモリアクセス用のヘルパーを含めて返す
export async function loadWasm(wasmFile) {
  let obj = await WebAssembly.instantiateStreaming(fetch(wasmFile), {})
  let wasm = Object.assign({}, obj.instance.exports);

  // ヒープメモリのユーティリティ
  
  // javascript オブジェクトがガーベージコレクションされる
  // 時に free すべきメモリを管理する
  
  const finalizer = new FinalizationRegistry((pointer) => {
    if(Array.isArray(pointer)) {
      for(let p of pointer) wasm.free(p);
    } else {
      wasm.free(pointer);
    }
  });

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
      const mem = new _Class(wasm.memory.buffer, 
          wasm.malloc(_Class.BYTES_PER_ELEMENT * n), n)

      mem.ptr = mem.byteOffset; // シュガー

      // ガーベージコレクションされるときに free するよう登録
      finalizer.register(mem, mem.ptr);
      
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
export function destruct(obj)
{
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

// obj のプロキシを作る
// プロパティの変更を検出可能になる
export function createProxy(obj, updateFunc) {
  let proxy = {}
  for(let k of Object.keys(obj)) {
    Object.defineProperty(proxy, k, {
      get() { return obj[k]; },
      set(v) { updateFunc(obj, Object.fromEntries([[k, v]])); }
    });
  }
  return proxy;
}

export function int2hex(i) {
  return ("000"+(((i|0) >>> 16)&0xffff).toString(16)).slice(-4) +
         ("000"+(((i|0)       )&0xffff).toString(16)).slice(-4) ;
}
