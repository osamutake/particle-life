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
        uint16_t *order) {

    int32_t rmax = world->rmax;
    int64_t rmax2 = (int64_t)world->rmax * world->rmax;

    // x 座標の近い粒子ペアのみに対して相互作用を検討する
    particle_t *pp, *qp;
    uint16_t *p, *q, *guard, *qguard;
    int32_t px, py, dx, adx, dy, ady;
    guard = order + world->nparticles;
    qguard = order + 1;
    for(p = order; p < guard; p++) {
        pp = particles + *p;
        interact_t *pinteract = interact + 2 * world->nspecies * pp->species;
        px = pp->x;
        py = pp->y;
        
        if(qguard == p) {
            qguard = p + 1;
            if(qguard == guard) qguard = order;
        }
        for(; qguard != p;) {
            dx = (particles + *qguard)->x - px;
            if( dx > rmax || dx < 0 )
                break;
            qguard = qguard + 1;
            if(qguard == guard) qguard = order;
        }

        q = p + 1;
        if(q == guard) q = order;
        for(; q != qguard;) {
            qp = particles + *q;

            dy = qp->y - py;
            if(std::abs(dy) <= rmax) {

                dx = qp->x - px;
                int64_t dd = (int64_t)dx * dx + (int64_t)dy * dy;
                if (dd <= rmax2 && dd != 0) {

                    // 距離を求める
                    int64_t d = std::sqrt(dd);

                    // 相互作用は非対称なので正逆それぞれ求める必要がある
                    
                    interact_t *pqinteract = pinteract + qp->species;
                    
                    int64_t accelp = calcAccel(world, pqinteract, d) / d;
                    pp->vx += ( accelp * dx ) >> 32;
                    pp->vy += ( accelp * dy ) >> 32;

                    int64_t accelq = calcAccel(world, pqinteract + world->nspecies, d) / d;
                    qp->vx -= ( accelq * dx ) >> 32;
                    qp->vy -= ( accelq * dy ) >> 32;
                }
            }
            
            q++;
            if(q == guard) q = order;
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

void EMSCRIPTEN_KEEPALIVE sortParticles1(
    int32_t n, uint16_t *order, particle_t *particles) {

    int i = 0, j;
    uint32_t oix, poix;    
    poix = particles[order[0]].x;
    for(i = 1; i < n; i++) {
        oix = particles[order[i]].x;
        if(poix <= oix) {
            poix = oix;
            continue;
        }

        uint16_t oi = order[i];
        for(j = i - 1; ; j--) {
            order[j+1] = order[j];
            if(j == 0) break;
            uint32_t ojx = particles[order[j-1]].x;
            if(ojx <= oix) break;
        }
        order[j] = oi;
    }
}

void sortParticlesSub3(
    int32_t l, int32_t r, uint16_t *order, particle_t *particles) {

    int i = l, j;
    uint32_t oix, poix;    
    poix = particles[order[0]].x;
    for(i++; i <= r; i++) {
        oix = particles[order[i]].x;
        if(poix <= oix) {
            poix = oix;
            continue;
        }

        uint16_t oi = order[i];
        for(j = i - 1; ; j--) {
            order[j+1] = order[j];
            if(j == l) break;
            uint32_t ojx = particles[order[j-1]].x;
            if(ojx <= oix) break;
        }
        order[j] = oi;
    }
}

void sortParticlesSub2(
    uint32_t l, uint32_t r, uint16_t *order, particle_t *particles
){
    for(uint32_t i = l; i < r; i++) {
        uint16_t mino = order[i];
        int32_t  minx = particles[mino].x;
        uint32_t mini = i;
        for(uint32_t j = l + 1; j <= r; j++) {
            if(particles[order[j]].x < minx) {
                minx = particles[order[j]].x;
                mino = order[j];
                mini = j;
            }
        }
        order[mini] = order[i];
        order[i] = mino;
    }
}

void sortParticlesSub(
    int32_t l, int32_t r, uint16_t *order, particle_t *particles
){
    if(r - l < 100) {
        sortParticlesSub3(l, r, order, particles);
        return;
    }
    
    int32_t  midx = particles[order[(r + l) >> 1]].x;
    int32_t i = l, j = r;
    while(1) {
        while(particles[order[i]].x < midx)
            i++;
        while(midx < particles[order[j]].x)
            j--;
        if(i >= j) break;

        uint16_t t = order[i];
        order[i] = order[j];
        order[j] = t;
        i++;
        j--;
    }
    if (l < i - 1) sortParticlesSub(l, i - 1, order, particles);
    if (j + 1 < r) sortParticlesSub(j + 1, r, order, particles);
}

void EMSCRIPTEN_KEEPALIVE sortParticles(
    int32_t n, uint16_t *order, particle_t *particles
) {
    sortParticlesSub(0, n - 1, order, particles);
}

#ifdef __cplusplus
}
#endif
