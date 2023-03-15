import * as Util from '../src/util.js'
import { PLParticles } from '../src/pl-particles.js'

describe("PLParticles", function () {

  beforeAll(async function() {
    if(!window.wasm)
      window.wasm = await Util.loadWasm('/__spec__/spec/assets-generated/particle-life.wasm');
  });

  it("can store/restore particle informations", function() {
    let particles = new PLParticles(10);

    particles.set(0, 1, 0.4, 0.3, 0.1, 0.2);
    let [s, x, y, vx, vy] = particles.get(0);
    expect(s).toBe(1);
    expect(x).toBeCloseTo(0.4, 0.01);
    expect(y).toBeCloseTo(0.3, 0.01);
    expect(vx).toBeCloseTo(0.1, 0.01);
    expect(vy).toBeCloseTo(0.2, 0.01);

    particles.set(1, 2, 0.1, 0.2, 0.3, 0.4);
    [s, x, y, vx, vy] = particles.get(1);
    expect(s).toBe(2);
    expect(x).toBeCloseTo(0.1, 0.01);
    expect(y).toBeCloseTo(0.2, 0.01);
    expect(vx).toBeCloseTo(0.3, 0.01);
    expect(vy).toBeCloseTo(0.4, 0.01);

    particles.set(2, 5, -0.1, 0.2, -0.3, 0.4);
    [s, x, y, vx, vy] = particles.get(2);
    expect(s).toBe(5);
    expect(x).toBeCloseTo(-0.1, 0.01);
    expect(y).toBeCloseTo(0.2, 0.01);
    expect(vx).toBeCloseTo(-0.3, 0.01);
    expect(vy).toBeCloseTo(0.4, 0.01);

    [s, x, y, vx, vy] = particles.get(0);
    expect(s).toBe(1);
    expect(x).toBeCloseTo(0.4, 0.01);
    expect(y).toBeCloseTo(0.3, 0.01);
    expect(vx).toBeCloseTo(0.1, 0.01);
    expect(vy).toBeCloseTo(0.2, 0.01);
  });

  it("stores values within [-0.5, 0.5)", function() {
    let particles = new PLParticles(10);

    particles.set(2, 0, -0.5, 0.5, 1.3, -0.9);
    let [s, x, y, vx, vy] = particles.get(2);
    expect(s).toBe(0);
    expect(x).toBeCloseTo(-0.5, 0.01);
    expect(y).toBeCloseTo(-0.5, 0.01);
    expect(vx).toBeCloseTo(-0.2, 0.01);
    expect(vy).toBeCloseTo(0.4, 0.01);
  });

});

