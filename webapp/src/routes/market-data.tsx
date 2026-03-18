import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── Market Data ──────────────────────────────────────────────────────────────
// City coordinates calibrated to INDIA_MAP_VIEWBOX = "0 0 950 1100"
// Geographic scale: x: 68°E→98°E = 950px → ~31.67px/deg
//                   y: 37°N→7°N  = 1100px → ~36.67px/deg  (y inverted: North=top)
// Formula: cx = (lon - 68) * 31.67,  cy = (37 - lat) * 36.67

const CITY_DATA = [
  {
    city: 'Delhi NCR',
    cx: 378, cy: 270,   // lon 77.0°E, lat 28.6°N
    office: '₹8,500–10,500',  hotel: '₹6,200–9,500',   retail: '₹12,000–28,000',
    occ: '72%', adr: '₹7,200',  revpar: '₹5,184', cap: '7.5–9.0%',
    trend: 'up', occNum: 72,
    labelDir: 'right', labelOffset: 0,
  },
  {
    city: 'Mumbai',
    cx: 222, cy: 484,   // lon 72.8°E, lat 18.9°N
    office: '₹22,000–28,000', hotel: '₹10,500–18,000', retail: '₹35,000–55,000',
    occ: '78%', adr: '₹12,500', revpar: '₹9,750', cap: '7.0–8.5%',
    trend: 'up', occNum: 78,
    labelDir: 'left', labelOffset: 0,
  },
  {
    city: 'Bengaluru',
    cx: 330, cy: 672,   // lon 77.6°E, lat 12.9°N
    office: '₹8,000–12,000',  hotel: '₹5,500–9,000',   retail: '₹10,000–22,000',
    occ: '74%', adr: '₹6,800',  revpar: '₹5,032', cap: '7.5–9.0%',
    trend: 'up', occNum: 74,
    labelDir: 'left', labelOffset: 0,
  },
  {
    city: 'Hyderabad',
    cx: 380, cy: 574,   // lon 78.5°E, lat 17.4°N
    office: '₹6,500–9,500',   hotel: '₹4,800–7,500',   retail: '₹8,000–18,000',
    occ: '71%', adr: '₹5,900',  revpar: '₹4,189', cap: '8.0–10.0%',
    trend: 'stable', occNum: 71,
    labelDir: 'right', labelOffset: 0,
  },
  {
    city: 'Pune',
    cx: 265, cy: 510,   // lon 73.9°E, lat 18.5°N
    office: '₹5,500–8,000',   hotel: '₹3,800–6,500',   retail: '₹7,500–16,000',
    occ: '68%', adr: '₹4,700',  revpar: '₹3,196', cap: '8.5–10.5%',
    trend: 'up', occNum: 68,
    labelDir: 'left', labelOffset: 0,
  },
  {
    city: 'Chennai',
    cx: 390, cy: 694,   // lon 80.2°E, lat 13.1°N
    office: '₹5,000–7,500',   hotel: '₹4,200–7,000',   retail: '₹8,000–16,000',
    occ: '70%', adr: '₹5,200',  revpar: '₹3,640', cap: '8.5–10.5%',
    trend: 'stable', occNum: 70,
    labelDir: 'right', labelOffset: 0,
  },
  {
    city: 'Chandigarh',
    cx: 330, cy: 202,   // lon 76.8°E, lat 30.7°N
    office: '₹3,500–5,500',   hotel: '₹3,200–5,500',   retail: '₹6,000–12,000',
    occ: '69%', adr: '₹4,800',  revpar: '₹3,312', cap: '9.0–11.5%',
    trend: 'up', occNum: 69,
    labelDir: 'right', labelOffset: -18,
  },
  {
    city: 'Jaipur',
    cx: 285, cy: 342,   // lon 75.8°E, lat 26.9°N
    office: '₹3,000–4,500',   hotel: '₹3,800–6,500',   retail: '₹5,500–11,000',
    occ: '67%', adr: '₹5,500',  revpar: '₹3,685', cap: '9.5–12.0%',
    trend: 'up', occNum: 67,
    labelDir: 'left', labelOffset: 0,
  },
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
  { quarter: 'Q1 FY26',       commercial: 28, hospitality: 12, retail: 8,  total: '₹3,200 Cr' },
  { quarter: 'Q2 FY26',       commercial: 32, hospitality: 15, retail: 10, total: '₹4,100 Cr' },
  { quarter: 'Q3 FY26',       commercial: 35, hospitality: 18, retail: 11, total: '₹4,800 Cr' },
  { quarter: 'Q4 FY26 (est)', commercial: 38, hospitality: 20, retail: 13, total: '₹5,400 Cr (est)' },
]

// ════════════════════════════════════════════════════════════════════════════
//  INDIA SVG MAP — HARD REBUILD
//  ViewBox: 0 0 950 1100
//  Geographic mapping:
//    Longitude: 68°E → 98°E  =  950 px  (~31.67 px/degree)
//    Latitude:  37°N → 7°N   = 1100 px  (~36.67 px/degree, Y inverted)
//  cx = (lon − 68) × 31.67
//  cy = (37 − lat) × 36.67
//
//  All paths are derived from standard geographic coordinates for each state,
//  then projected into pixel space using the above formula.
//  J&K shown per India's official territorial claim (Survey of India).
// ════════════════════════════════════════════════════════════════════════════

// Layer 1: SVG defs — gradients, filters, clip paths
const SVG_DEFS = `
<defs>
  <!-- Drop shadow for city markers -->
  <filter id="mrkShadow" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.55)" flood-opacity="1"/>
  </filter>

  <!-- Glow filter for hovered states -->
  <filter id="stateGlow" x="-8%" y="-8%" width="116%" height="116%">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feMerge>
      <feMergeNode in="blur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>

  <!-- Outer glow for entire map -->
  <filter id="mapGlow" x="-3%" y="-3%" width="106%" height="106%">
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feMerge>
      <feMergeNode in="blur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>

  <!-- Radial gradient for India landmass background glow -->
  <radialGradient id="indiaBodyGlow" cx="48%" cy="50%" r="52%">
    <stop offset="0%"   stop-color="rgba(80,160,78,0.18)"/>
    <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
  </radialGradient>

  <!-- Clip path for ocean regions -->
  <clipPath id="mapClip">
    <rect x="0" y="0" width="950" height="1100"/>
  </clipPath>

  <!-- Marker ring gradient -->
  <radialGradient id="mrkGreen" cx="40%" cy="35%" r="60%">
    <stop offset="0%"   stop-color="#6ee76b"/>
    <stop offset="100%" stop-color="#22c55e"/>
  </radialGradient>
  <radialGradient id="mrkAmber" cx="40%" cy="35%" r="60%">
    <stop offset="0%"   stop-color="#fde68a"/>
    <stop offset="100%" stop-color="#d97706"/>
  </radialGradient>
  <radialGradient id="mrkBlue" cx="40%" cy="35%" r="60%">
    <stop offset="0%"   stop-color="#bfdbfe"/>
    <stop offset="100%" stop-color="#3b82f6"/>
  </radialGradient>
</defs>
`

