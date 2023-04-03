/**
 * @module interaction-sets
 */

/**
 * 相互作用セット
 */
export const interactionSets = {
  // デフォルト
  '': (interaction, rand) => interaction.set( (i, j) => (i == j) ? 
      [     // 同種粒子
          -(0.0010 + 0.0005 *  rand.next()      ),  // param_a = 近距離
                     0.001  * (rand.next() - 0.5)   // param_b = 長距離
      ] : [               // 異種粒子
          -(0.0005 + 0.0005 *  rand.next()      ),  // param_a = 近距離
                     0.001  * (rand.next() - 0.5)   // param_b = 長距離
      ]),

  // 多粒子種補正
  // 異種間相互作用を疎結合にしている
  'A': (interaction, rand) => interaction.set( (i, j) => (i == j) ? 
      [     // 同種粒子
          -(0.0010 + 0.0005 *  rand.next()      ),  // param_a = 近距離
                     0.001  * (rand.next() - 0.5)   // param_b = 長距離
      ] : [ // 異種粒子
          -(0.0010 + 0.0005 *  rand.next()      ),  // param_a = 近距離
                     0.001 *  rand.next()**6 * (rand.next() > 0.7 ? 1 : -1)  // param_b = 長距離
      ]),

  // 多粒子種補正２
  // 異種間相互作用を疎結合にしている（A では倍率を間違えていた）
  'B': (interaction, rand) => interaction.set( (i, j) => (i == j) ? 
      [     // 同種粒子
          -(0.0010 + 0.0005 *  rand.next()      ),  // param_a = 近距離
                     0.001  * (rand.next() - 0.5)   // param_b = 長距離
      ] : [ // 異種粒子
          -(0.0010 + 0.0005 *  rand.next()      ),  // param_a = 近距離
                     0.0005 *  rand.next()**6 * (rand.next() > 0.7 ? 1 : -1)  // param_b = 長距離
      ]),

};
