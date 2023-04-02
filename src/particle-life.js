// ****************************************
/// ワールド
//      typedef struct {
//          int32_t nspecies;
//          int32_t nparticles;
//          int32_t rth1, rth2, rmax;
//          int32_t perturb, decel;
//          int32_t row_div;
//      } world_t;
// ****************************************

import { PLInteractionMatrix } from './pl-interaction-matrix.js'
import { PLParticles } from './pl-particles.js'

/**
 * Particle Life 計算の全体設定を保持します
 */
export class ParticleLife {
  /**
   * コンストラクタ
   * @param {Object} options - 設定を与える
   * @param {XorShift128} rand - world_seed により生成された乱数器
   */
  constructor(options = {}, rand) {
    this.update(options, rand);
  }

  /**
   * 設定を変更する
   * @param {Object} options - 設定を与える
   * @param {XorShift128} rand - world_seed により生成された乱数器 省略時には現在のものから変更しない
   */
  update(options, rand = this.rand) {

    // 指定されていないパラメータは現状通り
    // 初回は規定値をあてはめる
    const defaultParams = util.importOptions({}, this, {
      nspecies: 6,
      nlattice: 30,
      rth1: 0.05,
      rth2: 0.1,
      rmax: 0.2,
      perturb: 0.001,
      decel: 0.499,
      scale: 1.0,
      step: 1.0,
      row_div: 3,
      pshape: 1,
      highlight: 1,
      glowr: 4,
      glowi: 0.8,
    })
    util.importOptions(this, options, defaultParams)

    this.rand = rand;
    this.nparticles = this.nlattice * this.nlattice;

    if(!this.interaction) {
      this.interaction = new PLInteractionMatrix(this);
    } else {
      this.interaction.update(this);
    }
    
    if(!this.particles) {
      this.particles = new PLParticles(this.nparticles);
    } else {
      this.particles.update(this.nparticles);
    }

    // grid : ncol x nrow + 1
    // xmax : row_div / 2
    let ncol = Math.floor(2**32 / (Math.round(this.rmax/this.scale * 2**32)));
    if(ncol <= 2) ncol = 1;
    let nrow = ncol * this.row_div;

    // C++ 用の構造体 + grid ワーキングメモリ
    let len = 8 + (ncol * nrow + 1 + this.row_div + 1) * 4;
    if (!this.mem) {
      this.mem = wasm.i32.alloc(len * 4);
    } else 
    if(this.mem.length < len) {
      let size = Math.max(this.mem.length * 4, len);
      this.mem.free;
      this.mem = wasm.i32.alloc(size);
    }
    
    this.mem[0] = this.nspecies;
    this.mem[1] = this.nparticles;
    this.mem[2] = this.rth1    / this.scale * 2**32; // 整数演算用にスケール
    this.mem[3] = this.rth2    / this.scale * 2**32;
    this.mem[4] = this.rmax    / this.scale * 2**32;
    this.mem[5] = this.perturb / this.scale * 2**32;
    this.mem[6] = this.decel                * 2**30;
    this.mem[7] = this.row_div;
  }

  /**
   * デストラクタ
   * リソースを解放したいときに手動で呼び出す必要がある
   * util.destruct 経由で呼び出すと null の確認が必要なくて便利
   * 
   *  @example
   *  util.destruct(world)
   */
  destructor() {
    this.mem.free;
    util.destruct(this.rand);
    util.destruct(this.interaction);
    util.destruct(this.particles);
  }

  /**
   * 粒子配置の初期設定を行う
   * 
   * @param {Function} func - (i, j) を渡されるので species, x, y, vx, vy を返す
   */
  setupParticles(func) {
    for(let i = 0; i < this.nlattice; i++) {
      for(let j = 0; j < this.nlattice; j++) {
        this.particles.set(i * this.nlattice + j, ...func(i, j));
      }
    }
  }
  
  /**
   * 粒子同士の相互作用を計算して vx, vy を更新する
   */
  interactParticles() {
    wasm.interactParticles(
      this.mem.ptr, this.interaction.mem.ptr, this.particles.mem.ptr);
  }
  
  /**
   * 斥力効果を及ぼす
   * @param {Integer} repelX - 斥力効果を及ぼす中心座標の X
   * @param {Integer} repelY - 斥力効果を及ぼす中心座標の Y
   */
  repelParticles(repelX, repelY) {
    if(isNaN(repelX) || isNaN(repelY)) return;

    // 反発
    for(let i = 0; i < this.nparticles; i++) {
      let [species, x, y, vx, vy] = this.particles.get(i);
      let dx = x - repelX; dx -= Math.round(dx);
      let dy = y - repelY; dy -= Math.round(dy);
      let d = Math.hypot(dx, dy);
      if( d < 0.2 ) {
        if( d < 0.1 ) {
          vx += 0.05 * dx / d;
          vy += 0.05 * dy / d;
        } else {
          vx += 0.05 * (d-0.1) * dx / d;
          vy += 0.05 * (d-0.1) * dy / d;
        }
        this.particles.set(i, species, x, y, vx, vy);
      }
    }
  }

  // 粒子を動かす
  moveParticles() {
    wasm.moveParticles(
        this.mem.ptr, this.rand.mem.ptr, this.particles.mem.ptr);
  }
}
