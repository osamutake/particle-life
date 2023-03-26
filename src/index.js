import * as riot from 'riot'
import * as util from './util.js'

import { CanvasRenderer } from './canvas-renderer.js'
import { interactionSets } from './interaction-sets.js'
import { ColorScale, colorScaleList } from "./color-scale.js"
import { PLSpeciesDistribution } from './pl-species-distribution.js'
import { ParticleLife } from './particle-life.js'
import { XorShift128 } from './xorshift128.js'

// すべてのタグを含めコンパイルされたものを obj から読み込む
import { registerAllTags } from '../obj/riot_tags.js'


async function main() {

  // グローバル変数を設定
  let wasm = await util.loadWasm('particle-life.wasm');
  window.wasm = wasm;
  window.util = util;
  window.PLSpeciesDistribution = PLSpeciesDistribution;

  // riot タグを読み込み
  registerAllTags(riot);

  // body の横幅(スクロールバーを除いた値)を 
  // CSS から var(--100vw) で使えるようにする

  const measureWindowSize = ()=> 
      document.body.style.setProperty('--100vw', 
                  `${document.body.clientWidth}px`);
  window.addEventListener('resize', measureWindowSize);
  measureWindowSize();
  
  // コンポーネントを構成する

  let world;
  let colorFunc = null;

  this.displayIntf = {
    world: () => world,
    colorFunc: () => colorFunc,
    repelX: NaN,
    repelY: NaN,
    update: null,
    render: null,
    canvas: null
  }
  
  let display = riot.mount("particles-display", {intf: this.displayIntf})[0];
  
  let colorScaleEditor = riot.mount(
      "color-scale-editor", 
      {colorScaleList: colorScaleList}
  )[0];


  this.intEditorIntf = {
     update: null,
  }

  const intEditorColorFunc = (()=>{
    const colorScale = new ColorScale([  // heat
      [0/4,   0, 255, 255 ],
      [1/4,   0,   0, 192 ],
      [2/4,   0,   0,   0 ],
      [3/4, 192,   0,   0 ],
      [4/4, 255, 255,   0 ],
    ]);
    return (x)=> colorScale.color(x);
  })();
  
  let intEditor = riot.mount("interaction-editor", 
      {intf: this.intEditorIntf, intColorFunc: intEditorColorFunc})[0];
  

  this.controlsIntf = {
    getWorldOptions: null,
    updatePaletteSetting: null,
    update: null
  }
  const controls = riot.mount('plcontrols', {
          intf: this.controlsIntf,
          recommendations: await (await fetch('recommendations.json')).json()
        })[0];

  controls.addEventListener("update", (e) => {
    if(world) world.update(e.detail);
    colorScaleEditor.update(e.detail.paletteSetting);
    this.displayIntf.update({tail: e.detail.tail, screen: e.detail.screen, particleSize: e.detail.particleSize});
    renderer.maxFps = e.detail.maxfps;
    document.querySelector('color-scale-editor').style.display = e.detail.showPalette ? 'block' : 'none';
  });

  colorScaleEditor.addEventListener("update", e => {
    colorFunc = e.detail;
    this.intEditorIntf.update();
    this.displayIntf.render();
    if(!colorScaleEditor.state.mouseDown) {
      this.controlsIntf.updatePaletteSetting(colorScaleEditor.state);
    }
  });

  const fps = document.getElementById('fps');
  const render = ()=> {
    world.interactParticles();
    world.repelParticles(this.displayIntf.repelX, this.displayIntf.repelY);
    world.moveParticles();
    this.displayIntf.render();
    fps.innerText = `${String(renderer.fps).slice(0, 4)} fps`;
  }
  const videoHolder = riot.mount("video-holder")[0];
  const renderer = new CanvasRenderer(this.displayIntf.canvas, render, (blob)=>{
    videoHolder.state.blob = blob;
    videoHolder.update();
  });

  this.controlsIntf.update();
  colorScaleEditor.update();

  const createWorld = (randomize=false) => {
    options = this.controlsIntf.getWorldOptions(randomize);
    if(!world) {
      world = new ParticleLife(options, new XorShift128(options.world_seed));
    } else {
       world.update(options, new XorShift128(options.world_seed));
    }

    // 相互作用を指定する
    interactionSets[options.intset](world.interaction, new XorShift128(options.interact_seed));

    // 粒子種に偏りを持たせるための確率分布の累積を作る
    let distribution = new PLSpeciesDistribution(world.nspecies, world.rand);

    // 粒子の初期配置を決める
    world.setupParticles( (i, j) => [
      // 本当は world.nlattice で割るべきなのだけれど互換性のためこのまま
      distribution.species(world.rand.next()),
      i / (world.nlattice - 1) - 0.5 + 0.2 * (world.rand.next() - 0.5),  // x
      j / (world.nlattice - 1) - 0.5 + 0.2 * (world.rand.next() - 0.5),  // y
      0, 0  // vx, vy
    ]);

    return world;
  }
  
  const restart = (randomize = false) => {
    util.destruct(world);
    createWorld(randomize);
    this.intEditorIntf.update({
      world: world,
      colorFunc: colorFunc
    });
    renderer.start();
  }
  
  restart();

  document.querySelector('particles-display')
          .addEventListener('restart', () => {
    restart(true);
  });
  
  controls.addEventListener("pause", (e) => {
    if(e.detail.pause) {
      renderer.stop();
    } else {
      renderer.start();
    }
  });

  controls.addEventListener("record", (e) => {
    if(e.detail.recording) {
      renderer.startRecording();
    } else {
      renderer.stopRecording();
    }
  });

  controls.addEventListener("restart", () => {
    renderer.stop();
    restart();
  });

  document.getElementById("new-world").addEventListener("click", ()=> {
    renderer.stop();
    restart(true);
  });
  
  document.getElementById("show-editor").addEventListener("click", ()=> {
    const style = document.getElementById("world-editor").style;
    if(style.display == "none") {
      style.display = "block";
    } else {
      style.display = "none";
    }
  });
  document.getElementById("world-editor").style.display = "none";

  document.getElementById("full-screen").addEventListener("click", ()=> {
    document.getElementById("full-screen-message").style.display = "block"
    setTimeout(()=> {
        document.getElementById("full-screen-message").style.display = "none";
        this.controlsIntf.update({screen: 'F'}); 
    }, 1000);
  });
  document.getElementById("full-screen-message").style.display = "none";

  document.getElementById("copy-url").addEventListener("click", ()=> {
    navigator.clipboard.writeText(location.href);
    setTimeout(
      ()=> document.getElementById("copy-url-message").style.display = "block",
      100
    );
    setTimeout(
      ()=> document.getElementById("copy-url-message").style.display = "none",
      1600
    );
  });
  document.getElementById("copy-url-message").style.display = "none";

  riot.mount("help-popup", {helpDisplayTarget: "help-list", messages: [
    [`粒子に命が宿る世界をのんびり眺めながら渡り歩くサイトです<br>
      <br>
      飽きたら [次のワールドを生成] を押すと異なる世界に移れます`,
     "new-world"
    ],
    [`[ワールド設定] でお勧めの設定を選んだら何度か押してみてください`,
     "recommendation"
    ],
    [`[全画面  <span class="icon"><ion-icon name="expand"></ion-icon></span>]
      を押すとフルスクリーン表示にできます<br><br>
      フルスクリーン表示中は範囲外のダブルクリック/タップあるいは N キーで次のワールドへ移れます`,
     "full-screen"
    ],
    [`メイン画面のダブルクリック/タップでワールドに指を突っ込めます`,
     "particles-display"
    ],
    [`[このワールドをシェア&nbsp;
       <span class="icon"><ion-icon name="share-social"></ion-icon></span></a>] 
       で今いるワールドへのリンクをクリップボードへコピーできます`,
     "copy-url"
    ],
    [`[描画制御] の 
      <span class="icon is-small"><ion-icon name="color-palette"></ion-icon></span> 
      で現れるカラースケールを上下左右にいじると配色を変えられます`,
     "palette"
    ],
    [`[描画制御] の 
      <span class="icon is-small"><ion-icon name="play-skip-back"></ion-icon></span> 
      で現在のワールドをはじめからリプレイできます<br>
      <br>
      それではどうぞのんびりお楽しみください`,
     "replay"
    ],
  ]})[0];

}

window.addEventListener('load', () => {
  main()
})
