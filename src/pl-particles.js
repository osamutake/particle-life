/****************************************

粒子の配列 + ワーキングメモリ を管理

struct {
    int32_t species, dummy;
    int32_t x, y;
    int32_t vx, vy;
} particles[n];       // int32_t * 6  * nparticles

typedef struct {
    particle_t *p;
    int16_t x;
    int16_t row;
} index[n];

index_t grid[nrow * ncol]

****************************************/

export class PLParticles {

  constructor(nparticles) {
    this.update(nparticles);
  }
  
  update(nparticles) { 
    this.n = Math.floor(nparticles);
    
    // particles : 6 x n が粒子自身
    // index : 2 x n がソート用のワーキングメモリ
    let len = (6 + 2) * nparticles + 2;
    if(!this.mem) {
      this.mem  = wasm.i32.alloc(len * 4);
    } else 
    if(this.mem.length < len) {
      let size = Math.max(this.mem.length * 4, len);
      this.mem.free;
      this.mem = wasm.i32.alloc(size);
    }
    this.memVertices = new Int16Array(5 * nparticles);
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
  
  vertices(palette) {
    const v = this.memVertices;
    const n = this.n;
    const mem = this.mem;
    for(let i = 0; i < n; i++) {
      v[5 * i    ] = mem[6 * i + 2] >>> 16;
      v[5 * i + 1] = - (mem[6 * i + 3] >>> 16);

      let c = palette[mem[6 * i + 0]];
      v[5 * i + 2] = c[0] * 127;
      v[5 * i + 3] = c[1] * 127;
      v[5 * i + 4] = c[2] * 127;
    }
    return v;
  }

}
