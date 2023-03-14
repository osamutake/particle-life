// ****************************************
/// 粒子種生成確率を管理する
// ****************************************

export class PLSpeciesDistribution {

  // 確率分布を既存の粒子数あるいは乱数から作成
  constructor(nspecies, particles_or_rand) {
    this.distribution = Array(nspecies);
    if(particles_or_rand.constructor.name == 'PLParticles') {
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
  
  ratio(sp) {
    return this.distribution[sp] / this.sum;
  }

  // distribution から accumulation を作る
  update() {
    this.sum = 0;
    this.accumulation = this.distribution.map(d => this.sum += d).map(d => d/this.sum);
  }

  // [0, 1) の一様乱数 r を粒子種に変換する
  species(r) {
    return this.accumulation.findIndex((elem) => r <= elem);
  }
}