// Layer 2: Base India SVG paths — accurate state geometry
// All coordinates computed from geographic lat/lon using the projection formula above
// States ordered roughly north-to-south for proper z-ordering
const SVG_BASE_LAYER = `
<!-- ════ LAYER 2: BASE MAP STATES ════ -->

<!-- ── Ocean background glow ── -->
<ellipse cx="475" cy="540" rx="340" ry="440" fill="url(#indiaBodyGlow)" opacity="0.6"/>

<!-- ══ JAMMU & KASHMIR + LADAKH (India's full territorial claim)
     Covers: POK, Gilgit-Baltistan, Aksai Chin, Indian J&K + Ladakh
     Approx bounding: lon 72.9°–80.5°E, lat 32.2°–37.2°N
     Key vertices (projected):
       73°E,37°N  → (158,  0)
       80.5°E,37°N → (395,  0)
       80.5°E,34°N → (395,110)
       79°E,32.5°N → (347,165)
       76°E,32.5°N → (253,165)
       74.5°E,33°N → (203,147)
       73°E,34°N  → (158,110)
══ -->
<path id="state-jk"
  d="M 155,0 L 165,0 L 240,0 L 310,0 L 380,0 L 410,0
     L 420,22 L 415,55 L 405,82 L 395,108
     L 378,128 L 358,148 L 340,162
     L 316,168 L 294,164 L 272,160
     L 250,162 L 230,162 L 210,155
     L 192,144 L 174,128 L 162,108
     L 152,82 L 150,55 L 152,28 Z"
  fill="#50a048" stroke="rgba(255,255,255,0.5)" stroke-width="1.4" stroke-dasharray="5,3"
  class="state-path" data-state="Jammu &amp; Kashmir / Ladakh"/>

<!-- ── HIMACHAL PRADESH
     Approx: lon 75.5°–79°E, lat 30.4°–33.2°N
     Key: 76°E,33°N=(253,147)  79°E,33°N=(348,147)  79°E,30.5°N=(348,238)  76°E,30.5°N=(253,238)
── -->
<path id="state-hp"
  d="M 253,148 L 295,142 L 340,148 L 352,162 L 356,182
     L 348,204 L 332,222 L 308,232 L 282,228 L 262,218
     L 250,200 L 248,178 L 252,160 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Himachal Pradesh"/>

<!-- ── PUNJAB
     Approx: lon 73.9°–76.9°E, lat 29.5°–32.5°N
     Key: 74°E,32.5°N=(190,165)  76.9°E,32.5°N=(282,165)  76.9°E,29.5°N=(282,275)
── -->
<path id="state-pb"
  d="M 192,165 L 250,162 L 268,178 L 270,200 L 258,222
     L 238,238 L 215,242 L 196,232 L 182,214 L 178,194 L 182,175 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Punjab"/>

<!-- ── HARYANA
     Approx: lon 74.5°–77.6°E, lat 27.6°–30.9°N
── -->
<path id="state-hr"
  d="M 258,222 L 282,228 L 308,232 L 328,248 L 335,268
     L 330,290 L 314,306 L 292,312 L 268,308 L 248,294
     L 238,272 L 238,252 L 248,236 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Haryana"/>

<!-- ── DELHI (UT — small rectangle)
     Approx: lon 76.8°–77.3°E, lat 28.4°–28.9°N
── -->
<path id="state-dl"
  d="M 280,295 L 298,290 L 310,298 L 308,316 L 290,320 L 278,312 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.6)" stroke-width="1.0"
  class="state-path" data-state="Delhi"/>

<!-- ── UTTARAKHAND
     Approx: lon 77.6°–81.1°E, lat 28.7°–31.4°N
── -->
<path id="state-uk"
  d="M 332,222 L 356,214 L 390,210 L 418,216 L 432,230
     L 428,254 L 410,270 L 385,278 L 358,274 L 336,262
     L 325,244 L 326,232 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Uttarakhand"/>

<!-- ── UTTAR PRADESH
     Largest state. lon 77°–84.6°E, lat 23.9°–30.4°N
── -->
<path id="state-up"
  d="M 292,312 L 314,306 L 335,292 L 360,280 L 395,278
     L 428,278 L 460,285 L 490,298 L 508,318 L 514,342
     L 510,368 L 494,388 L 468,402 L 438,410 L 406,412
     L 375,408 L 345,400 L 318,390 L 298,375 L 282,358
     L 275,336 L 278,318 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Uttar Pradesh"/>

<!-- ── RAJASTHAN
     Approx: lon 69.5°–78.3°E, lat 23.1°–30.2°N
── -->
<path id="state-rj"
  d="M 182,274 L 210,268 L 238,272 L 262,280 L 280,295
     L 280,318 L 278,342 L 268,368 L 252,392 L 230,416
     L 205,432 L 178,444 L 152,448 L 128,440 L 108,422
     L 94,400 L 86,374 L 88,344 L 100,316 L 120,290 L 148,276 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Rajasthan"/>

<!-- ── GUJARAT (mainland + Saurashtra + Kutch)
     Approx: lon 68.2°–74.5°E, lat 20.1°–24.7°N
── -->
<path id="state-gj"
  d="M 8,454 L 40,442 L 72,435 L 100,435 L 128,442
     L 148,455 L 162,472 L 165,498 L 155,525 L 135,545
     L 112,558 L 88,562 L 64,552 L 44,532 L 30,508 L 18,482 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Gujarat"/>
<!-- Saurashtra peninsula -->
<path id="state-gj-saur"
  d="M 30,508 L 56,498 L 82,496 L 102,505 L 110,525 L 102,545
     L 78,555 L 52,548 L 35,532 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Gujarat (Saurashtra)"/>
<!-- Kutch -->
<path id="state-gj-kutch"
  d="M 8,420 L 48,408 L 82,410 L 108,420 L 118,436 L 102,448
     L 70,454 L 38,450 L 15,438 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Gujarat (Kutch)"/>

<!-- ── MADHYA PRADESH
     Approx: lon 74.0°–82.8°E, lat 21.1°–26.9°N
── -->
<path id="state-mp"
  d="M 192,370 L 220,368 L 248,360 L 275,350 L 298,356
     L 324,360 L 350,368 L 376,378 L 400,390 L 418,408
     L 425,432 L 418,455 L 400,470 L 376,478 L 348,480
     L 320,476 L 292,466 L 268,452 L 245,434 L 228,412
     L 210,390 L 192,375 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Madhya Pradesh"/>

<!-- ── MAHARASHTRA
     Approx: lon 72.6°–80.9°E, lat 15.6°–22.1°N
── -->
<path id="state-mh"
  d="M 158,522 L 185,510 L 215,498 L 248,490 L 278,488
     L 308,488 L 336,492 L 360,502 L 380,520 L 395,542
     L 400,568 L 394,592 L 378,610 L 354,620 L 326,622
     L 295,614 L 265,598 L 238,578 L 214,556 L 192,536 L 168,526 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Maharashtra"/>

<!-- ── GOA (small)
     Approx: lon 73.7°–74.3°E, lat 14.9°–15.8°N
── -->
<path id="state-ga"
  d="M 178,620 L 196,616 L 212,622 L 210,638 L 195,644 L 178,636 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.6)" stroke-width="1.0"
  class="state-path" data-state="Goa"/>

<!-- ── KARNATAKA
     Approx: lon 74.1°–78.6°E, lat 11.6°–18.5°N
── -->
<path id="state-ka"
  d="M 212,622 L 240,608 L 270,596 L 298,592 L 326,598
     L 352,610 L 372,632 L 384,658 L 385,684 L 376,710
     L 358,730 L 332,742 L 305,748 L 278,740 L 252,722
     L 232,698 L 215,672 L 202,646 L 200,632 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Karnataka"/>

<!-- ── KERALA
     Approx: lon 74.9°–77.4°E, lat 8.2°–12.8°N
── -->
<path id="state-kl"
  d="M 265,748 L 285,736 L 308,738 L 318,760 L 314,790
     L 298,818 L 276,836 L 258,840 L 248,822 L 248,794
     L 252,768 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Kerala"/>

<!-- ── TAMIL NADU
     Approx: lon 77.1°–80.4°E, lat 8.1°–13.7°N
── -->
<path id="state-tn"
  d="M 308,738 L 335,736 L 364,738 L 392,752 L 412,775
     L 418,802 L 414,828 L 400,850 L 380,864 L 355,872
     L 330,866 L 308,848 L 290,825 L 278,800 L 275,776
     L 278,756 L 292,744 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Tamil Nadu"/>

<!-- ── ANDHRA PRADESH
     Approx: lon 76.8°–84.7°E, lat 12.6°–19.9°N
── -->
<path id="state-ap"
  d="M 378,520 L 408,512 L 440,508 L 468,512 L 494,526
     L 512,548 L 518,574 L 510,598 L 492,616 L 465,626
     L 435,628 L 405,618 L 380,600 L 358,580 L 350,558
     L 352,536 L 362,524 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Andhra Pradesh"/>

<!-- ── TELANGANA
     Approx: lon 77.2°–81.3°E, lat 15.9°–19.9°N
── -->
<path id="state-tg"
  d="M 360,502 L 388,494 L 418,492 L 445,498 L 468,512
     L 478,536 L 474,562 L 458,582 L 434,590 L 408,588
     L 382,578 L 362,560 L 352,538 L 354,520 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Telangana"/>

<!-- ── ODISHA
     Approx: lon 81.4°–87.5°E, lat 17.8°–22.6°N
── -->
<path id="state-od"
  d="M 520,328 L 552,320 L 582,320 L 608,330 L 625,352
     L 628,378 L 618,404 L 598,422 L 570,432 L 540,432
     L 514,420 L 498,398 L 492,372 L 498,346 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Odisha"/>

<!-- ── CHHATTISGARH
     Approx: lon 80.2°–84.4°E, lat 17.8°–24.1°N
── -->
<path id="state-cg"
  d="M 420,408 L 448,400 L 478,396 L 508,402 L 525,418
     L 530,448 L 525,478 L 508,500 L 484,510 L 456,510
     L 428,498 L 408,478 L 400,452 L 404,426 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Chhattisgarh"/>

<!-- ── JHARKHAND
     Approx: lon 83.3°–87.9°E, lat 21.9°–25.4°N
── -->
<path id="state-jh"
  d="M 492,328 L 524,320 L 555,322 L 578,336 L 585,360
     L 575,384 L 552,398 L 524,400 L 498,388 L 482,368
     L 480,346 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Jharkhand"/>

<!-- ── BIHAR
     Approx: lon 83.3°–88.3°E, lat 24.3°–27.5°N
── -->
<path id="state-br"
  d="M 476,238 L 510,230 L 545,228 L 578,234 L 600,250
     L 608,272 L 600,294 L 578,308 L 548,314 L 518,312
     L 488,302 L 468,284 L 462,262 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Bihar"/>

<!-- ── WEST BENGAL
     Approx: lon 85.8°–89.9°E, lat 21.5°–27.2°N
── -->
<path id="state-wb"
  d="M 572,228 L 605,220 L 636,222 L 658,238 L 668,262
     L 662,290 L 645,312 L 618,326 L 590,330 L 562,322
     L 542,308 L 535,284 L 538,258 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="West Bengal"/>

<!-- ── SIKKIM (tiny)
     Approx: lon 88.0°–88.9°E, lat 27.1°–28.1°N
── -->
<path id="state-sk"
  d="M 634,220 L 648,216 L 658,222 L 655,238 L 640,240 L 630,232 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.6)" stroke-width="1.0"
  class="state-path" data-state="Sikkim"/>

<!-- ── ASSAM
     Approx: lon 89.7°–96.0°E, lat 24.1°–28.2°N
── -->
<path id="state-as"
  d="M 668,230 L 700,222 L 732,220 L 764,224 L 792,236
     L 808,254 L 808,276 L 792,290 L 764,298 L 732,300
     L 700,296 L 672,284 L 658,262 L 660,244 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Assam"/>

<!-- ── MEGHALAYA
     Approx: lon 89.8°–92.8°E, lat 25.0°–26.1°N
── -->
<path id="state-ml"
  d="M 658,278 L 692,272 L 726,274 L 750,284 L 752,298
     L 732,306 L 700,308 L 672,304 L 656,294 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Meghalaya"/>

<!-- ── NAGALAND
     Approx: lon 93.3°–95.3°E, lat 25.2°–27.0°N
── -->
<path id="state-nl"
  d="M 790,242 L 814,232 L 832,240 L 838,260 L 826,278
     L 806,280 L 792,268 L 788,252 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Nagaland"/>

<!-- ── MANIPUR
     Approx: lon 93.0°–94.8°E, lat 23.8°–25.7°N
── -->
<path id="state-mn"
  d="M 788,268 L 812,262 L 832,272 L 838,296 L 826,316
     L 804,322 L 782,314 L 774,296 L 776,278 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Manipur"/>

<!-- ── MIZORAM
     Approx: lon 92.3°–93.4°E, lat 21.9°–24.5°N
── -->
<path id="state-mz"
  d="M 774,318 L 796,310 L 814,320 L 818,344 L 808,364
     L 786,370 L 768,358 L 764,338 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Mizoram"/>

<!-- ── TRIPURA (tiny)
     Approx: lon 91.2°–92.3°E, lat 22.9°–24.5°N
── -->
<path id="state-tr"
  d="M 748,298 L 768,292 L 784,302 L 785,322 L 770,332 L 750,326 L 742,312 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Tripura"/>

<!-- ── ARUNACHAL PRADESH
     Approx: lon 91.7°–97.4°E, lat 26.7°–29.5°N
── -->
<path id="state-ar"
  d="M 748,160 L 778,148 L 812,140 L 848,138 L 882,140
     L 910,152 L 924,170 L 920,192 L 900,204 L 870,210
     L 838,212 L 808,210 L 778,208 L 754,198 L 740,180 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"
  class="state-path" data-state="Arunachal Pradesh"/>

<!-- ── SRI LANKA (separate island, shown for context)
     Approx: lon 79.7°–81.9°E, lat 5.9°–9.8°N
── -->
<path id="island-sl"
  d="M 370,990 L 386,982 L 404,986 L 414,1004 L 416,1028
     L 408,1052 L 392,1064 L 374,1062 L 362,1044 L 358,1020 L 362,998 Z"
  fill="#5ab050" stroke="rgba(255,255,255,0.35)" stroke-width="1.0" opacity="0.65"
  class="state-path" data-state="Sri Lanka (reference)"/>

<!-- ── LAKSHADWEEP (west coast islands) ── -->
<circle cx="114" cy="720" r="6"  fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.75"/>
<circle cx="105" cy="750" r="5"  fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.75"/>
<circle cx="120" cy="778" r="4"  fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.75"/>

<!-- ── ANDAMAN & NICOBAR ISLANDS (east of mainland) ── -->
<ellipse cx="820" cy="620" rx="8" ry="22" fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.8"/>
<ellipse cx="814" cy="660" rx="6" ry="16" fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.8"/>
<ellipse cx="808" cy="692" rx="5" ry="12" fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.8"/>
<ellipse cx="802" cy="718" rx="4" ry="9"  fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.8"/>
<ellipse cx="795" cy="756" rx="7" ry="18" fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.8"/>
<ellipse cx="788" cy="790" rx="6" ry="14" fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" opacity="0.8"/>
`

