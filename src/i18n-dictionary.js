export default {
  'en': {

    // app.riot

    '粒子に命が宿る世界をのんびり眺めるサイトです。':
    'Enjoy watching the worlds where the particles come to life. ',

    '飽きたら「次のワールドを生成」を押して下さい。':
    'When bored, press "Next World". ',

    '次のワールドを生成':
    'Next World',

    'このワールドをシェア':
    'Share this world',

    'このワールドへの URL をコピーしました':
    'URL to this world was copied to clipboard',
    
    '全画面':
    'Full Screen',

    '画面外のダブルタップで次のワールドを生成できます':
    'Double-tap on the periphery to move to the next world.',

    // pl-controls.riot

    'ワールド設定':
    'World config.',

    'URLで':
    'by URL',

    '描画制御':
    'Rendering control',

    '始めに戻ってリプレイ':
    'Replay from the begining',

    'ポーズ／再開':
    'Pause/Unpause',

    'webm に録画':
    'Record as webm',

    'カラーパレット編集':
    'Edit color palette',

    '粒径':
    'Particle dia.',
    
    '画面':
    'Screen',
    
    '最大fps':
    'Max fps',
    
    '使い方':
    'Usage',
    
    '粒子形状':
    'Particle Shape',

    'ハイライト':
    'Highlight', 

    'グロー距離':
    'Glow Dist.', 

    'グロー輝度':
    'Glow Int.', 

    '外を暗く':
    'Darken Outside',

    '粒子種数':
    'N Species',
    
    '√粒子数':
    '√N Particles',
    
    'スケール':
    'Scale',
    
    '計算ステップ':
    'Calc. step',
    
    '尾の長さ':
    'Tail length',
    
    '揺動':
    'Perturbation',
    
    '相互作用セット':
    'Interaction set',
    
    'デフォルト':
    'Default',
    
    '多粒子種補正A':
    'Many species adapt. A',
    
    '多粒子種補正B':
    'Many species adapt. B',
    
    '相互作用シード':
    'Interaction seed',
  
    '粒子配置シード':
    'Arrangement seed',
    
    'パラメータエディタを表示/非表示':
    'Show/Hide parameter editor',
    
    '自分で':
    'by yourself',
    
    '２色':
    '2-color',

    '３色':
    '3-color',

    '10色':
    '10-color',

    '12色':
    '12-color',

    '20色':
    '20-color',

    '30色':
    '30-color',

    '60色':
    '60-color',

    // interaction-editor.riot

    '相互作用係数マトリクス':
    'Interaction coefficient matrix',

    '相互作用距離・減衰・揺動':
    'Interaction distances, decelation and perturbation',

    '相互作用は非対称で a が b から受ける力と b が a から受ける力は異なる':
    'The interaction is asymmetric. The force from A to B is independent of the force from B to A.',
    
    '引力は負で青、斥力は正で赤':
    'Attractive force is represented by negative values and blue, repulsive force is represented by positive values and red.',

    '近距離力（粒子が極端に近づいた時の力）は常に斥力':
    'The short-range force is always repulsive (positive).',

    '遠距離力は引力にも斥力にもなる':
    'The long-range force can be either positive or negative.',

    '実際に掛かる力はここで指定した係数を距離に応じて減衰させた値になる':
    'The actual force is calculated by attenuating the given value using the distance.',

    'id_近距離斥力説明':
    'The repulsive force at close range has its maximum value at r = 0 and linearly decreases to zero at r = Rth1.',

    'id_遠距離力説明':
    'The long-range force has its maximum value at r = Rth2 and linearly decreases to zero at r = Rth1 and r = Rmax.',

    'id_減衰量説明':
    'The velocity of a particle is decelerated by multiplying the Decel factor at each calculation step.',

    'id_揺動説明':
    'Random number ranging ± 1/2,000 of Perturb is added to the velocity at each calculation step.',

    'id_rowdiv説明':
    'RowDiv is an optimization parameter for interaction calculation. Giving 3 or 4 will be the fastest. It only affects the calculation speed and should not affect the calculation result.',

    'id_canvasMode説明':
    "When WebGL is unavailable, Firefox''s rendering becomes very slow. You can choose '2d (source-over)' for Canvas Rendering Mode to make it faster at the expense of rendring quality.",

    '#_arg1_ が #_arg2_ から受ける力 (近 _arg3_, 遠 _arg4_)':
    'Force from #_arg2_ to #_arg1_ (near _arg3_, far _arg4_)',

    '録画fps':
    'Recording fps',

    '高画質録画':
    'HQ recording',

    // help-popup.riot

    '閉じる':
    'Close',

    '次へ':
    'Next',
    
    'ここ！':
    'Here!',
    
    '前へ':
    'Prev',

    // help-contents.js

    'id_new-world_help':
    'This is a website where you can leisurely walk across the worlds '+
    'where particles come to life.<br><br>When you get bored, you can ' +
    'move to a different world by pressing "Next World".',

    'id_help-text1_help':
    `Besides the cover story, it simply simulates the motion of particles 
     after randomly determining the initial arrangement and the interaction 
     coefficients between the colors.<br><br>
     Enjoy watching how complex behavior and beutiful patterns can emerge 
     from the simple rule and coincidences!`,

    'id_recommendation_help':
    'Select some recommended config under "World Config.", '+
    'then try pressing "Next World" a few times.',
    
    'id_full-screen_help':
    'You can enjoy full screen view by pressing "Full Screen <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrows-fullscreen is-clickable" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg>".<br><br>'+
    'Within the full-screen view, you can move to the next world by double-clicking/taping on peripheral area or pressing "N" key.',

    'id_particles-display_help':
    `You can stick your finger into the world by double click/tap on the main screen.<br><br>
     You can zoom in/out by mouse drag with Ctrl-key or pinch in/out.`,

    'id_copy-url_help':
    'You can copy URL for the current world by pressing "Share this world <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16"><path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/></svg></a>".',

    'id_palette_help':
    'You can tweak the color palette by pressing <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-palette-fill" viewBox="0 0 16 16"><path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg> under "Rendering control".',

    'id_replay_help':
    'You can replay the world from the begining by pressing '+
    '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-skip-backward-fill" viewBox="0 0 16 16"><path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"/></svg>'+
    ' under "Rendering control".<br><br>So, enjoy!',

    "ショートカットキー： <ul><li>'space' で一時停止</li><li>'N' で次のワールドを生成</li><li>'Ctrl+Enter' で全画面（Firefoxでは動作せず）</li><li>'Alt + R' で録画開始/終了</li></ul>":
    "Shortcut keys: <ul><li>'space' = pause/unpause<li>'N' = Next World<li>'Ctrl+Enter' = Full screen (not working with Firefox)<li>'Alt + R' = recording start/stop</ul>",

  }
}