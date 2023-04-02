/**
 * @module src/riot/particles-display-2d
 */

// 背景なしで粒子を描画(事前設定済)
function drawParticlesCore(g, particles, r, palette) {

  const draw2 = (_x, _y) => {
    g.beginPath();
    g.arc(_x, _y, r, 0, 2 * Math.PI);
    g.fill();
  };
  
  const draw = (_x, _y) => {
    draw2(_x, _y);
    if(_y < -0.5 + r) draw2(_x, _y + 1);
    if(_y > +0.5 - r) draw2(_x, _y - 1);
  }

  // 境界から r 以内の粒子は反対側にも描く必要がある
  particles.forEach( (sp, x, y) => {
    g.fillStyle = palette[sp];
    x += 0.5; x -= Math.round(x);
    y += 0.5; y -= Math.round(y);
    
    draw(x, y);
    if(x < -0.5 + r) draw(x + 1, y);
    if(x > +0.5 - r) draw(x - 1, y);
  });
}

// 背景なしで粒子を描画
function drawParticlesWithoutTail(buffer, particles, canvasMode, r, palette) {
  const g = buffer.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.scale(buffer.width, buffer.height);
  g.translate(0.5, 0.5);

  // 背景消去
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#000000";
  g.fillRect(-0.5, -0.5, 1, 1);

  // screen モードでの描画は Firefox で話にならないほど
  // 遅くなるのだけれど、そもそも WebGL が使えない環境の
  // Firefox をサポートする意味があるのかどうかが疑わしいので
  // 気にせずデフォルト動作を screen にしておく
  if(canvasMode == "screen") {
    g.globalCompositeOperation = "screen";
  } else {
    g.globalCompositeOperation = "source-over";
  }

  // 粒子を描画
  drawParticlesCore(g, particles, r, palette);
}

// 尾を引かせるため背景をうっすら残す処理
function reduceBackground(g, tail) {
  const w = g.canvas.width;
  const h = g.canvas.height;

  // 基本的には tail に応じて alpha を調整して背景を消せばいいのだけれど
  // tail が長くなるとうっすら残った残りが何時まで経っても消えなくなるので
  // tail > 50 では alpha だけでなく頻度も調節しながら、最後に残る部分は
  // 1 ずつ減らすことで完全に消しきる

  let t = tail;
  if(t > 50) {
    this.tailCount = (this.tailCount ?? 0) + 50 / t;
    t = 50;
  } else {
    this.tailCount = 1;
  }

  if(this.tailCount >= 1) {
    // 背景塗りつぶし
    let style = '#000000';  // 真っ黒
    if( t > 0 ) {  
      // 尾を引かせるときは alpha を指定する
      style += ('0' + ((255 / (1.0 + 1.0 * t)) | 0).toString(16)).substr(-2);
    }

    g.fillStyle = style;
    g.globalCompositeOperation = "source-over"
    g.fillRect(0, 0, w, h);

    // 微妙に消えないのを消すための隠し味
    g.fillStyle = "#010101";
    g.globalCompositeOperation = "difference"
    g.fillRect(0, 0, w, h);

    this.tailCount -= 1;
  }
}

// tail 付きで粒子を描画
function drawParticles(dest, temp, 
  particles, canvasMode, radius, palette, tail){
  // まずは tail なしで temp に描画
  drawParticlesWithoutTail(temp, 
    particles, canvasMode, radius, palette);

  const g = dest.getContext('2d');
  if(tail > 0) {
    // 尾を引かせるため前回までの画像をうっすら残す
    reduceBackground(g, tail);

    // 今回の画像を重ねる
    // lighten モードの描画は Firefox ではかなり時間がかかる
    // のだけれど １枚だけならまあ何とか？
    g.globalCompositeOperation = "lighten";
    g.drawImage(temp, 0, 0);
  } else {
    g.globalCompositeOperation = "source-over";
    g.drawImage(temp, 0, 0);
  }
}