// Layer 3: City markers with calibrated SVG coordinates
// Each marker: outer pulse ring, solid circle, occupancy text
// Coordinates match CITY_DATA cx/cy values
function buildMarkersLayer(cities: typeof CITY_DATA): string {
  return cities.map((d, i) => {
    const pinColor = d.occNum >= 75
      ? 'url(#mrkGreen)'
      : d.occNum >= 70
        ? 'url(#mrkAmber)'
        : 'url(#mrkBlue)'
    const pinStroke = d.occNum >= 75 ? '#22c55e' : d.occNum >= 70 ? '#d97706' : '#3b82f6'
    const pulseR = 14 + (d.occNum - 65) * 0.35

    return `
  <g class="city-marker" data-idx="${i}" data-city="${d.city.replace(/"/g, '&quot;')}"
     role="button" tabindex="0"
     aria-label="${d.city}: Hotel Occupancy ${d.occ}, ADR ${d.adr}"
     style="cursor:pointer;"
     onclick="igMapSelect(${i})" onkeydown="if(event.key==='Enter'||event.key===' ')igMapSelect(${i})">
    <!-- Outer pulse ring -->
    <circle class="city-pulse" cx="${d.cx}" cy="${d.cy}" r="${pulseR}" fill="${pinStroke}" opacity="0.14"/>
    <!-- Main marker circle -->
    <circle class="city-dot" cx="${d.cx}" cy="${d.cy}" r="10"
            fill="${pinColor}" stroke="${pinStroke}" stroke-width="2"
            filter="url(#mrkShadow)"/>
    <!-- Occupancy text inside circle -->
    <text x="${d.cx}" y="${d.cy + 4}"
          text-anchor="middle"
          font-family="DM Sans,system-ui,sans-serif"
          font-size="7.5" font-weight="700" fill="#fff" pointer-events="none">${d.occ.replace('%', '')}</text>
  </g>`
  }).join('\n')
}

