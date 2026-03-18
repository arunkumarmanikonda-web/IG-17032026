import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { HOSPITALITY_BRANDS, RETAIL_BRANDS, ADVISORY_PARTNERS } from '../lib/constants'

const app = new Hono()

const SERVICES = [
  {
    id: 'real-estate',
    icon: '🏛️',
    name: 'Real Estate Advisory',
    tagline: 'Transaction advisory, site selection & asset management',
    desc: 'We advise developers, investors and family offices on the full real estate lifecycle, from site selection and feasibility to transaction structuring, asset management and divestment. Our real estate practice spans commercial, hospitality and mixed-use assets across India.',
    items: ['Site identification & due diligence','Development strategy & feasibility','Transaction advisory & deal structuring','Asset valuation & appraisal','Commercial lease structuring','Investment sales & divestment','Portfolio management','Regulatory & compliance advisory'],
    highlights: [
      { v:'₹2,100 Cr', l:'Entertainment & Retail Hub, Mumbai MMR, 800,000 sq ft, 85% pre-leased' },
      { v:'₹620 Cr',   l:'6-Property Heritage Hotel Portfolio, Rajasthan, 72% TTM occupancy' },
    ],
    partners: [] as string[],
  },
  {
    id: 'retail',
    icon: '🛍️',
    name: 'Retail & Leasing Strategy',
    tagline: 'Brand mix, anchor structuring, leasing advisory & franchise expansion',
    desc: 'India Gully brings 30+ active retail brand relationships and deep mall-leasing expertise to developers, destination owners and retail brands. We cover every stage, from market research and brand mix strategy to lease negotiation, fit-out coordination and franchise expansion across Tier-1 and Tier-2 cities.',
    items: ['Retail market research & gap analysis','Brand mix strategy & category planning','Anchor & inline tenant leasing','Lease term structuring & negotiation','Fit-out coordination & design review','Signage & wayfinding strategy','Mall operations consultancy','Retail franchise expansion advisory','F&B destination advisory','Retail sales channel planning'],
    highlights: [
      { v:'30+',      l:'Active retail brand relationships across fashion, F&B and entertainment' },
      { v:'15 Cities', l:'Desi Brand retail franchise expansion mandate, ₹45 Cr, 36-month payback' },
    ],
    partners: ['Brand Partners'],
  },
  {
    id: 'hospitality',
    icon: '🏨',
    name: 'Hospitality Management',
    tagline: 'Hotel management, brand on-boarding & pre-opening PMC',
    desc: 'From pre-opening planning to brand management contracts, India Gully provides end-to-end hospitality advisory, connecting developers with the right brands and ensuring seamless hotel launches. We have on-boarded 15+ hotels across Marriott, Radisson, IHG, Cygnett, Regenta and more.',
    items: ['Pre-opening planning & management','Brand selection & on-boarding','Hotel management advisory','Revenue management & yield strategy','Staff recruitment & training','FF&E / OS&E procurement','Mock-up room execution','Asset advisory & repositioning'],
    highlights: [
      { v:'15+', l:'Hotel projects managed and advised across India' },
      { v:'20+', l:'Hospitality brand relationships. Marriott to Lemon Tree' },
    ],
    partners: ['Hotel Partners'],
  },
  {
    id: 'entertainment',
    icon: '🎡',
    name: 'Entertainment Advisory',
    tagline: 'Divestments, acquisitions & entertainment real estate',
    desc: 'India Gully advises on entertainment real estate transactions — from divestments and acquisitions to financial feasibility, due diligence and investor advisory. Our principals bring firsthand experience in landmark entertainment real estate deals, including large-scale shareholder-consented divestments and acquisition advisory for integrated entertainment destinations.',
    items: ['Shareholder-consented divestment advisory','Acquisition & due diligence','Financial feasibility & business plan','Investor & buyer identification','Asset valuation & structuring','Transaction management','Distressed entertainment asset advisory','Sale process management'],
    highlights: [
      { v:'₹1,350 Cr+', l:'Entertainment City Limited — 100% shareholder-consented divestment, joint advisory with EY' },
      { v:'₹500 Cr',    l:'Adlabs Imagica acquisition due diligence advisory' },
    ],
    partners: [] as string[],
  },
  {
    id: 'debt',
    icon: '⚖️',
    name: 'Debt & Special Situations',
    tagline: 'Structured debt advisory & distressed asset resolution',
    desc: 'We advise on structured debt arrangements, distressed asset turnarounds and special situation mandates, working with lenders, investors and promoters to maximise recovery and enterprise value. Our cross-vertical expertise in hospitality, real estate and retail is a unique differentiator.',
    items: ['Structured debt arrangement','Distressed asset resolution','IBC / NCLT process advisory','Asset monetisation','Debt restructuring & renegotiation','Promoter advisory','Lender advisory & due diligence','Special situation fund advisory'],
    highlights: [
      { v:'IBC', l:'IBC / NCLT process advisory for hotel and real estate assets' },
      { v:'Multi-sector', l:'Cross-vertical debt advisory leveraging hospitality, real estate and retail expertise' },
    ],
    partners: [] as string[],
  },
]

