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

    'グロー明るさ':
    'Glow Int.', 

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
    'You can enjoy full screen view by pressing "Full Screen <span class="icon"><ion-icon name="expand"></ion-icon></span>".<br><br>'+
    'Within the full-screen view, you can move to the next world by double-clicking/taping on peripheral area or pressing "N" key.',

    'id_particles-display_help':
    `You can stick your finger into the world by double click/tap on the main screen.<br><br>
     You can zoom in/out by mouse drag with Ctrl-key or pinch in/out.`,

    'id_copy-url_help':
    'You can copy URL for the current world by pressing "Share this world <span class="icon"><ion-icon name="share-social"></ion-icon></span></a>".',

    'id_palette_help':
    'You can tweak the color palette by pressing <span class="icon"><ion-icon name="color-palette"></ion-icon></span> under "Rendering control".',

    'id_replay_help':
    'You can replay the world from the begining by pressing '+
    '<span class="icon"><ion-icon name="play-skip-back"></ion-icon></span>'+
    ' under "Rendering control".<br><br>So, enjoy!',

  }
}