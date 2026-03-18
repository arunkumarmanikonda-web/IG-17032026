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
<!-- SOURCE: State paths scaled from market-data.tsx SVG (950×1100) to this viewBox (680×780) -->
<!-- Scale factors: X = 680/950 = 0.7158,  Y = 780/1100 = 0.7091                              -->
<!-- Projection: cx = (lon−68)×31.67×0.7158,  cy = (37−lat)×36.67×0.7091                     -->
<!-- City marker positions: Delhi NCR (208,218), Mumbai (109,471), Bengaluru (218,627)         -->
<!--   Hyderabad (238,510), Chandigarh (200,164), Jaipur (177,262), Kasauli (190,159)          -->
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

      <!-- India SVG Map — accurate state geometry, scaled from market-data map -->
      <div style="position:relative;display:flex;align-items:center;justify-content:center;">
        <div style="position:absolute;top:10%;left:10%;width:80%;height:80%;background:radial-gradient(ellipse,rgba(184,150,12,.08) 0%,transparent 70%);pointer-events:none;"></div>
        <!-- viewBox 0 0 680 780 — all state paths derived from market-data.tsx SVG (950×1100)  -->
        <!-- scaled by X×0.7158 Y×0.7091 so peninsular shape, J&K, and city positions are exact -->
        <svg id="serviceIndiaMap"
             viewBox="0 0 680 780"
             xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="xMidYMid meet"
             style="width:100%;max-width:400px;height:auto;display:block;"
             aria-label="India advisory footprint map — accurate state geometry">
          <defs>
            <filter id="svsShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.55)"/>
            </filter>
            <radialGradient id="svsGold" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stop-color="#f0d060"/>
              <stop offset="100%" stop-color="#B8960C"/>
            </radialGradient>
            <radialGradient id="svsBodyGlow" cx="48%" cy="50%" r="52%">
              <stop offset="0%"   stop-color="rgba(80,160,78,0.15)"/>
              <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
            </radialGradient>
          </defs>

          <!-- Ocean background glow -->
          <ellipse cx="340" cy="425" rx="272" ry="354" fill="url(#svsBodyGlow)" opacity="0.6"/>

          <!-- ── STATE PATHS — scaled from market-data.tsx 950×1100 by (×0.7158, ×0.7091) ── -->

          <!-- J&K + Ladakh — dashed border per India's official territorial claim -->
          <path d="M 113,0 L 227,0 L 283,0 L 283,65 L 261,91 L 238,109 L 227,125 L 204,117 L 186,117 L 177,117 L 147,99 L 125,65 L 113,26 Z"
                fill="#4a8045" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-dasharray="4,3"
                class="svc-state" data-state="Jammu &amp; Kashmir"/>

          <!-- Himachal Pradesh -->
          <path d="M 181,104 L 215,99 L 249,109 L 245,145 L 218,172 L 177,172 L 170,151 L 170,117 L 181,104 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Punjab -->
          <path d="M 134,117 L 173,117 L 181,167 L 186,187 L 154,195 L 134,187 L 134,143 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Haryana -->
          <path d="M 181,167 L 218,172 L 218,245 L 193,255 L 154,255 L 150,234 L 150,195 L 181,182 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Delhi (UT) -->
          <path d="M 200,208 L 211,211 L 213,223 L 200,223 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.6)" stroke-width="0.9" class="svc-state"/>

          <!-- Uttarakhand -->
          <path d="M 218,172 L 227,156 L 283,156 L 295,169 L 283,216 L 261,216 L 227,216 L 218,195 L 218,172 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Uttar Pradesh -->
          <path d="M 208,218 L 218,172 L 227,195 L 283,216 L 377,255 L 363,338 L 340,338 L 283,325 L 218,245 L 193,255 L 204,234 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Rajasthan -->
          <path d="M 34,195 L 102,195 L 154,195 L 218,245 L 213,325 L 177,359 L 113,364 L 41,377 L 34,338 L 11,273 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Gujarat -->
          <path d="M 39,325 L 113,325 L 132,351 L 132,390 L 102,429 L 57,437 L 23,426 L 0,403 L 11,351 L 39,325 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Madhya Pradesh -->
          <path d="M 136,262 L 218,245 L 336,260 L 336,325 L 272,413 L 181,413 L 136,377 L 113,325 L 136,262 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Maharashtra -->
          <path d="M 105,390 L 181,413 L 272,413 L 293,455 L 283,507 L 261,533 L 227,557 L 181,557 L 136,546 L 113,533 L 105,494 L 105,442 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Goa -->
          <path d="M 130,551 L 143,551 L 143,574 L 130,574 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.5)" stroke-width="0.8" class="svc-state"/>

          <!-- Karnataka -->
          <path d="M 138,481 L 181,481 L 241,507 L 227,585 L 204,629 L 181,650 L 147,650 L 136,611 L 136,572 L 138,481 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Kerala -->
          <path d="M 157,629 L 181,650 L 204,637 L 213,689 L 193,746 L 181,749 L 159,715 L 157,676 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Tamil Nadu -->
          <path d="M 204,637 L 276,611 L 281,650 L 268,715 L 238,752 L 215,752 L 193,746 L 204,689 L 204,637 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Andhra Pradesh -->
          <path d="M 200,442 L 272,416 L 293,455 L 379,455 L 363,507 L 317,546 L 283,598 L 249,598 L 241,559 L 241,507 L 200,481 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Telangana -->
          <path d="M 208,445 L 249,445 L 299,445 L 301,507 L 272,546 L 241,559 L 227,557 L 208,520 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Odisha -->
          <path d="M 306,374 L 408,374 L 442,403 L 431,473 L 381,494 L 317,481 L 306,455 L 306,403 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Chhattisgarh -->
          <path d="M 272,335 L 336,325 L 374,390 L 340,442 L 317,481 L 283,481 L 249,468 L 238,442 L 272,390 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Jharkhand -->
          <path d="M 349,301 L 451,301 L 442,364 L 408,374 L 374,390 L 349,377 L 340,338 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Bihar -->
          <path d="M 347,247 L 460,247 L 460,330 L 451,338 L 349,312 L 347,286 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- West Bengal -->
          <path d="M 404,255 L 465,255 L 497,312 L 465,403 L 408,374 L 451,338 L 451,301 L 404,312 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state"/>

          <!-- Assam -->
          <path d="M 492,229 L 544,229 L 635,229 L 635,299 L 601,335 L 533,325 L 492,299 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="0.9" class="svc-state"/>

          <!-- NE states (Nagaland, Manipur, Mizoram, Tripura, Meghalaya — simplified block) -->
          <path d="M 533,299 L 635,299 L 635,393 L 551,393 L 526,367 L 526,325 L 533,325 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="0.9" class="svc-state"/>

          <!-- Arunachal Pradesh -->
          <path d="M 538,195 L 666,195 L 666,268 L 538,268 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.4)" stroke-width="0.9" class="svc-state"/>

          <!-- Andaman & Nicobar Islands -->
          <ellipse cx="588" cy="440" rx="5" ry="14" fill="#5ab050" stroke="rgba(255,255,255,0.35)" stroke-width="0.8" opacity="0.75"/>
          <ellipse cx="583" cy="464" rx="4" ry="11" fill="#5ab050" stroke="rgba(255,255,255,0.35)" stroke-width="0.8" opacity="0.75"/>

          <!-- Sri Lanka (reference) -->
          <path d="M 265,702 L 276,696 L 289,699 L 296,712 L 298,729 L 292,746 L 281,754 L 268,753 L 259,740 L 256,723 L 259,708 Z"
                fill="#5ab050" stroke="rgba(255,255,255,0.2)" stroke-width="0.6" opacity="0.45"/>

          <!-- ── CITY MARKERS — calibrated using same projection as market-data.tsx ── -->
          <!-- All cx/cy = market-data cx × 0.7158, cy × 0.7091                         -->

          <!-- Delhi NCR: md(291,308) → (208,218) -->
          <g class="svc-marker" onclick="svcCityTip('Delhi NCR','Real Estate · Hospitality · Retail')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Delhi NCR — Real Estate, Hospitality, Retail">
            <circle cx="208" cy="218" r="13" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="13"/>
            <circle cx="208" cy="218" r="8" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="223" y="222" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Delhi NCR</text>
          </g>

          <!-- Mumbai: md(152,664) → (109,471) -->
          <g class="svc-marker" onclick="svcCityTip('Mumbai','Real Estate · Entertainment · Retail')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Mumbai — Real Estate, Entertainment, Retail">
            <circle cx="109" cy="471" r="13" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="13"/>
            <circle cx="109" cy="471" r="8" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="94" y="464" text-anchor="end" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Mumbai</text>
          </g>

          <!-- Chandigarh: md(279,231) → (200,164) -->
          <g class="svc-marker" onclick="svcCityTip('Chandigarh','Hospitality · Real Estate')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Chandigarh — Hospitality, Real Estate">
            <circle cx="200" cy="164" r="11" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="11"/>
            <circle cx="200" cy="164" r="6.5" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="214" y="168" font-family="DM Sans,sans-serif" font-size="9" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Chandigarh</text>
          </g>

          <!-- Kasauli/Chail: md(265,224) → (190,159) — small heritage marker, no label -->
          <g class="svc-marker" onclick="svcCityTip('Kasauli · Chail','Heritage Hospitality')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Kasauli · Chail — Heritage Hospitality">
            <circle cx="190" cy="159" r="9" fill="rgba(184,150,12,0.12)" class="svc-pulse" data-r="9"/>
            <circle cx="190" cy="159" r="5.5" fill="rgba(184,150,12,0.75)" stroke="#B8960C" stroke-width="1.2" filter="url(#svsShadow)"/>
          </g>

          <!-- Jaipur: md(247,370) → (177,262) -->
          <g class="svc-marker" onclick="svcCityTip('Jaipur','Hospitality · Heritage · Real Estate')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Jaipur — Hospitality, Heritage, Real Estate">
            <circle cx="177" cy="262" r="11" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="11"/>
            <circle cx="177" cy="262" r="6.5" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="162" y="255" text-anchor="end" font-family="DM Sans,sans-serif" font-size="9" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Jaipur</text>
          </g>

          <!-- Bengaluru: md(304,884) → (218,627) -->
          <g class="svc-marker" onclick="svcCityTip('Bengaluru','Real Estate · HORECA · Retail')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Bengaluru — Real Estate, HORECA, Retail">
            <circle cx="218" cy="627" r="12" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="12"/>
            <circle cx="218" cy="627" r="7.5" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="232" y="631" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Bengaluru</text>
          </g>

          <!-- Hyderabad: md(333,719) → (238,510) -->
          <g class="svc-marker" onclick="svcCityTip('Hyderabad','Real Estate · Hospitality')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Hyderabad — Real Estate, Hospitality">
            <circle cx="238" cy="510" r="11" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="11"/>
            <circle cx="238" cy="510" r="6.5" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="252" y="514" font-family="DM Sans,sans-serif" font-size="9" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Hyderabad</text>
          </g>
        </svg>
        <p style="font-size:.58rem;color:rgba(255,255,255,.3);font-family:'DM Sans',sans-serif;text-align:center;margin-top:.5rem;">J&amp;K shown per India's official territorial claim (Survey of India) · Click a marker for details</p>
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

        <!-- Tooltip box — updated by svcCityTip() on marker click -->
        <div id="svcMapTip" style="display:none;margin-top:1.25rem;padding:1rem;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.3);">
          <p id="svcTipCity" style="font-size:.88rem;font-weight:700;color:#fff;margin-bottom:.25rem;"></p>
          <p id="svcTipVerticals" style="font-size:.7rem;color:var(--gold);"></p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
/* Services India Map — accurate state geometry */
.svc-state { transition: opacity 0.2s; }
.svc-state:hover { opacity: 0.85; }
.svc-pulse { animation: svcPulse 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes svcPulse {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50%       { opacity: 0.05; transform: scale(1.35); }
}
.svc-marker:hover > circle:nth-child(2),
.svc-marker:focus > circle:nth-child(2) {
  filter: brightness(1.35) drop-shadow(0 0 7px rgba(184,150,12,0.75));
}
</style>
<script>
function svcCityTip(city, verticals) {
  var tip  = document.getElementById('svcMapTip');
  var cEl  = document.getElementById('svcTipCity');
  var vEl  = document.getElementById('svcTipVerticals');
  if (tip && cEl && vEl) {
    cEl.textContent = city;
    vEl.textContent = verticals;
    tip.style.display = 'block';
  }
}
// keyboard accessibility
document.querySelectorAll('.svc-marker').forEach(function(g) {
  g.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { g.dispatchEvent(new MouseEvent('click')); }
  });
});
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
