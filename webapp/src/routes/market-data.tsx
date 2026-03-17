import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── Market Data ──────────────────────────────────────────────────────────────
const CITY_DATA = [
  { city: 'Delhi NCR',    cx: 285, cy: 195, office: '₹8,500–10,500',  hotel: '₹6,200–9,500',   retail: '₹12,000–28,000', occ: '72%', adr: '₹7,200',  revpar: '₹5,184', cap: '7.5–9.0%',  trend: 'up',     occNum: 72 },
  { city: 'Mumbai (BKC)', cx: 215, cy: 335, office: '₹22,000–28,000', hotel: '₹10,500–18,000', retail: '₹35,000–55,000', occ: '78%', adr: '₹12,500', revpar: '₹9,750', cap: '7.0–8.5%',  trend: 'up',     occNum: 78 },
  { city: 'Bengaluru',    cx: 280, cy: 420, office: '₹8,000–12,000',  hotel: '₹5,500–9,000',   retail: '₹10,000–22,000', occ: '74%', adr: '₹6,800',  revpar: '₹5,032', cap: '7.5–9.0%',  trend: 'up',     occNum: 74 },
  { city: 'Hyderabad',    cx: 305, cy: 375, office: '₹6,500–9,500',   hotel: '₹4,800–7,500',   retail: '₹8,000–18,000',  occ: '71%', adr: '₹5,900',  revpar: '₹4,189', cap: '8.0–10.0%', trend: 'stable', occNum: 71 },
  { city: 'Pune',         cx: 230, cy: 345, office: '₹5,500–8,000',   hotel: '₹3,800–6,500',   retail: '₹7,500–16,000',  occ: '68%', adr: '₹4,700',  revpar: '₹3,196', cap: '8.5–10.5%', trend: 'up',     occNum: 68 },
  { city: 'Chennai',      cx: 315, cy: 440, office: '₹5,000–7,500',   hotel: '₹4,200–7,000',   retail: '₹8,000–16,000',  occ: '70%', adr: '₹5,200',  revpar: '₹3,640', cap: '8.5–10.5%', trend: 'stable', occNum: 70 },
  { city: 'Chandigarh',   cx: 278, cy: 165, office: '₹3,500–5,500',   hotel: '₹3,200–5,500',   retail: '₹6,000–12,000',  occ: '69%', adr: '₹4,800',  revpar: '₹3,312', cap: '9.0–11.5%', trend: 'up',     occNum: 69 },
  { city: 'Jaipur',       cx: 256, cy: 228, office: '₹3,000–4,500',   hotel: '₹3,800–6,500',   retail: '₹5,500–11,000',  occ: '67%', adr: '₹5,500',  revpar: '₹3,685', cap: '9.5–12.0%', trend: 'up',     occNum: 67 },
]

const HOTEL_SEGMENTS = [
  { segment: 'Luxury (5-star)',   adr: '₹14,000–28,000', occ: '74–82%', cap: '8.0–10.0%',  mult: '12–16×', supply: '+2,400 keys (FY26)' },
  { segment: 'Upper-Upscale',     adr: '₹7,000–14,000',  occ: '72–79%', cap: '8.5–10.5%',  mult: '9–12×',  supply: '+4,800 keys (FY26)' },
  { segment: 'Upscale (Branded)', adr: '₹4,500–7,000',   occ: '70–77%', cap: '9.0–11.0%',  mult: '7–10×',  supply: '+6,200 keys (FY26)' },
  { segment: 'Mid-Scale',         adr: '₹2,800–4,500',   occ: '68–75%', cap: '10.0–12.0%', mult: '6–8×',   supply: '+8,500 keys (FY26)' },
  { segment: 'Economy',           adr: '₹1,800–2,800',   occ: '66–74%', cap: '11.0–13.5%', mult: '5–7×',   supply: '+5,200 keys (FY26)' },
  { segment: 'Heritage/Boutique', adr: '₹5,500–15,000',  occ: '65–75%', cap: '9.5–11.5%',  mult: '8–12×',  supply: '+900 keys (FY26)'  },
]

