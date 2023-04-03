/**
 * @moule pl-species-distribution
 */

import {PLParticles} from "./pl-particles.js"
import {XorShift128} from "./xorshift128.js"

/**
 * 粒子種生成確率を管理する
 */
export class PLSpeciesDistribution {

  /** 
   * 確率分布を既存の粒子数あるいは乱数器から作成 <br>
   * 乱数器からは一様乱数の５回平均で分布を決める
   * @param {number} nspecies
   * @param {PLParticles|XorShift128} particles_or_rand
   */ 
  constructor(nspecies, particles_or_rand) {
    /** 
     * 粒子種毎の割合を格納する<br>値は正規化されていなくてもよい。<br>
     * 変更したら update() を呼び出すこと。
     * @type {number[]} 
     */
    this.distribution = Array(nspecies);
    if(particles_or_rand.constructor.name == PLParticles.name) {
      // 粒子種数を数える
      let particles = particles_or_rand;
      for(let i = 0; i < particles.n; i++) {
        let sp = particles.get(i)[0];
        this.distribution[sp] = 1 + (this.distribution[sp] || 0);
      }
    } else {
      // 粒子種に偏りを持たせるための確率分布を作る
      let rand = particles_or_rand;
      for(let i = 0; i < nspecies; i++) {
        for(let j = 0; j < 5; j++) {  // 一様乱数の５回平均
          this.distribution[i] = rand.next() + (this.distribution[i] || 0);
        }
      }
    }

    this.update();
  }
  
  /** 
   * 粒子種 sp の 比率を返す
   * @param {number} sp - 粒子種
   */
  ratio(sp) {
    return this.distribution[sp] / this.sum;
  }

  /**
   * distribution から accumulation を作る<br>
   * distribution を変更したら手動で呼び出す必要がある
   */
  update() {
    /**
     * distribution[] の合計<br>update() で更新される。
     * @type {number}
     */
    this.sum = 0;

    /**
     * distribution[] を正規化して積分したもの<br>update() で更新される<br>species(r) が乱数を粒子種に変換するのに用いられる
     * @type {number[]}
     */
    this.accumulation = this.distribution.map(d => this.sum += d).map(d => d/this.sum);
  }

  /**
   * [0, 1) の一様乱数 r から distribution[] にしたがってランダムに粒子種を選ぶ
   * @param {number} r - [0, 1) の一様乱数
   */ 
  species(r) {
    return this.accumulation.findIndex((elem) => r <= elem);
  }
}
