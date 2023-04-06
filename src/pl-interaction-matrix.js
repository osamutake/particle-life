// ****************************************
//
//    typedef struct {
//        int32_t a, b, c;
//    } interact_t;
//
// ****************************************

import { wasm } from './pl-wasm-loader'
import {ParticleLife} from './particle-life.js'

/**
 * 相互作用マトリクス<br>
 * 整数演算が可能なように事前にスケールした値を作っておく
 * 
 */
export class PLInteractionMatrix {

  /**
   * @param {ParticleLife} world
   */
  constructor(world) {
    this.update(world);
  }
  
  /**
   * 相互作用マトリクスを更新する
   * @param {ParticleLife} world
   */
  update(world) {
    /** @type {ParticleLife} */
    this.world = world;

    if(this.matrix == null) {
      /** 
       * スケールされる前の生のパラメータを格納する
       * @type {number[][][]} 
       */
      this.matrix = 
        [...Array(world.nspecies)].map(() =>
          [...Array(world.nspecies)].map(()=> 
            [0, 0] ))
    } else 
    if(this.matrix.length != world.nspecies){
      this.matrix = 
        [...Array(world.nspecies)].map((_,i) =>
          [...Array(world.nspecies)].map((_,j)=> 
            i < this.matrix.length && j < this.matrix.length 
              ? this.matrix[i][j] 
              : [0, 0]
          )
        );
    }

    // ３つの値を 粒子種数 x 粒子種数 x 2 個 格納する
    let len = 3 * world.nspecies * world.nspecies * 2;
    if(this.mem == null) {
      /**
       * 整数演算が可能なように事前にスケールした値を格納する
       * @type {Int32Array}
       */
      this.mem = wasm.i32.alloc(len * 4);
    } else 
    if(this.mem.length < len){
      let size = Math.max(this.mem.length * 4, len);
      this.mem.free;
      this.mem = wasm.i32.alloc(size);
    }
  }

  /** 手動で後始末をする場合に呼ぶ関数 */
  destructor() {
    this.mem.free;
  }

  /**  
   * 第一引数が関数 (i,j) => [a,b] なら繰り返し呼び出すことですべてのパラメータを設定する<br>
   * 第一引数が関数でなければ i, j のパラメータを a, b に設定し conver を呼ぶ<br>
   * @param {number|function(number,number):number[]} func_or_i
   * @param {number} j
   * @param {number} a
   * @param {number} b
   */
  set(func_or_i, j, a, b) {
    if(func_or_i && (typeof func_or_i === 'function')) {
      const func = func_or_i;

      // func を使って一気に設定する
      for(let i = 0; i < this.world.nspecies; i++)
        for(let j = 0; j < this.world.nspecies; j++)
          this.set(i, j, ...func(i, j));

    } else {
      const i = func_or_i;
      this.matrix[i][j] = [a, b];
      this.convert(i, j); // this.mem をアップデート
    }
  }

  /** 
   * returns [a,b]
   * @param {number} i
   * @param {number} j
   * @returns {number[]}
   */ 
  get(i, j) {
    return this.matrix[i][j];
  }

  /** 
   * 整数演算用に事前スケールした値を mem[i][j] に設定する
   * @param {number} i
   * @param {number} j
   */ 
  convert(i, j) {
    const [a, b] = this.matrix[i][j];
    
    // 整数演算用に事前スケールしておく
    const world = this.world;
    const n = world.nspecies;
    let aa = a /  world.rth1;
    let bb = b / (world.rth2 - world.rth1);
    let cc = b / (world.rmax - world.rth2);
    aa *= world.step * world.scale * 2**32;
    bb *= world.step * world.scale * 2**32;
    cc *= world.step * world.scale * 2**32;
    this.mem[3 * (i * n * 2 + j) + 0] = aa;       // forward
    this.mem[3 * (i * n * 2 + j) + 1] = bb;       // forward
    this.mem[3 * (i * n * 2 + j) + 2] = cc;       // forward
    this.mem[3 * (j * n * 2 + i + n) + 0] = aa;   // backword
    this.mem[3 * (j * n * 2 + i + n) + 1] = bb;   // backword
    this.mem[3 * (j * n * 2 + i + n) + 2] = cc;   // backword
  }
  
  /** 
   * 整数演算用に事前スケールした値を mem[][] に設定する
   */ 
  convertAll() {
    for(let i = 0; i < this.world.nspecies; i++)
      for(let j = 0; j < this.world.nspecies; j++)
        this.convert(i, j);
  }

  /** 
   * another のパラメータを取り込む<br>
   * nspecies は事前にそろえておかなければならない
   * @param {PLInteractionMatrix} another
   */ 
  copyFrom(another) {
    if(this.world.nspecies != another.world.nspecies)
      throw new Error('nspecies should be the same.');
    
    for(let i = 0; i < this.world.nspecies; i++)
      for(let j = 0; j < this.world.nspecies; j++)
        this.set(i, j, ...another.get(i, j));
  }
}
