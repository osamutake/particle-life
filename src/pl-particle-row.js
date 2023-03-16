export class PLParticleRow {
  constructor(particles, division) {
    this.particles = particles;

    this.division = division;
    this.particles = particles;
    
    this.mem  = wasm.u32.alloc(particles.n);
    this.indices = wasm.i32.alloc( division + 1);
  }
 
  destructor() {
    this.mem.free;
    this.indices.free;
  }
  
  update() {
    wasm.createParticleRow(
      this.particles.n,
      this.particles.mem.ptr,
      this.division,
      this.mem.ptr,
      this.indices.ptr
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
  row(i) {
    let n = this.division;
    let i = (i + n) % n;
    return [this.mem.ptr + this.indices[i] * 4, this.indices[ij+1]-this.indices[ij]]
  }
}

