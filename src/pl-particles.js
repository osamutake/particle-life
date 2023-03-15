// ****************************************
/// 粒子の配列
//    typedef struct {
//        int32_t species, dummy;
//        int32_t x, y;
//        int32_t vx, vy;
//    } particle_t;
// ****************************************

export class PLParticles {

  constructor(nparticles) {
    this.n = Math.floor(nparticles);
    this.mem  = wasm.i32.alloc(6 * nparticles);
  }

  destructor() {
    this.mem.free;
  }

  // x, y は [-0.5, 0.5) の範囲
  set(i, species, x, y, vx, vy) {
    if(i < 0 || this.n <= i) return;  // 範囲外
    
    this.mem[6 * i + 0] = species;
    this.mem[6 * i + 2] = x  * 2**32;  // 整数演算用にスケールする
    this.mem[6 * i + 3] = y  * 2**32;
    this.mem[6 * i + 4] = vx * 2**32;
    this.mem[6 * i + 5] = vy * 2**32;
  }

  // x, y は [-0.5, 0.5) の範囲
  // returns [species, x, y, vx, vy]
  get(i) {
    if(i < 0 || this.n <= i) return;
    return [
      this.mem[6 * i + 0],
      this.mem[6 * i + 2] / 2**32,     // 整数演算用スケールを戻す
      this.mem[6 * i + 3] / 2**32,
      this.mem[6 * i + 4] / 2**32,
      this.mem[6 * i + 5] / 2**32
    ];
  }

  // x, y は [-0.5, 0.5) の範囲
  // calls func(species, x, y)
  forEach(func) {
    for(let i = 0; i < this.n; i++)
      func(
        this.mem[6 * i + 0],          // species
        this.mem[6 * i + 2] / 2**32,  // x
        this.mem[6 * i + 3] / 2**32   // y
      );
  }
}