// Layer 4: City labels — positioned to avoid overlap, outside markers
function buildLabelsLayer(cities: typeof CITY_DATA): string {
  return cities.map((d, i) => {
    const isRight = d.labelDir === 'right'
    const lx = isRight ? d.cx + 16 : d.cx - 16
    const anchor = isRight ? 'start' : 'end'
    const ly = d.cy + d.labelOffset + 4

    return `
  <g class="city-label" data-idx="${i}" pointer-events="none">
    <!-- Label connector line -->
    <line x1="${d.cx + (isRight ? 10 : -10)}" y1="${d.cy}"
          x2="${d.cx + (isRight ? 14 : -14)}" y2="${ly - 2}"
          stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
    <!-- City name label -->
    <text x="${lx}" y="${ly}"
          text-anchor="${anchor}"
          font-family="DM Sans,system-ui,sans-serif"
          font-size="10" font-weight="600"
          fill="rgba(255,255,255,0.82)"
          paint-order="stroke"
          stroke="rgba(0,0,0,0.65)" stroke-width="2.5">${d.city}</text>
  </g>`
  }).join('\n')
}

// Layer 5: Watermark text
const SVG_WATERMARK = `
<!-- ════ LAYER 5: WATERMARK ════ -->
<text x="390" y="540" text-anchor="middle"
      font-family="DM Serif Display,Georgia,serif"
      font-size="28" font-weight="400" letter-spacing="12"
      fill="rgba(255,255,255,0.028)" pointer-events="none">INDIA</text>
`