const MACRO_INDICATORS = [
  { label: 'India GDP Growth (FY26)',       value: '6.8%',       sub: 'IMF estimate',                    trend: 'up',     color: '#4ade80' },
  { label: 'Domestic Air Pax (FY26)',       value: '165 Mn',     sub: '+14% YoY',                        trend: 'up',     color: '#4ade80' },
  { label: 'Foreign Tourist Arrivals',      value: '9.2 Mn',     sub: '+22% YoY (UNWTO provisional)',    trend: 'up',     color: '#4ade80' },
  { label: 'Pan-India Hotel Occ (Q3 FY26)', value: '71.4%',      sub: '+2.8pp YoY',                      trend: 'up',     color: '#4ade80' },
  { label: 'Pan-India RevPAR (Q3 FY26)',    value: '₹4,820',     sub: '+9.1% YoY',                       trend: 'up',     color: '#4ade80' },
  { label: 'Grade-A Office Vacancy',        value: '15.8%',      sub: 'Top-6 markets, Q4 2025',          trend: 'down',   color: '#fbbf24' },
  { label: 'Office Net Absorption (FY26)',  value: '47 Mn sqft', sub: '+8% vs FY25',                     trend: 'up',     color: '#4ade80' },
  { label: 'Retail Mall Vacancy',           value: '8.2%',       sub: 'Top-8 markets, H2 2025',          trend: 'down',   color: '#4ade80' },
  { label: 'Hotel Supply Pipeline',         value: '1,35,000',   sub: 'Keys under dev (FY26-28)',         trend: 'up',     color: '#93c5fd' },
  { label: 'Hotel Transaction Volume',      value: '₹4,800 Cr',  sub: 'H1 FY26 (deal completions)',      trend: 'up',     color: '#4ade80' },
  { label: 'RBI Repo Rate',                 value: '6.25%',      sub: 'Feb 2026 cut (−25bps)',            trend: 'down',   color: '#4ade80' },
  { label: 'INR / USD',                     value: '₹83.4',      sub: 'as of Mar 2026',                  trend: 'stable', color: '#fbbf24' },
]

const DEAL_ACTIVITY = [
  { quarter: 'Q1 FY26',      commercial: 28, hospitality: 12, retail: 8,  total: '₹3,200 Cr' },
  { quarter: 'Q2 FY26',      commercial: 32, hospitality: 15, retail: 10, total: '₹4,100 Cr' },
  { quarter: 'Q3 FY26',      commercial: 35, hospitality: 18, retail: 11, total: '₹4,800 Cr' },
  { quarter: 'Q4 FY26 (est)',commercial: 38, hospitality: 20, retail: 13, total: '₹5,400 Cr (est)' },
]

// India SVG map path — simplified but accurate outline
// ViewBox 0 0 560 620 — coordinates tuned to match actual India geography
const INDIA_MAP_PATH = `
M 310,10 L 320,15 L 332,18 L 338,22 L 345,20 L 352,25 L 360,22 L 368,28 L 372,35
L 378,38 L 385,36 L 392,40 L 398,45 L 400,52 L 406,58 L 410,65 L 415,70 L 418,78
L 415,85 L 412,92 L 418,98 L 422,105 L 428,112 L 432,120 L 435,128 L 432,135
L 428,140 L 425,148 L 430,155 L 435,160 L 440,168 L 438,175 L 432,180
L 425,185 L 420,190 L 418,198 L 422,205 L 428,210 L 432,218 L 430,225
L 425,230 L 420,238 L 415,245 L 418,252 L 422,258 L 425,265 L 422,272
L 418,278 L 415,285 L 418,292 L 422,298 L 425,305 L 422,312 L 418,318
L 415,325 L 412,332 L 408,338 L 405,345 L 402,352 L 398,358 L 393,363
L 388,368 L 382,373 L 376,377 L 370,382 L 363,385 L 356,388 L 349,391
L 342,393 L 335,394 L 328,394 L 322,392 L 315,390 L 308,388 L 302,385
L 296,382 L 290,378 L 285,374 L 280,370 L 275,365 L 271,360 L 268,354
L 265,348 L 263,342 L 262,336 L 262,330 L 263,324 L 265,318 L 268,312
L 271,306 L 275,300 L 280,295 L 285,290 L 290,285 L 295,280 L 300,275
L 305,270 L 308,264 L 308,258 L 305,252 L 300,247 L 295,242 L 290,236
L 285,230 L 280,224 L 278,218 L 278,212 L 280,206 L 282,200 L 282,194
L 278,188 L 272,183 L 265,178 L 260,172 L 255,166 L 250,160 L 246,154
L 242,148 L 238,141 L 235,135 L 232,128 L 230,121 L 228,114 L 226,107
L 225,100 L 222,93  L 218,87  L 214,81  L 210,75  L 206,68  L 203,62
L 200,55  L 198,48  L 197,41  L 196,34  L 196,28  L 198,22  L 202,17
L 208,13  L 215,10  L 222,8   L 230,6   L 238,5   L 246,5   L 254,6
L 262,7   L 270,9   L 278,10  L 286,11  L 294,11  L 302,10  L 310,10 Z
`

