#include <cmath>
#include <emscripten/emscripten.h>

#ifdef __cplusplus
extern "C" {    // C++ のマングリングを防ぐ
#endif

// XorShift128 乱数器を更新する
int32_t XorShift128NextInt(int32_t *work)
{
    uint32_t t = work[3];
    t ^= t << 11;
    work[3] = work[2];
    work[2] = work[1];
    work[1] = work[0];
    uint32_t s = work[0];
    work[0] = s ^ (s >> 19) ^ t ^ (t >> 8);

    return work[0];
}

// XorShift128 乱数器から [0, 1) の範囲の乱数を得る
double EMSCRIPTEN_KEEPALIVE XorShift128Next(int32_t *work)
{
    const double coef2to31inv = 2.0 / 65536 / 65536;
    return ( XorShift128NextInt(work) & 0x7fffffff ) * coef2to31inv;
}

#pragma pack(push, 4)

typedef struct {
    int32_t a, b, c;
} interact_t;

typedef struct {
    int32_t species, dummy;
    int32_t x, y;
    int32_t vx, vy;
} particle_t;

typedef struct {
    int32_t nspecies;
    int32_t nparticles;
    int32_t rth1, rth2, rmax;
    int32_t perterb, decel;
} world_t;

#pragma pack(pop)

// 粒子間距離から相互作用を求める
int64_t calcAccel(world_t *world, interact_t *interact, int64_t d)
{
    int64_t accel;
    // 遠い方から処理したほうが少しだけ得
    if ( d >= world->rth2 ) {           // far
        accel = interact->c * (world->rmax - d);    //  b / (rmax - rth2) << 32
    } else if ( d >= world->rth1 ) {    // middle
        accel = interact->b * (d - world->rth1);    //  b / (rth2 - rth1) << 32
    } else {                            // near
        accel = interact->a * (world->rth1 - d);    //  a / rth1          << 32
    }
    return accel;
}

// 粒子間の相互作用を求め vx, vy を更新する
void EMSCRIPTEN_KEEPALIVE interactParticles(
        world_t *world,
        interact_t *interact,
        particle_t *particles) {

    int32_t rmax = world->rmax;

    // すべての粒子ペアに対して相互作用を検討する
    particle_t *p, *q, *guard = particles + world->nparticles;
    for(p = particles; p < guard; p++) {
        interact_t *pinteract = interact + 2 * world->nspecies * p->species;
        int32_t px = p->x;
        int32_t py = p->y;
        for(q = p + 1; q < guard; q++) {
            
            // 粒子間距離を求める（オーバーフローを意図的に無視する）
            // 離れすぎていたら飛ばす

            int32_t dx = q->x - px;
            int32_t adx = std::abs(dx);
            if(adx > rmax) continue;

            int32_t dy = q->y - py;
            int32_t ady = std::abs(dy);
            if(ady > rmax) continue;
            
            /*
            int64_t dd = (int64_t)dx * dx + (int64_t)dy * dy;
            if (dd == 0 || dd > rmax2) continue;

            // 距離を求める
            int64_t d = std::sqrt(dd);
            */

            // 整数演算のみで距離を求めるコードを使ってみた
            // （方向依存で最大 0.2% ほどの誤差が生じる）
            // https://dora.bk.tsukuba.ac.jp/~takeuchi/?cmd=read&page=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%2F%E5%B9%B3%E6%96%B9%E6%A0%B9%E3%82%92%E4%BD%BF%E3%82%8F%E3%81%9A%E3%81%AB%E8%B7%9D%E9%9B%A2%E3%82%92%E6%B1%82%E3%82%81%E3%82%8B&word=%E5%B9%B3%E6%96%B9%E6%A0%B9#v08053c6
            int32_t ma, mi, d;
            if(adx > ady) {
                ma = adx >> 10; mi = ady >> 10;
            } else {
                ma = ady >> 10; mi = adx >> 10;
            }
            if (73 * ma < 175 * mi) {
              d = 73 * ma < 110 * mi ? 794 * ma + 651 * mi :
                                       905 * ma + 484 * mi ;
            } else {
              d = 73 * ma < 366 * mi ? 982 * ma + 299 * mi :
                                      1022 * ma +  98 * mi ;
            }
            if (d == 0 || d > rmax) continue;

            // 相互作用は非対称なので正逆それぞれ求める必要がある
            
            interact_t *pqinteract = pinteract + q->species;
            
            int64_t accelp = calcAccel(world, pqinteract, d) / d;
            p->vx += ( accelp * dx ) >> 32;
            p->vy += ( accelp * dy ) >> 32;

            int64_t accelq = calcAccel(world, pqinteract + world->nspecies, d) / d;
            q->vx -= ( accelq * dx ) >> 32;
            q->vy -= ( accelq * dy ) >> 32;
        }
    }
}

// 粒子位置を更新する
void EMSCRIPTEN_KEEPALIVE moveParticles(
        world_t *world,
        int32_t *rand,
        particle_t *particles) {

    particle_t *p, *guard = particles + world->nparticles;
    for(p = particles; p < guard; p++) {
        // ノイズを加える
        p->vx += (world->perterb * (int64_t)XorShift128NextInt(rand)) >> 32;
        p->vy += (world->perterb * (int64_t)XorShift128NextInt(rand)) >> 32;

        // 粒子の移動
        p->x += p->vx;
        p->y += p->vy;

        // 減速
        p->vx = ((int64_t)p->vx * world->decel) >> 32;
        p->vy = ((int64_t)p->vy * world->decel) >> 32;
    }
};

#ifdef __cplusplus
}
#endif