// Helper: logo grid for brands
function brandLogoGrid(brands: any[], title: string, subtitle: string) {
  // Group by category
  const cats = [...new Set(brands.map((b: any) => b.cat))] as string[]
  return `
<div style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border);">
  <p style="font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${title}</p>
  <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:1.5rem;">${subtitle}</p>
  ${cats.map((cat: string) => `
  <div style="margin-bottom:1.5rem;">
    <p style="font-size:.6rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;padding-bottom:.4rem;border-bottom:1px solid rgba(184,150,12,.2);">${cat}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem;">
      ${brands.filter((b: any) => b.cat === cat).map((b: any) => `
      <div style="background:var(--parch);padding:.875rem .75rem;display:flex;flex-direction:column;align-items:center;gap:.4rem;border:1px solid var(--border);transition:all .2s;"
           onmouseover="this.style.borderColor='${b.color}';this.style.background='white'"
           onmouseout="this.style.borderColor='var(--border)';this.style.background='var(--parch)'">
        <img src="${b.svg}" alt="${b.name}" width="140" height="56"
             style="width:140px;height:56px;object-fit:contain;border-radius:2px;"
             loading="lazy" decoding="async">
        <span style="font-size:.56rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);text-align:center;">${b.name}</span>
      </div>`).join('')}
    </div>
  </div>`).join('')}
</div>`
}

