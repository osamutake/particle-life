#include <cmath>
#include <emscripten/emscripten.h>

#ifdef __cplusplus
extern "C" {    // C++ のマングリングを防ぐ
#endif

/************************************************

    XorShift128

************************************************/

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


/************************************************

    interactParticles

************************************************/

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

typedef struct {
    particle_t *p;
    int16_t x;
    int16_t row;
} index_t;

#pragma pack(pop)


//***** グローバル変数

world_t world;
uint64_t rmax2;


//***** 粒子間距離から相互作用を求める

inline int64_t calcAccel(interact_t *interact, int32_t d)
{
    int64_t accel;
    // 遠い方から処理したほうが少しだけ得
    if ( d >= world.rth2 ) {           // far
        accel = (int64_t)interact->c * (world.rmax - d); //  b / (rmax - rth2) << 32
    } else if ( d >= world.rth1 ) {    // middle
        accel = (int64_t)interact->b * (d - world.rth1); //  b / (rth2 - rth1) << 32
    } else {                           // near
        accel = (int64_t)interact->a * (world.rth1 - d); //  a / rth1          << 32
    }
    return accel;
}


//***** p と q との相互作用を処理

inline void interactParticleCore(
    particle_t *p, particle_t *q, 
    int64_t dx, int64_t dy,
    interact_t *pinteract) 
{
    int64_t dd = dx * dx + dy * dy;
    if (dd > rmax2 || dd == 0) return;

    // 距離を求める
    int32_t d = std::sqrt(dd);

    // 相互作用は非対称なので正逆それぞれ求める必要がある
    interact_t *pqinteract = pinteract + q->species;
    
    int64_t accelp = calcAccel(pqinteract, d) / d;
    p->vx += ( accelp * dx ) >> 32;
    p->vy += ( accelp * dy ) >> 32;

    int64_t accelq = calcAccel(pqinteract + world.nspecies, d) / d;
    q->vx -= ( accelq * dx ) >> 32;
    q->vy -= ( accelq * dy ) >> 32;
}


//***** 各種状況に応じた相互作用を処理

inline index_t *increaseIndex(index_t *p, index_t *index, index_t *guard)
{
    p++;
    return (p == guard) ? index : p;
}


// 何も考えないやつ

void interactWholeWorld(
    interact_t *interact, particle_t *particles, particle_t *guard) {

    for(particle_t *p = particles; p < guard; p++) {
        interact_t *pinteract = interact + 2 * world.nspecies * p->species;
        int32_t px = p->x;
        int32_t py = p->y;
        
        // 同じペアを２度数えないようにする
        for(particle_t *q = p + 1; q < guard; q++) {

            int32_t dx = q->x - px;
            if(std::abs(dx) > world.rmax) continue;

            int32_t dy = q->y - py;
            if(std::abs(dy) > world.rmax) continue;

            interactParticleCore(p, q, dx, dy, pinteract);
        }
    }
}

// 左端と右端が繋がっている可能性がある場合は総当たり
// 本当はもっとやりようがあるけど使用頻度低いので

void interactIntraCellPeriodic(
    interact_t *interact, int16_t xmax, index_t **cell) {

    index_t *index = *cell;
    index_t *guard = *(cell + 1);

    for(index_t *pi = index; pi < guard; pi++) {
        particle_t *p = pi->p;

        interact_t *pinteract = interact + 2 * world.nspecies * p->species;
        int32_t px = p->x;
        int32_t py = p->y;
        
        // 同じペアを２度数えないようにする
        for(index_t *qi = pi + 1; qi < guard; qi++) {
            particle_t *q = qi->p;

            int32_t dx = q->x - px;
            if(std::abs(dx) > world.rmax) continue;

            int32_t dy = q->y - py;
            if(std::abs(dy) > world.rmax) continue;

            interactParticleCore(p, q, dx, dy, pinteract);
        }
    }
}

// 左と右が繋がっている場合は総当たり
// 本当はもっとやりようがあるけど使用頻度低いので

void interactSameColumnPeriodic(
    interact_t *interact, int16_t xmax,
    index_t **pcell, index_t **qcell) {
    
    index_t *pindex = *pcell;
    index_t *pguard = *(pcell+1);
    index_t *qindex = *qcell;
    index_t *qguard = *(qcell+1);

    for(index_t *pi = pindex; pi < pguard; pi++) {
        particle_t *p = pi->p;

        interact_t *pinteract = interact + 2 * world.nspecies * p->species;
        int32_t px = p->x;
        int32_t py = p->y;
        
        for(index_t *qi = qindex; qi < qguard; qi++) {
            particle_t *q = qi->p;

            int32_t dx = q->x - px;
            if(std::abs(dx) > world.rmax) continue;

            int32_t dy = q->y - py;
            if(std::abs(dy) > world.rmax) continue;

            interactParticleCore(p, q, dx, dy, pinteract);
        }
    }
}

// 左と右が繋がっていないセル内部

void interactIntraCell(interact_t *interact, uint16_t xmax, index_t **cell) 
{
    index_t *index = *cell;
    index_t *guard = *(cell + 1);
    if(guard - index < 1) return; // ペアはない

    // 同じペアを２度数えないようにしている
    index_t *qguard = index + 1;
    for(index_t *pi = index; pi < guard; pi++) {

        // px から x 正方向に xmax 離れた点を qguard に入れる
        for(int32_t pix = pi->x; (int16_t)(qguard->x - pix) < xmax && qguard < guard; qguard++)
            ;

        particle_t *p = pi->p;
        interact_t *pinteract = interact + 2 * world.nspecies * p->species;
        int32_t px = p->x;
        int32_t py = p->y;

        for(index_t *qi = pi + 1; qi < qguard; qi++) {
            particle_t *q = qi->p;

            int32_t dy = q->y - py;
            if(std::abs(dy) > world.rmax) continue;

            int32_t dx = q->x - px;
            
            interactParticleCore(p, q, dx, dy, pinteract);
        }
    }
}


void interactSameColumn(
        interact_t *interact, int16_t xmax,
        index_t **pcell, index_t **qcell) {

    index_t *pindex = *pcell;
    index_t *pguard = *(pcell+1);
    index_t *qindex = *qcell;
    index_t *qguard = *(qcell+1);
    
    index_t *qs = qindex;
    index_t *qe = qindex;

    // qindex から xmax 以内まで ps を進める
    index_t *ps = pindex;
    for(int16_t qsx = qs->x; ((int16_t)(qsx - ps->x) > xmax) && (ps < pguard); ps++)
        ;

    for(index_t *pi = ps; pi < pguard; pi++) {
        int16_t pix = pi->x;

        // pi から xmax 以内まで ps を進める
        for(; ((int16_t)(pix - qs->x) > xmax) && (qs < qguard); qs++)
            ;

        // px から xmax 離れるまで qe を進める
        for(; ((int16_t)(qe->x - pix) < xmax) && (qe < qguard); qe++)
            ;

        particle_t *p = pi->p;
        interact_t *pinteract = interact + 2 * world.nspecies * p->species;
        int32_t px = p->x;
        int32_t py = p->y;

        for(index_t *qi = qs; qi < qe; qi++) {
            particle_t *q = qi->p;

            int32_t dy = q->y - py;
            if(std::abs(dy) > world.rmax) continue;

            int32_t dx = q->x - px;
            
            interactParticleCore(p, q, dx, dy, pinteract);
        }
    }
}


void interactAdjacentColumn(
        interact_t *interact, int16_t xmax,
        index_t **pcell, index_t **qcell) {

    index_t *pindex = *pcell;
    index_t *pguard = *(pcell+1);
    index_t *qindex = *qcell;
    index_t *qguard = *(qcell+1);
    
    if(pguard==pindex || qguard==qindex) return;
    
    // qindex から x 負方向に xmax 離れた点を ps に入れる
    index_t *ps = pindex;
    for(int16_t qsx = qindex->x; (int16_t)(qsx - ps->x) > xmax && (ps < pguard); ps++)
        ;

    index_t *qe = qindex;
    for(index_t *pi = ps; pi < pguard; pi++) {

        // px から x 正方向に xmax 離れた点を qe に入れる
        for(int16_t pix = pi->x; ((int16_t)(qe->x - pix) < xmax) && (qe < qguard); qe++)
            ;

        particle_t *p = pi->p;
        interact_t *pinteract = interact + 2 * world.nspecies * p->species;
        int32_t px = p->x;
        int32_t py = p->y;

        for(index_t *qi = qindex; qi < qe; qi++) {
            particle_t *q = qi->p;

            int32_t dy = q->y - py;
            if(std::abs(dy) > world.rmax) continue;

            int32_t dx = q->x - px;
            
            interactParticleCore(p, q, dx, dy, pinteract);
        }
    }
}

void sortParticleIndexSub(int64_t *l, int64_t *r) {
    for(int64_t *i = l; i < r; i++) {
        // find minimum
        int64_t iv = *i;
        int64_t minv = iv;
        int64_t *minp = i;
        for(int64_t *j = i + 1; j <= r; j++) {
            int64_t jv = *j;
            // compare higher 32 bits
            if(((int32_t *)&jv)[1] < ((int32_t *)&minv)[1]) {
                minv = jv;
                minp = j;
            }
        }
        // swap
        *minp = iv;
        *i = minv;
    }
}

void sortParticleindex(int64_t *l, int64_t *r) {
    if(r - l < 20) {
        sortParticleIndexSub(l, r);
        return;
    }
    
    uint32_t pivot = ((uint32_t*)(l + (r - l)/2))[1];
    int64_t *i = l, *j = r;
    int64_t iv, jv;
    while(1) {
        while(((uint32_t *)&(iv = *i))[1] < pivot)
            i++;
        while(pivot < ((uint32_t*)&(jv = *j))[1])
            j--;
        if(i >= j) break;
        *(i++) = jv;
        *(j--) = iv;
    }
    if (l < i - 1) sortParticleindex(l, i - 1);
    if (j + 1 < r) sortParticleindex(j + 1, r);
}


void setupXMax(int16_t *xmax, int nrow, int row_div)
{
    double row_height = 1.0 / nrow;
    double rmax = world.rmax / (65536.0 * 65536.0);
    for(int i = 1; i <= row_div; i++) {
        double dx = std::sqrt( rmax * rmax - 
            ((i - 1) * row_height) * ((i - 1) * row_height) );

        // 誤差の影響を避けるため 1 だけ狭めておく
        xmax[i] = (int16_t)(dx * 65536) + 1;
    }
    xmax[0] = xmax[1];
}

void EMSCRIPTEN_KEEPALIVE interactParticles(
        world_t *pworld, interact_t *interact, particle_t *particles) {
    
    if(sizeof(index_t) != sizeof(int64_t)) return;  // assertion

    world = *pworld; // グローバル変数を設定
    rmax2 = (uint64_t)world.rmax * (uint64_t)world.rmax;

    int n = world.nparticles;
    int32_t *p = (int32_t *)(particles + n) + 16;
    index_t *index = (index_t *)((int32_t)p & 0xfffffff0);
    index_t **grid = (index_t **)(index + n);
    
    int ncol = ((int64_t)1 << 32) / world.rmax;
    if(ncol <= 2) ncol = 1;
    
    const uint64_t row_div = 1;
    int nrow = (row_div << 32) / world.rmax;
    if(nrow <= 2) nrow = 1;
    
    if(nrow == 1) {
        interactWholeWorld(interact, particles, particles + n);
        return;
    }
    
    int16_t *xmax = (int16_t*)(grid + ncol * nrow + 1); // xmax[nrow][ncol] + 1
    setupXMax(xmax, nrow, row_div);
    
    // index particles
    for(int i = 0; i < n; i++) {
        index[i].p   = &particles[i];
        index[i].x   = ((uint16_t*)&particles[i].x)[1];
        index[i].row = ((uint16_t*)&particles[i].y)[1] * (int)nrow >> 16;
    }
    
    //                  l,                r
    sortParticleindex((int64_t *)index, (int64_t *)(index + (n - 1)));
    // slice index
    index_t *guard = index + n;
    int last_rc = 0;
    for(index_t *p = index; p < guard; p++) {
        int col = (uint16_t)p->x * ncol >> 16;
        int row = p->row;
        int rc = row * ncol + col;
        for(;last_rc <= rc; last_rc++) {
            grid[last_rc] = p;
        }
    }
    for(;last_rc <= nrow * ncol; last_rc++) {
        grid[last_rc] = guard;
    }

    // interaction
    #define GRID(col, row) (grid + ((row+nrow) % nrow) * ncol + (col+ncol) % ncol)
    
    if(ncol == 1) {
        for(int row = 0; row < nrow; row++) {
            interactIntraCellPeriodic(interact, xmax[0], GRID(0, row));
            
            for(int j = 1; j <= row_div; j++) 
                interactSameColumnPeriodic(interact, xmax[j],
                    GRID(0, row), GRID(0, row+j));
        }
        return;
    }
    
    for(int row = 0; row < nrow; row++) {
        for(int col = 0; col < ncol; col++) {
            interactIntraCell(interact, xmax[0], GRID(col, row));
            
            interactAdjacentColumn(interact, xmax[0],
                GRID(col, row), GRID(col+1, row));

            for(int j = 1; j <= row_div; j++) {
                // (0, j)
                interactSameColumn(interact, xmax[j],
                    GRID(col, row), GRID(col, row+j));

                // (+1, j)
                interactAdjacentColumn(interact, xmax[j],
                    GRID(col, row), GRID(col+1, row+j));

                // (-1, j)
                interactAdjacentColumn(interact, xmax[j],
                    GRID(col-1, row+j), GRID(col, row));
            }
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
