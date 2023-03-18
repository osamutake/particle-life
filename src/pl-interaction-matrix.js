// ****************************************
/// 相互作用マトリクス
//
// 整数演算が可能なように事前にスケールした値を作っておく
//
//    typedef struct {
//        int32_t a, b, c;
//    } interact_t;
// ****************************************

export class PLInteractionMatrix {

  constructor(options = {}) {
    util.importOptions(this, options, {
        nspecies: 30,
        rth1: 0.05,
        rth2: 0.1,
        rmax: 0.2,
        step: 1.0
    });

    // ３つの値を 粒子種数 x 粒子種数 個 格納する
    this.mem = wasm.i32.alloc(3 * this.nspecies * this.nspecies * 2);
  }

  // 手動で後始末をする場合に呼ぶ関数
  destructor() {
    this.mem.free;
  }

  set(func_or_i, j, a, b) {
    if(func_or_i && (typeof func_or_i === 'function')) {
      const func = func_or_i;

      // func を使って一気に設定する
      for(let i = 0; i < this.nspecies; i++)
        for(let j = 0; j < this.nspecies; j++)
          this.set(i, j, ...func(i, j));

    } else {
      const i = func_or_i;

      // 整数演算用に事前スケールしておく
      const n = this.nspecies;
      const aa = this.step * a /  this.rth1              * 2**32;
      const bb = this.step * b / (this.rth2 - this.rth1) * 2**32;
      const cc = this.step * b / (this.rmax - this.rth2) * 2**32;
      this.mem[3 * (i * n * 2 + j) + 0] = aa;       // forward
      this.mem[3 * (i * n * 2 + j) + 1] = bb;       // forward
      this.mem[3 * (i * n * 2 + j) + 2] = cc;       // forward
      this.mem[3 * (j * n * 2 + i + n) + 0] = aa;   // backword
      this.mem[3 * (j * n * 2 + i + n) + 1] = bb;   // backword
      this.mem[3 * (j * n * 2 + i + n) + 2] = cc;   // backword
    }
  }

  // return [a, b]
  get(i, j) {
    const n = this.nspecies;
    return [          // 整数演算用スケールを戻す
      this.mem[3 * (i * n * 2 + j) + 0] *  this.rth1              / 2**32 / this.step, //  a
      this.mem[3 * (i * n * 2 + j) + 1] * (this.rth2 - this.rth1) / 2**32 / this.step  //  b
    ];
  }

  copyFrom(another) {
    if(this.nspecies != another.nspecies) return;
    
    for(let i = 0; i < this.nspecies; i++)
      for(let j = 0; j < this.nspecies; j++)
        this.set(i, j, ...another.get(i, j));
  }
}
