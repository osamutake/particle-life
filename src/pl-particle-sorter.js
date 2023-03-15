export class PLParticleSorter {
  constructor(particles) {
    this.particles = particles;

    const n = particles.n;
    this.mem  = wasm.u16.alloc(n);
    for(let i = 0; i < n; i++)
      this.mem[i] = i;
  }
  
  destructor() {
    this.mem.free;
  }
  
  sort() {
    wasm.sortParticles1(this.particles.n, this.mem.ptr, this.particles.mem.ptr);
  }
  
  check() {
    let mem = this.particles.mem;
    let b = mem[6 * this.mem[0] + 2];
    if(b < 0) b += 2**32;
    for(let i = 1; i < this.particles.n; i++) {
      let a = b;
      b = mem[6 * this.mem[0] + 2];
      if(b < 0) b += 2**32;

      if(a > b) return 1 + i;
    }
    return 0;
  }
}