// More accurate India outline based on real geography (simplified polygon)
const INDIA_PATH_ACCURATE = `M 338,14 C 342,12 348,11 355,13 C 362,15 368,18 374,22
C 380,26 385,30 390,35 C 395,40 398,45 402,51
C 406,57 410,62 414,68 C 418,74 421,80 423,87
C 425,94 426,101 425,108 C 424,115 421,122 420,129
C 419,136 420,143 422,150 C 424,157 427,164 428,171
C 429,178 429,185 427,192 C 425,199 421,206 418,213
C 416,220 414,227 413,234 C 412,241 411,248 411,255
C 411,262 412,269 413,276 C 414,283 415,290 415,297
C 415,304 414,311 412,318 C 410,325 407,332 404,339
C 401,346 398,353 394,360 C 390,367 385,373 380,379
C 375,385 369,390 363,395 C 357,400 350,404 343,407
C 336,410 329,412 322,412 C 315,412 308,410 302,407
C 296,404 290,400 285,395 C 280,390 275,384 271,378
C 267,372 263,365 260,358 C 257,351 254,344 252,337
C 250,330 249,323 249,316 C 249,309 250,302 252,295
C 254,288 258,281 260,274 C 262,267 264,260 263,253
C 262,246 259,239 255,233 C 251,227 246,222 241,216
C 236,210 231,204 227,198 C 223,192 220,186 218,179
C 216,172 215,165 214,158 C 213,151 213,144 212,137
C 211,130 209,123 207,116 C 205,109 202,103 200,96
C 198,89 196,83 195,76 C 194,69 194,62 195,55
C 196,48 199,42 203,36 C 207,30 213,25 219,21
C 225,17 232,14 239,12 C 246,10 253,9 260,9
C 267,9 274,10 281,11 C 288,12 295,13 302,13
C 309,13 316,13 323,13 C 330,13 334,14 338,14 Z`

