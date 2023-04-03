/**
 * シード指定可能な乱数器を提供する
 * @module xorshift128
 * @example
 *   import {XorShift128} from "xorshift128.js"
 * 
 *   function test(seed) {
 *     var rand = new XorShift128(seed)
 *     console.log(rand.next())
 *     console.log(rand.next())
 *     console.log(rand.next())
 *     console.log(rand.next())
 *     rand.destructor()
 *   }
 * 
 *   test(12345)
 */

import { wasm } from './pl-wasm-loader'

/**
 * シード指定可能な乱数器
 * 
 * 128bit XorShift 乱数を生成する<br>
 * アルゴリズムについては <a href="https://ja.wikipedia.org/wiki/Xorshift">https://ja.wikipedia.org/wiki/Xorshift</a> を参照<br>
 * コア部分は particle-life.wasm に入っている<br>
 * これは性能向上のためよりも wasm 内から呼び出しやすくするため<br>
 * 
 * @example
 *   import {XorShift128} from "xorshift128.js"
 * 
 *   function test(seed) {
 *     var rand = new XorShift128(seed)
 *     console.log(rand.next())
 *     console.log(rand.next())
 *     console.log(rand.next())
 *     console.log(rand.next())
 *     rand.destructor()
 *   }
 * 
 *   test(12345)
 */
export class XorShift128 {
  /**
   * @param {number} [seed = Math.random() * 2**53] - 乱数のシード値。同じシード値で作成された乱数器は同じ乱数列を発生する
   * @param {number} [n = 1000] - 始めに n 回 next() を呼び出すことで seed 値が 128bit に比べて小さい影響を緩和する
   */
  constructor(seed = Math.random() * 2**53, n = 1000) {
    // シード値を設定
    this.mem = wasm.i32.alloc(4);
    this.mem[3] = (seed / 2**96) & 0xffffffff;
    this.mem[2] = (seed / 2**64) & 0xffffffff;
    this.mem[1] = (seed / 2**32) & 0xffffffff;
    this.mem[0] =  seed          & 0xffffffff;

    // 始めに多数回回すことで seed が 128bit 未満である影響を軽減する
    for(let i = 0; i < n; i++) this.next();
  }

  /**
   * 内部で確保したメモリを解放するために必要なくなったら手動で呼び出す<br>
   * とはいえ 128bit 分だけであり GC 時には自動的に回収されるため、放っておいても問題ないケースがほとんどであるはず
   */ 
  destructor() {
    this.mem.free;
  }

  /**
   *  [0, 1) の範囲の乱数 (31bit 精度) を得る
   * @returns {number}
   */ 
  next() {
    return wasm.XorShift128Next(this.mem.ptr);
  }
}
