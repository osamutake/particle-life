// ****************************************
/// ワールド
//      typedef struct {
//          int32_t nspecies;
//          int32_t nparticles;
//          int32_t rth1, rth2, rmax;
//          int32_t perterb, decel;
//      } world_t;
// ****************************************

import { PLInteractionMatrix } from './pl-interaction-matrix.js'
import { PLParticles } from './pl-particles.js'
import { PLParticleSorter } from './pl-particle-sorter.js'

export class ParticleLife {
  constructor(options = {}, rand) {

    // デフォルト値を指定
    util.importOptions(this, options, {
      nspecies: 6,
      nlattice: 30,
      perterb: 0.001,
      decel: 0.499,
      particle_radius: 0.0025,
    });
    this.nparticles = this.nlattice * this.nlattice;
    this.rand = rand;

    this.interaction = new PLInteractionMatrix(options);
    this.particles = new PLParticles(this.nparticles);
    this.particleSorter = new PLParticleSorter(this.particles);

    // C++ 用の構造体
    this.mem = wasm.i32.alloc(8); // 7 で良いけど切りが良いので
    this.mem[0] = this.nspecies;
    this.mem[1] = this.nparticles;
    this.mem[2] = this.interaction.rth1 * 2**32; // 整数演算用にスケール
    this.mem[3] = this.interaction.rth2 * 2**32;
    this.mem[4] = this.interaction.rmax * 2**32;
    this.mem[5] = this.perterb          * 2**32;
    this.mem[6] = this.decel            * 2**32;
  }

  destructor() {
    this.mem.free;
    util.destruct(this.rand);
    util.destruct(this.interaction);
    util.destruct(this.particles);
  }

  // 粒子配置の初期設定
  setupParticles(func) {
    for(let i = 0; i < this.nlattice; i++) {
      for(let j = 0; j < this.nlattice; j++) {
        this.particles.set(i * this.nlattice + j, ...func(i, j));
      }
    }
  }
  
  // 粒子同士の相互作用を計算して vx, vy を更新する
  interactParticles() {
    this.particleSorter.sort();
    wasm.interactParticles(
        this.mem.ptr, this.interaction.mem.ptr, this.particles.mem.ptr, this.particleSorter.mem.ptr);
  }
  
  // 斥力効果を及ぼす
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
