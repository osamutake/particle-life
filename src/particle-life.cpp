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
        particle_t *particles,
        int32_t *indices,
        int32_t n) {

    int32_t rmax = world->rmax;
    int64_t rmax2 = (int64_t)world->rmax * world->rmax;

    int32_t *guard = indices + n - 1;
    for(int32_t *pi = indices; pi < guard; pi++) {
        particle_t *p = particles + *pi;
        interact_t *pinteract = interact + 2 * world->nspecies * p->species;
        int32_t px = p->x;
        int32_t py = p->y;
        
        for(int32_t *qi = pi + 1; qi <= guard; qi++) {
            particle_t *q = particles + *qi;

            int32_t dx = q->x - px;
            if(std::abs(dx) > rmax) continue;

            int32_t dy = q->y - py;
            if(std::abs(dy) > rmax) continue;

            int64_t dd = (int64_t)dx * dx + (int64_t)dy * dy;
            if (dd > rmax2 || dd == 0) continue;

            // 距離を求める
            int64_t d = std::sqrt(dd);

            // 相互作用は非対称なので正逆それぞれ求める必要がある
            interact_t *pqinteract = pinteract + q->species;
            
            int64_t accelp = calcAccel(world, pqinteract, d) / d;
            p->vx += ( accelp * dx ) >> 32;
            p->vy += ( accelp * dy ) >> 32;

            int64_t accelq = calcAccel(world, pqinteract + world->nspecies, d) / d;
            p->vx -= ( accelq * dx ) >> 32;
            p->vy -= ( accelq * dy ) >> 32;
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

void EMSCRIPTEN_KEEPALIVE fillParticleGrid(
    int32_t n, int32_t division, particle_t *particles, uint32_t *gridMem
) {
    int32_t shiftx = 8 - division * 2;
    uint32_t maskx  = (((uint32_t)0xffffffff) >> shiftx) & (0xff000000 << division);
    int32_t shifty = 8 - division;
    uint32_t masky  = (((uint32_t)0xffffffff) >> shifty) & 0xff000000;
    
    for(int i = 0; i < n; i++){
        gridMem[i] = i | ((particles[i].x >> shiftx) & maskx)
                       | ((particles[i].y >> shifty) & masky);
    }
}

void EMSCRIPTEN_KEEPALIVE separateParticleGrid(
    int32_t n, int32_t division, uint32_t *gridMem, int32_t *indices
) {
    uint32_t *pm = gridMem;
    uint32_t last = 0, now;
    indices[0] = 0;
    int i;
    for(i = 0; i < n; i++, pm++){
        now = *pm >> 24;
        if(last != now) {
            for(int j = last + 1; j <= now; j++)
                indices[j] = i;
            last = now;
        }
    }
    for(int j = last + 1; j <= (1 << (2*division)); j++)
        indices[j] = i;
}

#ifdef __cplusplus
}
#endif
