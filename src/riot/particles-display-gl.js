/**
 * @module src/riot/particles-display-gl
 */

import {ParticlesRendererGL} from "./particles-display-gl-particles.js"
import {glFrameBuffer, glTextureRenderer, destruct} from '../util.js'

// モジュールグローバル

let frameRendererGL,
  frameRendererTail,
  frameRendererGlow1,
  frameRendererGlow2,
  frameRendererOffset;

let frameBuffer1,
    frameBuffer2A,
    frameBuffer2B,
    frameBuffer3A,
    frameBuffer3B;

/**
 * モジュールグローバルに確保したバッファー等を削除する
 */  
function clearBuffers() {
  destruct(
    frameRendererGL,
    frameRendererTail,
    frameRendererGlow1,
    frameRendererOffset,
    frameBuffer1,
    frameBuffer2A,
    frameBuffer2B,
    frameBuffer3A,
    frameBuffer3B,
  );
  if(frameRendererGlow2) {
    destruct(
      ...frameRendererGlow2
    );
  }
  frameRendererGL = null;
  frameRendererTail = null;
  frameRendererGlow1 = null;
  frameRendererGlow2 = null;
  frameRendererOffset = null;
  frameBuffer1 = null;
  frameBuffer2A = null;
  frameBuffer2B = null;
  frameBuffer3A = null;
  frameBuffer3B = null;
}