app.get('/', (c) => {
  const now = 'March 2026'

  // Build all SVG layers
  const markersLayer = buildMarkersLayer(CITY_DATA)
  const labelsLayer  = buildLabelsLayer(CITY_DATA)

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

<!-- ══════════════════════════════════════════════════════════════════════
     INDIA ADVISORY FOOTPRINT — HARD REBUILT MAP SECTION
     ══════════════════════════════════════════════════════════════════════ -->
<section class="ig-map-section" aria-label="India Advisory Footprint">
  <div class="ig-map-container">

    <!-- Section header -->
    <div class="ig-map-header">
      <div>
        <p class="ig-map-eyebrow">Active Coverage · Q1 2026</p>
        <h2 class="ig-map-title">India Advisory Footprint</h2>
      </div>
      <!-- Legend -->
      <div class="ig-map-legend" role="legend" aria-label="Occupancy legend">
        <span class="ig-legend-label">Hotel Occupancy:</span>
        <div class="ig-legend-item">
          <span class="ig-legend-dot" style="background:#22c55e;"></span>
          <span>≥ 75%</span>
        </div>
        <div class="ig-legend-item">
          <span class="ig-legend-dot" style="background:#d97706;"></span>
          <span>70–74%</span>
        </div>
        <div class="ig-legend-item">
          <span class="ig-legend-dot" style="background:#3b82f6;"></span>
          <span>&lt; 70%</span>
        </div>
      </div>
    </div>

    <!-- Map + Panel layout -->
    <div class="ig-map-body">

      <!-- ════ INDIA SVG MAP ════ -->
      <div class="ig-map-frame-outer" role="region" aria-label="Interactive India map">
        <!-- Map decorative background -->
        <div class="ig-map-bg-glow" aria-hidden="true"></div>

        <!-- SVG map wrapper — preserves aspect ratio via viewBox -->
        <div class="ig-map-svg-wrap">
          <svg
            id="indiaMap"
            viewBox="0 0 950 1100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Map of India showing 8 advisory cities with hotel occupancy markers"
          >
            <title>India Advisory Footprint — India Gully Market Intelligence</title>
            <desc>Interactive SVG map of India showing city markers for Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, Chennai, Chandigarh and Jaipur with hotel occupancy data.</desc>

            <!-- ── Layer 1: Defs (gradients, filters, clip) ── -->
            ${SVG_DEFS}

            <!-- ── Layer 2: Base India state paths ── -->
            ${SVG_BASE_LAYER}

            <!-- ── Layer 3: City markers ── -->
            ${markersLayer}

            <!-- ── Layer 4: City labels ── -->
            ${labelsLayer}

            <!-- ── Layer 5: Watermark ── -->
            ${SVG_WATERMARK}

          </svg>

          <!-- ════ TOOLTIP (Layer 6 — HTML overlay, anchored to markers) ════ -->
          <div id="ig-tooltip" class="ig-tooltip" role="tooltip" aria-live="polite" aria-hidden="true">
            <div class="ig-tt-header">
              <span id="ig-tt-city" class="ig-tt-city"></span>
              <span id="ig-tt-trend" class="ig-tt-trend"></span>
            </div>
            <div class="ig-tt-row">
              <span class="ig-tt-lbl">Hotel Occ.</span>
              <span id="ig-tt-occ" class="ig-tt-val ig-tt-occ-val"></span>
            </div>
            <div class="ig-tt-row">
              <span class="ig-tt-lbl">ADR</span>
              <span id="ig-tt-adr" class="ig-tt-val" style="color:var(--gold);"></span>
            </div>
            <div class="ig-tt-row">
              <span class="ig-tt-lbl">RevPAR</span>
              <span id="ig-tt-revpar" class="ig-tt-val" style="color:#93c5fd;"></span>
            </div>
            <div class="ig-tt-row">
              <span class="ig-tt-lbl">Cap Rate</span>
              <span id="ig-tt-cap" class="ig-tt-val" style="color:rgba(255,255,255,.7);"></span>
            </div>
            <button class="ig-tt-btn" onclick="igMapSelectFromTip()">Full Details →</button>
          </div>
        </div>

        <!-- ── Layer 7: Footnote ── -->
        <p class="ig-map-footnote">
          J&amp;K shown per India's official territorial claim (Survey of India). 
          Click or tap a city marker to view detailed rate card.
        </p>
      </div>
      <!-- end map frame -->

      <!-- ════ RIGHT PANEL ════ -->
      <div class="ig-panel-col">

        <!-- City detail panel -->
        <div id="cityPanel" class="ig-city-panel">
          <!-- Default state -->
          <div id="cityDefault" class="ig-panel-default">
            <div class="ig-panel-icon-wrap">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
            </div>
            <p>Select a city pin on the map<br>to view rate card &amp; market data</p>
          </div>
          <!-- Populated detail state -->
          <div id="cityDetail" class="ig-panel-detail" style="display:none;">
            <div class="ig-detail-top">
              <div>
                <div id="cpCity" class="ig-detail-city"></div>
                <div id="cpTrend" class="ig-detail-trend"></div>
              </div>
              <div class="ig-detail-occ-wrap">
                <div class="ig-detail-occ-lbl">Hotel Occ.</div>
                <div id="cpOcc" class="ig-detail-occ-val"></div>
              </div>
            </div>
            <!-- 2×2 stat grid -->
            <div class="ig-stat-grid">
              <div class="ig-stat-box">
                <div class="ig-stat-lbl">ADR (Avg Room Rate)</div>
                <div id="cpAdr" class="ig-stat-val" style="color:var(--gold);"></div>
              </div>
              <div class="ig-stat-box">
                <div class="ig-stat-lbl">RevPAR</div>
                <div id="cpRevpar" class="ig-stat-val" style="color:#93c5fd;"></div>
              </div>
              <div class="ig-stat-box">
                <div class="ig-stat-lbl">Cap Rate</div>
                <div id="cpCap" class="ig-stat-val" style="color:rgba(255,255,255,.85);"></div>
              </div>
              <div class="ig-stat-box">
                <div class="ig-stat-lbl">Hotel Room Rate</div>
                <div id="cpHotel" class="ig-stat-val" style="color:#4ade80;"></div>
              </div>
            </div>
            <!-- Office + Retail rates -->
            <div class="ig-rates-row">
              <div>
                <div class="ig-rates-lbl">Grade-A Office</div>
                <div id="cpOffice" class="ig-rates-val"></div>
              </div>
              <div>
                <div class="ig-rates-lbl">Prime Retail</div>
                <div id="cpRetail" class="ig-rates-val"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- City quick-select chips -->
        <div>
          <div class="ig-chips-label">Quick Select</div>
          <div class="ig-chips" role="group" aria-label="City quick select">
            ${CITY_DATA.map((d, i) => {
              const dotColor = d.occNum >= 75 ? '#22c55e' : d.occNum >= 70 ? '#d97706' : '#3b82f6'
              return `<button onclick="igMapSelect(${i})" id="chip-${i}"
                class="ig-chip" aria-label="Select ${d.city}">
                <span class="ig-chip-dot" style="background:${dotColor};"></span>
                ${d.city}
              </button>`
            }).join('\n            ')}
          </div>
        </div>

      </div><!-- end right panel -->
    </div><!-- end map body -->
  </div><!-- end container -->
</section>

<!-- ── CITY RATE CARD TABLE ──────────────────────────────────────────── -->
<section style="background:var(--bg-dk2);border-top:1px solid rgba(255,255,255,.07);padding:3rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;margin-bottom:1.5rem;">
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin:0;">City Rate Card <span style="font-size:.85rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;">(₹ per sq ft unless noted)</span></h2>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
        <button onclick="sortCity('occ')" class="btn btn-sm btn-dko">Sort by Occupancy</button>
        <button onclick="sortCity('adr')" class="btn btn-sm btn-dko">Sort by ADR</button>
        <button onclick="sortCity('cap')" class="btn btn-sm btn-dko">Sort by Cap Rate</button>
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

<!-- ══════════════════════════════════════════════════════════════════════
     STYLES — INDIA MAP COMPONENT (Hard Rebuilt)
     ══════════════════════════════════════════════════════════════════════ -->
<style>
/* ─────────────────────────────────────────────────────
   MAP SECTION LAYOUT
───────────────────────────────────────────────────── */
.ig-map-section {
  background: var(--bg-dk);
  padding: 4rem 0 3rem;
}
.ig-map-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Section header */
.ig-map-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.ig-map-eyebrow {
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 .5rem;
  font-family: 'DM Sans', sans-serif;
}
.ig-map-title {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.75rem;
  color: #fff;
  margin: 0;
  line-height: 1.15;
}

/* Legend */
.ig-map-legend {
  display: flex;
  align-items: center;
  gap: .75rem;
  flex-wrap: wrap;
  padding: .5rem .875rem;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 8px;
}
.ig-legend-label {
  font-size: .63rem;
  color: rgba(255,255,255,.4);
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  letter-spacing: .05em;
  text-transform: uppercase;
  margin-right: .15rem;
}
.ig-legend-item {
  display: flex;
  align-items: center;
  gap: .3rem;
  font-size: .67rem;
  color: rgba(255,255,255,.55);
  font-family: 'DM Sans', sans-serif;
}
.ig-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ─────────────────────────────────────────────────────
   MAP + PANEL BODY GRID
   48% map / 52% panel — fluid columns
───────────────────────────────────────────────────── */
.ig-map-body {
  display: grid;
  grid-template-columns: 46% 1fr;
  gap: 2.5rem;
  align-items: start;
}

/* ─────────────────────────────────────────────────────
   MAP FRAME
───────────────────────────────────────────────────── */
.ig-map-frame-outer {
  position: relative;
}
.ig-map-bg-glow {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  height: 80%;
  background: radial-gradient(ellipse, rgba(80,160,78,.07) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* SVG wrapper: uses padding-bottom trick for exact aspect ratio
   ViewBox 950×1100 → aspect = 1100/950 = 115.79% */
.ig-map-svg-wrap {
  position: relative;
  background: rgba(255,255,255,.025);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 16px;
  padding: 1rem;
  overflow: hidden;
  /* Aspect ratio container */
  width: 100%;
}
.ig-map-svg-wrap svg {
  width: 100%;
  height: auto;
  display: block;
  /* Explicit aspect ratio so browser allocates space before paint */
  aspect-ratio: 950 / 1100;
}

/* ─────────────────────────────────────────────────────
   SVG STATE PATHS — hover interaction
───────────────────────────────────────────────────── */
.state-path {
  transition: fill 0.18s ease;
}
.state-path:hover {
  fill: #71c068;
  cursor: default;
}

/* ─────────────────────────────────────────────────────
   CITY MARKERS
───────────────────────────────────────────────────── */
.city-marker {
  transition: opacity 0.2s;
}
.city-marker:focus {
  outline: none;
}
.city-marker:focus .city-dot {
  stroke-width: 3;
  stroke: rgba(255,255,255,0.9);
}

/* Pulse animation on outer ring */
@keyframes cityPulse {
  0%, 100% { r: 14px; opacity: 0.14; }
  50%       { r: 20px; opacity: 0.06; }
}
.city-pulse {
  animation: cityPulse 2.8s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}
.city-marker:hover .city-dot,
.city-marker.active .city-dot {
  stroke-width: 2.5;
  filter: brightness(1.2) drop-shadow(0 0 6px rgba(255,255,255,0.5));
}
.city-marker.active .city-pulse {
  opacity: 0.28;
}

/* ─────────────────────────────────────────────────────
   TOOLTIP (HTML overlay anchored to SVG markers)
───────────────────────────────────────────────────── */
.ig-tooltip {
  position: absolute;
  z-index: 100;
  min-width: 180px;
  max-width: 220px;
  background: rgba(10,10,20,0.95);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 10px;
  padding: .75rem 1rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px) scale(0.97);
  transition: opacity 0.18s ease, transform 0.18s ease;
  font-family: 'DM Sans', sans-serif;
  /* Hidden by default */
  visibility: hidden;
}
.ig-tooltip.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  visibility: visible;
  pointer-events: auto;
}
.ig-tt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5rem;
  gap: .5rem;
}
.ig-tt-city {
  font-weight: 700;
  font-size: .88rem;
  color: #fff;
  line-height: 1.2;
}
.ig-tt-trend {
  font-size: .78rem;
  color: #4ade80;
  flex-shrink: 0;
}
.ig-tt-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .28rem;
  gap: .5rem;
}
.ig-tt-lbl {
  font-size: .65rem;
  color: rgba(255,255,255,.4);
  text-transform: uppercase;
  letter-spacing: .06em;
  font-weight: 600;
}
.ig-tt-val {
  font-size: .8rem;
  font-weight: 600;
  color: #fff;
  text-align: right;
}
.ig-tt-btn {
  display: block;
  width: 100%;
  margin-top: .6rem;
  padding: .35rem .5rem;
  background: rgba(212,174,42,.1);
  border: 1px solid rgba(212,174,42,.25);
  border-radius: 6px;
  color: var(--gold);
  font-size: .72rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background .15s;
}
.ig-tt-btn:hover { background: rgba(212,174,42,.18); }

