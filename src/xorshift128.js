// ****************************************
/// シード指定可能な乱数器
// ****************************************

/*
  import XorShift128 from "xorshift128.js"

  function test(seed) {
    var rand = new XorShift128(seed)
    console.log(rand.next())
    console.log(rand.next())
    console.log(rand.next())
    console.log(rand.next())
  }

  test(12345)
*/

// 128bit XorShift 乱数
// https://ja.wikipedia.org/wiki/Xorshift より

export class XorShift128 {
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

  // 手動で後始末をする場合に呼ぶ関数
  destructor() {
    this.mem.free;
  }

  // 次の乱数値を得る
  next() {
    return wasm.XorShift128Next(this.mem.ptr);
  }
}