app.get('/', (c) => {
  const content = `

<!-- ══ SERVICES HERO ════════════════════════════════════════════════════ -->
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 50% 65% at 30% 50%,rgba(184,150,12,.05) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:100px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:720px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">Advisory Services</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.5rem;">Six Verticals.<br><em style="color:var(--gold);font-style:italic;">One Partner.</em></h1>
      <p class="lead-lt" style="max-width:580px;margin-bottom:2.5rem;">Institutional-grade advisory across Real Estate, Retail, Hospitality, Entertainment, Debt &amp; HORECA, delivered by domain specialists with deep India market knowledge.</p>
      <div style="display:flex;flex-wrap:wrap;gap:.625rem;">
        ${SERVICES.map((s: any) => `<a href="#${s.id}" class="btn btn-ghost btn-sm">${s.name}</a>`).join('')}
        <a href="/horeca" class="btn btn-ghost btn-sm">HORECA Solutions</a>
      </div>
    </div>
  </div>
</div>

<!-- ══ SERVICES DETAIL ════════════════════════════════════════════════════ -->
${SERVICES.map((s, i) => `
<div id="${s.id}" class="${i%2===0 ? 'sec-wh' : 'sec-pc'}" style="padding-top:6.5rem;padding-bottom:6.5rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:5fr 4fr;gap:5rem;align-items:start;" class="mob-stack">

      <!-- Left -->
      <div class="reveal-l">
        <div style="display:flex;align-items:center;gap:1.25rem;margin-bottom:2rem;">
          <div class="ig-icon-box" style="width:64px;height:64px;">
            <span style="font-size:1.65rem;">${s.icon}</span>
          </div>
          <div>
            <span style="font-size:.58rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);">Advisory Vertical</span>
          </div>
        </div>
        <h2 class="h2" style="margin-bottom:.875rem;">${s.name}</h2>
        <p style="font-size:.875rem;color:var(--gold);font-weight:500;letter-spacing:.04em;margin-bottom:1.5rem;">${s.tagline}</p>
        <p class="lead" style="margin-bottom:2.5rem;">${s.desc}</p>

        <!-- Service items grid -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;">
          ${s.items.map((item: string) => `
          <div class="service-item">
            <div style="width:20px;height:20px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:.05rem;">
              <i class="fas fa-check" style="color:var(--gold);font-size:.52rem;"></i>
            </div>
            <span style="font-size:.82rem;color:var(--ink-soft);">${item}</span>
          </div>`).join('')}
        </div>

        ${s.id === 'hospitality' ? brandLogoGrid(HOSPITALITY_BRANDS, 'Hotel Brand Partners', 'India Gully holds active advisory and management relationships with these hotel brands across India.') : ''}
        ${s.id === 'retail' ? brandLogoGrid(RETAIL_BRANDS, 'Retail Brand Partners', 'Active leasing relationships across fashion, F&B, entertainment and anchor categories.') : ''}
      </div>

      <!-- Right -->
      <div class="reveal-r">
        <div style="background:var(--ink);padding:2.5rem;margin-bottom:1.75rem;position:relative;overflow:hidden;">
          <!-- Gold top accent -->
          <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);"></div>
          <p class="eyebrow-lt" style="margin-bottom:1.75rem;">Track Record</p>
          <div style="display:flex;flex-direction:column;gap:1.5rem;">
            ${s.highlights.map((h: any) => `
            <div style="padding-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,.06);transition:padding-left .2s;" onmouseover="this.style.paddingLeft='.75rem'" onmouseout="this.style.paddingLeft='0'">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.4rem;color:var(--gold);line-height:.95;margin-bottom:.5rem;letter-spacing:-.03em;">${h.v}</div>
              <p style="font-size:.83rem;color:rgba(255,255,255,.5);line-height:1.75;">${h.l}</p>
            </div>`).join('')}
          </div>
        </div>

        <div class="ig-callout" style="padding:2rem;">
          <p style="font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Engage This Vertical</p>
          <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.8;margin-bottom:1.5rem;">Interested in this advisory vertical? Our leadership team reviews all submissions within 24 hours.</p>
          <div style="display:flex;flex-direction:column;gap:.625rem;margin-bottom:1.5rem;">
            ${[{icon:"check",t:"Board-level advisory experience"},{icon:"check",t:"Pan-India mandate pipeline"},{icon:"check",t:"24-hour response commitment"}].map(b=>`<div style="display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:var(--ink-muted);"><i class="fas fa-${b.icon}" style="color:var(--gold);font-size:.6rem;flex-shrink:0;"></i>${b.t}</div>`).join('')}
          </div>
          <a href="/contact?service=${s.id}" class="btn btn-g" style="width:100%;justify-content:center;">Discuss Your Mandate <i class="fas fa-arrow-right" style="margin-left:.4rem;font-size:.6rem;"></i></a>
        </div>
      </div>
    </div>
  </div>
</div>
`).join('')}

<!-- ══ INDIA ADVISORY FOOTPRINT MAP ══════════════════════════════════════ -->
<div id="india-footprint" class="sec-md" style="padding-top:5rem;padding-bottom:5rem;overflow:hidden;">
  <div class="wrap">
    <div style="text-align:center;max-width:600px;margin:0 auto 3rem;">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Pan-India Presence</p>
      <h2 class="h2-lt" style="margin-bottom:1rem;">Our Advisory Footprint</h2>
      <p class="lead-lt" style="max-width:500px;margin:0 auto;">Active mandates and advisory presence across India's key real estate, hospitality and retail markets.</p>
    </div>

    <!-- Map + City List grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;" class="mob-stack">

      <!-- India SVG Map -->
      <div style="position:relative;">
        <div style="position:absolute;top:10%;left:10%;width:80%;height:80%;background:radial-gradient(ellipse,rgba(184,150,12,.08) 0%,transparent 70%);pointer-events:none;"></div>
        <svg id="serviceIndiaMap" viewBox="0 0 680 780" xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="xMidYMid meet"
             style="width:100%;height:auto;display:block;"
             aria-label="India advisory footprint map">
          <defs>
            <filter id="svsShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(184,150,12,0.4)"/>
            </filter>
            <radialGradient id="svsGold" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stop-color="#f0d060"/>
              <stop offset="100%" stop-color="#B8960C"/>
            </radialGradient>
          </defs>

          <!-- India outline - simplified but geographically correct SVG -->
          <!-- Scale: ~22.5px/deg longitude, ~26px/deg latitude -->
          <!-- Origin: lon 68°E=0, lat 37°N=0 (y inverted) -->
          <!-- J&K + Ladakh -->
          <path d="M 110,0 L 255,0 L 300,18 L 295,58 L 280,82 L 252,108 L 222,118 L 194,115 L 168,112 L 148,108 L 125,82 L 108,55 Z"
                fill="rgba(80,120,78,0.5)" stroke="rgba(255,255,255,0.35)" stroke-width="1" opacity="0.8"/>
          <!-- Himachal Pradesh -->
          <path d="M 182,110 L 208,105 L 245,110 L 254,124 L 248,144 L 232,158 L 210,162 L 192,152 L 180,135 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Punjab -->
          <path d="M 138,118 L 180,112 L 188,130 L 180,152 L 162,168 L 143,172 L 128,158 L 122,138 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Haryana -->
          <path d="M 182,158 L 210,162 L 228,174 L 232,195 L 222,212 L 202,220 L 180,218 L 162,205 L 158,182 L 164,168 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Delhi (small) -->
          <path d="M 202,195 L 216,192 L 222,202 L 218,215 L 205,218 L 198,208 Z"
                fill="rgba(80,120,78,0.65)" stroke="rgba(255,255,255,0.4)" stroke-width="0.6"/>
          <!-- Uttarakhand -->
          <path d="M 235,155 L 256,148 L 286,148 L 302,158 L 300,178 L 285,192 L 262,196 L 240,188 L 228,172 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Uttar Pradesh -->
          <path d="M 200,218 L 228,212 L 258,198 L 300,190 L 340,192 L 368,200 L 388,222 L 385,248 L 368,268 L 338,278 L 305,280 L 272,272 L 245,258 L 220,240 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Rajasthan -->
          <path d="M 128,180 L 162,175 L 200,178 L 220,196 L 218,222 L 205,248 L 185,272 L 160,292 L 132,305 L 105,308 L 84,295 L 72,268 L 72,240 L 85,212 L 105,192 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Gujarat -->
          <path d="M 55,320 L 82,312 L 108,315 L 125,328 L 128,350 L 115,372 L 92,382 L 68,378 L 48,360 L 40,335 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Gujarat Saurashtra -->
          <path d="M 40,348 L 65,340 L 88,350 L 90,370 L 72,380 L 48,372 Z"
                fill="rgba(80,120,78,0.5)" stroke="rgba(255,255,255,0.3)" stroke-width="0.7"/>
          <!-- Gujarat Kutch -->
          <path d="M 5,292 L 38,282 L 65,288 L 75,302 L 62,316 L 35,320 L 12,310 Z"
                fill="rgba(80,120,78,0.5)" stroke="rgba(255,255,255,0.3)" stroke-width="0.7"/>
          <!-- Madhya Pradesh -->
          <path d="M 138,282 L 168,268 L 200,262 L 238,265 L 272,275 L 298,288 L 310,312 L 305,335 L 285,348 L 255,352 L 222,345 L 192,330 L 168,312 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Maharashtra -->
          <path d="M 110,368 L 138,355 L 168,340 L 200,340 L 228,348 L 252,358 L 268,375 L 270,400 L 258,420 L 235,428 L 205,425 L 178,412 L 155,392 L 132,378 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Karnataka -->
          <path d="M 150,440 L 178,428 L 210,432 L 238,445 L 252,465 L 255,488 L 245,512 L 225,528 L 200,532 L 172,520 L 150,498 L 138,475 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Goa (small) -->
          <path d="M 125,440 L 142,435 L 150,444 L 148,455 L 135,460 Z"
                fill="rgba(80,120,78,0.6)" stroke="rgba(255,255,255,0.35)" stroke-width="0.6"/>
          <!-- Kerala -->
          <path d="M 192,532 L 212,525 L 225,538 L 218,562 L 205,580 L 185,590 L 170,582 L 165,562 L 172,542 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Tamil Nadu -->
          <path d="M 222,530 L 245,525 L 272,530 L 292,548 L 295,572 L 285,598 L 265,615 L 242,618 L 220,605 L 205,582 L 205,558 L 215,540 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Andhra Pradesh -->
          <path d="M 268,360 L 305,350 L 340,355 L 368,368 L 380,392 L 375,418 L 358,435 L 330,440 L 300,435 L 272,418 L 255,395 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Telangana -->
          <path d="M 255,350 L 280,342 L 310,345 L 335,358 L 340,378 L 330,400 L 308,408 L 282,405 L 260,390 L 252,368 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Odisha -->
          <path d="M 375,232 L 410,225 L 442,228 L 462,245 L 460,270 L 445,288 L 418,295 L 390,290 L 370,272 L 365,250 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Chhattisgarh -->
          <path d="M 305,280 L 338,272 L 368,272 L 390,285 L 395,310 L 385,335 L 365,350 L 340,355 L 310,348 L 292,330 L 290,305 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Jharkhand -->
          <path d="M 355,215 L 390,210 L 415,218 L 425,238 L 415,258 L 390,268 L 362,262 L 345,245 L 345,228 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Bihar -->
          <path d="M 338,160 L 368,155 L 400,158 L 420,172 L 422,192 L 408,208 L 382,215 L 355,210 L 335,196 L 328,178 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- West Bengal -->
          <path d="M 408,155 L 438,148 L 462,155 L 472,175 L 468,200 L 450,215 L 425,218 L 405,205 L 395,185 Z"
                fill="rgba(80,120,78,0.55)" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Assam + NE States (simplified block) -->
          <path d="M 480,155 L 518,148 L 552,152 L 572,168 L 568,190 L 545,202 L 515,205 L 485,198 L 470,180 Z"
                fill="rgba(80,120,78,0.5)" stroke="rgba(255,255,255,0.28)" stroke-width="0.8"/>
          <!-- Arunachal Pradesh -->
          <path d="M 538,100 L 568,92 L 600,90 L 622,102 L 620,122 L 598,132 L 568,135 L 542,128 L 530,112 Z"
                fill="rgba(80,120,78,0.5)" stroke="rgba(255,255,255,0.28)" stroke-width="0.8"/>
          <!-- Sri Lanka (reference) -->
          <path d="M 265,700 L 278,694 L 290,700 L 294,720 L 285,738 L 270,740 L 260,728 L 260,710 Z"
                fill="rgba(80,120,78,0.3)" stroke="rgba(255,255,255,0.2)" stroke-width="0.6" opacity="0.6"/>
          <!-- Andaman islands -->
          <ellipse cx="592" cy="432" rx="6" ry="16" fill="rgba(80,120,78,0.4)" stroke="rgba(255,255,255,0.25)" stroke-width="0.6"/>
          <ellipse cx="586" cy="462" rx="5" ry="12" fill="rgba(80,120,78,0.4)" stroke="rgba(255,255,255,0.25)" stroke-width="0.6"/>

          <!-- City Markers — Advisory Locations -->
          <!-- Delhi NCR: lon 77°E → x=(77-68)*22.5=202.5, lat 28.6°N → y=(37-28.6)*26=218.4 -->
          <g class="svc-marker" onclick="svcCityTip(this,'Delhi NCR','Real Estate · Hospitality · Retail')" style="cursor:pointer;">
            <circle cx="206" cy="207" r="12" fill="rgba(184,150,12,0.18)" class="svc-pulse"/>
            <circle cx="206" cy="207" r="7" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="220" y="211" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600" fill="rgba(255,255,255,0.85)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Delhi NCR</text>
          </g>
          <!-- Mumbai: lon 72.8°E → x=(72.8-68)*22.5=108, lat 18.9°N → y=(37-18.9)*26=470.6 -->
          <g class="svc-marker" onclick="svcCityTip(this,'Mumbai','Real Estate · Entertainment · Retail')" style="cursor:pointer;">
            <circle cx="108" cy="348" r="12" fill="rgba(184,150,12,0.18)" class="svc-pulse"/>
            <circle cx="108" cy="348" r="7" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="85" y="341" text-anchor="end" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600" fill="rgba(255,255,255,0.85)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Mumbai</text>
          </g>
          <!-- Chandigarh: lon 76.8°E → x=(76.8-68)*22.5=198, lat 30.7°N → y=(37-30.7)*26=163.8 -->
          <g class="svc-marker" onclick="svcCityTip(this,'Chandigarh','Hospitality · Real Estate')" style="cursor:pointer;">
            <circle cx="197" cy="163" r="10" fill="rgba(184,150,12,0.15)" class="svc-pulse"/>
            <circle cx="197" cy="163" r="6" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="210" y="167" font-family="DM Sans,sans-serif" font-size="9" font-weight="600" fill="rgba(255,255,255,0.85)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Chandigarh</text>
          </g>
          <!-- Kasauli/Chail: lon 77°E, lat 30.9°N -->
          <g class="svc-marker" onclick="svcCityTip(this,'Kasauli · Chail','Heritage Hospitality')" style="cursor:pointer;">
            <circle cx="202" cy="158" r="8" fill="rgba(184,150,12,0.12)" class="svc-pulse"/>
            <circle cx="202" cy="158" r="5" fill="rgba(184,150,12,0.7)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
          </g>
          <!-- Jaipur: lon 75.8°E → x=(75.8-68)*22.5=175.5, lat 26.9°N → y=(37-26.9)*26=262.6 -->
          <g class="svc-marker" onclick="svcCityTip(this,'Jaipur','Hospitality · Real Estate')" style="cursor:pointer;">
            <circle cx="175" cy="263" r="10" fill="rgba(184,150,12,0.15)" class="svc-pulse"/>
            <circle cx="175" cy="263" r="6" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="160" y="256" text-anchor="end" font-family="DM Sans,sans-serif" font-size="9" font-weight="600" fill="rgba(255,255,255,0.85)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Jaipur</text>
          </g>
          <!-- Bengaluru: lon 77.6°E → x=(77.6-68)*22.5=216, lat 12.9°N → y=(37-12.9)*26=626.6 -->
          <g class="svc-marker" onclick="svcCityTip(this,'Bengaluru','Real Estate · HORECA · Retail')" style="cursor:pointer;">
            <circle cx="216" cy="498" r="11" fill="rgba(184,150,12,0.15)" class="svc-pulse"/>
            <circle cx="216" cy="498" r="7" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="229" y="502" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600" fill="rgba(255,255,255,0.85)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Bengaluru</text>
          </g>
          <!-- Hyderabad: lon 78.5°E → x=(78.5-68)*22.5=236.25, lat 17.4°N → y=(37-17.4)*26=509.6 -->
          <g class="svc-marker" onclick="svcCityTip(this,'Hyderabad','Real Estate · Hospitality')" style="cursor:pointer;">
            <circle cx="236" cy="382" r="10" fill="rgba(184,150,12,0.15)" class="svc-pulse"/>
            <circle cx="236" cy="382" r="6" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="249" y="386" font-family="DM Sans,sans-serif" font-size="9" font-weight="600" fill="rgba(255,255,255,0.85)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Hyderabad</text>
          </g>
        </svg>
        <p style="font-size:.58rem;color:rgba(255,255,255,.3);font-family:'DM Sans',sans-serif;text-align:center;margin-top:.5rem;">J&amp;K shown per India's official territorial claim · Click a marker for details</p>
      </div>

      <!-- City / Advisory List -->
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:1.5rem;">Active Advisory Markets</p>
        <div style="display:flex;flex-direction:column;gap:.75rem;" id="svcCityList">
          ${[
            { city: 'Delhi NCR', verticals: 'Real Estate · Hospitality · Retail', note: 'Primary market — largest advisory pipeline' },
            { city: 'Chandigarh & Himachal Pradesh', verticals: 'Hospitality · Heritage', note: 'Hotel Rajshree, Kasauli, Chail active mandates' },
            { city: 'Jaipur', verticals: 'Hospitality · Heritage', note: '6-property heritage portfolio advisory' },
            { city: 'Mumbai', verticals: 'Real Estate · Entertainment · Retail', note: '₹2,100 Cr entertainment & retail hub mandate' },
            { city: 'Bengaluru', verticals: 'Real Estate · HORECA', note: 'Commercial real estate & procurement advisory' },
            { city: 'Hyderabad', verticals: 'Real Estate · Hospitality', note: 'Fastest-growing Tier-1 market 2026' },
          ].map((c: any) => `
          <div style="padding:.875rem 1rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-left:3px solid rgba(184,150,12,.5);transition:all .2s;"
               onmouseover="this.style.background='rgba(184,150,12,.07)';this.style.borderLeftColor='var(--gold)'"
               onmouseout="this.style.background='rgba(255,255,255,.04)';this.style.borderLeftColor='rgba(184,150,12,.5)'">
            <div style="font-size:.82rem;font-weight:700;color:#fff;margin-bottom:.2rem;">${c.city}</div>
            <div style="font-size:.65rem;color:var(--gold);font-weight:600;letter-spacing:.04em;margin-bottom:.2rem;">${c.verticals}</div>
            <div style="font-size:.7rem;color:rgba(255,255,255,.4);">${c.note}</div>
          </div>`).join('')}
        </div>

        <!-- Tooltip box -->
        <div id="svcMapTip" style="display:none;margin-top:1.25rem;padding:1rem;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.3);">
          <p id="svcTipCity" style="font-size:.88rem;font-weight:700;color:#fff;margin-bottom:.25rem;"></p>
          <p id="svcTipVerticals" style="font-size:.7rem;color:var(--gold);"></p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.svc-pulse { animation: svcPulse 2.5s ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
@keyframes svcPulse { 0%,100%{r:12px;opacity:.18;} 50%{r:17px;opacity:.06;} }
.svc-marker:hover circle:last-of-type,.svc-marker:focus circle:last-of-type { filter:brightness(1.3) drop-shadow(0 0 6px rgba(184,150,12,.7)); }
</style>
<script>
function svcCityTip(el, city, verticals) {
  var tip = document.getElementById('svcMapTip');
  var cityEl = document.getElementById('svcTipCity');
  var vertEl = document.getElementById('svcTipVerticals');
  if (tip && cityEl && vertEl) {
    cityEl.textContent = city;
    vertEl.textContent = verticals;
    tip.style.display = 'block';
  }
}
</script>

<!-- ══ TRANSACTION ADVISORY PARTNERS ════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:5rem;padding-bottom:5rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:640px;margin:0 auto 3rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Transaction Advisory</p>
      <h2 class="h2">Our Advisory Partners</h2>
      <p class="lead" style="margin-top:1rem;max-width:520px;margin-left:auto;margin-right:auto;">India Gully collaborates with globally recognised advisory and consulting firms on transaction mandates, bringing institutional credibility, multi-disciplinary expertise and deep financial rigour to every deal.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--border);margin-bottom:2rem;">
      ${ADVISORY_PARTNERS.map((p: any) => `
      <div style="background:#fff;padding:2.25rem 1.25rem;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;transition:background .2s;min-height:160px;" onmouseover="this.style.background='#f9f7f2'" onmouseout="this.style.background='#fff'">
        <div style="height:56px;display:flex;align-items:center;justify-content:center;">
          <img src="${p.logo}" alt="${p.name}" style="max-height:40px;max-width:130px;width:auto;height:auto;object-fit:contain;display:block;"
               onerror="this.style.display='none';this.parentElement.nextElementSibling.style.display='flex'">
        </div>
        <div style="display:none;height:56px;align-items:center;justify-content:center;">
          <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.3rem;font-weight:700;color:var(--ink);">${p.abbr}</span>
        </div>
        <div>
          <div style="font-size:.75rem;font-weight:700;color:var(--ink);margin-bottom:.2rem;">${p.name}</div>
          <div style="font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);">${p.sub}</div>
        </div>
      </div>`).join('')}
    </div>

    <div style="border:1px solid var(--border);padding:1.25rem 1.5rem;display:flex;gap:.75rem;align-items:flex-start;max-width:820px;margin:0 auto;">
      <i class="fas fa-handshake" style="color:var(--gold);font-size:.875rem;margin-top:.1rem;flex-shrink:0;"></i>
      <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.8;">India Gully works alongside EY, CBRE, ANAROCK, Pipara &amp; Co and Resurgent India on select mandates where multi-disciplinary expertise, spanning financial due diligence, real estate capital markets, property consultancy, chartered accounting and investment banking, is required for complex, large-format transactions.</p>
    </div>
  </div>
</div>

<!-- ══ HORECA CTA ═════════════════════════════════════════════════════════ -->
<div class="sec-md">
  <div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
    <div>
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">HORECA Solutions</p>
      <h2 class="h2-lt" style="margin-bottom:1.25rem;">Complete Supply<br>Chain for Hotels</h2>
      <p class="lead-lt" style="margin-bottom:2rem;">Kitchen equipment, FF&amp;E, OS&amp;E, linens, uniforms and guest amenities, procured to spec, delivered on schedule.</p>
      <a href="/horeca" class="btn btn-g">Explore HORECA Solutions</a>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.06);">
      ${['FF&amp;E Procurement','OS&amp;E Sourcing','Kitchen Equipment','Linen &amp; Tableware','Uniforms','Guest Amenities','Turnkey Supply','Ongoing Contracts'].map(item => `
      <div style="padding:1.25rem;background:rgba(255,255,255,.02);">
        <i class="fas fa-check" style="color:var(--gold);font-size:.65rem;margin-right:.5rem;"></i>
        <span style="font-size:.78rem;color:rgba(255,255,255,.5);">${item}</span>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ BOTTOM CTA ══════════════════════════════════════════════════════════ -->
<div class="sec-dk" style="position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(184,150,12,.05) 0%,transparent 70%);pointer-events:none;"></div>
  <div class="wrap" style="text-align:center;max-width:720px;margin:0 auto;position:relative;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:.75rem;">Work With Us</p>
    <h2 class="h2-lt" style="margin-bottom:1.25rem;">Ready to Engage<br>India Gully?</h2>
    <p class="lead-lt" style="max-width:520px;margin:0 auto 2.5rem;">Submit a mandate enquiry and our leadership team will respond within 24 hours.</p>
    <div style="display:flex;flex-wrap:wrap;gap:.875rem;justify-content:center;">
      <a href="/contact"  class="btn btn-g">Submit a Mandate Enquiry</a>
      <a href="/listings" class="btn btn-ghost-g">View Active Mandates</a>
    </div>
  </div>
</div>

`
  return c.html(layout('Advisory Services', content, {
    description: 'India Gully advisory services. Real Estate, Retail & Leasing, Hospitality Management, Entertainment Advisory, Debt & Special Situations, HORECA Solutions. Pan-India presence.',
    canonical: 'https://indiagully.com/services',
    ogImage: 'https://indiagully.com/static/og.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          serviceType: 'Advisory Services',
          provider: { '@type': 'Organization', name: 'India Gully', url: 'https://indiagully.com' },
          areaServed: { '@type': 'Country', name: 'India' },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'India Gully Advisory Services',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate Advisory' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retail & Leasing' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hospitality Management' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Entertainment Advisory' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Debt & Special Situations' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HORECA Solutions' } }
            ]
          }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://indiagully.com/' },
            { '@type': 'ListItem', position: 2, name: 'Advisory Services', item: 'https://indiagully.com/services' },
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What advisory services does India Gully offer?',
              acceptedAnswer: { '@type': 'Answer', text: 'India Gully offers six core advisory services: Real Estate Advisory (acquisitions, disposals, due diligence), Retail & Leasing (brand placements, mall advisory), Hospitality Management (hotel operations, brand onboarding), Entertainment Advisory (FEC/EDC feasibility, operator selection), Debt & Special Situations (IBC, OTS, pre-pack), and HORECA Solutions (procurement for hotel pre-openings and F&B operators).' }
            },
            {
              '@type': 'Question',
              name: 'Which sectors does India Gully specialise in?',
              acceptedAnswer: { '@type': 'Answer', text: 'India Gully specialises in Real Estate, Retail & Leasing, Hospitality, Entertainment, Debt & Special Situations, and HORECA. The firm has advised on over ₹2,000 Cr of transactions since 2017.' }
            },
            {
              '@type': 'Question',
              name: 'Where does India Gully operate?',
              acceptedAnswer: { '@type': 'Answer', text: 'India Gully operates pan-India with primary focus on Delhi NCR, Chandigarh, Himachal Pradesh, Rajasthan, and emerging Tier-2 markets.' }
            },
            {
              '@type': 'Question',
              name: 'How do I engage India Gully for an advisory mandate?',
              acceptedAnswer: { '@type': 'Answer', text: 'You can submit a mandate enquiry via the Contact page at https://indiagully.com/contact, or call +91 89889 88988. All mandates are handled under strict NDA and confidentiality protocols.' }
            }
          ]
        }
      ]
    }
  }))
})

export default app