/// source を g のスクロール位置に描画する
function drawImageWithOffset(g, source, screenSize, offsetX, offsetY) {
  const s = screenSize;
  const [dx, dy] = [-offsetX * s, -offsetY * s]

  const region = (sx, sy) => {  // ４象限を計算する
    const x1 = (s - dx) % s; const y1 = (s - dy) % s; 
    const x2 = (dx + s) % s; const y2 = (dy + s) % s; 
    return [
      Math.min(x1, sx ? 0 : s),  Math.min(y1, sy ? 0 : s),
      Math.abs(x1-(sx ? 0 : s)), Math.abs(y1-(sy ? 0 : s)), 
      Math.min(x2, sx ? s : 0),  Math.min(y2, sy ? s : 0),
      Math.abs(x1-(sx ? 0 : s)), Math.abs(y1-(sy ? 0 : s)) ];
  }
  g.drawImage(source, ...region(0, 0));
  g.drawImage(source, ...region(1, 0));
  g.drawImage(source, ...region(0, 1));
  g.drawImage(source, ...region(1, 1));
}

// temp を Offet と scale を反映して g へ描画
function transferWithScaleAndOffset(g, temp, scale, offsetX, offsetY) {
  const w = g.canvas.width;
  const h = g.canvas.height;
  const s = Math.min(w, h);

  // 中央を原点にしてスケールする

  // まずは中央を描画
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.translate( w/2, h/2 ); 
  g.scale(scale, scale);
  g.translate( - s/2, - s/2 ); 
  drawImageWithOffset(g, temp, s, offsetX, offsetY);

  // 周辺部を描画
  let ss = s * scale;
  g.fillStyle = "#00000080"
  for(let i = -Math.ceil((w-ss)/ss/2); i <= Math.ceil((w-ss)/ss/2); i++) {
    for(let j = -Math.ceil((h-ss)/ss/2); j <= Math.ceil((h-ss)/ss/2); j++) {
      if(i==0 && j==0) continue;
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.translate( w/2, h/2 );
      g.scale(scale, scale);
      g.translate( - s/2 + i * s, - s/2 + j * s );  // 中央を原点にしてスケール
      drawImageWithOffset(g, temp, s, offsetX, offsetY);
      
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.fillRect((w-ss)/2 + i * ss, (h-ss)/2 + j * ss, ss, ss);
    }
  }
}

var buffer1;
var buffer2;

/**
 * 粒子を描画する
 * @param {CanvasRenderingContext2D} g - 描画先の canvas コンテクスト
 * @param {string} canvasMode - 粒子描画モード "scrren" または "source-over".  "screen" の方がきれいだが Firefox では非常に時間がかかる
 * @param {number} radius - 粒子半径のスクリーンサイズ相対値
 * @param {string[]} palette - 粒子種別の描画 fillStyle
 * @param {number} tail - 尾の長さ
 * @param {number} scale - 表示スケール
 * @param {number} offsetX - 中心座標 x
 * @param {number} offsetY - 中心座標 y
  */
function render(g,
  particles, canvasMode, radius, palette, tail,
  scale, offsetX, offsetY,
) {
  const w = g.canvas.width;
  const h = g.canvas.height;

  // オフスクリーンバッファーの準備
  if(!buffer1) {
    buffer1 = g.canvas.cloneNode();
    buffer2 = g.canvas.cloneNode();
  } else
  if(buffer1.width  != w || buffer1.height != h) {
      buffer1.width = w; buffer1.height = h;
      buffer2.width = w; buffer2.height = h;
  }

   // オフスクリーンバッファーに粒子を描画
  drawParticles(
    buffer1, // destination
    buffer2, // temporary
    particles, canvasMode, radius, palette, tail
  );

  // 所定位置に描画する
  transferWithScaleAndOffset(g, buffer1, scale, offsetX, offsetY)
}

/**
 * 内部で確保したオフスクリーンバッファーをクリアする
 */
function clearBuffers() {
  if(buffer1) {
    buffer1.width = 0;
    buffer1.height = 0;
    buffer1 = null;

    buffer2.width = 0;
    buffer2.height = 0;
    buffer2 = null;
  }
}

/**
 * モジュールのインターフェース
 * @example
 * import renderer2d from "src/riot/particles-display-2d.js"
 * 
 * // 粒子を描画
 * renderer2d.render(g,
 *   particles, canvasMode, radius, palette, tail,
 *   scale, offsetX, offsetY,
 * );
 *
 * // 内部で確保したオフスクリーンバッファーをクリア
 * renderer2d.clearBuffers();
 * 
 */
export const renderer2d = {
  /** 
   * render
  */
  render: render,
  clearBuffers: clearBuffers,
}
