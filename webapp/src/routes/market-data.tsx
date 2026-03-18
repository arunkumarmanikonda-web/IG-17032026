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
    cx: 291, cy: 308,   // lon 77.2°E, lat 28.6°N — calibrated
    office: '₹8,500–10,500',  hotel: '₹6,200–9,500',   retail: '₹12,000–28,000',
    occ: '72%', adr: '₹7,200',  revpar: '₹5,184', cap: '7.5–9.0%',
    trend: 'up', occNum: 72,
    labelDir: 'right', labelOffset: 0,
  },
  {
    city: 'Mumbai',
    cx: 152, cy: 664,   // lon 72.8°E, lat 18.9°N — calibrated
    office: '₹22,000–28,000', hotel: '₹10,500–18,000', retail: '₹35,000–55,000',
    occ: '78%', adr: '₹12,500', revpar: '₹9,750', cap: '7.0–8.5%',
    trend: 'up', occNum: 78,
    labelDir: 'left', labelOffset: 0,
  },
  {
    city: 'Bengaluru',
    cx: 304, cy: 884,   // lon 77.6°E, lat 12.9°N — calibrated
    office: '₹8,000–12,000',  hotel: '₹5,500–9,000',   retail: '₹10,000–22,000',
    occ: '74%', adr: '₹6,800',  revpar: '₹5,032', cap: '7.5–9.0%',
    trend: 'up', occNum: 74,
    labelDir: 'left', labelOffset: 0,
  },
  {
    city: 'Hyderabad',
    cx: 333, cy: 719,   // lon 78.5°E, lat 17.4°N — calibrated
    office: '₹6,500–9,500',   hotel: '₹4,800–7,500',   retail: '₹8,000–18,000',
    occ: '71%', adr: '₹5,900',  revpar: '₹4,189', cap: '8.0–10.0%',
    trend: 'stable', occNum: 71,
    labelDir: 'right', labelOffset: 0,
  },
  {
    city: 'Pune',
    cx: 187, cy: 678,   // lon 73.9°E, lat 18.5°N — calibrated
    office: '₹5,500–8,000',   hotel: '₹3,800–6,500',   retail: '₹7,500–16,000',
    occ: '68%', adr: '₹4,700',  revpar: '₹3,196', cap: '8.5–10.5%',
    trend: 'up', occNum: 68,
    labelDir: 'left', labelOffset: 0,
  },
  {
    city: 'Chennai',
    cx: 386, cy: 876,   // lon 80.2°E, lat 13.1°N — calibrated
    office: '₹5,000–7,500',   hotel: '₹4,200–7,000',   retail: '₹8,000–16,000',
    occ: '70%', adr: '₹5,200',  revpar: '₹3,640', cap: '8.5–10.5%',
    trend: 'stable', occNum: 70,
    labelDir: 'right', labelOffset: 0,
  },
  {
    city: 'Chandigarh',
    cx: 279, cy: 231,   // lon 76.8°E, lat 30.7°N — calibrated
    office: '₹3,500–5,500',   hotel: '₹3,200–5,500',   retail: '₹6,000–12,000',
    occ: '69%', adr: '₹4,800',  revpar: '₹3,312', cap: '9.0–11.5%',
    trend: 'up', occNum: 69,
    labelDir: 'right', labelOffset: -18,
  },
  {
    city: 'Jaipur',
    cx: 247, cy: 370,   // lon 75.8°E, lat 26.9°N — calibrated
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
// SVG map constants removed — map section removed from market page



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

<!-- India advisory footprint map section removed per site update -->

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