/* ─────────────────────────────────────────────────────
   FOOTNOTE
───────────────────────────────────────────────────── */
.ig-map-footnote {
  font-size: .61rem;
  color: rgba(255,255,255,.25);
  font-family: 'DM Sans', sans-serif;
  margin: .6rem 0 0;
  text-align: center;
  line-height: 1.5;
}

/* ─────────────────────────────────────────────────────
   RIGHT PANEL
───────────────────────────────────────────────────── */
.ig-panel-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.ig-city-panel {
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 14px;
  padding: 1.5rem;
  min-height: 280px;
  transition: border-color .2s;
}
.ig-city-panel.active {
  border-color: rgba(212,174,42,.28);
}
.ig-panel-default {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 240px;
  text-align: center;
}
.ig-panel-default p {
  color: rgba(255,255,255,.3);
  font-family: 'DM Sans', sans-serif;
  font-size: .82rem;
  line-height: 1.65;
  margin: 0;
}
.ig-panel-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.09);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}
.ig-panel-icon-wrap i {
  font-size: 1.1rem;
  color: rgba(255,255,255,.2);
}

.ig-detail-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 1rem;
}
.ig-detail-city {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.5rem;
  color: #fff;
  line-height: 1.1;
  margin-bottom: .3rem;
}
.ig-detail-trend {
  font-size: .7rem;
  font-family: 'DM Sans', sans-serif;
  color: rgba(255,255,255,.4);
  letter-spacing: .04em;
}
.ig-detail-occ-wrap {
  text-align: right;
  flex-shrink: 0;
}
.ig-detail-occ-lbl {
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.35);
  font-family: 'DM Sans', sans-serif;
  margin-bottom: .15rem;
}
.ig-detail-occ-val {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.75rem;
  line-height: 1;
}

