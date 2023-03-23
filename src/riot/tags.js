/************************************************

 すべての riot タグを register する
 新しいタグを追加した場合にはこのファイルも編集が必要

*************************************************/

import t1 from './raw.riot'
import t2 from './particles-display.riot'
import t3 from './plcontrols.riot'
import t4 from './color-scale-editor.riot'
import t5 from './interaction-editor.riot'
import t6 from './help-popup.riot'

export function registerAllTags(riot) {

  installPlugins(riot)

  let tags = [t1, t2, t3, t4, t5, t6]
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
      let mouseX, mouseY

      ctrl.addEventListener("pointerdown", e => {
        if(!isNaN(e.pointerId))
          ctrl.setPointerCapture(e.pointerId);

        let crect = ctrl.getBoundingClientRect();
        [mouseX, mouseY] = [(e.clientX - crect.left) | 0, 
                            (e.clientY - crect.top ) | 0]; // | 0 で整数に直してる
        mouseDown = true;

        if(handlers.down) handlers.down(e, mouseX, mouseY);
      })
      
      ctrl.addEventListener("pointermove", e => {
        let crect = ctrl.getBoundingClientRect();
        [newX, newY]     = [(e.clientX - crect.left) | 0, 
                            (e.clientY - crect.top ) | 0]; // | 0 で整数に直してる
        if(handlers.move) handlers.move(e, mouseDown, newX, newY, mouseX, mouseY);
        [mouseX, mouseY] = [newX, newY]
      })
      
      ctrl.addEventListener("pointerup", e => {
        e.preventDefault();
        if(!isNaN(e.pointerId))
          ctrl.releasePointerCapture(e.pointerId);
        
        mouseDown = false;
        if(handlers.up) handlers.up(e, mouseX, mouseY);
      })
    }

    return component;
  })

}

