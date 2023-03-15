export class PLParticleGrid {
  constructor(particles, division) {
    this.particles = particles;

    this.division = division;
    this.particles = particles;
    
    this.mem  = wasm.u32.alloc(particles.n);
    this.indices = wasm.i32.alloc( (2 ** division) ** 2 + 1);
    this.work = wasm.u32.alloc(particles.n);

    this.update();
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
    /*
    const n = this.particles.n;
    const shift = 4 - this.division;
    for(let i = 0; i < n; i++) {
      this.mem[i] = i |
        (this.particles.mem[i*6+2] >>> (shift    )) & 0xf0000000 |
        (this.particles.mem[i*6+3] >>> (shift + 4)) & 0x0f000000 ;
    }
    */
    this.mem.sort();
    
    wasm.separateParticleGrid(
      this.particles.n,
      this.division,
      this.mem.ptr,
      this.indices.ptr
    );
    /*
    let last = -1, j = 0;
    for(let i = 0; i < n; i++) {
      let now = this.mem[i] & 0xff000000;
      if(last != now) {
        this.indices[j++] = i;
        last = now;
      }
    }
    this.indices[j] = n;
    */
  }
  
  showForDebug() {
    for(let i = 0; i < this.particles.n; i++){
      console.log(
        ("000"+((this.mem[i] >>> 16)&0xffff).toString(16)).slice(-4) +
        ("000"+((this.mem[i]       )&0xffff).toString(16)).slice(-4) );
    }
  }

  adjacent(i, j) {
    let n = 2 ** this.division;
    let s = i * n +  j;
    let e = i * n + (j + 2) % n;
    let p;
    p = this.collect(i    , j    );
    p = this.collect(i    , j + 1, p);
    p = this.collect(i + 1, j - 1, p);
    p = this.collect(i + 1, j    , p);
    p = this.collect(i + 1, j + 1, p);
    return p;
  }
  
  collect(i, j, p = 0) {
    let n = 2 ** this.division;
    let ij = ((i + n) % n) * n + (j + n) % n;
    for(let k = this.indices[ij]; k < this.indices[ij+1]; k++)
      this.work[p++] = this.mem[k] & 0x00ffffff;
    return p;
  }
}