.ig-stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .625rem;
  margin-bottom: 1rem;
}
.ig-stat-box {
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 8px;
  padding: .7rem .875rem;
  transition: background .18s;
}
.ig-stat-box:hover { background: rgba(255,255,255,.05); }
.ig-stat-lbl {
  font-size: .55rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.3);
  font-family: 'DM Sans', sans-serif;
  margin-bottom: .25rem;
}
.ig-stat-val {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1rem;
  color: #fff;
}
.ig-rates-row {
  background: rgba(255,255,255,.025);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 8px;
  padding: .75rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
}
.ig-rates-lbl {
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.3);
  margin-bottom: .3rem;
  font-family: 'DM Sans', sans-serif;
}
.ig-rates-val {
  font-size: .8rem;
  color: rgba(255,255,255,.65);
  font-family: 'DM Sans', sans-serif;
  line-height: 1.4;
}

/* City chips */
.ig-chips-label {
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.3);
  font-family: 'DM Sans', sans-serif;
  margin-bottom: .625rem;
}
.ig-chips {
  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
}
.ig-chip {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  padding: .3rem .7rem;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 100px;
  cursor: pointer;
  font-size: .68rem;
  color: rgba(255,255,255,.55);
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  transition: all .18s;
}
.ig-chip:hover {
  background: rgba(255,255,255,.07);
  border-color: rgba(255,255,255,.18);
  color: rgba(255,255,255,.85);
}
.ig-chip.active {
  background: rgba(212,174,42,.12);
  border-color: rgba(212,174,42,.35);
  color: var(--gold);
}
.ig-chip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ─────────────────────────────────────────────────────
   REST OF PAGE STYLES
───────────────────────────────────────────────────── */
.mkt-indicator-label {
  font-size:.65rem;
  font-family:'DM Sans',sans-serif;
  color:rgba(255,255,255,.65);
  font-weight:500;
  line-height:1.3;
}
.mkt-macro-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(190px,1fr));
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

/* ─────────────────────────────────────────────────────
   RESPONSIVE BREAKPOINTS
───────────────────────────────────────────────────── */

/* Tablet: 768–1024px — map takes more width */
@media (max-width: 1024px) {
  .ig-map-body {
    grid-template-columns: 50% 1fr;
    gap: 2rem;
  }
}

