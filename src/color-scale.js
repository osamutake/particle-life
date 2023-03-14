/*****************************************
/// カラースケール

  [0, 1) の範囲の数値を色に変換するスケールを定義する

  let scale = new ColorScale([
      [0, 0, 0, 0], // 0 を rgb(0, 0, 0) に
      [0, 0, 0, 0], // 1 を rgb(255, 255, 255) に
  ]);               // その間を線形補間するスケールを作成
  
  let color = scale.color(x); // 数値を色に変換
  
  g.fillStyle = color;        // そのまま style に代入可能
  
*****************************************/

export class ColorScale {

  constructor(mapping) {
    mapping ||= [ // grayscale
      [0,   0,   0,   0],
      [1, 255, 255, 255]
    ];
    this.mapping = mapping;
  }

  static rgb2str(r, g, b) {
    [r, g, b] = [r, g, b].map(x => Math.round(x));
    const hex = (x) => ("0"+x.toString(16)).slice(-2);
    return "#"+hex(r)+hex(g)+hex(b);
  }

  static hsl2rgb(h, s, l) {
    const c = (1- Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c/2;
    let r, g, b;
    if(h * 6 < 1) {
      r = c; 
      g = x; 
      b = 0;
    } else 
    if(h * 6 < 2) {
      r = x; 
      g = c; 
      b = 0;
    } else
    if(h * 6 < 3) {
      r = 0;
      g = c; 
      b = x; 
    } else
    if(h * 6 < 4) {
      r = 0;
      g = x; 
      b = c; 
    } else
    if(h * 6 < 5) {
      r = x; 
      g = 0;
      b = c; 
    } else {
      r = c; 
      g = 0;
      b = x; 
    }
    return [(r+m) * 255, (g+m) * 255, (b+m) * 255];
  }

  color(x) {
    const {mapping} = this;
    x = Math.max(0, Math.min(1, x));
    let i = mapping.findIndex(entry => x <= entry[0]);
    if(i==0) {
      return ColorScale.rgb2str(mapping[0][1], mapping[0][2], mapping[0][3]);
    }

    // 線形補間
    let r = (x - mapping[i-1][0]) / (mapping[i][0] - mapping[i-1][0]);
    return ColorScale.rgb2str(
      mapping[i-1][1] * (1-r) + mapping[i][1] * r, 
      mapping[i-1][2] * (1-r) + mapping[i][2] * r, 
      mapping[i-1][3] * (1-r) + mapping[i][3] * r
    );
  }
}

// ****************************************
/// カラースケール定義
// ****************************************

export const colorScaleList = [
  new ColorScale([  // rainbow
    [0/6, ...ColorScale.hsl2rgb(0/6, 1, 0.5)],
    [1/6, ...ColorScale.hsl2rgb(1/6, 1, 0.5)],
    [2/6, ...ColorScale.hsl2rgb(2/6, 1, 0.5)],
    [3/6, ...ColorScale.hsl2rgb(3/6, 1, 0.5)],
    [4/6, ...ColorScale.hsl2rgb(4/6, 1, 0.5)],
    [5/6, ...ColorScale.hsl2rgb(5/6, 1, 0.5)],
    [6/6, ...ColorScale.hsl2rgb(6/6, 1, 0.5)],
  ]),
  new ColorScale([  // heat
    [0/4,   0, 255, 255 ],
    [1/4,   0,   0, 192 ],
    [2/4,   0,   0,   0 ],
    [3/4, 192,   0,   0 ],
    [4/4, 255, 255,   0 ],
  ]),
  new ColorScale([  // heat2
    [0/4,   0, 255, 255 ],
    [1/4,   0,   0, 192 ],
    [2/4, 255, 255, 255 ],
    [3/4, 192,   0,   0 ],
    [4/4, 255, 255,   0 ],
  ]),
  new ColorScale([  // rainbow light
    [0/6, ...ColorScale.hsl2rgb(0/6, 1, 0.3)],
    [1/6, ...ColorScale.hsl2rgb(1/6, 1, 0.3)],
    [2/6, ...ColorScale.hsl2rgb(2/6, 1, 0.3)],
    [3/6, ...ColorScale.hsl2rgb(3/6, 1, 0.3)],
    [4/6, ...ColorScale.hsl2rgb(4/6, 1, 0.3)],
    [5/6, ...ColorScale.hsl2rgb(5/6, 1, 0.3)],
    [6/6, ...ColorScale.hsl2rgb(6/6, 1, 0.3)],
  ]),
  new ColorScale([  // rainbow dark
    [0/6, ...ColorScale.hsl2rgb(0/6, 1, 0.7)],
    [1/6, ...ColorScale.hsl2rgb(1/6, 1, 0.7)],
    [2/6, ...ColorScale.hsl2rgb(2/6, 1, 0.7)],
    [3/6, ...ColorScale.hsl2rgb(3/6, 1, 0.7)],
    [4/6, ...ColorScale.hsl2rgb(4/6, 1, 0.7)],
    [5/6, ...ColorScale.hsl2rgb(5/6, 1, 0.7)],
    [6/6, ...ColorScale.hsl2rgb(6/6, 1, 0.7)],
  ]),
];
