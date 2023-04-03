/**
 * @module pl-wasm-loader
 */

import { loadWasm } from './util.js'
// import wasmBinary from '../obj/particle-life.wasm.base64.js'
//
// 次のようにして生成できるが今はしていない
// obj/particle-life.wasm.base64.js: dist/particle-life.wasm
//	echo 'export default `' > $@
//	base64 $< >> $@
//	echo '`' >> $@


/**
 * @typedef {object} WasmArrayExt
 * @property {function(): void} free
 * @property {number} ptr
 * 
 * @typedef {object} WasmUint32ArrayExt
 * @property {function(number): Uint32Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmInt32ArrayExt
 * @property {function(number): Int32Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmUint16ArrayExt
 * @property {function(number): Uint16Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmInt16ArrayExt
 * @property {function(number): Int16Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmUint8ClampedArraybufferExt
 * @property {function(number): Uint8ClampedArraybuffer & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmUint8ArrayExt
 * @property {function(number): Uint8Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmInt8ArrayExt
 * @property {function(number): Int8Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmBigInt64ArrayExt
 * @property {function(number): BigInt64Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmBigUint64ArrayExt
 * @property {function(number): BigUint64Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmFloat32ArrayExt
 * @property {function(number): Float32Array & WasmArrayExt} alloc
 * 
 * @typedef {object} WasmFloat64ArrayExt
 * @property {function(number): Float64Array & WasmArrayExt} alloc
 */

 /** 
  * wasm から exports された関数もメンバーとして取り込んでいる
  * @typedef {object} WasmWrapper
  * @property {WasmUint32ArrayExt & Uint32Array} u32
  * @property {WasmInt32ArrayExt & Int32Array} i32
  * @property {WasmUint16ArrayExt & Uint16Array} u16
  * @property {WasmInt16ArrayExt & Int16Array} i16
  * @property {WasmUint8ClampedArraybufferExt & Uint8ClampedArraybuffer} u8c
  * @property {WasmUint8ArrayExt & Uint8Array} u8 
  * @property {WasmInt8ArrayExt & Int8Array} i8 
  * @property {WasmBigInt64ArrayExt & BigInt64Array} i64
  * @property {WasmBigUint64ArrayExt & BigUint64Array} u64
  * @property {WasmFloat32ArrayExt & Float32Array} f32
  * @property {WasmFloat64ArrayExt & Float64Array} f64
  */

/** 
 * メモリアクセス用のヘルパーに加えて、wasm から exports された関数がメンバーとして取り込まれている
 * @type {WasmWrapper} 
 */
var wasm = null;

/** particle-life.wasm を読み込んで wasm に格納する */
async function load() {
  wasm = await loadWasm('particle-life.wasm')

  // let wasm = await loadWasm(wasmBinary, true);

  // wasmBinary を使ってコードを直接 javascript に埋め込む
  // ことも考えたのだけれど、javascript を先に起動して、
  // wasm は preload して fetch する方が速いようなので
  // wasm の埋め込みは行わないことにした
  // デバッグもしにくくなるし
}

export {wasm, load}