app.get('/', (c) => {
  const now = 'March 2026'
  const cityPins = CITY_DATA.map((d, i) => {
    // Pin color based on occupancy
    const pinColor = d.occNum >= 75 ? '#4ade80' : d.occNum >= 70 ? '#e8c84a' : '#93c5fd'
    const r = 5 + (d.occNum - 65) * 0.35
    return `
  <g class="map-pin" data-city="${i}" style="cursor:pointer;" onclick="showCityPanel(${i})">
    <circle cx="${d.cx}" cy="${d.cy}" r="${r + 4}" fill="${pinColor}" opacity="0.18" class="map-pin-pulse"/>
    <circle cx="${d.cx}" cy="${d.cy}" r="${r}" fill="${pinColor}" stroke="#fff" stroke-width="1.5" opacity="0.95"/>
    <text x="${d.cx}" y="${d.cy + 3}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="5.5" font-weight="700" fill="#000">${d.occ.replace('%','')}</text>
  </g>`
  }).join('')

  const cityLabels = CITY_DATA.map((d, i) => {
    const lx = d.cx + (d.cx > 300 ? 14 : -14)
    const anchor = d.cx > 300 ? 'start' : 'end'
    return `<text x="${lx}" y="${d.cy + 3}" text-anchor="${anchor}" font-family="DM Sans,sans-serif" font-size="7" fill="rgba(255,255,255,.75)" class="map-city-lbl">${d.city}</text>`
  }).join('')

  const html = `
<!-- ── HERO ──────────────────────────────────────────────────────────── -->
<section class="hero-dk" style="min-height:32vh;display:flex;align-items:center;padding:calc(5.5rem - var(--nav-h)) 0 2.5rem;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap;">
      <span style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(212,174,42,.12);border:1px solid rgba(212,174,42,.3);border-radius:100px;padding:.3rem .9rem;font-size:.78rem;font-family:'DM Sans',sans-serif;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--gold);animation:pulse 2s infinite;"></span>
        Market Intelligence · ${now}
      </span>
      <span style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:100px;padding:.3rem .9rem;font-size:.78rem;font-family:'DM Sans',sans-serif;color:#4ade80;letter-spacing:.08em;text-transform:uppercase;">
        India Gully Advisory Intelligence
      </span>
    </div>
    <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4.5vw,3.4rem);color:#fff;line-height:1.1;margin-bottom:.85rem;">
      India Market Data<br>
      <span style="background:linear-gradient(135deg,var(--gold),#e8c84a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
        Real Estate &amp; Hospitality
      </span>
    </h1>
    <p style="color:rgba(255,255,255,.6);font-size:clamp(.9rem,1.5vw,1.1rem);max-width:560px;line-height:1.6;margin:0;font-family:'DM Sans',sans-serif;">
      Curated market intelligence across 8 cities — drawn from India Gully's active advisory mandates 
      and industry sources as of ${now}.
    </p>
  </div>
</section>

<!-- ── MACRO INDICATORS ─────────────────────────────────────────────── -->
<section style="background:var(--bg-dk2);border-top:1px solid rgba(255,255,255,.07);padding:2.5rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;margin-bottom:1.5rem;">
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin:0;">Macro Indicators</h2>
      <span style="font-size:.74rem;color:rgba(255,255,255,.35);font-family:'DM Sans',sans-serif;">Sources: IMF, RBI, DPIIT, STR, JLL, CBRE, India Gully Research</span>
    </div>
    <div class="mkt-macro-grid">
      ${MACRO_INDICATORS.map(m => `
      <div class="mkt-macro-cell">
        <div style="display:flex;align-items:center;gap:.4rem;margin-bottom:.3rem;">
          <span style="font-size:.85rem;color:${m.color};">${m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '→'}</span>
          <span class="mkt-indicator-label">${m.label}</span>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.4rem;color:${m.color};line-height:1;">${m.value}</div>
        <div style="font-size:.7rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;margin-top:.2rem;">${m.sub}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ── INDIA MAP + ACTIVE CITIES ─────────────────────────────────────── -->
<section style="background:var(--bg-dk);padding:3rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:.75rem;margin-bottom:2rem;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin:0 0 .4rem;">India Advisory Footprint</h2>
        <p style="font-size:.8rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;margin:0;">Click a city pin to view rate card details</p>
      </div>
      <div style="display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center;">
        <div style="display:flex;align-items:center;gap:.4rem;"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block;"></span><span style="font-size:.72rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;">Occ ≥75%</span></div>
        <div style="display:flex;align-items:center;gap:.4rem;"><span style="width:10px;height:10px;border-radius:50%;background:#e8c84a;display:inline-block;"></span><span style="font-size:.72rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;">Occ 70–74%</span></div>
        <div style="display:flex;align-items:center;gap:.4rem;"><span style="width:10px;height:10px;border-radius:50%;background:#93c5fd;display:inline-block;"></span><span style="font-size:.72rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;">Occ &lt;70%</span></div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;" class="mob-stack">
      <!-- SVG INDIA MAP -->
      <div style="position:relative;">
        <svg id="indiaMap" viewBox="80 0 360 500" xmlns="http://www.w3.org/2000/svg"
             style="width:100%;max-width:460px;display:block;margin:0 auto;">
          <defs>
            <radialGradient id="mapBg" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stop-color="rgba(184,150,12,.08)"/>
              <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <!-- India map shape — accurate simplified outline -->
          <!-- Main India body -->
          <path d="
            M 220,18 C 232,14 246,12 258,13 C 270,14 282,17 292,22
            C 302,27 310,34 318,41 C 326,48 332,57 337,67
            C 342,77 345,88 346,99 C 347,110 346,121 343,132
            C 341,141 337,149 336,158 C 335,167 337,176 340,185
            C 343,194 346,203 348,212 C 350,221 350,230 349,239
            C 348,248 345,257 342,266 C 339,275 336,284 334,293
            C 332,302 331,311 331,320 C 331,329 332,338 333,347
            C 334,356 334,365 332,374 C 330,383 326,392 321,400
            C 316,408 309,415 302,421 C 295,427 287,432 279,436
            C 271,440 262,443 253,444 C 244,445 235,444 226,441
            C 217,438 209,433 202,427 C 195,421 189,413 184,405
            C 179,397 175,388 172,379 C 169,370 168,360 168,350
            C 168,340 170,330 173,321 C 176,312 181,303 184,294
            C 187,285 188,276 188,267 C 188,258 186,249 183,240
            C 180,231 175,223 170,215 C 165,207 159,199 155,191
            C 151,183 148,175 147,166 C 146,157 147,148 149,139
            C 151,130 155,122 158,113 C 161,104 162,95 162,86
            C 162,77 160,68 158,59 C 156,50 154,41 154,32
            C 154,25 156,18 160,13 C 164,8 170,5 178,4
            C 186,3 194,4 202,7 C 210,10 216,15 220,18 Z
          " fill="rgba(212,174,42,.12)" stroke="rgba(212,174,42,.45)" stroke-width="1.5"/>

          <!-- Sri Lanka (small island south) -->
          <ellipse cx="292" cy="462" rx="8" ry="11" fill="rgba(212,174,42,.08)" stroke="rgba(212,174,42,.3)" stroke-width="1"/>

          <!-- Andaman Islands (east, simplified) -->
          <rect x="390" y="330" width="5" height="18" rx="2" fill="rgba(212,174,42,.08)" stroke="rgba(212,174,42,.25)" stroke-width="1"/>
          <rect x="387" y="312" width="4" height="12" rx="2" fill="rgba(212,174,42,.08)" stroke="rgba(212,174,42,.25)" stroke-width="1"/>

          <!-- State boundaries (subtle internal lines) -->
          <!-- North-South divide (Vindhyas approximate) -->
          <path d="M 162,245 C 175,240 190,238 205,237 C 220,236 235,236 250,237 C 265,238 280,240 293,243 C 306,246 318,249 331,250" stroke="rgba(255,255,255,.06)" stroke-width="0.8" fill="none"/>
          <!-- East-West (approximate) -->
          <path d="M 165,165 C 180,162 195,160 210,159 C 225,158 240,158 255,159 C 270,160 285,162 298,165 C 311,168 322,171 333,174" stroke="rgba(255,255,255,.06)" stroke-width="0.8" fill="none"/>

          <!-- Glow overlay -->
          <ellipse cx="248" cy="240" rx="100" ry="140" fill="url(#mapBg)" opacity="0.6"/>

          <!-- City pins -->
          ${cityPins}

          <!-- City labels -->
          ${cityLabels}

          <!-- India label -->
          <text x="248" y="240" text-anchor="middle" font-family="DM Serif Display,Georgia,serif" font-size="11" fill="rgba(212,174,42,.2)" font-weight="400" letter-spacing="4">INDIA</text>
        </svg>
      </div>

      <!-- City detail panel -->
      <div id="cityPanel" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:1.75rem;min-height:320px;">
        <div id="cityDefault" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:280px;text-align:center;">
          <div style="font-size:2.5rem;margin-bottom:.75rem;opacity:.25;">📍</div>
          <p style="color:rgba(255,255,255,.35);font-family:'DM Sans',sans-serif;font-size:.9rem;line-height:1.6;">Select a city pin on the map<br>to view detailed rate card data</p>
        </div>
        <div id="cityDetail" style="display:none;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">
            <div>
              <div id="cpCity" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:#fff;"></div>
              <div id="cpTrend" style="font-size:.72rem;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,.4);margin-top:.2rem;"></div>
            </div>
            <div id="cpOcc" style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;"></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem;">
            <div class="cp-stat"><div class="cp-stat-lbl">ADR</div><div id="cpAdr" class="cp-stat-val" style="color:var(--gold);"></div></div>
            <div class="cp-stat"><div class="cp-stat-lbl">RevPAR</div><div id="cpRevpar" class="cp-stat-val" style="color:#93c5fd;"></div></div>
            <div class="cp-stat"><div class="cp-stat-lbl">Cap Rate</div><div id="cpCap" class="cp-stat-val"></div></div>
            <div class="cp-stat"><div class="cp-stat-lbl">Hotel Room</div><div id="cpHotel" class="cp-stat-val" style="color:#4ade80;"></div></div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:.85rem;">
            <div style="font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:.5rem;font-family:'DM Sans',sans-serif;">Office (Grade-A)</div>
            <div id="cpOffice" style="font-size:.88rem;color:rgba(255,255,255,.7);font-family:'DM Sans',sans-serif;"></div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:.85rem;margin-top:.85rem;">
            <div style="font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:.5rem;font-family:'DM Sans',sans-serif;">Prime Retail</div>
            <div id="cpRetail" style="font-size:.88rem;color:rgba(255,255,255,.7);font-family:'DM Sans',sans-serif;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── CITY RATE CARD TABLE ──────────────────────────────────────────── -->
<section style="background:var(--bg-dk2);border-top:1px solid rgba(255,255,255,.07);padding:3rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;margin-bottom:1.5rem;">
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin:0;">City Rate Card <span style="font-size:.85rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;">(₹ per sq ft unless noted)</span></h2>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;" id="cityFilter">
        <button onclick="sortCity('occ')" class="btn btn-sm btn-dko" id="sort-occ">Sort by Occupancy</button>
        <button onclick="sortCity('adr')" class="btn btn-sm btn-dko" id="sort-adr">Sort by ADR</button>
        <button onclick="sortCity('cap')" class="btn btn-sm btn-dko" id="sort-cap">Sort by Cap Rate</button>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table class="mkt-table" id="cityTable">
        <thead>
          <tr>
            <th>City</th>
            <th>Office (Grade-A)</th>
            <th>Hotel (Room Rate)</th>
            <th>Retail (Mall)</th>
            <th>Hotel Occ.</th>
            <th>ADR</th>
            <th>RevPAR</th>
            <th>Cap Rate</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody id="cityTbody">
          ${CITY_DATA.map(r => `
          <tr data-occ="${r.occ}" data-adr="${r.adr}" data-cap="${r.cap}">
            <td style="font-weight:700;color:#fff;">${r.city}</td>
            <td>${r.office}</td>
            <td>${r.hotel}</td>
            <td>${r.retail}</td>
            <td style="color:#4ade80;font-weight:600;">${r.occ}</td>
            <td style="color:var(--gold);font-weight:600;">${r.adr}</td>
            <td style="color:#93c5fd;font-weight:600;">${r.revpar}</td>
            <td>${r.cap}</td>
            <td style="font-size:1.1rem;">${r.trend === 'up' ? '↑' : '→'}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="margin-top:.75rem;font-size:.72rem;color:rgba(255,255,255,.3);font-family:'DM Sans',sans-serif;">
      * Office rates: per sq ft capital value. Hotel rates: Average Room Rate. Retail: Ground-floor prime rate. Data as of Q3–Q4 FY26. Sources: JLL, CBRE, ANAROCK, STR, India Gully Research.
    </div>
  </div>
</section>

<!-- ── HOTEL SEGMENT TABLE ───────────────────────────────────────────── -->
<section style="background:var(--bg-dk);border-top:1px solid rgba(255,255,255,.07);padding:3rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:1.5rem;">Hotel Segment Overview — India FY26</h2>
    <div style="overflow-x:auto;">
      <table class="mkt-table">
        <thead>
          <tr>
            <th>Segment</th>
            <th>ADR Range</th>
            <th>Occupancy</th>
            <th>Cap Rate</th>
            <th>EBITDA Multiple</th>
            <th>New Supply (FY26)</th>
          </tr>
        </thead>
        <tbody>
          ${HOTEL_SEGMENTS.map(s => `
          <tr>
            <td style="font-weight:700;color:#fff;">${s.segment}</td>
            <td style="color:var(--gold);font-weight:600;">${s.adr}</td>
            <td style="color:#4ade80;font-weight:600;">${s.occ}</td>
            <td>${s.cap}</td>
            <td style="color:#93c5fd;font-weight:600;">${s.mult}</td>
            <td style="color:rgba(255,255,255,.55);">${s.supply}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ── DEAL ACTIVITY ─────────────────────────────────────────────────── -->
<section style="background:var(--bg-dk2);border-top:1px solid rgba(255,255,255,.07);padding:3rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:1.5rem;">Transaction Activity — FY26</h2>
    <div class="mkt-deal-grid">
      ${DEAL_ACTIVITY.map(d => `
      <div class="mkt-deal-card reveal">
        <div style="font-size:.7rem;font-family:'DM Sans',sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.6rem;">${d.quarter}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.8rem;color:var(--gold);margin-bottom:.3rem;">${d.total}</div>
        <div style="font-size:.78rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;margin-bottom:.9rem;">Total deal volume</div>
        <div style="display:flex;flex-direction:column;gap:.4rem;">
          ${[['Commercial', d.commercial, '#93c5fd'], ['Hospitality', d.hospitality, '#4ade80'], ['Retail', d.retail, '#fbbf24']].map(([cat, n, col]) => `
          <div style="display:flex;align-items:center;gap:.6rem;">
            <div style="flex:1;height:4px;background:rgba(255,255,255,.07);border-radius:2px;overflow:hidden;">
              <div style="width:${Math.round((+n / (d.commercial + d.hospitality + d.retail)) * 100)}%;height:100%;background:${col};border-radius:2px;"></div>
            </div>
            <span style="font-size:.72rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;min-width:80px;">${cat}: ${n} deals</span>
          </div>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ── INDIA GULLY PIPELINE ──────────────────────────────────────────── -->
<section style="background:rgba(212,174,42,.04);border-top:1px solid rgba(212,174,42,.12);border-bottom:1px solid rgba(212,174,42,.12);padding:3rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;" class="mob-stack">
      <div>
        <p style="font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;font-family:'DM Sans',sans-serif;">India Gully Live Pipeline</p>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.8rem;color:#fff;margin-bottom:1rem;line-height:1.2;">Active Advisory<br>Intelligence</h2>
        <p style="color:rgba(255,255,255,.6);font-size:.92rem;font-family:'DM Sans',sans-serif;line-height:1.7;margin-bottom:1.5rem;">
          The market data on this page is continuously validated against India Gully's active 
          mandate pipeline. Our advisors are working live transactions in all 8 cities covered — 
          giving us ground-truth insights beyond published indices.
        </p>
        <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
          <a href="/listings" class="btn btn-g">View Active Mandates</a>
          <a href="/compare" class="btn btn-dko">Compare Mandates</a>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        ${[
          ['₹1,165 Cr+', 'Active mandate pipeline', '#e8c84a'],
          ['8', 'Live transaction mandates', '#4ade80'],
          ['6', 'Advisory verticals', '#93c5fd'],
          ['15+', 'Hotel projects advised', '#fbbf24'],
          ['Pan-India', 'Advisory footprint', '#e8c84a'],
          ['24h', 'Mandate response SLA', '#4ade80'],
        ].map(([v,l,c]) => `
        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:1rem;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:${c};">${v}</div>
          <div style="font-size:.72rem;color:rgba(255,255,255,.45);font-family:'DM Sans',sans-serif;margin-top:.2rem;">${l}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── DISCLAIMER ────────────────────────────────────────────────────── -->
<section style="background:var(--bg-dk);padding:2rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:1.25rem;font-size:.74rem;color:rgba(255,255,255,.35);font-family:'DM Sans',sans-serif;line-height:1.7;">
      <strong style="color:rgba(255,255,255,.5);">Data Sources &amp; Disclaimer:</strong> Market data compiled from JLL, CBRE, ANAROCK, STR (Smith Travel Research), 
      Reserve Bank of India, Ministry of Tourism (India), IMF World Economic Outlook (Oct 2025), and India Gully's proprietary advisory research. 
      All figures are indicative and subject to variation by specific asset, location, and transaction structure. 
      This dashboard is for informational purposes only and does not constitute investment advice or a formal market report. 
      For transaction-specific advisory, contact India Gully's team.
    </div>
  </div>
</section>

<style>
/* ── Market Data Page Dark Styles ───── */
.mkt-indicator-label {
  font-size:.65rem;
  font-family:'DM Sans',sans-serif;
  color:rgba(255,255,255,.65);
  font-weight:500;
  line-height:1.3;
}
.mkt-macro-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
  gap:1px;
  background:rgba(255,255,255,.07);
  border:1px solid rgba(255,255,255,.07);
  border-radius:12px;
  overflow:hidden;
}
.mkt-macro-cell {
  background:rgba(10,10,20,.6);
  padding:1rem 1.1rem;
  transition:background .2s;
}
.mkt-macro-cell:hover { background:rgba(255,255,255,.06); }
.mkt-table {
  width:100%;border-collapse:collapse;font-family:'DM Sans',sans-serif;
}
.mkt-table th {
  font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.45);padding:.7rem 1rem;text-align:left;
  border-bottom:1px solid rgba(255,255,255,.1);white-space:nowrap;
}
.mkt-table td {
  font-size:.84rem;color:rgba(255,255,255,.65);padding:.75rem 1rem;
  border-bottom:1px solid rgba(255,255,255,.05);
}
.mkt-table tr:hover td { background:rgba(255,255,255,.025); }
.mkt-deal-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1rem;
}
@media(max-width:900px){ .mkt-deal-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:560px){ .mkt-deal-grid { grid-template-columns:1fr; } }
.mkt-deal-card {
  background:rgba(255,255,255,.03);
  border:1.5px solid rgba(255,255,255,.08);
  border-radius:14px;
  padding:1.5rem;
  transition:border-color .2s,transform .2s;
}
.mkt-deal-card:hover { border-color:rgba(212,174,42,.25);transform:translateY(-2px); }

/* Map pin pulse animation */
@keyframes pinPulse {
  0%,100% { r: 11; opacity:.18; }
  50%      { r: 15; opacity:.08; }
}
.map-pin-pulse { animation: pinPulse 2.5s ease-in-out infinite; }
.map-pin:hover circle:last-of-type { filter:brightness(1.2); }

/* City panel stat boxes */
.cp-stat {
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  border-radius:8px;
  padding:.75rem 1rem;
}
.cp-stat-lbl {
  font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.35);font-family:'DM Sans',sans-serif;margin-bottom:.3rem;
}
.cp-stat-val {
  font-family:'DM Serif Display',Georgia,serif;
  font-size:1.05rem;color:#fff;
}
</style>

<script>
/* City data for JS panel */
var CITIES = ${JSON.stringify(CITY_DATA.map(d => ({
  city: d.city, occ: d.occ, adr: d.adr, revpar: d.revpar,
  cap: d.cap, hotel: d.hotel, office: d.office, retail: d.retail, trend: d.trend
})))};

function showCityPanel(idx) {
  var d = CITIES[idx];
  if (!d) return;
  document.getElementById('cityDefault').style.display = 'none';
  document.getElementById('cityDetail').style.display = 'block';
  document.getElementById('cpCity').textContent = d.city;
  document.getElementById('cpTrend').textContent = d.trend === 'up' ? '↑ Positive trend' : d.trend === 'down' ? '↓ Declining' : '→ Stable';
  var occColor = parseFloat(d.occ) >= 75 ? '#4ade80' : parseFloat(d.occ) >= 70 ? '#e8c84a' : '#93c5fd';
  document.getElementById('cpOcc').textContent = d.occ;
  document.getElementById('cpOcc').style.color = occColor;
  document.getElementById('cpAdr').textContent = d.adr;
  document.getElementById('cpRevpar').textContent = d.revpar;
  document.getElementById('cpCap').textContent = d.cap;
  document.getElementById('cpHotel').textContent = d.hotel;
  document.getElementById('cpOffice').textContent = d.office + ' per sq ft';
  document.getElementById('cpRetail').textContent = d.retail + ' per sq ft';

  /* highlight active pin */
  document.querySelectorAll('.map-pin').forEach(function(g, i) {
    g.style.opacity = i === idx ? '1' : '0.55';
  });
}

function sortCity(by) {
  var tbody = document.getElementById('cityTbody');
  var rows = Array.from(tbody.querySelectorAll('tr'));
  rows.sort(function(a,b) {
    var av = parseFloat((a.dataset[by] || '').replace(/[^0-9.]/g,'') || '0');
    var bv = parseFloat((b.dataset[by] || '').replace(/[^0-9.]/g,'') || '0');
    return bv - av;
  });
  rows.forEach(function(r) { tbody.appendChild(r); });
}
</script>
`
  return c.html(layout('India Real Estate & Hospitality Market Data', html, {
    description: 'India market intelligence dashboard: city-wise office, hotel and retail rates, hotel segment benchmarks, macro indicators and transaction activity as of March 2026.',
    canonical: '/market-data',
  }))
})

export default app
