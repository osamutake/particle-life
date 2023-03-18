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

  // コンポーネントを構成する
    
  let world;
  let colorFunc = null;
  
  let display = riot.mount("particles-display")[0];
  display.world = () => world;
  display.colorFunc = () => colorFunc;
  
  let colorScaleEditor = riot.mount(
      "color-scale-editor", 
      {colorScaleList: colorScaleList}
  )[0];
  
  
  let int_editor = riot.mount("interaction-editor")[0];
  
  int_editor.colorScale =   
      new ColorScale([  // heat
        [0/4,   0, 255, 255 ],
        [1/4,   0,   0, 192 ],
        [2/4,   0,   0,   0 ],
        [3/4, 192,   0,   0 ],
        [4/4, 255, 255,   0 ],
      ]);

  colorScaleEditor.addEventListener("update", e => {
    colorFunc = e.detail;
    int_editor.update();
    display.render();
  });
  colorScaleEditor.update();
  
  const controls = riot.mount('plcontrols')[0];
  parametersFromURL(controls.state)

  const fps = document.getElementById('fps');
  const render = ()=> {
    world.interactParticles();
    world.repelParticles(display.state.repelX, display.state.repelY);
    world.moveParticles();
    display.render();
    fps.innerText = `${String(renderer.fps).slice(0, 4)} fps`;
  }
  const renderer = new CanvasRenderer(display.$('canvas'), render, exportVid);

  const updateURL = (options) => {
    // URL を更新
    let search = '?' + (options.screen != 'S' ? options.screen : '');
    search += options.nspecies + "_" + options.nlattice;
    search += "_" + options.interact_seed + options.intset + "_" + options.world_seed;
    if(options.step != 1) {
      search += "_" + display.state.tail;
      search += "_" + options.scale;
      search += "_" + options.step;
    } else
    if(options.scale != 1) {
      search += "_" + display.state.tail;
      search += "_" + options.scale;
    } else
    if(display.state.tail > 0) search += "_" + display.state.tail;
    history.replaceState({}, '', search);
  }

  controls.addEventListener("update", (e) => {
    if(display.state.screen != e.detail.screen) updateURL(e.detail);
    display.update({tail: e.detail.tail, screen: e.detail.screen});
    renderer.maxFps = e.detail.maxfps;
  });

  controls.update();

  const createWorld = (options) => {
    if(options.scale) {
      Object.assign(options, {
        rth1: 0.05 / options.scale,
        rth2: 0.1 / options.scale,
        rmax: 0.2 / options.scale,
        perterb: 0.001 / options.scale,
      });
    }
    let world = new ParticleLife(options, new XorShift128(options.world_seed));

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

    updateURL(options);
    return world;
  }
  
  const restart = (randomize = false) => {
    if(randomize) {
      controls.state.interact_seed = 2**56 * Math.random();
      controls.state.world_seed = 2**56 * Math.random();
      controls.update();
    }
    
    util.destruct(world);
    world = createWorld(controls.state);
    int_editor.world = world;
    int_editor.colorFunc = (x)=> colorFunc(x);
    int_editor.update();
    renderer.start();
    display.initializeRequired = true;
  }
  
  restart();
  
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
}

window.addEventListener('load', () => {
  main()
})


// ****************************************
/// 渡されたパラメータを使って値を設定する
// ****************************************

function parametersFromURL(state) {
  if(!location.search) return;

  let options = location.search.substring(1).split('_');
  if(options.length == 4) {
    [state.nspecies, state.nlattice, state.interact_seed, state.world_seed] = options;
  }
  if(options.length == 5) {
    [state.nspecies, state.nlattice, state.interact_seed, state.world_seed, state.tail] = options;
  }
  if(options.length == 6) {
    [state.nspecies, state.nlattice, state.interact_seed, state.world_seed, state.tail, state.scale] = options;
  }
  if(options.length == 7) {
    [state.nspecies, state.nlattice, state.interact_seed, state.world_seed, state.tail, state.scale, state.step] = options;
  }
  
  let match = /^(S|M|L)(.+)/.exec(state.nspecies);
  if(match) {
    state.screen = match[1];
    state.nspecies = match[2];
  }

  // 大文字のアルファベットは相互作用セットの指定
  if(/[A-Z]/.test(state.interact_seed.slice(-1))) {
    state.intset = state.interact_seed.slice(-1);
    state.interact_seed = state.interact_seed.slice(0,-1);
  }
}

// ****************************************
/// 録画データを Blob として受け取り表示する
// ****************************************

function exportVid(blob) {
  const div = document.getElementById('video');
  while(div.firstChild)
    div.removeChild( div.firstChild );  // remove all children

  const vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  div.appendChild(vid);

  div.appendChild(document.createElement('br'));

  const a = document.createElement('a');
  a.download = location.search.substr(1) + '.webm';
  a.href = vid.src;
  a.textContent = 'download the video';
  div.appendChild(a);

  setTimeout(() => {
    // 少し待ってからじゃないと scroll to bottom がうまく行かない
    var doc = document.documentElement;
    var bottom = doc.scrollHeight - doc.clientHeight;
    window.scroll(0, bottom);
  }, 100);
}