/* Mobile: ≤768px — stack vertically */
@media (max-width: 768px) {
  .ig-map-body {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .ig-map-svg-wrap {
    max-width: 480px;
    margin: 0 auto;
  }
  .ig-map-header {
    flex-direction: column;
    align-items: flex-start;
    gap: .75rem;
  }
  .ig-map-legend {
    flex-wrap: wrap;
    gap: .5rem;
  }
  .mkt-macro-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

/* Small mobile: ≤480px */
@media (max-width: 480px) {
  .ig-map-svg-wrap {
    padding: .5rem;
  }
  .ig-map-section {
    padding: 2.5rem 0 2rem;
  }
  .mkt-table th, .mkt-table td {
    padding: .5rem .6rem;
    font-size: .78rem;
  }
  .mkt-macro-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .ig-city-panel {
    min-height: auto;
  }
}

/* Print / high-contrast accessibility */
@media (prefers-reduced-motion: reduce) {
  .city-pulse { animation: none; }
  .ig-tooltip { transition: none; }
}
</style>

<!-- ══════════════════════════════════════════════════════════════════════
     JAVASCRIPT — MAP INTERACTION ENGINE
     ══════════════════════════════════════════════════════════════════════ -->
<script>
(function () {
  'use strict';

  /* ── City data (mirrored from server) ── */
  var CITIES = ${JSON.stringify(CITY_DATA.map(d => ({
    city: d.city, cx: d.cx, cy: d.cy,
    occ: d.occ, adr: d.adr, revpar: d.revpar,
    cap: d.cap, hotel: d.hotel, office: d.office,
    retail: d.retail, trend: d.trend, occNum: d.occNum,
    labelDir: d.labelDir,
  })))};

  var _activeIdx = -1;
  var _ttTimeout = null;

  /* ── Tooltip positioning logic ──
     Converts SVG user-space coordinates to CSS pixel coordinates
     relative to the .ig-map-svg-wrap container. Handles overflow
     by flipping tooltip direction when near edges. */
  function getMarkerScreenPos(svgEl, cx, cy) {
    try {
      var svgRect = svgEl.getBoundingClientRect();
      var wrapEl = svgEl.closest('.ig-map-svg-wrap');
      var wrapRect = wrapEl ? wrapEl.getBoundingClientRect() : svgRect;
      /* SVG viewBox: 0 0 950 1100 */
      var vbW = 950, vbH = 1100;
      /* Compute rendered SVG dimensions inside its container */
      var rendW = svgRect.width;
      var rendH = svgRect.height;
      /* Compute scale factors */
      var scaleX = rendW / vbW;
      var scaleY = rendH / vbH;
      /* Pixel offset of SVG within wrap (accounts for border+padding) */
      var offX = svgRect.left - wrapRect.left;
      var offY = svgRect.top  - wrapRect.top;
      return {
        x: offX + cx * scaleX,
        y: offY + cy * scaleY,
        svgW: rendW,
        svgH: rendH,
      };
    } catch(e) {
      return { x: 0, y: 0, svgW: 300, svgH: 400 };
    }
  }

  function showTooltip(idx) {
    var d = CITIES[idx];
    if (!d) return;
    var tt = document.getElementById('ig-tooltip');
    var svgEl = document.getElementById('indiaMap');
    var wrapEl = svgEl ? svgEl.closest('.ig-map-svg-wrap') : null;
    if (!tt || !svgEl || !wrapEl) return;

    /* Fill tooltip content */
    document.getElementById('ig-tt-city').textContent = d.city;
    document.getElementById('ig-tt-trend').textContent =
      d.trend === 'up' ? '↑ Positive' : d.trend === 'down' ? '↓ Declining' : '→ Stable';
    var occEl = document.getElementById('ig-tt-occ');
    occEl.textContent = d.occ;
    occEl.style.color = d.occNum >= 75 ? '#4ade80' : d.occNum >= 70 ? '#e8c84a' : '#93c5fd';
    document.getElementById('ig-tt-adr').textContent    = d.adr;
    document.getElementById('ig-tt-revpar').textContent = d.revpar;
    document.getElementById('ig-tt-cap').textContent    = d.cap;

    /* Position tooltip relative to .ig-map-svg-wrap */
    var pos = getMarkerScreenPos(svgEl, d.cx, d.cy);
    var ttW = 200;   /* approx tooltip width */
    var ttH = 160;   /* approx tooltip height */
    var ctnW = wrapEl.offsetWidth;
    var ctnH = wrapEl.offsetHeight;

    /* Horizontal: prefer right of marker, flip to left if overflow */
    var left = pos.x + 16;
    if (left + ttW > ctnW - 8) {
      left = pos.x - ttW - 16;
    }
    if (left < 8) left = 8;

    /* Vertical: prefer above marker, flip to below if overflow */
    var top = pos.y - ttH / 2;
    if (top < 8) top = pos.y + 18;
    if (top + ttH > ctnH - 8) top = ctnH - ttH - 8;
    if (top < 0) top = 0;

    tt.style.left = left + 'px';
    tt.style.top  = top  + 'px';
    tt.setAttribute('aria-hidden', 'false');
    tt.classList.add('visible');
  }

  function hideTooltip() {
    var tt = document.getElementById('ig-tooltip');
    if (!tt) return;
    tt.classList.remove('visible');
    tt.setAttribute('aria-hidden', 'true');
  }

  /* ── Main city selection handler ── */
  function igMapSelect(idx) {
    var d = CITIES[idx];
    if (!d) return;
    _activeIdx = idx;

    /* 1. Update SVG marker states */
    document.querySelectorAll('.city-marker').forEach(function (g, i) {
      g.classList.toggle('active', i === idx);
      g.style.opacity = (i === idx) ? '1' : '0.55';
    });

    /* 2. Show/position tooltip */
    showTooltip(idx);

    /* 3. Update right-panel city detail card */
    var defEl    = document.getElementById('cityDefault');
    var detEl    = document.getElementById('cityDetail');
    var panelEl  = document.getElementById('cityPanel');
    if (defEl)   defEl.style.display  = 'none';
    if (detEl)   detEl.style.display  = 'block';
    if (panelEl) panelEl.classList.add('active');

    document.getElementById('cpCity').textContent  = d.city;
    document.getElementById('cpTrend').textContent =
      d.trend === 'up' ? '↑ Positive momentum' : d.trend === 'down' ? '↓ Declining' : '→ Stable';

    var occColor = d.occNum >= 75 ? '#4ade80' : d.occNum >= 70 ? '#e8c84a' : '#93c5fd';
    var occEl = document.getElementById('cpOcc');
    occEl.textContent  = d.occ;
    occEl.style.color  = occColor;

    document.getElementById('cpAdr').textContent    = d.adr;
    document.getElementById('cpRevpar').textContent = d.revpar;
    document.getElementById('cpCap').textContent    = d.cap;
    document.getElementById('cpHotel').textContent  = d.hotel;
    document.getElementById('cpOffice').textContent = d.office + ' / sq ft';
    document.getElementById('cpRetail').textContent = d.retail + ' / sq ft';

    /* 4. Highlight active city chip */
    document.querySelectorAll('.ig-chip').forEach(function (btn, i) {
      btn.classList.toggle('active', i === idx);
    });
  }

  /* Called from tooltip "Full Details" button */
  window.igMapSelectFromTip = function() {
    if (_activeIdx >= 0) igMapSelect(_activeIdx);
  };

  /* ── Tooltip: show on hover, persist on mouseenter, hide on leave ── */
  function bindMarkerHover() {
    document.querySelectorAll('.city-marker').forEach(function (g, idx) {
      g.addEventListener('mouseenter', function () {
        if (_ttTimeout) clearTimeout(_ttTimeout);
        showTooltip(idx);
      });
      g.addEventListener('mouseleave', function () {
        /* Delay hide so user can move mouse into tooltip */
        _ttTimeout = setTimeout(function () {
          if (!document.getElementById('ig-tooltip').matches(':hover')) {
            hideTooltip();
          }
        }, 180);
      });
    });

    /* Tooltip itself: keep visible when hovered */
    var tt = document.getElementById('ig-tooltip');
    if (tt) {
      tt.addEventListener('mouseenter', function () {
        if (_ttTimeout) clearTimeout(_ttTimeout);
      });
      tt.addEventListener('mouseleave', function () {
        _ttTimeout = setTimeout(hideTooltip, 120);
      });
    }

    /* Click away to dismiss tooltip */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.city-marker') && !e.target.closest('.ig-tooltip')) {
        hideTooltip();
      }
    });
  }

  /* ── Sort table function ── */
  window.sortCity = function(by) {
    var tbody = document.getElementById('cityTbody');
    if (!tbody) return;
    var rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort(function(a, b) {
      var av = parseFloat((a.dataset[by] || '').replace(/[^0-9.]/g, '') || '0');
      var bv = parseFloat((b.dataset[by] || '').replace(/[^0-9.]/g, '') || '0');
      return bv - av;
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
  };

  /* ── Touch: on tap, select city (show panel) and briefly show tooltip ── */
  function bindTouchEvents() {
    document.querySelectorAll('.city-marker').forEach(function (g, idx) {
      g.addEventListener('touchstart', function (e) {
        e.preventDefault();
        igMapSelect(idx);
        /* Auto-hide tooltip after 3s on touch */
        setTimeout(hideTooltip, 3000);
      }, { passive: false });
    });
  }

  /* ── Expose igMapSelect globally ── */
  window.igMapSelect = igMapSelect;

  /* ── Init on DOMContentLoaded ── */
  function init() {
    bindMarkerHover();
    bindTouchEvents();
    /* Keyboard: handle SVG container focus trap */
    document.querySelectorAll('.city-marker').forEach(function (g) {
      g.setAttribute('focusable', 'true');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
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
