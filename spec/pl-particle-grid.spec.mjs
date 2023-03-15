import * as Util from '../src/util.js'
import { PLParticles } from '../src/pl-particles.js'
import { PLParticleGrid } from '../src/pl-particle-grid.js'

describe("PLParticleGrid", function () {

  beforeAll(async function() {
    if(!window.wasm)
      window.wasm = await Util.loadWasm('/__spec__/spec/assets-generated/particle-life.wasm');
  });

  it("can separate particles in grids", function() {
    let particles = new PLParticles(8);
    particles.set(0, 0, -0.1,  0.1, 0, 0);
    particles.set(1, 0, -0.1, -0.1, 0, 0);
    particles.set(2, 0,  0.1,  0.1, 0, 0);
    particles.set(3, 0,  0.1, -0.1, 0, 0);
    particles.set(4, 0, -0.2,  0.2, 0, 0);
    particles.set(5, 0, -0.2, -0.2, 0, 0);
    particles.set(6, 0,  0.2,  0.2, 0, 0);
    particles.set(7, 0,  0.2, -0.2, 0, 0);

    let grid = new PLParticleGrid(particles, 1);

    const collectAsArray = (i, j) => [...Array(grid.collect(i, j))].map((_, k)=>grid.work[k]);

/*
console.log(Util.int2hex(particles.mem[6*0+2])+" "+Util.int2hex(particles.mem[6*0+3]));
console.log(Util.int2hex(particles.mem[6*1+2])+" "+Util.int2hex(particles.mem[6*1+3]));
console.log(Util.int2hex(particles.mem[6*2+2])+" "+Util.int2hex(particles.mem[6*2+3]));
console.log(Util.int2hex(particles.mem[6*3+2])+" "+Util.int2hex(particles.mem[6*3+3]));
console.log(Util.int2hex(particles.mem[6*4+2])+" "+Util.int2hex(particles.mem[6*4+3]));
console.log(Util.int2hex(particles.mem[6*5+2])+" "+Util.int2hex(particles.mem[6*5+3]));
console.log(Util.int2hex(particles.mem[6*6+2])+" "+Util.int2hex(particles.mem[6*6+3]));
console.log(Util.int2hex(particles.mem[6*7+2])+" "+Util.int2hex(particles.mem[6*7+3]));
*/
    expect(grid.collect(0, 0)).toBe(2);
    expect([2, 6].includes(grid.work[0])).toBe(true);
    expect([2, 6].includes(grid.work[1])).toBe(true);

    expect(grid.collect(1, 0)).toBe(2);
    expect([0, 4].includes(grid.work[0])).toBe(true);
    expect([0, 4].includes(grid.work[1])).toBe(true);

    expect(grid.collect(0, 1)).toBe(2);
    expect([3, 7].includes(grid.work[0])).toBe(true);
    expect([3, 7].includes(grid.work[1])).toBe(true);

    expect(grid.collect(1, 1)).toBe(2);
    expect([1, 5].includes(grid.work[0])).toBe(true);
    expect([1, 5].includes(grid.work[1])).toBe(true);
  });

  it("can generate list of particles in adjacent grid cells", function() {
    let particles = new PLParticles(8);
    particles.set(0, 0, -0.1,  0.1, 0, 0);  // 30
    particles.set(1, 0, -0.1, -0.1, 0, 0);  // 33   2      0
    particles.set(2, 0,  0.1,  0.1, 0, 0);  // 00     6  4  
    particles.set(3, 0,  0.1, -0.1, 0, 0);  // 03     7  5  
    particles.set(4, 0, -0.4,  0.4, 0, 0);  // 21   3      1
    particles.set(5, 0, -0.4, -0.4, 0, 0);  // 22
    particles.set(6, 0,  0.4,  0.4, 0, 0);  // 11
    particles.set(7, 0,  0.4, -0.4, 0, 0);  // 12

    let grid = new PLParticleGrid(particles, 2);

    const collectAsArray = (i, j) => [...Array(grid.collect(i, j))].map((_, k)=>grid.work[k]);

    expect(collectAsArray(0, 0)).toEqual([2]);
    expect(collectAsArray(1, 0)).toEqual([]);
    expect(collectAsArray(2, 0)).toEqual([]);
    expect(collectAsArray(3, 0)).toEqual([0]);
    expect(collectAsArray(0, 1)).toEqual([]);
    expect(collectAsArray(1, 1)).toEqual([6]);
    expect(collectAsArray(2, 1)).toEqual([4]);
    expect(collectAsArray(3, 1)).toEqual([]);
    expect(collectAsArray(0, 2)).toEqual([]);
    expect(collectAsArray(1, 2)).toEqual([7]);
    expect(collectAsArray(2, 2)).toEqual([5]);
    expect(collectAsArray(3, 2)).toEqual([]);
    expect(collectAsArray(0, 3)).toEqual([3]);
    expect(collectAsArray(1, 3)).toEqual([]);
    expect(collectAsArray(2, 3)).toEqual([]);
    expect(collectAsArray(3, 3)).toEqual([1]);

/*
adjucent:

(i    , j    )
(i    , j + 1)
(i + 1, j - 1)
(i + 1, j    )
(i + 1, j + 1)

   2      0
     6  4  
     7  5  
   3      1

*/
    const adjacentAsArray = (i, j) => [...Array(grid.adjacent(i, j))].map((_, k)=>grid.work[k]);

    expect(adjacentAsArray(0, 0)).toEqual([2, 6]);
    expect(adjacentAsArray(1, 0)).toEqual([6, 4]);
    expect(adjacentAsArray(2, 0)).toEqual([4, 1, 0]);
    expect(adjacentAsArray(3, 0)).toEqual([0, 3, 2]);
    expect(adjacentAsArray(0, 1)).toEqual([6, 7]);
    expect(adjacentAsArray(1, 1)).toEqual([6, 7, 4, 5]);
    expect(adjacentAsArray(2, 1)).toEqual([4, 5, 0]);
    expect(adjacentAsArray(3, 1)).toEqual([2]);
    expect(adjacentAsArray(0, 2)).toEqual([3, 6, 7]);
    expect(adjacentAsArray(1, 2)).toEqual([7, 4, 5]);
    expect(adjacentAsArray(2, 2)).toEqual([5, 1]);
    expect(adjacentAsArray(3, 2)).toEqual([1, 3]);
    expect(adjacentAsArray(0, 3)).toEqual([3, 2, 7]);
    expect(adjacentAsArray(1, 3)).toEqual([5]);
    expect(adjacentAsArray(2, 3)).toEqual([1, 0]);
    expect(adjacentAsArray(3, 3)).toEqual([1, 0, 3, 2]);

  });
});
