export class PLParticleGrid {
  constructor(particles, division) {
    this.particles = particles;

    this.division = division;
    this.particles = particles;
    
    this.mem  = wasm.u32.alloc(particles.n);
    this.indices = wasm.i32.alloc( (2 ** division) ** 2 + 1);
    this.work = wasm.u32.alloc(particles.n);
  }
 
  destructor() {
    this.mem.free;
    this.indices.free;
  }
  
  update() {
    wasm.fillParticleGrid(
      this.particles.n,
      this.division,
      this.particles.mem.ptr,
      this.mem.ptr
    );
    this.mem.sort();
    
    wasm.separateParticleGrid(
      this.particles.n,
      this.division,
      this.mem.ptr,
      this.indices.ptr
    );
  }
  
  // ポインタと要素数を返す
  cell(i, j) {
    let n = 2 ** this.division;
    let ij = ((i + n) % n) * n + (j + n) % n;
    return [this.mem.ptr + this.indices[ij] * 4, this.indices[ij+1]-this.indices[ij]]
  }
}