// 内部でしか使われない
function initializeRenderers(gl) {
  frameRendererGL = new ParticlesRendererGL(gl);

  const size = Math.min(gl.drawingBufferWidth, gl.drawingBufferHeight);
  frameBuffer1  = new glFrameBuffer(gl, 2 * size, 2 * size, false);
  frameBuffer2A = new glFrameBuffer(gl, 2 * size, 2 * size, false);
  frameBuffer2B = new glFrameBuffer(gl, 2 * size, 2 * size, false);
  frameBuffer3A = new glFrameBuffer(gl, 128, 128, false);
  frameBuffer3B = new glFrameBuffer(gl, 128, 128, false);

  // 前回の描画結果 u_texture2 に今回の内容 u_texture を書き加えたものを描画する
  frameRendererTail = new glTextureRenderer(gl, `
      precision mediump float;
      uniform sampler2D u_texture;    // frameBuffer1
      uniform float u_tail;
      uniform vec2 u_size;
      uniform int u_time;
      uniform sampler2D u_texture2;   // src
      void main(void){
        vec2 uv = gl_FragCoord.xy / u_size;
        vec4 now = texture2D(u_texture, uv);
        vec4 last = texture2D(u_texture2, uv);
        vec4 c;
        float u_tail1 = u_tail + 1.0;
        float comp = u_tail1 / 255.0;
        // 割合で減らなくなったら 間隔をあけて減らす
        c.r = last.r * u_tail / u_tail1; 
        if((last.r - c.r) * 255.0 < 1.0)
          if((u_time - u_time/(int(comp/last.r))*(int(comp/last.r))) == 0) c.r -= 1.0/256.0;
        c.g = last.g * u_tail / u_tail1;
        if((last.g - c.g) * 255.0 < 1.0) 
          if((u_time - u_time/(int(comp/last.g))*(int(comp/last.g))) == 0) c.g -= 1.0/256.0;
        c.b = last.b * u_tail / u_tail1;
        if((last.b - c.b) * 255.0 < 1.0) 
          if((u_time - u_time/(int(comp/last.b))*(int(comp/last.b))) == 0) c.b -= 1.0/256.0;
        c.a = 1.0;
        gl_FragColor = max(c, now);
      }
    `, (gl, program, params)=> {
      const {screenSize, tail, count, src} = params;
      gl.disable(gl.BLEND);
      program.u_tail.f = tail;
      program.u_size.f = [screenSize, screenSize];
      program.u_time.i = count;
      program.u_texture2.i = 2;
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, src.texture);
  });

  // 与えられた画像を縮小する
  // n = 21 倍のオーバーサンプリングを行う
  frameRendererGlow1 = new glTextureRenderer(gl, `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform float u_size_r;
      const float n = 21.0;
      const float eps = 0.000001;
      const float range = (n - 1.0) / n / 2.0;
      void main(void){
        vec2 uv = gl_FragCoord.xy * u_size_r;
        vec4 c = vec4(0.0);
        for(float x = -range; x < range + eps; x += 1.0/n)
          for(float y = -range; y < range + eps; y += 1.0/n) {
            vec2 uv2 = uv + vec2(x, y) * u_size_r;
            c += texture2D(u_texture, uv2);
          }
        gl_FragColor = c / n / n;
      }
    `, (gl, program, args)=> {
      const {screenSize} = args;
      gl.disable(gl.BLEND);
      program.u_size_r.f = 1/screenSize;
  });

  const fsrcGlow2 = (n) => `
    precision mediump float;
    uniform sampler2D u_texture;
    uniform float u_size_r;
    uniform float u_dev;
    uniform float u_glowi;
    const float n = ${n}.0; // 例えば 21
    const float eps = 0.000001;
    void main(void){
      vec2 uv = gl_FragCoord.xy * u_size_r;
      vec4 c = vec4(0.0);
      for(float x = -n/2.0; x < n/2.0 + eps; x += 1.0)
        for(float y = -n/2.0; y < n/2.0 + eps; y += 1.0) {
          vec2 uv2 = uv + vec2(x, y) * u_size_r;
          c += texture2D(u_texture, uv2) * exp(-(x*x+y*y)/u_dev);
        }
      gl_FragColor = c * u_glowi;
    }
  `;
  frameRendererGlow2 = [7, 11, 15, 21].map( n => new glTextureRenderer(gl, fsrcGlow2(n), 
    (gl, program, args)=> {
      const {screenSize, glowr, glowi} = args;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

      gl.disable(gl.BLEND);
      program.u_size_r.f = 1/screenSize;
      const nn = 10;
      program.u_dev.f   = glowr * glowr || 0.1;
      let coef = 0;
      for(let x = -nn/2; x <= nn/2; x++)
        for(let y = -nn/2; y <= nn/2; y++)
          coef += Math.exp(-(x*x+y*y)/(glowr * glowr || 0.1));
      program.u_glowi.f = glowi / coef;
    }) 
  );

  frameRendererOffset = new glTextureRenderer(gl, `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform sampler2D u_texture2;
      uniform vec2 u_size;
      uniform float u_scale;
      uniform vec2 u_offset;
      uniform bool u_glow;
      uniform bool u_darken;
      void main(void){
        // ここで uv から gl_FragColor を求める
        float size = min(u_size.x, u_size.y);       // 正方形の一辺
        vec2 of = (u_size - size) / 2.0;            // 左上の座標
        vec2 uv = (gl_FragCoord.xy - of) / size;    // 正規化
        uv = (uv - 0.5) / u_scale + 0.5 + u_offset; // 中央からスケール＋オフセット
        uv.x -= floor(uv.x);                        // 周期境界
        uv.y -= floor(uv.y);                        // 周期境界
        gl_FragColor = texture2D(u_texture, uv);

        if(u_glow) {
          gl_FragColor += texture2D(u_texture2, uv);
        }

        if(u_darken) {
          // 範囲チェック
          vec2 test = ((gl_FragCoord.xy - of) / size - 0.5) / u_scale + 0.5;
          if( test.x < 0.0 || test.y < 0.0 || test.x > 1.0 || test.y > 1.0 ) 
            gl_FragColor.rgb /= 2.0;  // 範囲外なら暗くする
        }
      }
    `, (gl, program, args)=> {
      const {scale, offsetX, offsetY, glow, glowSrc, darken} = args;
      gl.disable(gl.BLEND);
      program.u_size.f = [gl.drawingBufferWidth, gl.drawingBufferHeight];
      program.u_offset.f = [offsetX, offsetY];
      program.u_scale.f = scale;
      program.u_glow.i = glow;
      program.u_darken.i = darken ? 1 : 0;
      program.u_texture2.i = 4;
      gl.activeTexture(gl.TEXTURE4);
      gl.bindTexture(gl.TEXTURE_2D, glowSrc.texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  });

}

