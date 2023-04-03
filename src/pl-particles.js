/****************************************

// 粒子の配列

struct {
    int32_t species, dummy;
    int32_t x, y;
    int32_t vx, vy;
} particles[n];       // int32_t * 6  * nparticles


// グリッド構造を保持するためのワーキングメモリ

typedef struct {
    particle_t *p;    // 32bit
    int16_t x;
    int16_t row;
} index_t;

index_t grid[nrow * ncol + 1] // + 1 に注意

****************************************/

import { wasm } from './pl-wasm-loader'

/**
 * 粒子の配列 + ワーキングメモリ を管理する
 */
export class PLParticles {

  /**
   * @param {number} nparticles - 粒子数
   */
  constructor(nparticles) {
    this.update(nparticles);
  }
  
  /**
   * 粒子数を変更する
   * @param {number} nparticles - 粒子数
   */
  update(nparticles) { 
    this.n = Math.floor(nparticles);
    
    // 32bit を単位として
    //   6 x n       が粒子自身
    //   2 x (n + 1) がソート用のワーキングメモリ  TODO: これ変な計算だ
    let len = (6 + 2) * nparticles + 2;

    // 後で広げる可能性を考えて必要量の４倍取っておく
    if(!this.mem) {             // 初回
      this.mem  = wasm.i32.alloc(len * 4);
      this.memVertices = new Int16Array(5 * nparticles * 4 * 4);
    } else 
    if(this.mem.length < len) { // 大きくしなければならないときのみ更新
      let size = Math.max(this.mem.length * 4, len);
      this.mem.free;
      this.mem = wasm.i32.alloc(size);
      this.memVertices = new Int16Array(5 * size / 8 * 4 * 4);
    }
  }

  /** */
  destructor() {
    this.mem.free;
  }

  /**
   * 値を設定する<br>x, y は [-0.5, 0.5) の範囲
   */
  set(i, species, x, y, vx, vy) {
    if(i < 0 || this.n <= i) return;  // 範囲外
    
    this.mem[6 * i + 0] = species;
    this.mem[6 * i + 2] = x  * 2**32;  // 整数演算用にスケールする
    this.mem[6 * i + 3] = y  * 2**32;
    this.mem[6 * i + 4] = vx * 2**32;
    this.mem[6 * i + 5] = vy * 2**32;
  }

  /**
   * 値を取得する<br>
   * returns [species, x, y, vx, vy]<br>
   * x, y は [-0.5, 0.5) の範囲
   */
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

  /**
   * 全ての粒子に対して func(species, x, y) を呼ぶ<br>
   * x, y は [-0.5, 0.5) の範囲
   * @param {function(number,number,number): void} func
   */
  forEach(func) {
    for(let i = 0; i < this.n; i++)
      func(
        this.mem[6 * i + 0],          // species
        this.mem[6 * i + 2] / 2**32,  // x
        this.mem[6 * i + 3] / 2**32   // y
      );
  }
  
  /** 
   * 頂点シェーダーに渡すデータを作成する<br>
   * 一周回って反対側に現れる点は複数登録される<br>
   * Int16Array に入ったデータと粒子数（副成分を含む）を返す
   * @param {number[][]} palette - カラーパレット
   * @param {number} psize - 粒子直径
   * @returns {any[]}
   */
  vertices(palette, psize) {
    const v = this.memVertices;
    const n = this.n;
    const mem = this.mem;
    psize *= 65536;
    
    let j = 0;
    for(let i = 0; i < n; i++) {
      const px = mem[6 * i + 2] >>> 16;
      const py = mem[6 * i + 3] >>> 16;
      const c  = palette[mem[6 * i + 0]];
      
      const register2 = (_px, _py) => {
        v[5 * j    ] = (      + _px) / 2 - 32768/2;
        v[5 * j + 1] = (65536 - _py) / 2 - 32768/2;
        v[5 * j + 2] = c[0] * 127;
        v[5 * j + 3] = c[1] * 127;
        v[5 * j + 4] = c[2] * 127;
        j++;
      }
      
      // 境界線に近い点を複製しながら登録する
      
      const register = (_px, _py) => {
        register2(_px, _py);
        if(_py <         psize) register2(_px, _py + 65536);
        if(_py > 65536 - psize) register2(_px, _py - 65536);
      }
      
      register(px, py);
      if(px <         psize) register(px + 65536, py);
      if(px > 65536 - psize) register(px - 65536, py);
    }
    return [v, j];
  }

}
