/** 
 * すべての riot タグを register する
 * 新しいタグを追加した場合にはこのファイルも編集が必要
 * プラグインもいくつか組み込む
 * 
 * @module src/riot/tags
 */

import t0 from './app.riot'
import t1 from './raw.riot'
import t2 from './particles-display.riot'
import t3 from './pl-controls.riot'
import t4 from './color-scale-editor.riot'
import t5 from './interaction-editor.riot'
import t6 from './help-popup.riot'
import t7 from './video-holder.riot'
import t8 from './i18n.riot'

/**
 * @param riot
*/
export function registerAllTags(riot) {
  installPlugins(riot)
  let tags = [t0, t1, t2, t3, t4, t5, t6, t7, t8]
  for(let tag of tags)
    riot.register(tag.name, tag)
  return tags;
}

function installPlugins(riot) {

  // styleAttribute プラグインをインストール
  // https://riot.js.org/ja/migration-guide/
  riot.install( (component) => {
    component.styleAttribute = (attributes) => {
      return Object.entries(attributes).reduce((acc, item) => {
        const [key, value] = item
        return [...acc, `${key}: ${value}`]
      }, []).join(';')
    }
    
    return component;
  });

  // ドラッグ動作を簡単に定義できるようにする
  riot.install( (component) => {
    component.defineDragBehavior = (ctrl, handlers) => {
      let mouseDown = false
      let mouseX, mouseY, points = {};

      ctrl.addEventListener("pointerdown", e => {
        if(!isNaN(e.pointerId)) {
          ctrl.setPointerCapture(e.pointerId);
          points[e.pointerId] = new e.constructor(e.type, e);
        }

        [mouseX, mouseY] = [e.offsetX | 0, e.offsetY | 0]; // | 0 で整数に直してる
        mouseDown = true;

        if(handlers.down) handlers.down(e, mouseX, mouseY, points);
      })
      
      ctrl.addEventListener("pointermove", e => {
        if(!isNaN(e.pointerId))
          points[e.pointerId] = new e.constructor(e.type, e);
        const [newX, newY] = [e.offsetX | 0, e.offsetY | 0]; // | 0 で整数に直してる
        if(handlers.move) handlers.move(e, mouseDown, newX, newY, mouseX, mouseY, points);
        [mouseX, mouseY] = [newX, newY]
      })
      
      ctrl.addEventListener("pointerup", e => {
        e.preventDefault();
        if(!isNaN(e.pointerId)) {
          ctrl.releasePointerCapture(e.pointerId);
          delete points[e.pointerId];
        }
        
        mouseDown = false;
        if(handlers.up) handlers.up(e, mouseX, mouseY, points);
      })

      ctrl.addEventListener("touchend", e => {
        if(e.touches.length == 0) points = {};  // すべて離された
      })
    }

    return component;
  })

  // イベントディスパッチの省力化
  riot.install( (component) => {
    component.camelCase = (str) => {
      return str.split('-').map((w,i) => 
        (i === 0) ? w.toLowerCase() 
                  : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      ).join('')
    }

    component.kebabCase = (str) => {
      return str.split(/(?=[A-Z])/).join('-').toLowerCase()
    }

    component.dispatchEvent = (name, data) => {
      const handler = component.props[component.camelCase("on-" + name)];
      if(!handler) return;
      handler(new CustomEvent("name", {detail: data}));
    }

    return component;
  })

}