let counter;

/**
 * 粒子を描画する
 * 
 * @param {WebGLRenderingContext} gl - 描画先
 * @param {PLParticles} particles - 粒子の位置情報
 * @param {object} options
 * @param {number} particleSize - 粒子サイズ　ピクセル単位
 * @param {number[][]} palette - 粒子種別の色
 * @param {number} pshape - 粒子形状
 * @param {number} highlight - ハイライトサイズ
 * @param {number} glowr - グロー半径（world.scale 調整済み）
 * @param {number} glowi - グロー輝度
 * @param {number} tail - 尾の長さ
 * @param {number} scale - 画面の拡大率
 * @param {number} offsetX - スクロール座標 x
 * @param {number} offsetY - スクロール座標 y
 */  
function render(gl, particles, options, particleSize, 
   palette, pshape, highlight, glowr, glowi, tail, darken,
   scale, offsetX, offsetY) {

  const size = Math.min(gl.drawingBufferWidth, gl.drawingBufferHeight);

  let _tail = tail;
  if(!frameRendererGL) {
    initializeRenderers(gl)
    _tail = 0;
    counter = 0;
  }

  // 拡大できるよう常に2倍で描画する
  // ２倍以上の拡大表示では少しぼやけるが気にしない
  if(frameBuffer1.width != 2 * size) {
    frameBuffer1.resize( 2 * size, 2 * size)
    frameBuffer2A.resize(2 * size, 2 * size)
    frameBuffer2B.resize(2 * size, 2 * size)
    _tail = 0;
    counter = 0;
  }

  if(options.playing) counter++;
  
  // frameBuffer1 へ描画
  frameRendererGL.render(
    particles, palette, pshape, highlight, 2 * size, 2 * particleSize,
    frameBuffer1
  );

  // frameBuffer2A/B に交互に描画する
  let src  = counter % 2 == 0 ? frameBuffer2A : frameBuffer2B;
  let dest = counter % 2 == 0 ? frameBuffer2B : frameBuffer2A;

  // 前回の描画結果 src に frameBuffer1 の結果を書き加えたものを dest へ描画
  frameRendererTail.render(1, frameBuffer1, {
      screenSize: dest.width,
      tail: _tail,
      count: counter,
      src: src,
  }, dest);

  if(glowr * glowi) {

    // dest.texture を縮小して frameBuffer3A に入れる
    frameRendererGlow1.render(0, dest, {
      screenSize: frameBuffer3A.width
    }, frameBuffer3A);

    // n = [7, 11, 15, 21]
    const glow2n = glowr < 2.5 ? 0 :
                  glowr < 4 ? 1 :
                  glowr < 6 ? 2 : 3;

    frameRendererGlow2[glow2n].render(0, frameBuffer3A, {
      screenSize: frameBuffer3B.width,
      glowr: glowr,
      glowi: glowi,
    }, frameBuffer3B);

  }

  // dest に Offset 処理をして canvas へ描画
  frameRendererOffset.render(3, dest, {
    offsetX: offsetX, 
    offsetY: -offsetY,
    scale: scale,
    glow: glowr * glowi,
    glowSrc: frameBuffer3B,
    darken: darken,
  });

}

/**
 * モジュールのインターフェース
 * @example
 * import rendererGL from "src/riot/particles-display-gl.js"
 * 
 * // 粒子を描画
 * rendererGL.render(
 *   gl, particles, particleSize, 
 *   palette, pshape, highlight, glowr, glowi, tail, 
 *   scale, offsetX, offsetY);
 *
 * // 内部で確保したオフスクリーンバッファーをクリア
 * rendererGL.clearBuffers();
 * 
 */
export const rendererGL = {
  render: render,
  clearBuffers: clearBuffers,
}
