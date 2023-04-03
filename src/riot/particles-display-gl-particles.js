import {glBuffer, glProgram, destruct} from '../util.js'

// ----------------- シェーダープログラム

// viewport からはみ出た粒子の端が viewport 内に入る
// 影響を入れるため、範囲外の粒子座標を扱う必要がある
// SHORT だと [-1, 1] より外の座標を指定できないので、
// あらかじめ 1/2 した座標を渡して vertex shader で
// ２倍して復元する

// vertex shader source code
const vsrc = `
  attribute vec4 a_position;
  attribute vec4 a_color;
  uniform float u_point_size;
  varying vec4 v_color;
  void main(void) {
    gl_Position = a_position;
    gl_Position.x *= 2.0; // あらかじめ半分にして渡していた
    gl_Position.y *= 2.0;
    gl_PointSize = u_point_size;
    v_color = a_color;
  }
`;

// fragment shader source code
const fsrc = `
  precision mediump float;
  uniform int       u_point_shape;
  uniform float     u_point_size2;
  uniform float     u_shine;
  uniform float     u_shine_base; // 0.05 / (0.05 + 1.0/u_shine)
  varying vec4      v_color;
  void main(void) {
    vec2 uv = (gl_PointCoord - 0.5) * 2.0;
    float r2 = uv.x * uv.x + uv.y * uv.y;
    float x;
    if(u_point_shape == 0) {
      x = (1.0 - r2) * u_point_size2;
    } else {
      if(u_point_shape == 1) {
        x = r2 * r2;
        x *= x;
      } else
      if(u_point_shape == 2) {
        x = r2 * r2;
      } else
      if(u_point_shape == 3) {
        x = r2;
      } else
      if(u_point_shape == 4) {
        x = sqrt(r2);
      }
      x = 1.0 - x;
    }
    if(x < 0.0) x = 0.0;
    if(x > 1.0) x = 1.0;
    gl_FragColor = v_color * x;
    if(u_shine != 0.0) {
      gl_FragColor += vec4( r2 < 1.0 ? 0.05 / (0.05 + r2/u_shine) - u_shine_base : 0.0 );
    }
  }
`;

/** 
 * WebGL 粒子表示クラス
 * util がグローバルに import されていることを前提としている
 * 
 * @example
 * import {ParticlesRendererGL} from "./particles-display-gl-particles.js"
 * 
 * // gl を与えて初期化
 * const renderer = new ParticlesRendererGL(gl);
 * 
 * // 描画する
 * renderer.render(particles, palette, pshape, highlight, ssize, psize, frameBuffer);
 * 
 * // 解放する
 * destruct(renderer);
 */
export class ParticlesRendererGL {
  /**
   * @param {WebGLRenderingContext} gl - 描画対象
   */
  constructor(gl) {
    this.gl = gl;
    this.program = new glProgram(gl, vsrc, fsrc);
    this.program.use();
    
    // vertices buffer を準備 (データはまだ入れない)
    this.vbuffer = new glBuffer(gl, gl.ARRAY_BUFFER);
  }

  /**
   * リソースを解放する
   */
  destructor() {
    destruct(this.program, this.vbuffer);
  }
  
  /**
   * 描画する
   */ 
  render(particles, palette, pshape, highlight, screenSize, particleSize, frameBuffer = null) {
    if(frameBuffer) { // 与えられていればバッファーへ描画する
      frameBuffer.bind(()=>
        this.render(particles, palette, pshape, highlight, screenSize, particleSize)
      );
      return;
    }

    const {gl, program, vbuffer} = this;
    
    program.use();

    gl.viewport(0, 0, screenSize, screenSize);
    gl.disable(gl.DEPTH_TEST);

    // https://stackoverflow.com/questions/39341564/webgl-how-to-correctly-blend-alpha-channel-png
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE_MINUS_DST_COLOR, gl.ONE ); // screen
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    // 一旦消去
    gl.clearColor(0, 0, 0, 0);  // 背景色は透明 (!= 黒)
    gl.clear(gl.COLOR_BUFFER_BIT);

    program.u_point_shape.i = pshape;
    const psizeCorrection = [1.0, 1.1, 1.3, 1.5, 2];
    const u_shine = highlight / psizeCorrection[pshape];
    program.u_shine.f = u_shine;
    program.u_shine_base.f = 0.05 / (0.05 + 1.0/u_shine);
    let psize = Number.parseFloat(particleSize) + 0.25;
    psize *= psizeCorrection[pshape];
    program.u_point_size.f = psize;
    program.u_point_size2.f = psize/4;


    const [vertices, nvertices] = 
      particles.vertices(palette, psize/screenSize);
    if((vbuffer.dataLength || 0) < vertices.length) {
      vbuffer.data(vertices, gl.DYNAMIC_DRAW);
    } else {
      vbuffer.subData(0, vertices);
    }
    let size = 2; // sizeof(SHORT);  
    //                               items                 stride    offset
    program.a_position.ptr = [vbuffer, 2, gl.SHORT, true, size * 5, 0       ];
    program.a_color.ptr    = [vbuffer, 3, gl.SHORT, true, size * 5, size * 2];
    vbuffer.bind(()=>{
      gl.drawArrays(gl.POINTS, 0, nvertices);
    });
  }
}
