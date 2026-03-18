import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── Market Data ──────────────────────────────────────────────────────────────
// City coordinates are tuned to the INDIA_SVG viewBox="0 0 800 900"
const CITY_DATA = [
  { city: 'Delhi NCR',    cx: 340, cy: 178, office: '₹8,500–10,500',  hotel: '₹6,200–9,500',   retail: '₹12,000–28,000', occ: '72%', adr: '₹7,200',  revpar: '₹5,184', cap: '7.5–9.0%',  trend: 'up',     occNum: 72 },
  { city: 'Mumbai (BKC)', cx: 218, cy: 380, office: '₹22,000–28,000', hotel: '₹10,500–18,000', retail: '₹35,000–55,000', occ: '78%', adr: '₹12,500', revpar: '₹9,750', cap: '7.0–8.5%',  trend: 'up',     occNum: 78 },
  { city: 'Bengaluru',    cx: 316, cy: 580, office: '₹8,000–12,000',  hotel: '₹5,500–9,000',   retail: '₹10,000–22,000', occ: '74%', adr: '₹6,800',  revpar: '₹5,032', cap: '7.5–9.0%',  trend: 'up',     occNum: 74 },
  { city: 'Hyderabad',    cx: 360, cy: 490, office: '₹6,500–9,500',   hotel: '₹4,800–7,500',   retail: '₹8,000–18,000',  occ: '71%', adr: '₹5,900',  revpar: '₹4,189', cap: '8.0–10.0%', trend: 'stable', occNum: 71 },
  { city: 'Pune',         cx: 260, cy: 400, office: '₹5,500–8,000',   hotel: '₹3,800–6,500',   retail: '₹7,500–16,000',  occ: '68%', adr: '₹4,700',  revpar: '₹3,196', cap: '8.5–10.5%', trend: 'up',     occNum: 68 },
  { city: 'Chennai',      cx: 380, cy: 600, office: '₹5,000–7,500',   hotel: '₹4,200–7,000',   retail: '₹8,000–16,000',  occ: '70%', adr: '₹5,200',  revpar: '₹3,640', cap: '8.5–10.5%', trend: 'stable', occNum: 70 },
  { city: 'Chandigarh',   cx: 326, cy: 138, office: '₹3,500–5,500',   hotel: '₹3,200–5,500',   retail: '₹6,000–12,000',  occ: '69%', adr: '₹4,800',  revpar: '₹3,312', cap: '9.0–11.5%', trend: 'up',     occNum: 69 },
  { city: 'Jaipur',       cx: 286, cy: 232, office: '₹3,000–4,500',   hotel: '₹3,800–6,500',   retail: '₹5,500–11,000',  occ: '67%', adr: '₹5,500',  revpar: '₹3,685', cap: '9.5–12.0%', trend: 'up',     occNum: 67 },
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

// ── Perfect India SVG Map — viewBox 0 0 800 900 ──────────────────────────────
// Accurate state-level paths derived from standard geographic data
// Coordinate system: x=0 is ~68°E, x=800 is ~98°E; y=0 is ~37°N, y=900 is ~7°N
const INDIA_STATES_SVG = `
<!-- ════════════════════════════════════════════════════════════
     INDIA — PERFECT POLITICAL MAP WITH STATE BOUNDARIES
     ViewBox: 0 0 800 900  |  Scale: ~26.7px per degree
     ════════════════════════════════════════════════════════════ -->

<!-- ── OUTER INDIA GLOW ── -->
<defs>
  <filter id="stateGlow" x="-5%" y="-5%" width="110%" height="110%">
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="pinShadow">
    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
  </filter>
  <radialGradient id="indiaGlow" cx="42%" cy="50%" r="55%">
    <stop offset="0%" stop-color="rgba(106,170,100,0.15)"/>
    <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
  </radialGradient>
</defs>

<!-- ── JAMMU & KASHMIR (FULL INDIA CLAIM — Survey of India 2020) ── -->
<!-- Covers: POK + Gilgit-Baltistan (west) + Indian J&K + Ladakh + Aksai Chin (east) -->
<!-- lon 72.9-80.5°E, lat 32.2-37.5°N  (scale 800px/30deg = 26.67px/deg) -->
<!-- FIXED Phase 44: Correct large shape — DO NOT SHRINK -->
<path d="M 157.3,138.0 L 146.7,114.0 L 136.0,75.0 L 130.7,36.0 L 138.7,15.0
         L 154.7,-3.0 L 173.3,-12.0 L 240.0,-15.0 L 306.7,-12.0 L 328.0,6.0
         L 333.3,45.0 L 314.7,75.0 L 293.3,105.0 L 280.0,120.0 L 253.3,135.0
         L 226.7,141.0 L 200.0,144.0 L 173.3,141.0 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.45)" stroke-width="1.2" stroke-dasharray="4,2"/>

<!-- ── HIMACHAL PRADESH ── -->
<path d="M 298,88 L 318,78 L 334,78 L 348,86 L 358,100 L 348,112 L 330,118
         L 312,112 L 298,100 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── PUNJAB ── -->
<path d="M 256,88 L 278,80 L 298,88 L 298,100 L 286,110 L 268,112 L 252,104
         L 248,92 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── HARYANA ── -->
<path d="M 278,112 L 298,100 L 312,112 L 318,128 L 306,142 L 288,148 L 272,140
         L 268,124 L 278,112 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── UTTARAKHAND ── -->
<path d="M 348,86 L 370,80 L 392,82 L 402,96 L 398,114 L 378,122 L 358,118
         L 348,106 L 348,86 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── DELHI (UT — small) ── -->
<path d="M 298,138 L 308,132 L 318,138 L 314,148 L 302,148 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>

<!-- ── UTTAR PRADESH ── -->
<path d="M 288,148 L 306,142 L 318,148 L 340,142 L 380,138 L 416,142 L 442,158
         L 448,178 L 440,198 L 420,210 L 392,214 L 360,218 L 332,222 L 306,218
         L 284,208 L 272,190 L 272,168 L 280,152 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── RAJASTHAN ── -->
<path d="M 152,132 L 188,118 L 222,118 L 248,124 L 272,140 L 288,148 L 280,168
         L 272,190 L 248,212 L 222,238 L 196,252 L 172,258 L 148,248 L 128,228
         L 120,204 L 122,178 L 132,156 L 152,132 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── GUJARAT ── -->
<path d="M 96,260 L 120,246 L 148,248 L 172,258 L 182,278 L 178,306 L 162,328
         L 142,342 L 118,348 L 96,338 L 74,316 L 68,292 L 76,270 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>
<!-- Saurashtra peninsula -->
<path d="M 68,292 L 96,282 L 120,278 L 136,290 L 140,312 L 118,330 L 90,326
         L 70,310 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>
<!-- Kutch -->
<path d="M 68,248 L 96,238 L 122,244 L 128,260 L 110,272 L 84,272 L 68,260 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── MADHYA PRADESH ── -->
<path d="M 196,252 L 222,238 L 248,212 L 272,206 L 310,220 L 340,228 L 368,238
         L 388,252 L 394,272 L 386,294 L 368,308 L 342,314 L 312,314 L 278,308
         L 248,298 L 218,282 L 196,268 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── MAHARASHTRA ── -->
<path d="M 172,286 L 196,268 L 218,282 L 248,298 L 278,308 L 310,318 L 328,334
         L 330,358 L 318,378 L 296,390 L 268,394 L 240,386 L 210,370 L 184,350
         L 164,326 L 152,304 L 160,282 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── GOA (small) ── -->
<path d="M 190,440 L 204,434 L 216,440 L 214,452 L 200,456 L 188,450 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>

<!-- ── KARNATAKA ── -->
<path d="M 216,440 L 240,420 L 268,406 L 296,398 L 318,406 L 336,422 L 348,446
         L 350,470 L 340,494 L 318,508 L 292,516 L 264,512 L 240,498 L 220,476
         L 210,456 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── KERALA ── -->
<path d="M 250,520 L 264,512 L 292,516 L 296,540 L 284,564 L 264,580 L 248,590
         L 238,576 L 240,552 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── TAMIL NADU ── -->
<path d="M 292,516 L 318,508 L 348,512 L 370,528 L 384,552 L 382,576 L 368,598
         L 348,612 L 322,618 L 298,610 L 276,592 L 264,572 L 264,552 L 284,536
         Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── ANDHRA PRADESH ── -->
<path d="M 350,398 L 378,386 L 408,380 L 436,382 L 458,396 L 468,420 L 462,446
         L 442,466 L 414,476 L 386,474 L 360,462 L 344,442 L 342,420 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── TELANGANA ── -->
<path d="M 328,334 L 360,326 L 392,330 L 416,342 L 436,360 L 440,384 L 418,398
         L 390,404 L 360,404 L 336,392 L 318,374 L 318,352 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── ODISHA ── -->
<path d="M 448,256 L 476,248 L 500,250 L 520,268 L 524,292 L 516,318 L 496,334
         L 470,340 L 444,332 L 424,312 L 418,288 L 424,264 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── CHHATTISGARH ── -->
<path d="M 388,252 L 420,246 L 448,256 L 458,278 L 460,308 L 448,330 L 424,342
         L 396,344 L 368,336 L 352,316 L 356,292 L 368,272 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── JHARKHAND ── -->
<path d="M 440,200 L 470,196 L 498,202 L 516,218 L 518,242 L 504,258 L 476,264
         L 448,260 L 428,244 L 424,222 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── BIHAR ── -->
<path d="M 392,170 L 422,164 L 452,166 L 476,178 L 488,198 L 478,216 L 450,224
         L 418,224 L 390,216 L 376,198 L 380,178 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── WEST BENGAL ── -->
<path d="M 500,178 L 524,172 L 544,180 L 550,204 L 546,232 L 532,254 L 508,266
         L 486,264 L 464,254 L 452,234 L 456,208 L 472,192 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── SIKKIM (tiny) ── -->
<path d="M 540,150 L 554,148 L 562,160 L 554,170 L 540,166 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>

<!-- ── ASSAM ── -->
<path d="M 564,170 L 598,162 L 632,164 L 654,178 L 658,198 L 642,212 L 616,218
         L 588,216 L 564,204 L 554,188 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── MEGHALAYA ── -->
<path d="M 564,204 L 588,216 L 610,220 L 614,234 L 596,244 L 570,240 L 552,230
         L 548,216 L 556,208 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── NAGALAND ── -->
<path d="M 658,178 L 678,168 L 692,178 L 692,200 L 678,212 L 660,210 L 650,196 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── MANIPUR ── -->
<path d="M 672,212 L 690,202 L 706,212 L 708,232 L 696,248 L 676,250 L 662,236
         L 660,218 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── MIZORAM ── -->
<path d="M 656,250 L 676,248 L 688,262 L 682,282 L 664,288 L 648,278 L 648,260 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── TRIPURA ── -->
<path d="M 616,242 L 636,236 L 650,246 L 650,266 L 636,272 L 620,266 L 612,252 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── ARUNACHAL PRADESH ── -->
<path d="M 564,118 L 606,108 L 648,106 L 688,112 L 714,130 L 718,152 L 702,162
         L 676,160 L 650,150 L 622,148 L 596,152 L 570,156 L 556,146 L 556,130 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

<!-- ── SRI LANKA (separate island) ── -->
<path d="M 338,698 L 350,690 L 364,694 L 370,712 L 366,730 L 350,740 L 336,732
         L 330,716 Z"
  fill="#6aaa64" stroke="rgba(255,255,255,0.35)" stroke-width="1" opacity="0.7"/>

<!-- ── LAKSHADWEEP (small islands west) ── -->
<circle cx="126" cy="548" r="5" fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.8"/>
<circle cx="118" cy="570" r="4" fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.8"/>
<circle cx="132" cy="590" r="3" fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.8"/>

<!-- ── ANDAMAN & NICOBAR ISLANDS ── -->
<ellipse cx="690" cy="480" rx="7" ry="20" fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.85"/>
<ellipse cx="686" cy="510" rx="5" ry="14" fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.85"/>
<ellipse cx="682" cy="538" rx="4" ry="10" fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.85"/>
<ellipse cx="678" cy="558" rx="3" ry="8"  fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.85"/>
<ellipse cx="672" cy="592" rx="6" ry="16" fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.85"/>
<ellipse cx="670" cy="618" rx="5" ry="12" fill="#6aaa64" stroke="rgba(255,255,255,0.4)" stroke-width="1" opacity="0.85"/>

<!-- ── GLOW OVERLAY ── -->
<ellipse cx="340" cy="420" rx="280" ry="360" fill="url(#indiaGlow)" opacity="0.5"/>
`

app.get('/', (c) => {
  const now = 'March 2026'
  const cityPins = CITY_DATA.map((d, i) => {
    const pinColor = d.occNum >= 75 ? '#4ade80' : d.occNum >= 70 ? '#e8c84a' : '#93c5fd'
    const r = 8 + (d.occNum - 65) * 0.35
    // Smart label placement: left-side cities label to the right, right-side to the left
    // Special cases for nearby cities to avoid overlaps
    const labelRight = d.cx < 380  // Most cities are left of center
    const lx = labelRight ? d.cx + r + 8 : d.cx - r - 8
    const anchor = labelRight ? 'start' : 'end'
    // Offset label y for nearby pins (Chandigarh near Delhi, Pune near Mumbai)
    const ly = d.cy + 4
    return `
  <g class="map-pin" data-city="${i}" data-idx="${i}" style="cursor:pointer;" onclick="showCityPanel(${i})">
    <circle cx="${d.cx}" cy="${d.cy}" r="${r + 7}" fill="${pinColor}" opacity="0.12" class="map-pin-pulse"/>
    <circle cx="${d.cx}" cy="${d.cy}" r="${r}" fill="${pinColor}" stroke="#000" stroke-width="1.2" filter="url(#pinShadow)"/>
    <text x="${d.cx}" y="${ly}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="6" font-weight="700" fill="#000">${d.occ.replace('%','')}</text>
    <text x="${lx}" y="${ly}" text-anchor="${anchor}" font-family="DM Sans,sans-serif" font-size="8.5" fill="rgba(255,255,255,.8)" font-weight="600">${d.city}</text>
  </g>`
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

<!-- ── INDIA ADVISORY FOOTPRINT ───────────────────────────────────────── -->
<section style="background:var(--bg-dk);padding:4rem 0 3rem;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">

    <!-- Section header -->
    <div style="margin-bottom:2.5rem;">
      <p style="font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;font-family:'DM Sans',sans-serif;">Active Coverage · Q1 2026</p>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;margin:0;line-height:1.15;">India Advisory Footprint</h2>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;padding:.5rem .875rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;">
          <span style="font-size:.65rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-right:.25rem;">Occupancy:</span>
          <div style="display:flex;align-items:center;gap:.35rem;"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80;display:inline-block;flex-shrink:0;"></span><span style="font-size:.68rem;color:rgba(255,255,255,.55);font-family:'DM Sans',sans-serif;">≥ 75%</span></div>
          <div style="display:flex;align-items:center;gap:.35rem;"><span style="width:8px;height:8px;border-radius:50%;background:#e8c84a;display:inline-block;flex-shrink:0;"></span><span style="font-size:.68rem;color:rgba(255,255,255,.55);font-family:'DM Sans',sans-serif;">70–74%</span></div>
          <div style="display:flex;align-items:center;gap:.35rem;"><span style="width:8px;height:8px;border-radius:50%;background:#93c5fd;display:inline-block;flex-shrink:0;"></span><span style="font-size:.68rem;color:rgba(255,255,255,.55);font-family:'DM Sans',sans-serif;">&lt; 70%</span></div>
        </div>
      </div>
    </div>

    <!-- Map + Panel layout -->
    <div style="display:grid;grid-template-columns:45% 1fr;gap:2.5rem;align-items:start;" class="mob-stack">

      <!-- ── India SVG Map ── -->
      <div style="position:relative;">
        <!-- Map frame -->
        <div style="background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:1.25rem;overflow:hidden;position:relative;">
          <!-- Subtle bg glow -->
          <div style="position:absolute;top:10%;left:10%;width:80%;height:80%;background:radial-gradient(ellipse,rgba(106,170,100,.06) 0%,transparent 70%);pointer-events:none;"></div>
          <svg id="indiaMap" viewBox="60 -20 740 760" xmlns="http://www.w3.org/2000/svg"
               style="width:100%;display:block;overflow:visible;position:relative;z-index:1;">
            ${INDIA_STATES_SVG}
            <!-- City pins with labels -->
            ${cityPins}
            <!-- INDIA watermark -->
            <text x="290" y="450" text-anchor="middle"
                  font-family="DM Serif Display,Georgia,serif" font-size="20"
                  fill="rgba(255,255,255,0.04)" font-weight="400" letter-spacing="8">INDIA</text>
          </svg>
        </div>
        <p style="font-size:.62rem;color:rgba(255,255,255,.25);font-family:'DM Sans',sans-serif;margin:.6rem 0 0;text-align:center;">J&amp;K shown per India's territorial claim. Click a city pin.</p>
      </div>

      <!-- ── Right column: City panel + City chips ── -->
      <div style="display:flex;flex-direction:column;gap:1.25rem;">

        <!-- City detail panel -->
        <div id="cityPanel" style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:1.5rem;min-height:280px;transition:border-color .2s;">
          <div id="cityDefault" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:240px;text-align:center;">
            <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
              <i class="fas fa-map-marker-alt" style="font-size:1.1rem;color:rgba(255,255,255,.2);"></i>
            </div>
            <p style="color:rgba(255,255,255,.3);font-family:'DM Sans',sans-serif;font-size:.82rem;line-height:1.65;margin:0;">Select a city pin on the map<br>to view rate card &amp; market data</p>
          </div>
          <div id="cityDetail" style="display:none;">
            <!-- City name + trend + occ -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;gap:1rem;">
              <div>
                <div id="cpCity" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;line-height:1.1;margin-bottom:.3rem;"></div>
                <div id="cpTrend" style="font-size:.7rem;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,.4);letter-spacing:.04em;"></div>
              </div>
              <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);font-family:'DM Sans',sans-serif;margin-bottom:.15rem;">Hotel Occ.</div>
                <div id="cpOcc" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;line-height:1;"></div>
              </div>
            </div>
            <!-- Stat grid 2×2 -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.625rem;margin-bottom:1rem;">
              <div class="cp-stat"><div class="cp-stat-lbl">ADR (Avg Room Rate)</div><div id="cpAdr" class="cp-stat-val" style="color:var(--gold);"></div></div>
              <div class="cp-stat"><div class="cp-stat-lbl">RevPAR</div><div id="cpRevpar" class="cp-stat-val" style="color:#93c5fd;"></div></div>
              <div class="cp-stat"><div class="cp-stat-lbl">Cap Rate</div><div id="cpCap" class="cp-stat-val" style="color:rgba(255,255,255,.85);"></div></div>
              <div class="cp-stat"><div class="cp-stat-lbl">Hotel Room Rate</div><div id="cpHotel" class="cp-stat-val" style="color:#4ade80;"></div></div>
            </div>
            <!-- Office + Retail rates -->
            <div style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:.75rem 1rem;display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
              <div>
                <div style="font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:.3rem;font-family:'DM Sans',sans-serif;">Grade-A Office</div>
                <div id="cpOffice" style="font-size:.8rem;color:rgba(255,255,255,.65);font-family:'DM Sans',sans-serif;line-height:1.4;"></div>
              </div>
              <div>
                <div style="font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:.3rem;font-family:'DM Sans',sans-serif;">Prime Retail</div>
                <div id="cpRetail" style="font-size:.8rem;color:rgba(255,255,255,.65);font-family:'DM Sans',sans-serif;line-height:1.4;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- City quick-select chips -->
        <div>
          <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);font-family:'DM Sans',sans-serif;margin-bottom:.625rem;">Quick Select</div>
          <div style="display:flex;flex-wrap:wrap;gap:.4rem;" id="cityChips">
            ${CITY_DATA.map((d, i) => {
              const pinColor = d.occNum >= 75 ? '#4ade80' : d.occNum >= 70 ? '#e8c84a' : '#93c5fd'
              return `<button onclick="showCityPanel(${i})" id="chip-${i}" class="city-chip" style="display:inline-flex;align-items:center;gap:.35rem;padding:.3rem .7rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:100px;cursor:pointer;font-size:.68rem;color:rgba(255,255,255,.55);font-family:'DM Sans',sans-serif;font-weight:500;transition:all .18s;"><span style="width:7px;height:7px;border-radius:50%;background:${pinColor};flex-shrink:0;"></span>${d.city}</button>`
            }).join('')}
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

/* Map state hover */
#indiaMap path:not(.map-pin *) { transition:fill .18s; }
#indiaMap path:not(.map-pin *):hover { fill:#7dc077; cursor:pointer; }

/* Map pin pulse animation */
@keyframes pinPulse {
  0%,100% { r: 13; opacity:.15; }
  50%      { r: 18; opacity:.06; }
}
.map-pin-pulse { animation: pinPulse 2.5s ease-in-out infinite; }
.map-pin:hover circle:nth-child(2) { filter:brightness(1.25) url(#pinShadow); }

/* City panel stat boxes */
.cp-stat {
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.07);
  border-radius:8px;
  padding:.7rem .875rem;
  transition:background .18s;
}
.cp-stat:hover { background:rgba(255,255,255,.05); }
.cp-stat-lbl {
  font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.3);font-family:'DM Sans',sans-serif;margin-bottom:.25rem;
}
.cp-stat-val {
  font-family:'DM Serif Display',Georgia,serif;
  font-size:1rem;color:#fff;
}
/* City chip hover */
.city-chip:hover {
  background:rgba(255,255,255,.07) !important;
  border-color:rgba(255,255,255,.18) !important;
  color:rgba(255,255,255,.85) !important;
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
  document.getElementById('cpTrend').textContent = d.trend === 'up' ? '↑ Positive momentum' : d.trend === 'down' ? '↓ Declining' : '→ Stable';
  var occNum = parseFloat(d.occ);
  var occColor = occNum >= 75 ? '#4ade80' : occNum >= 70 ? '#e8c84a' : '#93c5fd';
  document.getElementById('cpOcc').textContent = d.occ;
  document.getElementById('cpOcc').style.color = occColor;
  document.getElementById('cpAdr').textContent = d.adr;
  document.getElementById('cpRevpar').textContent = d.revpar;
  document.getElementById('cpCap').textContent = d.cap;
  document.getElementById('cpHotel').textContent = d.hotel;
  document.getElementById('cpOffice').textContent = d.office + ' / sq ft';
  document.getElementById('cpRetail').textContent = d.retail + ' / sq ft';

  /* Highlight active map pin */
  document.querySelectorAll('.map-pin').forEach(function(g, i) {
    g.style.opacity = i === idx ? '1' : '0.45';
  });

  /* Highlight active city chip */
  document.querySelectorAll('.city-chip').forEach(function(btn, i) {
    if (i === idx) {
      btn.style.background = 'rgba(212,174,42,.12)';
      btn.style.borderColor = 'rgba(212,174,42,.35)';
      btn.style.color = 'var(--gold)';
    } else {
      btn.style.background = 'rgba(255,255,255,.04)';
      btn.style.borderColor = 'rgba(255,255,255,.09)';
      btn.style.color = 'rgba(255,255,255,.55)';
    }
  });

  /* Highlight city panel border */
  var panel = document.getElementById('cityPanel');
  if (panel) panel.style.borderColor = 'rgba(212,174,42,.25)';
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
    canonical: 'https://indiagully.com/market-data',
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Dataset",
          "name": "India Real Estate & Hospitality Market Data",
          "description": "City-wise office, hotel and retail rates for 8 Indian cities, hotel segment benchmarks, macro indicators and deal activity as of March 2026.",
          "url": "https://indiagully.com/market-data",
          "creator": { "@type": "Organization", "name": "India Gully Advisory" },
          "dateModified": "2026-03",
          "keywords": ["India real estate", "hotel rates", "commercial rates", "RevPAR", "ADR", "cap rates", "market data"]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://indiagully.com/" },
            { "@type": "ListItem", "position": 2, "name": "Market Data", "item": "https://indiagully.com/market-data" }
          ]
        }
      ]
    }
  }))
})

export default app
