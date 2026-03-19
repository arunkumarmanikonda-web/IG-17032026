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
      { v:'30+',      l:'Active retail brand relationships across fashion, F&B, entertainment and anchor categories' },
      { v:'₹2,100 Cr', l:'Sawasdee JLG Galleria, Noida — Anchor leasing advisory, 12,000 sq ft retail + 114-key hotel, active mandate' },
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

                    <!-- ── STATE PATHS — accurate India geometry from GADM/Survey of India ── -->
                    <!-- Disputed -->
                    <path d="M 259.0,699.7 L 259.1,699.7 L 259.3,699.8 L 259.2,699.9 L 259.0,699.8 L 258.8,699.7 L 258.7,699.8 L 258.6,699.7 L 258.8,699.6 L 259.0,699.7 Z"
                          fill="#4a8045" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-dasharray="4,3"
                          class="svc-state" data-state="Disputed"/>
                    <!-- Chandigarh -->
                    <path d="M 209.2,177.4 L 209.3,179.5 L 207.4,179.0 L 209.2,177.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Chandigarh"/>
                    <!-- Delhi -->
                    <path d="M 217.8,223.6 L 218.3,225.9 L 220.2,227.7 L 220.7,229.7 L 220.5,232.3 L 218.6,232.8 L 216.7,234.1 L 214.9,232.0 L 213.0,231.6 L 210.5,232.3 L 210.2,230.2 L 212.0,228.3 L 211.8,225.6 L 214.1,224.2 L 216.0,223.8 L 217.8,223.6 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Delhi"/>
                    <!-- Himachal Pradesh -->
                    <path d="M 243.7,135.3 L 245.3,137.7 L 245.5,141.3 L 247.1,143.7 L 249.6,147.2 L 251.5,148.4 L 251.2,150.4 L 250.8,152.4 L 250.7,154.4 L 252.9,156.9 L 250.7,159.9 L 252.1,162.3 L 251.7,164.6 L 254.0,165.2 L 255.9,166.5 L 257.3,168.7 L 254.5,169.3 L 252.8,167.2 L 250.5,167.0 L 248.7,166.7 L 246.8,166.9 L 244.9,165.8 L 243.0,165.3 L 240.5,166.0 L 237.9,167.1 L 236.0,168.1 L 234.0,168.1 L 231.1,171.0 L 229.9,173.0 L 230.6,175.3 L 228.8,177.3 L 229.6,179.6 L 230.1,181.5 L 231.3,183.6 L 228.4,185.4 L 226.5,185.9 L 224.6,186.1 L 222.4,185.9 L 220.0,185.3 L 218.0,185.0 L 216.3,183.0 L 216.5,181.1 L 215.8,179.0 L 213.6,177.8 L 212.0,175.6 L 209.9,174.7 L 207.2,173.7 L 205.1,171.9 L 205.0,169.7 L 204.6,167.6 L 203.9,165.5 L 201.9,165.2 L 199.5,162.1 L 197.7,164.0 L 195.7,164.9 L 194.1,161.9 L 192.8,158.6 L 190.0,153.6 L 189.7,150.3 L 186.9,147.9 L 184.8,146.8 L 182.5,146.4 L 183.6,144.2 L 182.7,142.2 L 184.5,141.5 L 186.4,139.9 L 189.2,138.1 L 188.4,136.0 L 189.0,133.6 L 189.2,131.3 L 189.3,129.4 L 187.4,127.0 L 189.3,125.7 L 192.4,124.6 L 194.6,123.1 L 196.5,122.3 L 197.7,120.3 L 200.0,119.1 L 202.6,118.6 L 204.8,119.1 L 207.6,119.1 L 209.5,120.8 L 211.7,122.8 L 215.2,125.1 L 218.1,126.2 L 221.0,127.1 L 223.1,126.5 L 225.2,125.8 L 227.1,124.6 L 229.0,123.5 L 231.5,126.0 L 233.0,128.6 L 233.9,130.8 L 235.2,133.1 L 237.0,132.6 L 239.3,131.4 L 241.3,130.8 L 243.1,129.4 L 243.7,131.9 L 242.0,133.8 L 241.3,135.8 L 243.3,135.6 L 243.7,135.3 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Himachal Pradesh"/>
                    <!-- Haryana -->
                    <path d="M 226.2,187.2 L 225.9,189.7 L 223.1,192.3 L 220.8,194.8 L 218.6,196.9 L 217.3,201.2 L 216.3,203.2 L 215.4,205.1 L 214.6,207.2 L 215.7,209.3 L 216.3,211.3 L 216.5,213.3 L 216.4,217.5 L 217.1,219.7 L 217.8,222.0 L 216.7,224.0 L 214.8,223.5 L 212.8,224.3 L 212.0,226.9 L 211.4,229.3 L 209.6,230.8 L 212.5,232.0 L 214.9,232.0 L 216.7,234.1 L 218.5,234.1 L 220.5,232.3 L 222.5,233.6 L 224.3,235.3 L 224.1,237.6 L 224.8,239.6 L 224.2,241.8 L 223.6,243.7 L 225.0,246.0 L 223.2,247.5 L 221.1,248.4 L 218.9,249.3 L 217.1,249.4 L 214.7,249.4 L 213.4,251.4 L 211.3,252.8 L 211.4,249.3 L 212.0,247.2 L 211.9,245.1 L 211.6,243.2 L 211.8,241.0 L 210.0,239.2 L 208.0,241.0 L 206.2,242.3 L 205.8,244.3 L 203.8,245.4 L 202.0,243.8 L 201.0,241.9 L 199.2,241.0 L 198.9,243.0 L 196.8,242.9 L 195.0,243.1 L 194.9,245.1 L 195.2,247.0 L 195.9,249.0 L 193.9,248.4 L 191.3,248.7 L 189.6,246.4 L 190.9,244.4 L 191.9,242.3 L 190.1,242.3 L 191.8,240.3 L 190.3,236.5 L 188.5,235.0 L 186.7,234.5 L 184.6,232.3 L 183.0,230.2 L 181.4,226.6 L 180.8,224.7 L 180.0,222.4 L 179.4,220.2 L 177.9,218.1 L 178.1,216.1 L 176.6,213.8 L 174.7,214.5 L 172.8,214.4 L 170.8,214.9 L 169.0,213.9 L 167.7,211.9 L 165.7,210.9 L 163.9,211.8 L 162.1,211.8 L 160.2,211.7 L 159.0,209.8 L 160.7,207.8 L 160.1,204.4 L 160.5,202.3 L 158.7,202.7 L 157.8,200.7 L 158.8,198.8 L 161.2,198.5 L 163.0,197.1 L 165.0,196.8 L 167.1,197.5 L 168.9,199.4 L 170.8,199.1 L 172.2,201.2 L 174.3,202.1 L 173.0,204.1 L 174.1,206.0 L 175.9,206.6 L 176.3,204.6 L 178.2,202.2 L 180.5,201.6 L 182.5,202.1 L 184.6,202.1 L 186.5,200.5 L 188.5,202.1 L 190.3,202.8 L 192.3,202.3 L 194.1,200.8 L 196.0,199.8 L 195.2,197.8 L 195.9,195.7 L 195.8,193.7 L 197.6,193.8 L 199.4,193.7 L 201.3,194.0 L 204.2,193.4 L 205.3,191.5 L 203.5,191.1 L 205.3,189.4 L 207.3,188.0 L 207.8,186.1 L 209.8,186.2 L 211.3,184.2 L 211.1,182.1 L 210.1,180.1 L 209.3,178.1 L 209.6,176.1 L 208.8,174.0 L 210.6,174.7 L 212.4,176.6 L 214.3,178.1 L 216.1,179.3 L 216.6,181.7 L 217.8,184.3 L 219.8,185.2 L 221.7,186.1 L 223.5,186.3 L 226.2,187.2 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Haryana"/>
                    <!-- J&amp;K + Ladakh -->
                    <path d="M 243.7,135.3 L 241.8,136.6 L 241.8,134.2 L 243.6,132.4 L 243.7,130.4 L 241.5,130.6 L 239.6,131.3 L 237.7,132.0 L 235.5,133.3 L 234.0,131.3 L 233.7,129.3 L 232.2,126.9 L 230.2,124.8 L 228.2,123.9 L 226.1,125.3 L 224.3,126.0 L 222.0,126.5 L 218.1,126.2 L 216.3,125.6 L 213.3,123.7 L 211.2,122.1 L 208.2,119.4 L 205.1,119.3 L 203.2,118.2 L 200.0,119.1 L 197.7,120.3 L 196.5,122.3 L 194.6,123.1 L 192.4,124.6 L 190.3,126.2 L 188.4,125.3 L 188.1,127.8 L 189.4,129.8 L 189.6,132.3 L 188.3,134.5 L 185.6,136.8 L 182.7,138.5 L 180.3,140.8 L 178.4,139.7 L 176.4,139.8 L 174.3,138.8 L 172.0,138.1 L 169.8,136.8 L 167.2,137.3 L 164.8,136.6 L 162.4,136.7 L 161.2,134.3 L 161.7,132.1 L 161.7,130.0 L 162.3,128.0 L 160.3,129.7 L 158.3,130.0 L 156.5,129.1 L 154.5,129.3 L 154.6,127.0 L 154.3,124.6 L 151.4,123.3 L 149.4,121.3 L 147.3,119.6 L 147.3,117.3 L 149.1,116.3 L 150.2,113.7 L 150.3,110.6 L 147.7,109.0 L 146.4,106.4 L 147.4,104.3 L 150.3,103.4 L 152.5,102.1 L 152.9,99.8 L 150.6,99.6 L 148.7,99.3 L 146.7,99.5 L 144.9,98.3 L 145.4,96.4 L 147.2,94.9 L 146.2,92.7 L 144.0,92.2 L 142.4,90.1 L 143.8,87.7 L 145.6,85.3 L 149.9,83.0 L 152.1,81.6 L 154.9,81.0 L 161.9,83.0 L 169.6,84.4 L 171.7,84.4 L 173.9,84.1 L 176.0,85.8 L 182.7,87.6 L 185.0,87.4 L 186.8,87.4 L 189.9,84.9 L 191.8,83.3 L 193.9,83.7 L 197.0,83.1 L 200.1,81.5 L 202.8,82.0 L 205.3,81.7 L 207.7,79.8 L 208.0,77.5 L 210.0,76.9 L 211.8,77.2 L 214.0,75.4 L 213.8,73.4 L 222.7,68.2 L 231.0,63.5 L 232.8,65.0 L 235.0,63.5 L 236.2,65.9 L 235.3,69.0 L 238.2,74.1 L 238.6,76.9 L 240.0,79.1 L 241.4,83.7 L 243.7,85.7 L 248.7,86.5 L 251.9,88.3 L 253.8,90.1 L 255.7,90.7 L 257.0,92.7 L 255.2,95.8 L 253.1,96.7 L 251.2,99.8 L 252.3,102.7 L 252.9,105.9 L 252.5,110.5 L 253.5,112.7 L 255.5,114.5 L 257.2,116.6 L 259.0,117.5 L 260.8,118.4 L 263.2,119.5 L 265.7,119.9 L 265.0,122.3 L 264.8,124.9 L 266.9,127.4 L 267.9,129.4 L 268.3,131.7 L 264.8,135.1 L 263.0,136.1 L 260.9,136.1 L 259.4,138.6 L 257.2,139.3 L 254.8,139.0 L 252.3,136.9 L 251.6,134.9 L 251.6,132.9 L 249.6,133.9 L 245.2,134.4 L 243.7,135.3 Z"
                          fill="#4a8045" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-dasharray="4,3"
                          class="svc-state" data-state="J&amp;K + Ladakh"/>
                    <!-- Andhra Pradesh -->
                    <path d="M 300.8,541.2 L 298.6,539.7 L 300.8,540.1 L 300.8,541.2 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andhra Pradesh"/>
                    <!-- Andhra Pradesh -->
                    <path d="M 285.4,469.5 L 286.6,471.5 L 288.4,472.5 L 290.5,472.3 L 292.3,473.6 L 294.1,475.9 L 295.3,478.2 L 296.4,480.5 L 295.6,482.5 L 297.4,481.7 L 299.7,483.1 L 300.0,485.2 L 300.9,487.3 L 301.1,490.6 L 303.3,491.6 L 305.1,490.8 L 307.5,491.5 L 310.2,491.5 L 312.0,491.9 L 314.2,491.7 L 316.7,490.3 L 319.6,488.3 L 321.8,486.8 L 324.4,485.7 L 326.4,485.8 L 328.2,486.8 L 330.5,485.7 L 331.1,483.7 L 330.3,481.8 L 331.4,479.7 L 331.6,477.5 L 332.5,475.5 L 334.4,474.4 L 334.8,476.6 L 336.5,478.5 L 336.2,480.5 L 338.0,480.2 L 340.2,478.6 L 340.8,476.5 L 342.8,476.8 L 345.2,477.7 L 346.2,475.6 L 347.2,473.6 L 346.1,471.6 L 347.6,469.2 L 349.5,468.6 L 351.5,468.0 L 353.6,466.5 L 352.7,464.3 L 354.8,463.4 L 355.5,461.1 L 357.4,461.3 L 358.8,459.4 L 360.6,461.7 L 361.5,463.9 L 363.5,463.5 L 364.2,465.7 L 366.4,467.2 L 368.7,467.0 L 370.6,467.5 L 373.1,467.3 L 374.9,467.0 L 376.2,464.9 L 377.8,462.9 L 379.8,461.1 L 381.7,460.1 L 383.9,458.7 L 383.9,460.8 L 383.0,463.1 L 379.6,467.5 L 377.4,470.3 L 375.7,472.3 L 373.9,474.0 L 372.6,476.0 L 370.7,477.7 L 369.3,480.2 L 362.6,483.4 L 359.0,485.7 L 357.4,487.8 L 355.5,488.7 L 354.9,490.7 L 353.0,493.6 L 351.0,493.6 L 351.1,495.6 L 349.3,497.4 L 347.4,498.1 L 345.4,499.5 L 343.2,501.0 L 341.0,501.7 L 333.9,506.0 L 332.0,507.9 L 330.4,509.8 L 329.0,512.7 L 330.2,514.6 L 331.1,512.0 L 331.6,514.3 L 331.2,516.8 L 331.0,518.7 L 330.0,520.9 L 328.0,522.8 L 326.2,523.6 L 324.3,524.4 L 322.5,525.3 L 320.5,526.1 L 318.3,527.3 L 316.3,527.3 L 314.3,526.9 L 312.3,526.4 L 310.5,525.9 L 308.4,526.3 L 307.1,528.6 L 305.6,531.8 L 305.0,533.8 L 304.7,535.9 L 302.4,537.7 L 301.7,539.7 L 299.7,539.0 L 299.5,536.0 L 298.2,539.4 L 297.5,541.7 L 297.1,539.0 L 294.6,537.6 L 292.6,538.0 L 290.3,539.0 L 288.1,540.1 L 285.6,542.4 L 284.3,545.6 L 283.8,547.7 L 282.2,550.0 L 281.4,552.0 L 281.2,554.4 L 280.6,557.1 L 280.8,560.0 L 281.7,565.0 L 282.7,567.3 L 283.3,569.2 L 283.3,572.2 L 283.4,574.2 L 282.4,577.0 L 280.6,578.2 L 282.4,578.0 L 282.2,579.9 L 282.7,582.9 L 284.7,587.4 L 284.8,589.5 L 284.7,591.8 L 285.8,595.0 L 283.8,592.2 L 282.5,590.1 L 282.5,592.0 L 280.6,592.7 L 281.6,594.8 L 284.3,595.9 L 282.4,596.6 L 280.5,594.8 L 279.1,597.0 L 278.5,598.9 L 276.6,600.0 L 274.7,600.6 L 272.7,602.1 L 270.6,601.0 L 268.5,599.6 L 266.7,601.4 L 265.1,603.7 L 263.2,604.1 L 261.3,606.4 L 259.4,606.9 L 257.6,606.2 L 255.7,606.0 L 253.3,605.9 L 251.3,606.4 L 249.5,608.1 L 248.8,611.4 L 248.1,613.3 L 246.3,614.0 L 245.2,616.4 L 243.1,616.4 L 240.4,613.5 L 240.6,611.5 L 242.5,611.1 L 245.1,611.0 L 244.5,609.0 L 245.5,607.0 L 246.8,604.6 L 247.8,602.6 L 247.8,600.7 L 245.6,600.2 L 243.7,599.9 L 243.3,598.0 L 243.4,595.9 L 243.5,593.9 L 241.5,593.5 L 239.5,593.2 L 237.6,591.8 L 237.2,589.7 L 237.3,587.7 L 235.4,586.8 L 233.6,587.7 L 234.0,585.6 L 232.2,585.4 L 230.3,585.4 L 229.9,587.3 L 228.1,589.3 L 226.2,589.9 L 224.3,590.7 L 222.7,588.7 L 220.7,587.2 L 218.8,586.8 L 216.9,586.6 L 216.2,588.8 L 214.3,589.7 L 212.5,589.2 L 212.8,587.0 L 212.9,584.7 L 211.8,582.6 L 210.5,580.2 L 212.3,579.4 L 213.0,581.5 L 214.9,582.6 L 217.0,583.4 L 218.9,583.0 L 220.6,585.0 L 221.0,583.1 L 221.2,581.0 L 223.2,579.3 L 223.4,577.3 L 221.6,575.5 L 221.9,577.4 L 220.0,576.5 L 217.9,575.6 L 216.0,575.3 L 215.1,577.4 L 213.3,577.6 L 211.3,577.3 L 210.4,575.3 L 211.4,573.2 L 209.6,571.9 L 207.8,569.8 L 207.7,567.4 L 208.0,565.0 L 209.3,562.8 L 209.3,560.9 L 207.3,559.8 L 207.7,557.8 L 210.3,558.4 L 212.2,558.9 L 214.1,559.2 L 215.7,557.0 L 216.1,554.7 L 215.6,551.9 L 213.8,550.5 L 213.3,548.6 L 213.5,545.6 L 213.7,543.6 L 214.5,541.5 L 214.0,539.4 L 214.9,537.1 L 216.9,536.0 L 218.9,536.0 L 222.8,536.2 L 223.9,534.0 L 223.9,531.2 L 224.1,529.1 L 225.5,527.1 L 222.3,526.0 L 219.8,525.3 L 220.9,522.8 L 222.7,521.0 L 222.7,518.9 L 222.5,516.3 L 222.8,512.5 L 223.6,510.4 L 222.7,507.7 L 221.6,505.6 L 224.3,501.9 L 226.1,499.9 L 228.3,497.6 L 226.5,497.7 L 224.6,497.0 L 222.7,496.2 L 223.5,493.7 L 224.8,491.7 L 227.0,488.6 L 226.8,486.4 L 225.7,484.4 L 225.9,481.4 L 225.4,479.3 L 224.4,477.3 L 225.5,475.4 L 226.6,473.3 L 228.4,472.9 L 228.8,470.9 L 230.7,469.5 L 231.6,467.5 L 233.4,466.5 L 231.8,464.6 L 230.1,462.6 L 230.7,460.6 L 231.7,458.5 L 232.9,456.0 L 235.0,454.7 L 237.0,456.2 L 238.8,456.3 L 239.1,454.0 L 240.0,451.9 L 241.9,451.0 L 242.1,448.7 L 242.9,446.7 L 244.2,444.8 L 242.6,442.3 L 244.4,442.6 L 246.3,443.1 L 248.2,442.9 L 250.3,443.4 L 252.5,443.8 L 254.6,446.9 L 256.6,448.3 L 258.4,448.4 L 261.2,446.9 L 263.2,448.3 L 265.1,448.5 L 268.4,449.6 L 270.2,450.3 L 273.0,448.3 L 274.9,448.2 L 276.4,450.2 L 278.2,451.3 L 278.5,453.7 L 278.2,455.7 L 278.0,457.9 L 276.6,459.9 L 278.4,463.3 L 278.6,465.4 L 278.7,467.5 L 280.7,468.9 L 283.2,470.1 L 285.0,469.8 L 285.4,469.5 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andhra Pradesh"/>
                    <!-- Kerala -->
                    <path d="M 200.4,640.0 L 198.3,641.9 L 196.4,641.8 L 196.5,643.8 L 200.3,645.5 L 202.2,646.9 L 201.7,649.6 L 203.9,651.2 L 205.7,651.0 L 207.3,653.2 L 208.1,655.3 L 206.3,655.5 L 206.5,657.8 L 209.3,659.1 L 210.7,661.0 L 210.6,663.5 L 209.5,667.0 L 209.1,669.0 L 209.6,671.0 L 210.0,673.0 L 211.9,674.7 L 213.8,674.1 L 216.2,672.5 L 218.5,673.2 L 219.3,675.2 L 218.3,678.5 L 219.0,681.2 L 218.3,683.2 L 218.5,685.3 L 217.4,689.7 L 220.1,690.5 L 222.1,692.4 L 221.3,694.4 L 220.2,697.2 L 218.9,701.5 L 218.0,703.7 L 217.5,706.4 L 218.9,708.4 L 217.6,711.3 L 217.5,713.5 L 219.4,715.5 L 217.8,717.5 L 217.3,719.8 L 215.8,721.8 L 213.2,719.8 L 210.7,716.1 L 209.2,714.2 L 207.6,712.2 L 205.8,709.4 L 203.6,707.2 L 204.6,705.1 L 202.8,705.4 L 202.0,703.2 L 201.5,701.2 L 200.7,698.6 L 201.1,700.6 L 199.3,696.7 L 198.1,692.6 L 197.7,689.2 L 197.4,684.9 L 196.7,682.9 L 198.8,687.6 L 198.7,685.4 L 198.6,683.4 L 199.2,685.6 L 199.6,687.7 L 199.1,691.6 L 200.9,692.2 L 200.5,690.1 L 200.4,688.0 L 199.7,685.7 L 199.8,683.7 L 198.3,681.4 L 197.3,679.5 L 196.2,677.5 L 196.4,679.7 L 195.3,677.7 L 196.2,675.6 L 194.3,674.0 L 193.9,672.0 L 192.8,669.9 L 192.5,667.9 L 191.3,665.7 L 189.9,662.8 L 189.3,660.8 L 188.7,657.8 L 187.6,653.7 L 185.6,648.6 L 184.5,645.9 L 182.7,644.4 L 182.2,642.5 L 180.9,639.3 L 177.6,635.2 L 177.6,633.2 L 175.7,632.4 L 175.9,630.2 L 178.0,628.8 L 176.0,628.8 L 174.2,629.5 L 173.8,631.6 L 172.4,628.0 L 172.3,626.1 L 169.7,621.9 L 168.7,619.7 L 166.6,614.4 L 168.4,614.4 L 170.3,614.9 L 172.1,616.7 L 173.9,617.2 L 175.1,619.2 L 176.9,620.4 L 176.7,622.3 L 177.6,624.3 L 181.1,627.9 L 182.9,629.0 L 184.7,630.1 L 186.8,632.3 L 188.7,633.3 L 190.9,633.6 L 192.8,632.8 L 193.1,634.9 L 195.0,635.2 L 196.8,636.6 L 198.6,638.2 L 200.4,640.0 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Kerala"/>
                    <!-- Odisha -->
                    <path d="M 426.8,384.7 L 428.8,386.3 L 430.6,387.1 L 432.4,387.7 L 433.8,389.7 L 434.4,392.3 L 436.2,390.7 L 438.2,391.4 L 438.7,393.6 L 442.7,395.2 L 443.0,397.2 L 444.1,399.3 L 441.2,400.6 L 439.3,400.6 L 436.2,401.9 L 431.8,406.3 L 430.0,410.0 L 430.2,412.2 L 432.6,417.9 L 431.2,419.9 L 433.2,420.1 L 433.5,422.2 L 428.7,426.0 L 427.6,427.9 L 429.5,428.4 L 428.2,430.4 L 425.5,432.7 L 423.4,433.4 L 421.9,435.7 L 420.3,437.9 L 417.7,436.8 L 415.4,435.9 L 417.6,437.7 L 419.5,439.1 L 417.6,440.5 L 414.1,441.9 L 411.9,442.3 L 409.2,443.2 L 407.4,443.9 L 405.3,444.4 L 403.3,445.2 L 400.2,446.4 L 402.3,444.6 L 402.2,441.4 L 400.1,440.8 L 397.8,442.3 L 396.0,443.5 L 394.1,445.5 L 393.2,447.4 L 392.0,449.6 L 394.1,450.1 L 394.7,448.0 L 397.3,446.2 L 397.3,448.1 L 402.3,445.9 L 399.8,447.3 L 398.0,448.2 L 395.9,449.6 L 393.5,451.1 L 391.1,453.6 L 386.8,457.3 L 385.0,459.7 L 383.2,458.7 L 380.0,461.0 L 378.0,461.7 L 377.8,463.7 L 376.0,465.2 L 374.5,467.2 L 371.6,467.7 L 369.6,467.2 L 367.5,467.2 L 365.4,467.3 L 364.0,464.9 L 363.1,462.6 L 361.1,462.5 L 359.6,460.5 L 357.7,461.1 L 355.7,460.8 L 355.5,462.8 L 353.6,462.7 L 353.2,464.9 L 352.8,466.9 L 349.9,468.8 L 347.9,468.8 L 346.1,471.3 L 346.5,473.5 L 346.2,475.6 L 346.1,477.5 L 344.3,478.2 L 342.5,476.8 L 340.7,476.7 L 339.6,478.9 L 337.8,480.9 L 336.6,478.9 L 334.9,476.8 L 334.6,474.8 L 332.7,475.2 L 331.6,477.2 L 331.4,479.5 L 330.4,481.5 L 331.3,483.6 L 330.8,485.7 L 328.8,486.9 L 326.8,486.1 L 324.4,485.7 L 322.6,486.7 L 319.6,488.3 L 317.8,489.2 L 315.9,490.4 L 313.8,491.5 L 311.8,491.9 L 310.0,491.2 L 311.3,489.1 L 312.1,486.9 L 312.5,485.0 L 313.0,482.9 L 313.4,480.4 L 315.6,479.7 L 317.4,478.4 L 318.9,476.1 L 321.0,474.1 L 321.6,472.0 L 323.0,470.0 L 325.0,469.3 L 326.8,467.7 L 327.1,465.8 L 328.4,462.7 L 327.9,460.6 L 327.2,458.5 L 326.8,456.3 L 326.6,454.2 L 326.8,452.3 L 325.0,450.5 L 324.2,448.2 L 324.2,446.2 L 324.3,444.3 L 322.5,443.1 L 320.1,440.9 L 320.4,437.5 L 322.3,435.8 L 323.8,437.8 L 325.6,437.2 L 327.5,438.9 L 329.9,442.3 L 331.7,441.2 L 334.0,441.5 L 335.9,442.1 L 336.2,444.0 L 338.0,442.8 L 338.5,440.7 L 338.8,438.4 L 336.9,438.7 L 334.7,437.9 L 332.6,436.8 L 333.0,434.5 L 332.9,432.5 L 332.6,430.5 L 332.8,428.0 L 331.0,425.6 L 331.3,423.3 L 331.4,421.3 L 331.0,417.6 L 332.8,418.2 L 334.8,416.0 L 336.9,413.6 L 337.6,411.7 L 340.0,410.3 L 342.0,410.3 L 344.7,409.9 L 346.5,410.9 L 348.3,411.3 L 350.5,408.2 L 351.2,406.2 L 353.1,406.0 L 353.0,403.7 L 352.9,401.6 L 355.3,396.8 L 355.8,394.8 L 357.7,394.1 L 358.1,392.0 L 356.9,389.5 L 357.5,387.5 L 358.8,385.2 L 361.4,383.8 L 363.5,382.0 L 365.7,381.2 L 367.5,379.0 L 366.9,376.9 L 369.0,377.9 L 370.4,380.0 L 372.4,381.3 L 374.4,382.2 L 376.5,382.0 L 378.3,381.1 L 383.7,379.7 L 385.6,379.2 L 387.5,379.8 L 390.4,378.3 L 391.8,380.5 L 391.7,382.7 L 390.4,384.7 L 389.5,386.7 L 391.3,387.1 L 393.7,388.6 L 395.7,387.9 L 397.9,386.4 L 399.7,386.2 L 401.7,387.4 L 404.0,387.9 L 406.0,387.5 L 406.8,389.5 L 408.9,390.1 L 410.8,387.9 L 411.2,385.9 L 410.9,383.6 L 411.3,380.5 L 410.2,378.3 L 412.1,376.7 L 413.9,377.9 L 417.5,379.8 L 419.7,382.0 L 422.0,381.9 L 424.9,383.4 L 426.8,384.7 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Odisha"/>
                    <!-- Karnataka -->
                    <path d="M 225.4,479.3 L 225.9,481.4 L 226.5,483.7 L 226.4,485.7 L 227.1,487.8 L 225.6,489.9 L 224.9,491.9 L 223.3,494.3 L 223.4,496.5 L 225.4,497.1 L 227.5,497.3 L 226.3,499.3 L 224.5,501.4 L 221.6,505.6 L 222.7,507.5 L 223.6,510.0 L 222.9,512.0 L 222.8,515.5 L 222.3,517.6 L 223.1,519.6 L 221.9,521.5 L 220.1,523.4 L 222.0,526.0 L 224.2,526.0 L 225.0,528.1 L 224.1,530.1 L 224.0,532.5 L 223.9,535.1 L 220.1,536.2 L 218.3,535.8 L 216.5,536.1 L 214.0,538.2 L 213.8,540.4 L 215.0,542.6 L 213.5,545.6 L 212.9,547.7 L 213.8,550.5 L 215.6,551.9 L 216.1,554.7 L 215.8,556.8 L 214.5,559.0 L 212.7,558.6 L 210.7,558.4 L 208.4,557.2 L 207.5,559.1 L 209.3,560.9 L 209.3,562.8 L 208.2,564.8 L 207.8,566.8 L 207.6,568.7 L 209.0,570.9 L 210.9,571.8 L 211.0,573.7 L 210.7,575.7 L 212.6,577.6 L 214.7,578.0 L 215.5,576.0 L 217.4,575.6 L 219.2,576.2 L 221.1,577.6 L 221.3,575.6 L 223.2,576.5 L 223.6,578.5 L 221.8,579.4 L 220.6,582.0 L 221.5,584.0 L 222.1,586.1 L 220.1,584.2 L 217.3,583.4 L 215.4,583.2 L 213.4,582.2 L 212.7,579.8 L 210.7,579.5 L 211.8,581.6 L 212.2,583.6 L 213.5,585.6 L 212.4,587.6 L 212.6,589.5 L 214.5,589.5 L 216.0,587.5 L 217.8,586.3 L 219.8,587.2 L 221.8,587.2 L 223.0,589.5 L 224.8,590.2 L 226.6,589.0 L 228.4,588.4 L 230.4,587.0 L 230.6,585.1 L 232.7,585.6 L 233.5,587.5 L 235.4,586.8 L 237.3,587.7 L 237.2,589.7 L 236.8,591.8 L 239.1,592.9 L 240.9,593.6 L 242.8,593.5 L 243.4,595.7 L 243.3,597.7 L 243.7,599.9 L 245.6,600.2 L 247.5,600.5 L 247.8,602.5 L 246.8,604.6 L 245.7,606.6 L 244.5,609.0 L 245.6,611.0 L 243.6,609.9 L 241.8,611.4 L 240.4,613.5 L 238.3,612.8 L 236.2,611.4 L 234.2,611.7 L 231.9,610.8 L 230.4,612.8 L 229.7,614.9 L 227.7,615.4 L 225.9,617.8 L 226.0,619.9 L 226.6,622.1 L 225.0,624.5 L 223.9,626.8 L 228.0,627.0 L 230.2,628.8 L 229.1,631.0 L 227.7,632.9 L 224.7,633.4 L 223.0,636.1 L 221.1,637.2 L 219.3,636.4 L 217.1,636.7 L 215.1,637.8 L 213.3,636.1 L 211.3,636.8 L 209.9,639.1 L 209.3,641.0 L 204.6,640.9 L 202.4,638.7 L 200.6,639.8 L 198.6,638.2 L 196.8,636.6 L 195.0,635.2 L 193.2,635.0 L 193.0,632.9 L 190.9,633.6 L 188.7,633.3 L 186.8,632.3 L 186.0,630.3 L 184.0,629.5 L 182.1,628.4 L 179.0,625.2 L 177.4,623.2 L 177.1,621.1 L 175.3,619.7 L 175.2,617.4 L 173.4,617.5 L 171.5,616.5 L 169.5,615.3 L 168.1,613.3 L 166.1,613.4 L 166.6,611.4 L 164.2,606.5 L 164.0,604.3 L 163.4,601.4 L 162.8,599.3 L 162.3,597.0 L 162.1,595.0 L 162.1,592.7 L 162.4,590.5 L 160.8,587.5 L 159.4,584.9 L 158.1,582.8 L 157.6,579.7 L 156.7,577.7 L 156.3,575.2 L 155.8,573.3 L 155.0,571.3 L 153.7,569.4 L 153.0,566.6 L 151.2,565.6 L 149.3,564.4 L 151.1,562.8 L 149.2,562.1 L 151.2,561.2 L 152.9,559.1 L 152.9,557.0 L 153.6,555.0 L 153.4,553.0 L 153.7,551.1 L 152.9,549.0 L 152.9,546.8 L 152.5,544.5 L 150.6,543.8 L 150.2,541.7 L 152.0,541.7 L 153.9,541.5 L 155.4,539.4 L 155.6,537.4 L 156.7,535.3 L 155.8,533.3 L 157.6,532.5 L 157.7,530.3 L 155.3,528.0 L 154.0,526.0 L 154.1,524.1 L 152.2,523.4 L 154.1,521.6 L 156.0,521.0 L 158.5,520.0 L 160.7,520.9 L 162.0,518.9 L 163.9,517.1 L 165.9,516.8 L 166.0,514.8 L 167.8,513.3 L 170.2,512.1 L 172.2,513.9 L 174.6,513.4 L 176.4,511.8 L 178.6,511.3 L 180.5,511.6 L 182.5,511.5 L 183.0,509.5 L 182.7,507.4 L 182.9,505.4 L 181.9,503.3 L 181.6,501.3 L 183.2,499.4 L 185.3,500.8 L 187.2,501.1 L 189.0,502.4 L 191.2,502.5 L 193.4,501.8 L 195.4,501.7 L 197.7,502.3 L 199.5,502.0 L 198.6,500.0 L 198.6,498.1 L 198.4,496.0 L 200.3,495.1 L 201.8,493.1 L 203.9,492.4 L 205.8,493.8 L 206.8,491.8 L 207.7,489.8 L 209.5,489.6 L 210.7,487.4 L 211.0,484.8 L 211.4,482.7 L 213.3,482.5 L 215.1,482.1 L 217.2,479.6 L 218.3,477.5 L 220.2,475.7 L 220.8,477.8 L 222.7,479.1 L 224.5,479.1 L 225.4,479.3 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Karnataka"/>
                    <!-- Maharashtra -->
                    <path d="M 294.4,405.7 L 293.5,408.1 L 291.5,409.2 L 289.7,410.6 L 289.3,412.7 L 289.1,414.7 L 291.0,415.7 L 291.7,419.5 L 292.1,421.5 L 290.3,423.6 L 292.2,423.5 L 293.1,425.4 L 292.9,428.7 L 292.5,430.7 L 290.6,432.0 L 288.8,432.7 L 288.6,434.8 L 290.6,435.0 L 291.7,437.2 L 291.3,439.7 L 289.4,439.9 L 290.1,441.9 L 288.9,443.9 L 290.8,442.8 L 292.1,445.0 L 293.9,445.7 L 294.6,447.9 L 296.5,448.7 L 298.8,450.3 L 298.6,452.4 L 297.7,454.5 L 295.7,455.8 L 293.8,454.8 L 291.6,453.2 L 289.8,454.9 L 288.1,456.9 L 287.6,458.9 L 285.8,462.1 L 285.7,464.5 L 287.1,466.7 L 285.2,468.2 L 283.2,470.1 L 281.4,469.9 L 279.4,467.8 L 277.6,466.8 L 278.6,464.1 L 278.2,461.7 L 276.4,460.6 L 278.2,458.5 L 277.9,456.5 L 278.4,454.5 L 278.7,452.6 L 277.4,450.6 L 275.3,448.7 L 273.2,448.1 L 271.4,448.8 L 269.6,450.0 L 266.6,449.6 L 263.2,448.3 L 261.2,446.9 L 258.8,447.6 L 257.0,448.7 L 254.9,447.2 L 254.0,445.1 L 251.6,443.8 L 248.9,442.8 L 247.1,442.6 L 244.5,442.7 L 242.6,441.0 L 243.3,444.2 L 243.1,446.4 L 242.1,448.7 L 242.1,450.7 L 240.2,451.7 L 239.1,453.7 L 239.3,455.8 L 237.5,456.0 L 235.7,455.6 L 233.7,454.6 L 232.4,456.6 L 231.7,458.8 L 230.4,460.8 L 230.2,462.9 L 231.9,464.8 L 232.8,466.8 L 230.7,469.5 L 228.8,470.4 L 228.8,472.3 L 227.0,473.2 L 225.6,475.2 L 224.5,477.2 L 225.4,479.3 L 223.5,480.0 L 221.5,478.6 L 220.8,476.5 L 218.4,476.8 L 218.3,479.0 L 215.9,480.6 L 213.9,482.2 L 211.4,482.7 L 211.0,484.8 L 210.7,487.4 L 210.0,489.4 L 208.0,489.2 L 207.8,491.1 L 206.2,493.9 L 204.3,492.4 L 202.5,492.4 L 200.8,494.4 L 198.4,496.0 L 198.6,498.1 L 198.6,500.0 L 199.5,502.0 L 197.7,502.3 L 195.6,501.6 L 193.7,501.7 L 191.9,502.6 L 189.9,503.1 L 188.6,501.0 L 186.5,501.9 L 184.1,500.7 L 182.2,500.7 L 181.8,502.9 L 182.9,505.1 L 182.5,507.2 L 183.4,509.1 L 183.3,511.2 L 181.4,510.6 L 179.6,511.8 L 177.4,511.3 L 174.9,512.0 L 173.6,513.9 L 171.6,513.6 L 169.2,512.3 L 167.3,513.8 L 166.3,516.4 L 164.4,516.8 L 162.5,517.9 L 162.0,520.0 L 160.0,521.6 L 157.8,519.9 L 155.8,521.2 L 154.0,521.6 L 152.1,523.2 L 154.0,524.1 L 154.0,526.0 L 154.3,528.0 L 157.2,529.0 L 157.6,531.2 L 155.8,533.3 L 156.7,535.3 L 155.6,537.4 L 155.4,539.4 L 153.9,541.5 L 152.0,541.7 L 150.2,541.7 L 149.4,543.8 L 147.3,544.5 L 145.3,542.2 L 143.4,540.4 L 141.1,541.6 L 139.3,539.6 L 138.1,537.5 L 136.0,535.3 L 135.2,533.4 L 135.4,531.3 L 134.1,529.1 L 133.5,527.1 L 132.9,525.0 L 132.2,522.8 L 132.2,520.9 L 132.3,518.9 L 131.7,516.6 L 131.2,514.6 L 131.1,512.7 L 131.0,510.5 L 131.1,508.5 L 130.4,506.1 L 129.4,503.8 L 128.9,501.5 L 129.2,499.4 L 128.0,497.3 L 127.9,495.1 L 127.9,493.2 L 126.9,491.0 L 125.6,488.0 L 125.6,485.9 L 124.7,483.9 L 124.2,481.5 L 126.3,481.3 L 124.5,479.3 L 123.2,477.1 L 122.8,475.2 L 125.0,475.4 L 124.3,473.4 L 122.6,471.4 L 121.9,469.3 L 122.5,467.2 L 124.6,467.9 L 124.7,465.9 L 122.9,465.2 L 124.9,463.4 L 124.7,461.5 L 124.6,458.6 L 123.7,460.6 L 122.8,462.8 L 121.2,464.9 L 120.7,462.9 L 121.0,461.0 L 121.0,459.0 L 121.2,456.7 L 123.0,455.6 L 124.9,455.8 L 122.9,455.1 L 120.8,454.6 L 119.6,451.8 L 122.5,449.7 L 120.7,449.9 L 118.8,448.4 L 118.3,445.1 L 118.0,442.9 L 117.8,440.4 L 118.6,438.4 L 119.7,436.3 L 122.0,435.9 L 124.0,435.3 L 125.0,437.3 L 126.8,437.3 L 128.7,437.3 L 130.3,435.3 L 132.6,433.9 L 133.9,431.8 L 133.5,429.8 L 134.9,426.4 L 135.0,424.4 L 133.2,422.9 L 135.0,421.0 L 137.0,422.9 L 138.9,424.6 L 140.9,424.7 L 142.8,423.5 L 143.6,421.3 L 145.3,419.2 L 145.1,417.0 L 144.4,415.1 L 142.7,413.0 L 140.9,411.5 L 138.3,410.8 L 140.2,410.1 L 142.0,409.3 L 143.0,407.3 L 145.2,407.3 L 146.0,405.1 L 147.9,403.2 L 152.5,402.4 L 153.6,400.5 L 151.4,401.0 L 149.6,400.8 L 147.6,400.7 L 145.5,401.4 L 143.4,401.9 L 141.8,399.8 L 143.6,397.7 L 142.9,395.7 L 144.4,393.5 L 146.4,392.7 L 148.5,391.4 L 150.5,391.3 L 152.7,391.7 L 154.7,390.4 L 156.7,389.8 L 158.1,392.0 L 157.9,394.3 L 158.4,396.4 L 160.3,398.0 L 162.3,399.1 L 164.1,399.5 L 166.0,399.3 L 167.9,400.1 L 170.0,400.6 L 171.8,403.1 L 173.8,404.4 L 176.1,405.0 L 179.8,405.1 L 181.8,405.0 L 183.8,405.0 L 187.2,404.9 L 189.2,404.7 L 192.1,405.3 L 194.1,407.4 L 194.5,409.5 L 194.5,411.6 L 197.6,412.4 L 199.6,412.1 L 201.6,410.5 L 204.8,409.3 L 205.7,407.1 L 206.0,405.1 L 207.9,403.0 L 208.7,400.9 L 211.1,399.3 L 214.0,397.4 L 215.8,396.7 L 217.7,397.1 L 219.6,396.3 L 223.4,395.6 L 225.2,396.8 L 225.7,399.1 L 225.8,401.0 L 223.4,400.9 L 223.3,403.0 L 225.2,404.2 L 227.1,404.5 L 229.0,405.0 L 230.8,403.9 L 233.0,404.6 L 236.0,403.6 L 238.1,402.5 L 239.9,400.7 L 242.2,400.0 L 244.0,399.1 L 244.8,401.4 L 246.7,401.4 L 249.1,402.6 L 251.1,402.7 L 253.0,402.3 L 255.2,401.9 L 256.3,399.9 L 259.2,399.3 L 261.0,398.7 L 263.1,396.9 L 265.5,397.5 L 267.7,398.0 L 269.3,399.9 L 271.3,400.4 L 274.1,399.8 L 275.9,401.3 L 277.7,401.1 L 279.5,400.9 L 281.4,399.9 L 283.2,399.0 L 285.5,400.0 L 287.9,402.3 L 288.1,404.4 L 289.9,404.4 L 292.9,406.2 L 294.4,405.7 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Maharashtra"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 584.7,747.7 L 585.3,750.4 L 586.1,752.3 L 586.1,754.5 L 585.5,756.8 L 584.2,759.1 L 583.3,757.1 L 582.7,755.0 L 581.7,753.1 L 580.2,750.0 L 581.9,748.0 L 583.8,747.0 L 584.7,747.7 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 580.1,746.7 L 579.3,744.5 L 581.2,742.2 L 582.1,744.4 L 580.1,746.7 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 575.4,729.8 L 575.9,731.9 L 573.9,731.7 L 572.7,728.9 L 574.5,728.5 L 575.4,729.8 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 578.3,728.7 L 578.4,729.0 L 578.5,729.5 L 578.5,730.5 L 577.3,729.6 L 577.1,729.2 L 577.1,728.8 L 577.3,728.6 L 577.7,728.7 L 577.7,728.3 L 577.9,728.2 L 578.1,728.4 L 578.3,728.7 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 577.4,726.4 L 576.8,728.8 L 576.8,726.7 L 575.7,724.7 L 577.6,723.6 L 577.0,725.6 L 577.4,726.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 571.4,722.7 L 571.4,723.4 L 571.1,723.1 L 570.9,723.1 L 570.8,723.0 L 570.8,722.8 L 570.7,722.6 L 571.0,722.4 L 571.2,722.3 L 571.2,722.5 L 571.3,722.6 L 571.4,722.7 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 569.8,723.6 L 567.6,722.8 L 567.3,720.6 L 568.3,722.5 L 569.8,723.6 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 567.6,717.8 L 567.6,718.4 L 567.3,718.1 L 567.2,717.7 L 567.6,717.8 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 579.3,718.1 L 579.0,715.6 L 579.5,717.7 L 579.3,718.1 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 562.2,701.0 L 559.9,701.3 L 559.5,699.4 L 561.3,698.7 L 562.2,701.0 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 556.6,661.2 L 557.0,663.1 L 555.7,665.3 L 555.6,667.7 L 553.6,667.2 L 553.0,665.1 L 552.2,662.9 L 553.0,661.0 L 554.4,658.9 L 556.2,659.8 L 556.6,661.2 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 558.0,647.4 L 557.8,645.3 L 558.6,647.3 L 558.0,647.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 549.8,643.3 L 549.4,643.3 L 549.0,643.0 L 548.9,642.2 L 548.6,641.8 L 548.6,641.6 L 548.8,641.6 L 549.4,641.8 L 549.7,641.8 L 549.9,642.0 L 550.1,642.5 L 550.1,643.0 L 549.8,643.3 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 555.9,642.7 L 555.7,642.7 L 555.7,642.1 L 555.7,641.8 L 555.8,641.6 L 555.9,641.6 L 556.0,641.6 L 556.0,641.8 L 556.2,641.8 L 556.5,642.0 L 556.5,642.1 L 556.4,642.3 L 556.1,642.6 L 555.9,642.7 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 567.3,634.4 L 565.4,632.8 L 567.3,634.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 567.1,630.4 L 566.2,628.4 L 567.1,630.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 568.2,629.5 L 567.3,627.4 L 568.2,629.5 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 585.1,625.4 L 584.6,625.6 L 584.6,625.4 L 584.8,625.2 L 585.1,625.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 559.1,612.5 L 558.8,610.4 L 559.1,608.4 L 559.8,610.8 L 559.1,612.5 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 566.1,608.0 L 566.2,608.1 L 565.9,608.4 L 565.8,608.5 L 565.7,608.8 L 565.8,609.0 L 565.6,609.3 L 565.6,609.6 L 565.5,609.4 L 565.4,609.4 L 565.4,609.3 L 565.2,609.2 L 565.1,609.3 L 565.1,609.2 L 565.3,609.1 L 565.4,609.1 L 565.4,609.0 L 565.3,608.9 L 565.1,608.6 L 565.3,608.7 L 565.2,608.5 L 565.1,608.5 L 565.0,608.3 L 565.3,608.1 L 565.4,608.2 L 565.4,608.4 L 565.5,608.5 L 565.6,608.4 L 565.7,608.2 L 565.8,608.0 L 565.9,608.0 L 566.1,608.0 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 559.8,606.1 L 559.7,606.3 L 559.5,606.0 L 559.2,605.7 L 559.2,605.4 L 559.4,605.3 L 559.6,605.3 L 559.7,605.4 L 560.0,605.5 L 559.8,605.8 L 559.8,606.1 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 594.3,597.5 L 593.9,597.6 L 593.7,597.3 L 594.1,597.0 L 594.3,597.5 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 566.2,594.0 L 567.1,596.4 L 567.1,598.5 L 565.3,599.4 L 567.5,601.2 L 567.0,604.5 L 566.3,606.9 L 564.5,606.1 L 564.9,608.2 L 563.6,610.2 L 565.1,612.5 L 565.6,614.4 L 565.3,616.7 L 565.6,619.4 L 564.5,621.3 L 562.5,621.5 L 563.7,623.6 L 563.6,625.6 L 562.9,627.8 L 561.5,629.7 L 560.2,632.0 L 560.0,634.9 L 560.6,639.0 L 558.9,641.2 L 560.7,640.9 L 560.0,643.4 L 558.2,642.7 L 558.1,640.7 L 557.1,638.7 L 556.3,636.1 L 556.2,633.6 L 557.9,631.3 L 557.9,628.6 L 558.8,626.6 L 560.7,627.6 L 560.6,625.6 L 559.7,623.1 L 559.7,617.4 L 560.3,615.2 L 560.0,612.4 L 561.7,610.0 L 562.2,607.7 L 562.1,605.3 L 562.4,603.2 L 562.6,600.7 L 563.3,598.2 L 564.0,596.2 L 565.5,594.3 L 566.2,594.0 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Andaman &amp; Nicobar -->
                    <path d="M 566.8,591.7 L 567.0,592.2 L 566.3,592.0 L 565.8,591.8 L 565.6,591.6 L 566.3,591.3 L 566.6,591.3 L 566.7,591.6 L 566.8,591.7 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Andaman &amp; Nicobar"/>
                    <!-- Assam -->
                    <path d="M 613.8,268.2 L 610.6,270.7 L 608.4,270.3 L 606.2,272.5 L 603.1,275.3 L 600.8,276.3 L 598.8,276.8 L 597.2,278.9 L 596.0,280.8 L 593.8,279.8 L 592.2,282.0 L 591.8,284.2 L 588.0,288.7 L 587.9,291.4 L 587.2,293.4 L 586.8,296.0 L 584.2,297.0 L 583.7,294.9 L 581.8,294.6 L 581.4,296.5 L 579.0,298.6 L 577.4,300.7 L 575.1,302.5 L 573.3,304.1 L 574.5,306.1 L 575.9,308.2 L 575.2,310.7 L 573.9,313.1 L 573.1,315.0 L 571.6,317.2 L 571.4,319.1 L 570.4,321.1 L 568.6,322.0 L 568.0,324.0 L 567.6,326.5 L 567.0,329.0 L 566.7,331.6 L 564.6,332.3 L 562.8,332.8 L 561.1,330.4 L 559.5,332.5 L 557.7,334.4 L 556.1,337.0 L 554.2,338.6 L 553.0,336.6 L 550.4,335.8 L 549.4,333.5 L 549.1,331.2 L 547.3,328.6 L 547.9,326.0 L 549.0,322.8 L 548.7,320.9 L 551.7,321.0 L 553.5,321.0 L 554.2,318.9 L 552.3,317.5 L 554.6,315.2 L 556.8,313.8 L 558.8,312.9 L 561.6,311.9 L 561.4,309.8 L 559.3,307.1 L 557.5,306.1 L 558.2,303.8 L 555.3,301.4 L 553.3,299.8 L 551.3,299.4 L 548.8,300.2 L 547.5,298.1 L 548.2,296.0 L 547.7,294.0 L 549.5,291.9 L 547.4,291.1 L 545.0,291.9 L 542.8,292.2 L 540.5,291.3 L 538.3,292.1 L 537.6,294.0 L 535.7,294.7 L 535.8,292.6 L 533.7,294.0 L 532.2,296.0 L 529.7,297.0 L 527.7,299.2 L 526.2,296.7 L 523.9,297.1 L 522.1,295.3 L 520.1,294.7 L 517.9,294.5 L 515.0,294.4 L 513.2,294.0 L 511.1,293.2 L 508.5,292.8 L 506.3,293.7 L 502.7,294.2 L 500.7,296.0 L 499.2,298.0 L 498.5,300.1 L 499.6,302.5 L 497.6,304.0 L 497.3,306.0 L 495.5,306.8 L 495.9,303.8 L 495.8,301.1 L 494.9,297.7 L 496.0,295.4 L 495.7,293.3 L 494.2,291.2 L 492.2,289.4 L 493.8,287.4 L 495.8,285.4 L 496.5,282.3 L 497.3,280.3 L 497.1,277.8 L 496.6,275.7 L 499.2,275.5 L 501.7,275.2 L 503.6,273.1 L 505.6,272.6 L 507.4,271.6 L 510.2,273.1 L 512.7,274.3 L 515.5,274.7 L 520.6,274.4 L 523.1,273.8 L 526.2,273.8 L 528.3,274.5 L 530.1,272.8 L 531.9,272.2 L 534.5,273.6 L 537.2,273.8 L 539.3,272.6 L 541.1,273.8 L 541.8,271.8 L 544.6,272.5 L 548.5,271.1 L 550.8,270.7 L 554.3,269.6 L 557.1,268.8 L 559.2,267.5 L 561.8,267.8 L 563.7,268.6 L 565.6,270.0 L 574.1,269.3 L 576.0,270.3 L 577.9,269.7 L 579.7,269.4 L 581.7,268.6 L 584.1,266.7 L 584.2,264.6 L 587.0,261.6 L 589.3,259.7 L 593.3,256.3 L 592.6,254.2 L 594.7,254.2 L 597.8,254.1 L 600.2,254.2 L 602.5,252.8 L 605.2,252.1 L 607.6,251.0 L 615.3,248.0 L 617.4,247.7 L 620.8,247.6 L 622.9,246.5 L 624.7,245.4 L 631.2,245.0 L 629.8,248.1 L 627.8,250.3 L 627.3,252.2 L 627.8,254.2 L 629.6,256.6 L 629.5,258.7 L 631.4,258.1 L 632.2,260.1 L 630.4,261.7 L 628.5,262.2 L 624.1,263.5 L 622.2,262.4 L 620.4,264.0 L 618.4,265.9 L 616.6,267.1 L 614.6,267.9 L 613.8,268.2 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Assam"/>
                    <!-- Manipur -->
                    <path d="M 602.2,306.6 L 600.0,311.5 L 601.4,313.5 L 603.4,314.8 L 603.5,316.8 L 602.3,320.1 L 600.9,322.6 L 599.3,324.6 L 598.6,326.6 L 596.6,329.6 L 595.6,331.6 L 594.4,333.5 L 593.0,337.7 L 592.6,339.9 L 591.1,343.1 L 590.8,345.1 L 587.9,343.6 L 585.9,343.1 L 583.5,343.1 L 581.5,341.5 L 579.4,341.4 L 577.4,342.2 L 575.5,341.8 L 573.9,339.7 L 571.5,341.2 L 569.6,340.6 L 567.7,340.1 L 565.8,339.3 L 565.9,337.2 L 566.2,335.0 L 566.4,333.1 L 566.9,330.8 L 567.3,328.1 L 568.0,325.8 L 568.2,323.7 L 568.9,321.7 L 570.9,320.3 L 571.9,318.2 L 571.8,316.3 L 573.9,313.1 L 574.9,311.1 L 576.7,310.7 L 578.8,312.3 L 580.8,309.8 L 583.7,306.6 L 582.8,304.5 L 586.3,304.0 L 588.5,304.0 L 590.3,305.0 L 592.2,305.4 L 595.1,305.0 L 597.2,303.3 L 600.3,300.8 L 600.3,303.0 L 599.7,305.0 L 602.2,306.6 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Manipur"/>
                    <!-- Nagaland -->
                    <path d="M 615.3,277.5 L 613.5,278.0 L 612.3,279.9 L 610.8,282.1 L 611.0,284.6 L 610.9,287.2 L 611.9,290.7 L 612.3,293.3 L 610.2,294.9 L 610.2,298.6 L 607.1,302.9 L 605.1,305.2 L 603.1,305.9 L 601.1,306.3 L 600.1,303.4 L 600.5,301.3 L 598.7,302.3 L 596.7,304.0 L 593.5,305.3 L 591.7,305.0 L 589.7,304.9 L 587.8,304.1 L 583.5,304.3 L 583.7,306.2 L 581.8,308.6 L 580.1,311.1 L 578.3,311.6 L 576.5,310.7 L 575.9,308.6 L 575.3,306.7 L 573.4,304.6 L 575.1,302.5 L 577.4,300.7 L 579.0,298.6 L 581.2,296.7 L 581.8,294.6 L 583.7,294.9 L 582.9,297.0 L 585.3,296.8 L 587.3,295.1 L 587.2,292.6 L 588.1,290.1 L 590.2,285.9 L 591.9,283.7 L 592.4,281.5 L 594.3,280.1 L 596.4,280.5 L 597.2,278.6 L 599.1,276.8 L 602.6,275.5 L 604.7,274.1 L 606.8,271.4 L 608.9,270.7 L 613.2,269.1 L 615.0,270.0 L 614.8,271.9 L 615.0,273.9 L 615.3,276.8 L 615.3,277.5 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Nagaland"/>
                    <!-- Meghalaya -->
                    <path d="M 552.3,317.3 L 550.5,315.6 L 548.6,315.2 L 546.8,314.1 L 544.6,313.0 L 541.6,313.1 L 539.2,313.4 L 537.4,313.9 L 535.3,314.4 L 533.3,313.9 L 531.3,314.1 L 528.0,313.1 L 526.2,312.8 L 521.2,313.4 L 517.9,314.0 L 516.0,313.3 L 514.1,313.4 L 510.8,313.4 L 508.5,313.8 L 506.1,313.1 L 502.6,312.3 L 497.7,310.2 L 495.8,310.5 L 495.2,308.4 L 497.0,306.3 L 497.5,304.3 L 499.3,303.7 L 498.9,301.8 L 498.7,299.6 L 499.5,297.4 L 501.7,295.1 L 504.5,293.8 L 506.9,293.6 L 509.6,293.0 L 511.8,293.7 L 513.6,294.1 L 516.3,294.2 L 518.9,294.4 L 521.0,294.6 L 522.3,297.0 L 525.7,296.4 L 526.2,299.0 L 528.7,298.1 L 530.9,296.7 L 533.4,295.9 L 534.1,293.6 L 536.0,292.8 L 535.9,294.9 L 537.9,293.5 L 539.2,291.2 L 541.1,291.9 L 544.3,291.8 L 546.4,291.5 L 549.4,291.2 L 547.9,293.4 L 548.2,296.0 L 547.5,298.1 L 547.5,300.5 L 549.7,299.9 L 551.6,299.2 L 554.3,300.5 L 556.9,303.2 L 558.8,302.7 L 557.7,304.7 L 557.9,306.6 L 560.2,307.9 L 561.3,310.0 L 558.8,312.9 L 556.8,313.8 L 554.6,315.2 L 552.3,317.3 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Meghalaya"/>
                    <!-- Punjab -->
                    <path d="M 208.2,174.5 L 209.6,176.5 L 207.6,177.2 L 208.0,179.7 L 209.8,180.0 L 211.1,182.0 L 211.3,184.0 L 211.3,186.6 L 208.9,186.2 L 207.1,187.3 L 205.6,189.3 L 203.7,190.1 L 205.3,192.1 L 203.0,194.4 L 201.1,193.9 L 200.1,191.9 L 198.3,193.9 L 196.3,193.1 L 196.1,195.0 L 195.3,197.1 L 195.7,199.0 L 193.1,201.2 L 191.1,202.4 L 189.2,202.6 L 187.3,200.7 L 185.2,201.0 L 183.4,201.9 L 181.3,201.7 L 179.4,201.1 L 177.7,203.2 L 175.8,205.3 L 174.0,205.6 L 173.7,203.7 L 173.9,201.6 L 172.0,201.0 L 171.6,199.0 L 169.7,199.5 L 167.9,198.5 L 166.0,197.3 L 164.1,197.1 L 162.1,197.7 L 159.9,198.0 L 155.7,197.3 L 153.6,197.3 L 145.3,196.9 L 146.5,193.1 L 145.8,190.1 L 143.7,187.9 L 145.6,186.3 L 147.1,184.3 L 148.5,182.2 L 150.6,180.5 L 152.4,178.0 L 154.1,175.8 L 156.1,174.9 L 158.2,173.3 L 159.9,171.3 L 161.7,170.2 L 159.4,169.7 L 158.4,167.5 L 158.8,165.5 L 159.8,162.8 L 160.8,160.7 L 159.4,157.5 L 158.2,155.3 L 159.0,153.2 L 161.4,150.7 L 164.0,149.5 L 165.5,147.5 L 167.7,147.3 L 169.7,146.5 L 171.5,146.2 L 173.5,145.0 L 175.7,144.5 L 176.9,142.2 L 175.8,140.0 L 177.8,139.9 L 179.7,140.5 L 181.9,139.0 L 184.3,138.4 L 186.8,136.4 L 189.3,137.7 L 186.4,139.9 L 184.5,141.5 L 182.7,142.2 L 183.6,144.2 L 182.0,146.2 L 183.8,146.6 L 185.8,147.3 L 188.2,148.5 L 190.5,151.7 L 192.8,158.6 L 194.1,161.9 L 194.8,164.1 L 196.6,164.6 L 198.3,162.6 L 200.4,163.7 L 202.2,165.4 L 204.0,165.7 L 204.6,167.8 L 204.8,170.1 L 205.5,172.3 L 208.2,174.5 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Punjab"/>
                    <!-- Rajasthan -->
                    <path d="M 158.6,197.8 L 159.2,199.8 L 157.4,201.7 L 159.3,202.3 L 160.1,204.4 L 159.9,206.4 L 160.6,208.8 L 159.6,210.9 L 161.4,212.2 L 163.6,211.8 L 165.5,210.9 L 167.6,211.8 L 168.6,213.8 L 170.4,214.2 L 172.6,214.5 L 174.7,214.5 L 176.6,213.6 L 178.2,215.6 L 177.9,217.6 L 179.2,220.1 L 180.2,222.0 L 180.4,224.0 L 181.4,226.6 L 182.0,228.6 L 183.6,230.9 L 185.6,233.0 L 187.6,234.7 L 190.3,236.5 L 191.9,238.5 L 193.0,240.6 L 191.2,241.2 L 191.6,243.2 L 191.0,245.4 L 190.6,247.4 L 193.3,248.4 L 195.2,249.5 L 195.6,247.5 L 194.9,245.1 L 195.0,243.1 L 196.8,242.9 L 198.6,243.6 L 198.7,241.6 L 200.8,240.7 L 201.7,242.7 L 203.1,245.0 L 205.3,244.6 L 205.7,242.6 L 207.5,241.2 L 209.5,239.3 L 211.6,240.8 L 211.6,243.2 L 211.9,245.1 L 212.0,247.2 L 211.4,249.3 L 211.1,251.2 L 213.2,251.7 L 215.0,251.0 L 216.8,249.3 L 218.9,249.3 L 219.8,251.6 L 220.4,253.7 L 220.8,255.7 L 222.5,257.9 L 224.2,259.9 L 226.4,261.0 L 227.2,263.1 L 226.9,265.0 L 224.6,266.4 L 227.0,268.3 L 228.8,268.4 L 223.5,271.4 L 222.1,273.6 L 223.9,273.0 L 227.4,271.8 L 229.5,270.7 L 231.4,271.0 L 233.5,271.3 L 235.3,271.7 L 237.3,270.6 L 239.1,270.2 L 239.1,272.2 L 238.7,274.3 L 237.2,276.2 L 235.4,276.4 L 233.4,277.1 L 231.3,278.6 L 229.3,280.7 L 227.2,281.4 L 224.9,282.9 L 223.0,283.2 L 221.0,284.4 L 219.2,286.3 L 217.3,287.5 L 215.5,287.8 L 213.7,289.1 L 211.9,290.7 L 209.3,292.8 L 207.6,295.1 L 205.7,295.1 L 203.6,296.7 L 202.7,299.1 L 202.8,304.1 L 203.4,306.3 L 205.2,307.9 L 207.1,308.5 L 209.1,309.1 L 211.4,310.0 L 213.3,309.8 L 215.4,308.8 L 217.3,309.1 L 218.5,307.2 L 220.5,306.7 L 220.9,308.8 L 221.2,310.9 L 221.9,312.8 L 220.5,314.8 L 218.5,314.5 L 215.2,315.2 L 213.4,315.2 L 211.4,316.2 L 210.3,318.2 L 210.6,320.3 L 208.8,321.0 L 210.0,323.2 L 211.8,323.7 L 213.6,324.7 L 214.6,327.1 L 212.0,329.5 L 210.1,327.9 L 209.1,330.1 L 209.2,332.9 L 210.6,335.3 L 210.4,337.2 L 208.2,337.7 L 206.0,336.2 L 206.0,334.2 L 204.1,334.8 L 202.3,336.5 L 200.2,335.4 L 198.0,334.8 L 196.0,334.7 L 194.2,333.6 L 193.9,335.6 L 193.9,337.7 L 191.2,340.4 L 191.0,342.4 L 189.0,343.6 L 187.1,344.3 L 185.3,343.6 L 184.9,345.7 L 182.4,346.0 L 180.8,343.9 L 180.0,341.9 L 181.9,341.2 L 184.1,341.1 L 186.1,340.3 L 186.1,338.2 L 186.7,335.5 L 186.0,333.5 L 185.4,331.4 L 187.4,330.1 L 188.4,327.1 L 187.2,325.1 L 186.1,323.0 L 183.5,323.7 L 181.4,324.1 L 179.1,324.6 L 176.7,324.2 L 174.6,324.2 L 173.7,322.2 L 173.3,320.2 L 175.4,321.3 L 177.4,321.0 L 175.1,320.0 L 175.8,318.0 L 176.4,316.0 L 174.4,316.4 L 172.4,316.4 L 171.5,318.9 L 169.5,320.5 L 167.7,320.1 L 165.9,319.1 L 165.7,321.1 L 167.5,322.6 L 168.5,324.8 L 166.6,325.5 L 164.9,323.2 L 164.4,325.2 L 163.7,327.3 L 163.0,329.4 L 165.2,330.1 L 164.1,332.9 L 163.4,334.9 L 165.3,335.3 L 166.8,337.9 L 168.2,340.2 L 167.2,344.1 L 167.1,346.3 L 167.9,348.4 L 167.4,350.3 L 166.4,352.5 L 164.6,353.9 L 162.6,355.0 L 159.7,356.9 L 158.7,359.1 L 160.6,360.3 L 162.5,361.2 L 160.7,363.1 L 157.7,364.3 L 155.8,364.1 L 153.8,363.9 L 151.8,361.6 L 149.9,361.7 L 149.4,359.5 L 147.1,357.8 L 145.3,357.7 L 143.2,355.5 L 140.8,355.7 L 139.0,355.2 L 138.8,353.1 L 138.2,350.7 L 136.3,351.2 L 136.4,349.3 L 134.6,347.8 L 133.2,345.5 L 133.8,343.6 L 134.0,341.6 L 133.0,339.1 L 130.8,341.3 L 129.4,339.3 L 127.6,338.0 L 127.6,334.5 L 129.4,333.5 L 127.5,331.9 L 127.4,329.9 L 125.5,329.6 L 124.3,331.6 L 122.1,332.6 L 119.6,332.4 L 117.8,330.5 L 115.4,329.4 L 113.5,331.2 L 112.4,329.1 L 110.4,328.2 L 108.6,327.3 L 110.4,326.6 L 107.7,326.4 L 105.3,325.8 L 102.8,324.8 L 101.0,325.6 L 98.9,326.2 L 95.5,325.7 L 93.7,325.0 L 91.4,325.0 L 89.4,326.0 L 87.6,325.7 L 84.0,325.6 L 81.9,324.2 L 81.2,322.1 L 79.8,320.0 L 78.7,317.4 L 78.0,314.1 L 76.0,311.8 L 74.7,309.3 L 73.3,307.0 L 73.5,304.2 L 73.5,302.1 L 71.3,300.5 L 67.0,301.1 L 64.9,300.6 L 63.8,298.4 L 61.6,296.1 L 60.5,293.7 L 60.7,291.2 L 62.0,288.9 L 62.3,286.1 L 62.5,283.3 L 62.7,281.3 L 61.1,279.2 L 55.0,279.2 L 52.5,277.4 L 48.2,275.5 L 47.7,270.8 L 48.2,267.8 L 49.7,264.5 L 51.7,262.5 L 55.7,259.1 L 57.0,257.0 L 58.9,255.2 L 61.0,249.9 L 63.2,247.4 L 66.2,244.8 L 68.7,244.0 L 70.8,244.4 L 72.8,246.2 L 73.2,248.3 L 74.7,251.1 L 77.4,252.1 L 79.2,251.7 L 81.7,250.5 L 84.4,249.2 L 88.0,248.2 L 89.9,248.0 L 93.4,248.0 L 96.6,247.1 L 100.1,246.0 L 100.8,242.5 L 102.9,239.4 L 105.6,237.1 L 107.5,234.1 L 108.8,229.2 L 110.9,226.3 L 114.7,224.3 L 117.6,222.8 L 120.1,221.5 L 123.0,220.1 L 124.3,217.8 L 126.3,215.1 L 128.0,211.9 L 129.1,209.9 L 130.3,207.6 L 131.4,204.1 L 132.4,201.2 L 133.3,198.2 L 137.5,196.2 L 141.5,195.3 L 146.0,191.9 L 144.9,195.6 L 153.6,197.3 L 155.7,197.3 L 158.6,197.8 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Rajasthan"/>
                    <!-- Uttar Pradesh -->
                    <path d="M 281.0,225.0 L 283.0,226.6 L 284.9,227.7 L 286.7,229.7 L 288.8,229.9 L 290.8,228.4 L 293.4,229.6 L 295.4,231.3 L 297.4,232.7 L 299.3,234.2 L 301.1,234.4 L 304.7,235.8 L 306.1,238.1 L 307.6,240.2 L 309.6,240.7 L 311.4,242.5 L 313.8,244.2 L 316.1,245.5 L 317.9,247.0 L 320.3,248.5 L 322.3,247.1 L 324.6,247.1 L 326.8,248.5 L 329.4,250.6 L 332.3,252.6 L 335.1,252.7 L 337.8,252.0 L 339.3,255.6 L 342.8,257.2 L 345.8,258.3 L 348.5,258.3 L 350.3,259.5 L 352.2,261.0 L 353.4,258.7 L 356.1,257.6 L 358.5,258.0 L 363.2,260.2 L 365.1,261.1 L 366.0,263.1 L 366.2,265.3 L 367.9,267.3 L 368.9,270.5 L 370.8,272.0 L 372.7,271.8 L 372.8,274.6 L 376.0,276.8 L 372.6,277.8 L 370.5,277.5 L 368.9,279.4 L 366.9,280.6 L 369.0,282.7 L 371.5,283.5 L 371.3,285.7 L 369.5,286.9 L 367.7,287.1 L 368.4,289.3 L 370.4,291.5 L 372.4,293.8 L 374.9,294.7 L 376.8,295.9 L 378.6,296.4 L 380.9,298.1 L 379.5,300.4 L 377.2,300.0 L 375.4,299.0 L 374.7,301.0 L 372.9,301.8 L 372.2,299.8 L 368.8,301.1 L 367.1,303.1 L 365.1,304.9 L 363.3,305.9 L 360.2,308.0 L 357.2,309.8 L 354.6,311.3 L 352.8,313.2 L 352.6,315.2 L 353.4,317.2 L 353.5,319.5 L 354.4,321.5 L 356.7,323.2 L 356.8,325.3 L 357.0,327.3 L 355.2,329.0 L 354.5,331.1 L 355.5,333.1 L 354.6,335.1 L 352.9,338.2 L 351.4,340.2 L 350.5,342.5 L 348.7,343.4 L 346.4,343.6 L 344.1,343.6 L 342.0,341.9 L 340.0,340.2 L 338.9,338.2 L 339.8,334.9 L 340.4,332.3 L 339.8,329.9 L 339.9,327.9 L 340.7,325.8 L 338.9,324.2 L 336.9,324.9 L 333.5,324.2 L 332.5,326.2 L 330.2,326.3 L 329.3,324.3 L 328.2,322.1 L 326.3,322.1 L 324.2,320.8 L 320.8,319.4 L 320.4,317.4 L 318.6,316.8 L 316.1,315.9 L 314.1,315.4 L 313.8,313.3 L 311.2,313.2 L 309.4,313.6 L 307.4,313.4 L 306.4,315.7 L 305.5,317.8 L 303.6,319.6 L 301.8,318.3 L 300.0,318.4 L 297.9,318.1 L 296.9,316.1 L 298.3,312.9 L 296.4,313.6 L 294.5,313.6 L 293.9,315.7 L 292.1,313.8 L 290.2,314.8 L 289.9,317.0 L 288.1,317.1 L 286.2,317.1 L 286.3,315.1 L 288.3,313.4 L 288.2,311.5 L 286.4,309.3 L 285.5,307.3 L 283.6,307.4 L 281.8,308.9 L 279.8,309.4 L 278.0,310.9 L 276.2,311.4 L 276.5,313.4 L 274.5,313.8 L 271.9,313.9 L 270.1,313.2 L 268.2,314.7 L 266.4,313.9 L 266.8,311.2 L 264.9,311.0 L 264.5,309.0 L 263.7,312.5 L 261.6,313.1 L 259.8,312.7 L 257.9,313.2 L 258.4,311.2 L 256.5,312.0 L 254.7,313.2 L 254.8,311.0 L 255.9,309.1 L 256.5,307.1 L 255.6,305.0 L 254.1,306.9 L 252.6,304.7 L 251.8,306.8 L 251.6,308.7 L 249.7,307.5 L 247.7,308.8 L 246.7,310.8 L 248.8,314.1 L 249.4,318.3 L 251.0,320.5 L 251.4,323.0 L 251.1,325.1 L 253.3,326.0 L 255.5,328.4 L 256.9,331.0 L 255.2,333.3 L 254.1,335.4 L 252.1,335.9 L 250.1,334.7 L 248.3,333.3 L 246.5,331.9 L 244.7,333.9 L 242.7,333.6 L 242.9,331.6 L 241.1,330.0 L 240.9,328.0 L 241.0,326.0 L 240.4,323.9 L 239.7,321.3 L 240.3,319.2 L 242.2,317.8 L 242.6,315.8 L 243.3,313.6 L 241.9,309.5 L 241.1,307.5 L 243.0,305.6 L 245.5,303.5 L 247.4,303.6 L 251.1,302.3 L 251.4,300.0 L 251.8,298.1 L 253.8,295.5 L 255.0,293.2 L 256.2,291.1 L 255.6,289.0 L 256.0,287.1 L 257.8,286.1 L 258.3,284.2 L 258.3,281.9 L 256.8,279.4 L 256.0,277.1 L 253.9,276.0 L 252.1,274.6 L 249.8,274.4 L 247.8,274.9 L 245.5,274.1 L 243.5,272.6 L 241.6,272.5 L 239.8,273.3 L 240.7,271.1 L 238.7,270.2 L 236.9,271.0 L 235.1,271.4 L 232.9,271.1 L 230.1,270.8 L 227.9,271.6 L 224.6,273.1 L 222.3,274.5 L 222.1,272.5 L 227.2,269.7 L 229.0,269.1 L 227.2,268.1 L 225.4,268.1 L 226.0,266.1 L 227.8,264.1 L 226.6,261.8 L 224.4,259.9 L 222.5,257.9 L 220.9,255.9 L 220.3,254.0 L 220.3,251.9 L 219.5,249.4 L 221.9,248.2 L 223.7,247.6 L 224.9,245.5 L 223.8,243.1 L 224.2,241.2 L 224.9,239.2 L 223.6,237.2 L 223.6,235.2 L 221.8,233.8 L 220.0,231.2 L 220.7,229.3 L 218.3,225.9 L 217.8,223.6 L 217.2,221.5 L 216.6,218.2 L 216.2,213.8 L 216.2,211.7 L 215.7,209.3 L 214.7,207.4 L 215.4,205.1 L 216.3,203.2 L 217.3,201.2 L 218.0,198.2 L 219.4,196.0 L 221.4,194.1 L 224.5,190.8 L 226.2,188.6 L 229.9,188.6 L 233.8,190.5 L 232.4,192.5 L 230.7,195.5 L 229.8,198.4 L 230.3,200.8 L 231.6,204.7 L 233.7,203.7 L 236.2,204.0 L 238.7,204.3 L 239.5,201.4 L 238.9,199.4 L 239.6,197.5 L 241.6,199.1 L 243.1,201.6 L 245.9,203.2 L 247.6,205.6 L 249.5,207.6 L 253.1,209.7 L 255.3,210.2 L 254.3,212.2 L 252.5,212.9 L 254.5,215.4 L 255.5,218.1 L 257.7,217.2 L 260.3,217.9 L 263.9,221.3 L 265.7,221.5 L 266.9,223.6 L 268.9,223.6 L 270.9,224.2 L 272.8,224.3 L 275.3,223.6 L 277.1,225.2 L 278.8,227.1 L 280.6,226.0 L 281.0,225.0 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Uttar Pradesh"/>
                    <!-- Uttarakhand -->
                    <path d="M 281.0,225.0 L 279.4,227.0 L 277.6,226.0 L 275.8,225.4 L 274.2,223.4 L 271.3,224.0 L 268.9,223.6 L 267.1,224.3 L 266.4,222.3 L 264.4,221.5 L 261.2,219.4 L 258.6,217.0 L 256.3,217.6 L 254.5,215.4 L 251.2,213.8 L 253.2,212.4 L 255.3,211.3 L 253.1,209.7 L 249.5,207.6 L 247.6,205.6 L 245.9,203.2 L 243.7,202.2 L 242.5,200.3 L 240.4,197.8 L 239.5,201.4 L 239.5,203.5 L 237.7,204.8 L 235.0,203.3 L 231.6,204.7 L 230.6,202.7 L 229.9,199.8 L 229.7,197.4 L 231.7,193.3 L 233.6,191.6 L 231.2,189.4 L 227.9,186.9 L 225.8,186.6 L 227.9,185.7 L 230.3,184.4 L 229.7,181.9 L 229.7,179.9 L 228.8,177.7 L 229.7,175.4 L 230.1,173.5 L 230.8,171.5 L 233.1,168.9 L 235.5,168.2 L 237.9,167.1 L 240.5,166.0 L 243.0,165.3 L 244.9,165.8 L 246.8,166.9 L 248.7,166.7 L 250.5,167.0 L 252.5,167.2 L 254.5,169.3 L 256.5,169.3 L 256.6,167.4 L 254.7,165.0 L 256.8,164.5 L 257.7,161.9 L 259.7,162.4 L 261.5,164.0 L 262.2,166.0 L 263.3,168.1 L 265.6,170.0 L 267.5,171.7 L 269.3,173.5 L 271.3,173.2 L 273.6,172.8 L 275.7,173.2 L 277.5,175.1 L 279.5,176.0 L 281.4,177.7 L 283.8,178.3 L 283.1,180.4 L 283.6,182.5 L 286.6,183.2 L 288.8,184.4 L 290.6,185.2 L 292.6,185.3 L 294.7,186.5 L 296.3,188.4 L 298.5,189.5 L 300.9,190.2 L 299.7,192.2 L 297.9,192.3 L 296.4,194.6 L 294.4,196.6 L 292.3,197.5 L 291.0,199.8 L 288.1,201.9 L 287.4,204.2 L 287.6,206.5 L 285.8,208.7 L 284.3,211.0 L 285.0,213.0 L 285.1,215.8 L 283.8,217.7 L 281.9,218.9 L 281.6,221.2 L 280.1,223.1 L 281.0,225.0 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Uttarakhand"/>
                    <!-- Jharkhand -->
                    <path d="M 450.9,312.3 L 450.8,314.4 L 452.3,316.4 L 453.0,318.9 L 452.6,321.0 L 451.7,323.0 L 453.1,325.0 L 453.4,327.0 L 451.5,327.4 L 451.3,329.5 L 450.7,331.5 L 449.8,333.5 L 448.0,334.9 L 448.2,337.1 L 446.3,338.8 L 444.4,338.4 L 444.4,340.5 L 442.4,341.1 L 440.6,340.4 L 438.7,340.8 L 439.9,342.7 L 439.1,344.9 L 437.3,344.5 L 435.4,346.1 L 433.6,345.0 L 431.6,343.9 L 429.7,345.3 L 429.7,347.7 L 425.9,348.9 L 423.5,349.8 L 421.7,350.4 L 419.5,351.7 L 418.9,353.6 L 417.0,355.1 L 415.1,354.1 L 414.5,351.8 L 412.5,351.1 L 411.8,353.2 L 409.8,353.6 L 407.8,354.1 L 409.2,356.1 L 408.2,358.4 L 408.8,360.7 L 410.7,361.5 L 414.7,365.1 L 417.4,365.3 L 421.5,365.7 L 420.7,367.8 L 420.3,370.3 L 422.3,372.0 L 424.6,373.5 L 425.4,375.6 L 427.6,376.2 L 427.3,378.3 L 429.1,380.4 L 430.3,382.5 L 428.5,383.3 L 425.9,384.3 L 422.8,382.0 L 420.8,382.2 L 419.0,381.4 L 413.9,377.9 L 412.1,376.7 L 410.3,377.9 L 411.2,380.1 L 411.4,382.4 L 411.0,384.5 L 411.1,386.4 L 409.8,389.5 L 408.0,390.3 L 406.7,388.3 L 404.7,388.1 L 401.7,387.4 L 399.7,386.2 L 397.9,386.4 L 395.7,387.9 L 393.7,388.6 L 391.7,387.2 L 389.7,387.5 L 390.4,384.7 L 391.7,382.7 L 391.8,380.5 L 391.0,377.9 L 389.2,379.1 L 386.9,379.5 L 384.7,379.2 L 379.2,379.7 L 376.8,382.0 L 374.4,382.2 L 372.6,381.3 L 370.8,380.6 L 369.0,377.9 L 366.9,376.9 L 368.5,374.8 L 370.6,373.9 L 372.4,371.5 L 374.7,369.4 L 374.9,367.3 L 373.1,365.8 L 371.1,365.3 L 369.3,363.5 L 368.0,361.3 L 368.4,358.3 L 367.5,356.4 L 366.5,354.3 L 367.8,352.4 L 367.3,350.4 L 365.5,352.1 L 363.6,351.6 L 361.6,350.0 L 361.7,347.9 L 360.8,346.0 L 357.8,343.1 L 357.0,340.4 L 355.2,338.7 L 352.9,338.2 L 353.9,336.0 L 354.8,334.0 L 355.1,332.0 L 354.2,330.0 L 357.0,328.8 L 359.5,329.1 L 362.1,329.3 L 364.0,328.7 L 366.2,328.3 L 367.8,326.3 L 369.6,329.4 L 371.6,330.1 L 373.4,329.1 L 375.0,331.5 L 377.1,333.3 L 379.0,334.2 L 380.4,332.2 L 382.2,332.4 L 384.0,330.3 L 385.9,331.0 L 387.5,333.1 L 389.5,332.8 L 391.3,332.1 L 393.3,331.2 L 395.3,330.4 L 397.8,329.5 L 399.8,329.4 L 401.8,328.8 L 403.8,328.3 L 403.9,326.2 L 405.0,324.1 L 407.9,323.0 L 410.7,324.6 L 412.7,323.7 L 414.2,327.1 L 416.3,327.9 L 418.1,328.5 L 417.6,330.6 L 419.4,332.1 L 421.3,333.4 L 422.3,330.8 L 424.5,328.0 L 426.3,328.5 L 428.2,327.4 L 431.2,328.7 L 431.8,326.8 L 433.9,327.4 L 435.2,325.5 L 435.3,323.2 L 436.1,321.3 L 436.2,318.1 L 437.4,316.1 L 439.3,315.9 L 439.9,313.8 L 442.0,312.8 L 443.8,311.0 L 445.6,309.8 L 448.2,311.3 L 450.1,311.4 L 450.9,312.3 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Jharkhand"/>
                    <!-- West Bengal -->
                    <path d="M 475.7,401.4 L 474.2,399.3 L 475.7,401.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="West Bengal"/>
                    <!-- West Bengal -->
                    <path d="M 458.8,398.9 L 456.8,398.7 L 457.7,394.6 L 459.3,397.1 L 458.8,398.9 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="West Bengal"/>
                    <!-- West Bengal -->
                    <path d="M 470.0,393.8 L 470.0,391.8 L 470.0,393.8 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="West Bengal"/>
                    <!-- West Bengal -->
                    <path d="M 458.0,393.4 L 458.0,391.3 L 458.0,393.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="West Bengal"/>
                    <!-- West Bengal -->
                    <path d="M 471.8,265.4 L 473.9,266.7 L 474.3,269.1 L 476.2,271.0 L 478.2,271.1 L 479.8,273.4 L 481.8,273.6 L 483.7,272.8 L 485.9,273.0 L 488.8,273.8 L 490.6,274.3 L 492.8,275.7 L 495.3,276.3 L 497.3,280.3 L 496.5,282.3 L 495.9,284.3 L 494.4,286.9 L 492.2,288.7 L 490.4,289.4 L 491.2,291.5 L 489.9,293.7 L 487.1,293.3 L 485.1,293.3 L 483.0,291.8 L 480.6,290.0 L 480.0,287.8 L 479.2,285.6 L 477.8,283.6 L 475.8,283.0 L 476.4,285.0 L 478.2,286.7 L 475.6,286.7 L 473.5,287.6 L 470.3,286.8 L 471.0,284.8 L 469.1,282.8 L 467.3,281.7 L 464.7,280.0 L 462.7,281.2 L 465.3,282.0 L 466.6,284.1 L 464.8,285.0 L 463.0,286.7 L 461.2,288.7 L 459.3,289.9 L 459.1,292.0 L 457.6,295.1 L 457.6,297.1 L 459.7,298.3 L 462.8,299.9 L 464.9,301.6 L 466.2,303.8 L 468.7,305.4 L 470.6,306.1 L 472.7,305.3 L 473.3,307.7 L 475.2,309.7 L 477.2,310.1 L 476.1,312.2 L 474.0,312.8 L 471.6,313.4 L 469.6,312.7 L 467.8,313.2 L 465.4,312.8 L 465.1,316.2 L 464.2,318.2 L 462.8,320.5 L 461.0,320.3 L 458.2,319.4 L 458.6,321.5 L 456.8,324.4 L 457.1,326.8 L 457.7,328.7 L 464.5,332.7 L 466.7,334.1 L 469.2,334.5 L 471.4,334.0 L 472.2,336.1 L 470.6,338.1 L 471.1,340.2 L 471.4,342.4 L 470.3,344.5 L 468.4,345.1 L 467.8,347.0 L 467.6,350.1 L 469.4,351.9 L 471.2,353.9 L 471.5,357.4 L 471.1,359.7 L 473.0,360.5 L 475.7,360.7 L 474.7,363.4 L 474.1,365.9 L 475.4,368.7 L 476.4,370.8 L 476.0,373.2 L 476.7,375.2 L 477.0,377.2 L 477.8,379.7 L 477.8,382.0 L 479.1,384.9 L 479.0,386.8 L 478.9,388.9 L 479.0,391.5 L 476.9,391.6 L 478.1,393.6 L 478.4,395.5 L 479.6,397.8 L 477.7,399.6 L 475.4,398.4 L 474.9,396.1 L 474.6,398.4 L 472.8,398.7 L 472.5,400.7 L 470.9,397.8 L 471.2,394.5 L 471.4,392.5 L 472.2,390.3 L 471.3,388.2 L 471.1,390.6 L 469.9,388.1 L 470.5,386.1 L 469.3,388.1 L 468.9,390.2 L 468.2,393.6 L 468.2,395.5 L 468.9,398.8 L 468.0,400.7 L 467.1,398.7 L 466.8,396.3 L 467.4,394.3 L 467.0,392.0 L 466.6,394.4 L 465.6,396.7 L 465.7,399.1 L 463.7,397.5 L 462.8,399.6 L 462.3,396.1 L 462.2,398.4 L 462.4,400.4 L 460.6,399.3 L 459.9,397.2 L 460.3,395.1 L 459.1,392.7 L 459.0,390.6 L 460.6,388.1 L 460.0,385.9 L 457.5,384.7 L 455.3,383.6 L 454.6,381.4 L 454.6,383.6 L 457.0,385.2 L 459.2,386.2 L 458.8,388.6 L 456.8,389.5 L 455.3,393.5 L 453.5,394.9 L 450.3,397.5 L 447.8,398.4 L 444.1,399.3 L 443.0,397.2 L 442.7,395.2 L 439.7,394.5 L 438.3,391.8 L 436.3,390.6 L 434.4,392.3 L 433.8,390.0 L 433.0,388.1 L 430.9,387.1 L 428.8,386.3 L 426.8,384.7 L 428.6,383.8 L 430.4,382.7 L 429.1,380.4 L 427.3,378.3 L 427.6,376.2 L 425.7,375.7 L 424.6,373.5 L 422.6,372.0 L 420.4,371.0 L 420.4,369.1 L 420.8,367.1 L 422.6,366.3 L 418.5,365.6 L 416.4,365.3 L 412.1,362.1 L 409.4,361.8 L 407.8,359.5 L 408.9,357.4 L 408.9,355.5 L 411.6,353.4 L 411.8,351.4 L 413.8,351.8 L 414.3,353.8 L 416.3,355.0 L 418.3,354.3 L 419.3,352.0 L 421.7,350.4 L 423.5,349.8 L 425.9,348.9 L 428.4,348.5 L 429.6,346.6 L 430.4,344.5 L 432.7,344.7 L 434.9,345.9 L 437.3,346.2 L 439.1,344.6 L 439.7,342.4 L 439.3,340.5 L 441.1,341.5 L 443.5,341.2 L 444.5,339.2 L 446.3,338.8 L 448.2,337.1 L 447.6,335.1 L 449.6,333.9 L 450.7,331.5 L 451.3,329.5 L 450.4,327.6 L 452.4,327.6 L 453.4,325.6 L 452.6,323.5 L 452.6,321.0 L 453.0,318.9 L 452.4,316.7 L 450.8,314.6 L 450.9,312.6 L 452.1,310.4 L 451.2,308.5 L 451.7,306.3 L 454.0,305.0 L 455.8,305.3 L 456.8,303.3 L 456.7,301.3 L 454.4,299.6 L 453.1,297.6 L 451.3,296.2 L 451.8,294.0 L 452.8,292.0 L 455.0,289.9 L 457.1,288.7 L 459.1,286.8 L 461.2,285.3 L 461.3,283.3 L 460.3,281.4 L 458.4,280.4 L 458.9,277.2 L 459.4,275.2 L 459.1,272.7 L 457.8,270.0 L 455.9,267.9 L 455.3,265.4 L 455.8,263.0 L 457.5,265.0 L 459.9,265.6 L 463.1,266.6 L 465.0,266.6 L 467.1,264.7 L 469.2,265.0 L 471.5,265.5 L 471.8,265.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="West Bengal"/>
                    <!-- Bihar -->
                    <path d="M 457.6,280.2 L 460.0,279.9 L 461.7,282.5 L 462.4,284.5 L 460.5,286.0 L 458.3,287.8 L 456.5,289.1 L 454.3,290.8 L 452.1,292.7 L 451.7,294.7 L 452.4,296.9 L 453.7,298.9 L 455.8,300.2 L 456.9,302.2 L 456.6,304.2 L 454.7,304.5 L 452.8,305.6 L 451.0,306.6 L 450.7,308.6 L 452.1,310.7 L 450.1,311.4 L 448.2,311.3 L 446.2,310.1 L 444.0,310.5 L 443.1,312.5 L 441.3,312.7 L 439.5,315.7 L 437.7,315.9 L 436.2,318.1 L 436.4,320.7 L 435.2,322.7 L 435.1,324.7 L 434.8,326.7 L 432.8,327.0 L 429.5,328.2 L 427.7,328.0 L 425.5,328.3 L 423.4,329.2 L 422.3,331.7 L 419.4,332.1 L 417.6,330.8 L 418.2,328.7 L 416.3,327.9 L 414.4,327.6 L 414.0,325.3 L 412.0,323.7 L 409.6,324.7 L 406.0,323.0 L 404.9,325.1 L 404.2,327.8 L 402.3,328.1 L 400.5,329.3 L 398.2,329.3 L 396.1,329.7 L 393.3,331.2 L 391.7,333.3 L 389.9,332.6 L 387.5,333.1 L 386.8,331.0 L 384.9,329.8 L 383.0,330.9 L 381.0,332.4 L 379.0,334.2 L 377.1,333.3 L 375.3,331.9 L 374.7,329.4 L 372.8,328.9 L 371.0,329.2 L 369.2,328.0 L 367.4,327.3 L 364.9,328.5 L 362.9,328.6 L 360.8,329.4 L 357.4,328.7 L 357.0,326.7 L 357.2,324.6 L 355.3,322.7 L 353.4,320.7 L 353.6,318.2 L 352.7,316.0 L 352.8,313.9 L 353.7,311.9 L 355.9,310.7 L 360.2,308.0 L 362.6,306.6 L 364.4,305.3 L 367.1,303.1 L 368.8,301.1 L 370.7,299.6 L 372.5,301.5 L 374.3,301.7 L 374.5,299.5 L 376.8,299.7 L 379.1,300.5 L 381.0,298.7 L 379.2,296.5 L 376.8,295.9 L 374.9,294.7 L 372.9,294.6 L 371.3,292.2 L 369.5,291.0 L 368.0,288.7 L 369.6,286.8 L 371.6,286.3 L 371.5,284.3 L 369.5,282.9 L 367.7,281.9 L 365.8,281.8 L 368.3,279.8 L 369.5,277.8 L 371.8,277.6 L 376.0,277.7 L 374.3,275.2 L 373.0,273.0 L 371.2,271.9 L 369.1,270.9 L 368.2,268.3 L 367.1,266.1 L 366.3,264.0 L 365.0,262.1 L 364.8,260.1 L 365.8,258.1 L 367.7,258.3 L 369.7,256.5 L 371.6,258.4 L 373.4,259.6 L 380.3,261.1 L 381.8,263.2 L 381.9,266.0 L 381.4,268.2 L 384.3,269.1 L 386.3,269.5 L 388.2,270.6 L 390.0,272.0 L 391.8,272.3 L 393.9,274.8 L 395.9,275.4 L 397.7,274.5 L 400.0,273.7 L 402.7,272.5 L 404.7,273.6 L 405.1,276.6 L 406.8,278.7 L 408.7,279.2 L 410.5,277.7 L 412.5,277.6 L 414.8,278.7 L 416.6,278.8 L 418.4,278.7 L 421.4,280.1 L 423.5,281.2 L 425.4,282.2 L 427.3,283.2 L 429.1,282.8 L 431.6,280.9 L 434.0,279.5 L 435.1,281.9 L 437.8,283.5 L 440.3,284.8 L 442.1,283.1 L 444.2,283.0 L 446.6,284.1 L 448.7,283.0 L 450.6,282.3 L 452.4,282.1 L 454.8,284.1 L 456.6,283.4 L 457.5,281.2 L 457.6,280.2 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Bihar"/>
                    <!-- Sikkim -->
                    <path d="M 471.8,265.4 L 469.2,265.0 L 467.1,264.7 L 465.0,266.6 L 463.1,266.6 L 460.8,265.7 L 459.0,265.7 L 456.5,263.5 L 456.4,261.2 L 456.2,259.0 L 456.2,257.1 L 458.1,253.5 L 458.6,251.5 L 459.1,249.3 L 457.9,247.1 L 460.0,245.8 L 464.0,245.3 L 466.2,243.9 L 468.7,242.3 L 471.3,243.3 L 473.4,244.6 L 473.6,246.6 L 474.5,248.6 L 473.4,253.2 L 472.2,255.5 L 472.3,257.8 L 473.5,259.9 L 475.4,261.4 L 473.3,262.8 L 471.8,265.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Sikkim"/>
                    <!-- Chhattisgarh -->
                    <path d="M 366.9,376.9 L 367.5,379.0 L 366.4,381.1 L 364.0,381.5 L 361.7,383.6 L 359.6,384.6 L 357.8,386.9 L 357.8,388.8 L 356.8,390.9 L 357.9,392.8 L 356.9,394.8 L 355.3,396.8 L 353.3,400.3 L 352.7,402.4 L 353.8,404.4 L 351.9,405.5 L 350.7,407.8 L 349.9,410.0 L 347.2,411.5 L 345.4,410.3 L 342.5,410.3 L 340.5,410.6 L 338.2,410.4 L 336.9,413.6 L 335.5,415.6 L 333.7,417.7 L 331.5,417.0 L 331.1,420.3 L 331.5,422.5 L 331.0,424.9 L 332.0,427.1 L 332.6,430.0 L 332.9,432.5 L 333.0,434.5 L 332.6,436.5 L 334.4,437.8 L 336.2,438.0 L 338.2,438.2 L 338.5,440.7 L 338.5,442.7 L 336.6,443.9 L 335.1,442.0 L 331.9,441.2 L 330.1,442.6 L 328.5,439.4 L 326.6,438.1 L 324.8,437.4 L 322.6,436.0 L 320.8,437.1 L 319.5,439.2 L 321.9,442.1 L 323.7,443.6 L 324.1,445.7 L 324.2,448.2 L 324.2,450.3 L 326.1,452.1 L 326.5,454.1 L 326.8,456.0 L 327.2,458.3 L 327.8,460.4 L 328.4,462.4 L 328.4,464.5 L 327.1,466.5 L 326.5,468.7 L 324.4,469.6 L 322.6,470.4 L 322.2,472.4 L 320.6,474.5 L 318.5,476.8 L 316.7,478.7 L 314.5,480.2 L 312.7,482.1 L 312.6,484.7 L 312.1,486.9 L 311.3,489.1 L 310.0,491.2 L 307.5,491.5 L 305.3,490.8 L 303.3,491.6 L 301.5,491.5 L 300.9,487.6 L 300.2,485.6 L 300.5,483.7 L 298.6,483.5 L 296.8,482.8 L 296.4,480.7 L 295.3,478.2 L 294.1,475.9 L 292.3,473.6 L 290.5,472.3 L 288.4,472.5 L 286.6,471.5 L 285.9,469.5 L 286.8,467.1 L 285.7,464.5 L 285.8,462.1 L 287.5,459.7 L 288.1,456.9 L 289.8,454.9 L 291.6,453.2 L 293.8,454.8 L 295.7,455.8 L 297.5,454.7 L 297.3,452.7 L 299.1,451.7 L 297.9,449.4 L 295.1,448.3 L 294.3,446.2 L 292.3,445.2 L 291.4,443.2 L 289.5,444.0 L 290.1,441.9 L 289.4,439.9 L 291.2,440.1 L 291.5,437.8 L 291.1,435.1 L 288.8,434.8 L 288.8,432.7 L 290.6,432.0 L 292.5,430.7 L 292.9,428.7 L 293.2,426.5 L 293.2,424.3 L 291.2,424.0 L 291.9,422.1 L 291.7,419.5 L 291.7,417.2 L 289.8,415.8 L 289.0,413.6 L 289.5,411.2 L 291.5,409.2 L 293.5,408.1 L 294.4,405.7 L 295.0,403.7 L 295.2,400.0 L 295.5,396.9 L 297.5,394.8 L 297.7,392.3 L 298.9,388.6 L 300.9,388.7 L 301.9,386.6 L 302.4,384.5 L 304.1,382.4 L 304.2,380.3 L 305.6,378.3 L 307.6,378.6 L 309.6,378.1 L 311.6,378.8 L 313.8,377.4 L 315.6,376.7 L 317.5,374.4 L 318.3,372.4 L 318.6,370.3 L 320.5,368.7 L 322.3,366.7 L 322.3,364.8 L 325.0,363.4 L 326.9,362.2 L 327.7,358.8 L 325.6,356.8 L 323.6,356.3 L 321.9,353.9 L 319.1,353.0 L 317.2,353.3 L 315.3,354.0 L 314.7,352.0 L 316.2,349.6 L 315.6,346.3 L 317.9,345.9 L 319.9,346.6 L 322.1,345.4 L 324.1,345.8 L 328.0,346.4 L 332.6,346.8 L 334.5,347.1 L 336.9,345.9 L 338.7,343.9 L 340.6,343.1 L 343.2,343.0 L 345.0,343.7 L 347.4,343.8 L 349.6,343.1 L 351.1,340.8 L 352.7,338.6 L 355.2,338.7 L 357.0,340.0 L 357.1,342.0 L 360.8,346.0 L 361.7,347.9 L 361.6,350.0 L 363.6,351.6 L 365.5,352.1 L 367.3,350.4 L 367.8,352.4 L 366.5,354.3 L 366.3,356.6 L 368.2,357.1 L 368.2,360.3 L 368.2,362.3 L 369.7,364.4 L 371.8,365.7 L 373.8,365.8 L 375.2,367.8 L 373.8,370.1 L 372.0,372.7 L 370.2,374.3 L 368.1,375.3 L 366.9,376.9 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Chhattisgarh"/>
                    <!-- Madhya Pradesh -->
                    <path d="M 341.1,341.6 L 339.7,343.7 L 337.9,344.7 L 336.0,346.3 L 332.6,346.8 L 329.3,346.8 L 325.9,346.5 L 323.6,345.6 L 321.5,345.6 L 319.2,346.6 L 316.9,344.7 L 315.1,344.8 L 316.1,347.7 L 315.9,350.1 L 314.5,352.1 L 315.6,354.1 L 317.6,352.8 L 320.3,353.5 L 322.4,354.5 L 324.1,356.4 L 326.0,356.9 L 327.1,360.7 L 326.6,363.0 L 323.9,364.1 L 322.0,365.4 L 321.4,367.9 L 319.2,369.2 L 318.7,371.1 L 318.3,373.5 L 316.2,375.3 L 314.2,377.2 L 312.3,378.3 L 310.3,379.2 L 308.5,378.4 L 306.6,379.2 L 304.3,379.8 L 304.2,381.8 L 303.5,383.8 L 301.9,386.6 L 301.3,388.8 L 299.3,387.9 L 298.0,390.5 L 297.9,393.7 L 296.8,395.8 L 295.3,399.3 L 295.3,402.1 L 294.8,404.6 L 292.9,406.2 L 290.5,404.6 L 288.6,404.7 L 288.3,402.5 L 286.5,400.9 L 283.9,399.1 L 281.8,399.6 L 279.5,400.9 L 277.7,401.1 L 275.9,401.3 L 274.1,399.8 L 272.2,400.0 L 270.1,401.2 L 269.1,399.2 L 266.8,397.5 L 264.7,397.5 L 262.6,397.0 L 259.9,399.1 L 257.3,399.6 L 255.6,401.8 L 253.0,402.3 L 251.1,402.7 L 249.1,402.6 L 247.1,401.7 L 245.2,401.9 L 244.4,399.6 L 242.2,400.0 L 239.9,400.7 L 238.1,402.5 L 236.0,403.6 L 233.3,404.5 L 231.0,403.9 L 229.0,405.0 L 227.1,404.5 L 225.2,404.2 L 223.3,403.0 L 222.9,401.1 L 225.6,401.1 L 225.7,399.1 L 225.4,397.1 L 223.4,395.6 L 220.7,395.5 L 218.9,396.5 L 217.0,396.6 L 214.9,397.0 L 211.5,399.2 L 209.2,399.7 L 208.6,401.9 L 207.3,404.2 L 205.5,405.5 L 205.7,408.1 L 203.2,409.4 L 201.1,411.2 L 198.3,412.2 L 195.4,412.1 L 193.5,410.3 L 194.1,407.4 L 193.1,405.3 L 191.0,405.1 L 188.6,404.5 L 184.8,405.1 L 183.0,404.8 L 181.0,405.2 L 177.6,405.1 L 173.8,404.4 L 171.9,403.3 L 170.8,401.2 L 168.2,400.2 L 166.2,399.3 L 164.1,399.5 L 162.3,399.1 L 160.3,398.0 L 158.4,396.4 L 157.9,394.3 L 158.1,392.3 L 156.7,389.8 L 154.7,390.4 L 152.7,391.7 L 150.5,391.3 L 150.3,388.5 L 149.6,386.3 L 148.7,384.0 L 148.7,381.9 L 150.5,382.2 L 152.3,381.3 L 150.0,380.1 L 148.0,378.7 L 149.8,377.8 L 153.2,375.3 L 155.1,374.7 L 157.3,370.5 L 155.5,368.9 L 154.8,366.1 L 155.4,364.1 L 157.2,364.4 L 159.3,363.4 L 161.9,362.3 L 161.7,360.3 L 159.4,359.9 L 159.5,357.3 L 161.5,355.4 L 164.4,354.0 L 166.2,352.8 L 167.0,350.8 L 167.9,348.8 L 167.2,346.7 L 167.2,344.1 L 168.1,341.5 L 167.5,339.5 L 166.7,336.7 L 163.9,335.4 L 163.9,333.5 L 165.7,331.5 L 163.1,329.5 L 163.7,327.3 L 164.4,325.2 L 164.2,323.1 L 165.9,325.1 L 167.7,325.4 L 168.8,323.2 L 167.0,322.4 L 165.2,319.4 L 167.0,319.9 L 168.8,320.7 L 170.8,320.0 L 171.3,318.0 L 173.8,316.4 L 176.0,316.0 L 175.8,318.0 L 175.1,320.0 L 177.8,319.7 L 175.8,321.3 L 173.9,320.2 L 173.7,322.2 L 174.1,324.2 L 176.0,324.1 L 178.4,324.6 L 181.4,324.1 L 183.5,323.7 L 185.4,322.8 L 187.2,324.2 L 187.8,326.3 L 188.5,329.2 L 186.7,329.6 L 185.5,331.7 L 186.2,333.7 L 186.0,336.5 L 187.0,338.8 L 185.8,340.8 L 183.4,341.6 L 181.3,340.8 L 180.0,343.1 L 182.0,344.6 L 183.9,346.3 L 185.1,344.0 L 187.1,344.3 L 189.0,343.6 L 191.0,342.4 L 191.2,340.4 L 193.1,339.2 L 193.8,337.2 L 194.0,334.8 L 196.0,334.7 L 198.0,334.8 L 200.2,335.4 L 202.1,336.3 L 203.9,335.0 L 205.8,334.1 L 206.0,336.2 L 208.2,337.7 L 210.0,337.4 L 210.6,335.3 L 209.2,332.9 L 209.1,330.6 L 209.1,328.2 L 210.9,328.3 L 214.1,328.6 L 214.3,325.9 L 212.5,323.8 L 210.6,323.6 L 208.8,321.9 L 210.6,320.3 L 210.3,318.2 L 210.7,316.3 L 213.3,315.3 L 215.2,315.2 L 217.4,314.3 L 219.5,314.3 L 221.4,314.1 L 222.1,312.0 L 221.2,310.1 L 220.9,308.0 L 218.9,306.9 L 217.8,308.8 L 215.7,308.8 L 213.3,309.8 L 211.4,310.0 L 209.5,309.1 L 207.1,308.5 L 205.2,307.9 L 203.4,306.3 L 202.8,304.1 L 202.1,300.8 L 202.6,298.4 L 204.1,296.3 L 206.8,295.2 L 208.6,294.2 L 210.5,291.9 L 212.4,290.3 L 214.4,288.7 L 216.7,287.4 L 218.9,286.6 L 220.7,284.5 L 222.8,284.2 L 224.6,283.2 L 226.9,281.5 L 228.7,281.1 L 231.2,279.7 L 232.9,277.5 L 234.9,276.6 L 237.1,276.7 L 237.4,274.6 L 239.3,273.4 L 241.3,272.8 L 243.5,272.6 L 245.5,274.1 L 247.8,274.9 L 249.8,274.4 L 251.8,274.1 L 253.9,276.0 L 255.7,276.2 L 256.5,278.8 L 258.0,281.2 L 258.5,283.2 L 258.2,285.8 L 256.4,286.6 L 256.4,288.6 L 256.4,290.6 L 255.0,293.2 L 253.8,295.5 L 252.8,297.4 L 251.4,299.5 L 251.9,301.5 L 248.9,302.7 L 246.9,303.6 L 243.5,304.0 L 242.6,306.2 L 241.0,308.3 L 243.0,311.9 L 242.9,314.1 L 242.9,316.3 L 241.0,318.9 L 239.1,320.4 L 240.3,322.4 L 240.9,324.5 L 241.3,326.5 L 240.4,328.7 L 241.8,330.9 L 242.7,332.8 L 244.7,333.9 L 245.6,331.9 L 248.3,333.3 L 250.1,334.7 L 251.9,335.1 L 254.1,335.4 L 255.2,333.3 L 256.9,331.0 L 255.6,329.0 L 254.7,326.8 L 252.8,326.1 L 251.6,324.1 L 251.5,321.9 L 249.9,319.3 L 249.0,315.9 L 248.0,312.3 L 246.8,310.2 L 248.1,308.2 L 249.9,307.6 L 251.8,307.3 L 251.5,305.3 L 253.1,307.2 L 254.2,305.3 L 256.1,306.8 L 256.0,308.8 L 255.2,310.7 L 254.4,312.8 L 256.2,312.0 L 258.0,310.9 L 257.6,312.8 L 259.6,312.7 L 261.4,313.0 L 263.3,313.4 L 263.2,310.8 L 264.1,308.6 L 263.7,310.7 L 265.5,310.6 L 265.7,312.9 L 264.6,315.0 L 266.8,313.9 L 268.9,313.6 L 270.9,313.6 L 273.6,313.7 L 275.8,313.9 L 275.8,311.9 L 278.0,310.9 L 279.8,309.4 L 281.8,308.9 L 283.6,307.4 L 285.5,307.3 L 286.4,309.3 L 287.6,311.4 L 288.3,313.4 L 286.5,314.8 L 285.8,317.1 L 287.7,317.0 L 289.5,317.1 L 289.6,315.0 L 291.4,314.8 L 293.3,315.5 L 295.2,315.5 L 296.6,313.5 L 298.4,312.5 L 297.7,314.6 L 296.8,316.6 L 299.1,317.8 L 301.4,318.2 L 303.6,319.6 L 305.5,318.4 L 306.0,316.2 L 306.6,313.6 L 308.6,313.4 L 310.7,314.9 L 313.2,312.6 L 314.2,314.6 L 316.1,315.9 L 318.0,316.9 L 320.0,316.8 L 320.5,318.8 L 322.5,320.5 L 324.7,321.1 L 326.5,322.1 L 328.3,323.3 L 330.1,324.4 L 332.2,326.3 L 332.9,324.2 L 335.6,324.8 L 338.7,324.2 L 340.6,325.6 L 341.5,327.6 L 339.6,328.3 L 339.6,331.0 L 340.4,333.6 L 339.6,336.5 L 339.3,338.5 L 340.4,340.6 L 341.1,341.6 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Madhya Pradesh"/>
                    <!-- Tamil Nadu -->
                    <path d="M 285.6,595.3 L 285.7,595.1 L 285.8,595.0 L 286.2,596.1 L 286.3,597.0 L 286.1,597.0 L 285.6,595.3 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Tamil Nadu"/>
                    <!-- Tamil Nadu -->
                    <path d="M 285.1,596.4 L 287.0,598.6 L 286.8,601.2 L 286.5,603.4 L 286.2,605.4 L 285.4,608.8 L 285.2,611.7 L 284.5,614.7 L 283.9,616.7 L 283.4,618.7 L 282.1,621.9 L 280.7,623.8 L 278.3,626.4 L 278.0,628.6 L 276.5,631.1 L 276.1,633.0 L 274.3,633.8 L 272.5,631.9 L 272.7,633.8 L 273.4,635.8 L 275.3,636.0 L 274.3,639.8 L 274.0,642.2 L 274.5,644.9 L 275.4,646.9 L 272.4,648.6 L 274.5,647.3 L 275.8,649.8 L 276.2,652.3 L 276.2,656.0 L 274.1,656.6 L 273.3,658.5 L 275.1,659.2 L 276.1,662.0 L 276.1,666.0 L 276.4,671.1 L 276.2,673.2 L 274.0,672.9 L 271.3,672.4 L 273.5,673.4 L 270.2,673.1 L 267.5,672.9 L 265.4,673.0 L 263.3,674.7 L 262.6,676.6 L 263.0,679.0 L 261.8,681.0 L 260.5,683.0 L 259.4,685.1 L 257.0,688.4 L 256.0,690.4 L 255.5,693.0 L 256.5,695.2 L 258.3,696.9 L 262.9,697.6 L 264.9,696.9 L 265.5,699.0 L 267.3,700.7 L 265.3,699.4 L 262.5,698.3 L 260.3,698.3 L 257.9,697.9 L 255.8,698.4 L 253.9,698.6 L 252.1,699.4 L 250.2,700.1 L 246.0,701.5 L 243.6,702.6 L 240.6,705.4 L 239.4,707.5 L 239.2,709.5 L 238.7,711.8 L 238.5,714.3 L 238.2,716.9 L 236.8,719.7 L 231.1,723.2 L 227.5,725.0 L 225.7,725.9 L 223.2,726.6 L 220.3,725.6 L 218.3,724.3 L 216.1,722.1 L 217.3,719.8 L 217.8,717.7 L 219.4,715.7 L 217.6,713.7 L 217.3,711.7 L 218.5,709.7 L 218.7,707.8 L 217.0,704.9 L 218.9,701.5 L 220.2,697.2 L 221.3,694.4 L 222.1,692.4 L 220.8,690.5 L 218.9,691.0 L 218.5,686.0 L 218.3,683.7 L 219.0,681.5 L 218.3,678.9 L 219.4,676.1 L 218.7,673.9 L 217.5,671.8 L 215.2,672.8 L 213.0,674.7 L 210.9,673.8 L 209.8,671.6 L 209.1,669.0 L 209.5,667.0 L 209.4,665.0 L 210.6,662.6 L 210.1,660.6 L 208.2,658.5 L 206.2,657.2 L 206.6,655.2 L 207.3,653.2 L 206.7,651.0 L 203.9,651.2 L 202.0,651.0 L 203.0,648.5 L 201.7,646.5 L 197.9,644.8 L 196.5,642.7 L 198.8,641.8 L 200.6,639.8 L 202.4,638.7 L 203.5,640.7 L 207.8,640.6 L 209.9,639.1 L 211.3,636.8 L 213.1,636.2 L 215.1,637.8 L 217.1,636.7 L 219.0,636.4 L 221.1,637.2 L 223.0,636.1 L 224.0,634.0 L 227.0,633.2 L 229.1,631.0 L 230.3,629.0 L 228.0,627.0 L 224.1,627.0 L 224.1,624.9 L 225.9,623.3 L 227.0,620.6 L 225.8,618.4 L 226.7,615.7 L 228.5,615.6 L 230.1,613.5 L 231.0,611.2 L 233.0,610.8 L 234.8,612.4 L 237.3,611.9 L 240.4,613.5 L 241.9,615.6 L 243.7,616.6 L 246.2,615.3 L 248.0,613.5 L 248.8,611.4 L 249.3,609.4 L 249.9,607.4 L 252.5,606.2 L 254.3,605.8 L 256.1,605.5 L 258.4,606.5 L 260.7,606.7 L 262.6,604.4 L 264.6,604.3 L 266.6,602.4 L 267.0,600.1 L 268.9,599.6 L 272.1,600.7 L 274.0,602.3 L 276.6,600.0 L 278.5,598.9 L 279.1,597.0 L 280.0,595.0 L 281.8,595.4 L 283.9,596.9 L 285.1,596.4 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Tamil Nadu"/>
                    <!-- Gujarat -->
                    <path d="M 154.3,364.9 L 155.0,368.3 L 157.2,369.6 L 155.5,374.2 L 153.6,375.1 L 151.6,376.5 L 148.6,377.4 L 149.0,379.7 L 150.8,379.9 L 152.6,380.4 L 150.5,382.2 L 148.7,381.9 L 148.7,384.0 L 149.6,386.3 L 150.3,388.3 L 150.0,391.1 L 146.7,392.4 L 144.4,393.5 L 142.9,395.7 L 143.6,397.7 L 141.8,399.2 L 143.1,401.6 L 145.5,401.4 L 147.6,400.7 L 149.6,400.8 L 151.4,401.0 L 153.2,400.3 L 152.5,402.4 L 149.6,403.2 L 147.4,403.9 L 145.6,406.7 L 143.7,407.8 L 141.8,409.4 L 140.0,410.1 L 137.9,409.5 L 139.8,411.3 L 142.2,412.7 L 144.1,414.7 L 145.1,417.0 L 145.3,419.2 L 143.6,421.3 L 142.8,423.5 L 140.9,424.7 L 139.1,424.7 L 137.0,422.9 L 135.2,421.1 L 133.3,422.4 L 135.0,424.4 L 134.9,426.4 L 133.2,429.1 L 133.9,431.8 L 133.6,433.9 L 131.2,433.7 L 129.6,435.7 L 127.8,434.0 L 125.9,433.7 L 127.7,432.1 L 125.6,431.0 L 123.8,432.3 L 123.9,435.0 L 122.0,435.9 L 120.1,436.0 L 119.4,433.9 L 119.6,431.6 L 120.7,429.7 L 122.6,428.9 L 122.5,426.0 L 122.7,423.7 L 123.2,421.5 L 123.6,419.5 L 123.0,417.4 L 122.0,415.4 L 120.1,413.6 L 121.1,411.2 L 119.3,411.9 L 117.2,412.1 L 118.4,409.9 L 117.4,407.6 L 117.2,405.5 L 119.2,402.9 L 116.6,404.0 L 117.5,401.9 L 119.7,400.5 L 121.2,398.6 L 123.8,398.2 L 125.7,397.3 L 127.6,396.4 L 125.7,396.8 L 123.6,397.6 L 121.6,397.5 L 119.8,397.6 L 117.5,397.7 L 115.7,398.0 L 115.3,396.0 L 115.5,393.9 L 116.7,391.8 L 118.6,391.3 L 116.6,391.1 L 114.3,390.9 L 114.6,388.7 L 114.9,386.6 L 117.1,384.9 L 119.0,385.6 L 121.1,384.3 L 122.9,384.9 L 120.7,383.6 L 117.6,383.3 L 115.8,383.0 L 113.7,384.3 L 111.8,383.8 L 112.1,381.5 L 110.4,383.7 L 108.4,382.7 L 106.4,383.3 L 108.4,383.0 L 110.1,385.5 L 109.9,388.1 L 108.0,389.7 L 106.1,389.9 L 104.0,391.3 L 106.2,391.8 L 106.9,393.9 L 104.8,392.5 L 103.0,393.9 L 105.1,395.2 L 106.9,395.0 L 108.0,397.1 L 109.7,399.1 L 108.5,402.5 L 106.8,404.7 L 105.5,406.8 L 105.5,408.8 L 103.0,410.9 L 98.8,412.7 L 96.9,413.4 L 93.9,415.2 L 91.9,415.9 L 89.4,417.6 L 84.2,419.9 L 82.1,420.5 L 77.6,421.4 L 75.7,421.0 L 71.0,418.8 L 69.0,417.7 L 66.5,416.0 L 62.4,412.3 L 60.3,410.5 L 58.4,408.0 L 55.6,404.8 L 54.4,402.8 L 50.9,399.3 L 48.5,397.1 L 46.4,395.3 L 45.7,393.4 L 42.4,391.3 L 40.4,389.0 L 38.1,386.2 L 36.0,383.3 L 36.3,381.1 L 38.1,378.8 L 39.9,380.1 L 40.8,382.1 L 43.3,383.1 L 46.6,382.0 L 48.5,380.8 L 50.3,381.2 L 52.3,380.2 L 54.4,379.7 L 56.5,378.5 L 58.5,376.9 L 60.4,376.5 L 62.3,376.7 L 64.3,374.3 L 66.1,371.2 L 67.4,368.2 L 69.3,366.6 L 70.7,364.6 L 69.3,362.7 L 67.9,364.7 L 67.9,366.9 L 66.1,367.1 L 64.2,365.8 L 62.4,366.7 L 60.4,367.8 L 57.8,368.5 L 55.8,369.1 L 53.8,370.4 L 51.4,371.6 L 49.3,371.2 L 47.5,370.8 L 45.3,370.2 L 42.3,369.6 L 40.1,368.5 L 37.9,367.0 L 34.1,365.3 L 30.2,362.6 L 28.4,360.8 L 27.4,358.2 L 26.3,356.2 L 24.5,355.2 L 25.6,353.1 L 24.0,350.8 L 25.8,350.9 L 27.2,348.7 L 29.0,347.4 L 31.0,346.0 L 33.1,344.5 L 31.3,345.2 L 29.4,345.6 L 27.2,347.2 L 25.4,347.9 L 22.5,350.7 L 20.1,351.6 L 18.2,351.0 L 20.2,350.2 L 19.3,348.1 L 18.9,345.8 L 20.7,344.1 L 22.5,342.4 L 24.5,342.4 L 27.0,342.4 L 29.2,342.4 L 31.0,339.1 L 31.0,336.5 L 31.0,334.6 L 32.9,334.2 L 34.9,333.9 L 37.2,335.2 L 39.1,334.8 L 41.6,335.4 L 49.5,334.9 L 51.8,337.0 L 54.0,337.6 L 58.5,337.6 L 60.5,336.3 L 61.5,334.2 L 63.6,333.8 L 65.7,332.8 L 68.3,331.9 L 70.6,331.3 L 71.3,333.7 L 72.8,335.8 L 75.7,336.0 L 77.8,335.2 L 79.3,332.8 L 81.3,332.8 L 82.0,330.8 L 80.7,328.8 L 80.3,326.7 L 82.5,325.1 L 86.0,326.2 L 88.2,325.6 L 90.1,325.8 L 93.1,325.0 L 95.2,325.7 L 97.7,325.2 L 99.5,325.4 L 101.4,325.8 L 103.9,324.5 L 106.9,326.3 L 109.0,326.2 L 110.4,328.2 L 112.2,329.0 L 113.0,331.1 L 115.1,329.3 L 117.0,330.2 L 118.9,332.2 L 121.6,332.5 L 123.5,332.8 L 124.5,330.6 L 126.5,329.4 L 127.2,331.5 L 129.0,332.5 L 127.6,334.5 L 126.9,336.7 L 128.5,338.6 L 130.3,340.9 L 132.1,340.3 L 133.9,340.6 L 134.5,343.1 L 133.2,345.2 L 134.4,347.2 L 136.2,348.8 L 136.2,350.8 L 138.2,350.7 L 138.8,352.6 L 138.8,354.9 L 140.8,355.7 L 142.9,355.2 L 144.7,357.6 L 147.1,357.8 L 149.1,359.2 L 149.6,361.2 L 151.4,361.5 L 153.2,363.6 L 154.3,364.9 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Gujarat"/>
                    <!-- Goa -->
                    <path d="M 149.4,543.8 L 151.6,543.8 L 152.8,546.5 L 152.7,548.6 L 153.6,550.9 L 153.6,552.9 L 153.6,554.8 L 152.9,557.0 L 152.9,559.1 L 151.6,561.1 L 149.2,562.1 L 148.0,559.8 L 146.4,557.8 L 146.3,555.9 L 144.8,551.1 L 143.0,550.2 L 145.0,549.5 L 142.9,548.4 L 144.2,546.5 L 142.0,547.3 L 141.4,545.2 L 143.6,543.6 L 141.3,544.2 L 140.3,542.3 L 142.2,541.5 L 144.1,541.4 L 145.5,543.4 L 148.5,543.9 L 149.4,543.8 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Goa"/>
                    <!-- Arunachal Pradesh -->
                    <path d="M 615.3,277.5 L 614.9,275.5 L 614.4,273.4 L 615.0,271.3 L 614.5,269.3 L 616.6,267.1 L 618.4,265.9 L 620.4,264.3 L 621.9,262.4 L 624.1,263.5 L 627.5,262.1 L 629.8,262.4 L 632.0,260.4 L 631.6,258.3 L 629.8,259.2 L 629.6,257.0 L 629.1,255.1 L 627.3,252.2 L 627.8,250.3 L 629.8,248.1 L 630.9,246.1 L 625.7,245.1 L 622.9,246.5 L 620.8,247.6 L 618.9,248.0 L 616.8,247.4 L 608.8,250.4 L 606.1,251.7 L 603.8,252.4 L 601.2,253.4 L 599.4,254.4 L 595.6,254.7 L 593.8,253.7 L 593.5,255.7 L 590.4,258.8 L 588.5,260.3 L 584.5,264.2 L 584.2,266.3 L 582.1,268.2 L 579.7,269.4 L 577.9,269.7 L 576.0,270.3 L 574.1,269.3 L 566.3,270.2 L 564.5,269.3 L 561.8,267.8 L 559.2,267.5 L 557.1,268.8 L 554.3,269.6 L 551.9,270.2 L 549.9,270.7 L 546.3,270.9 L 544.9,268.4 L 543.6,266.1 L 544.5,264.0 L 545.7,262.0 L 543.8,258.2 L 541.2,258.2 L 539.0,258.9 L 536.8,257.6 L 534.9,255.8 L 534.5,253.1 L 535.7,250.7 L 538.9,250.6 L 540.9,251.4 L 542.8,251.5 L 545.4,249.8 L 548.5,249.5 L 550.5,250.0 L 552.4,248.3 L 554.3,248.5 L 556.2,247.4 L 558.4,246.3 L 559.3,244.2 L 558.2,242.3 L 560.8,240.2 L 562.9,239.8 L 565.0,238.3 L 567.9,235.9 L 569.1,233.6 L 570.7,231.7 L 572.9,230.2 L 575.7,228.6 L 578.0,228.4 L 580.0,228.4 L 583.3,226.7 L 585.1,225.9 L 587.0,224.6 L 589.7,223.5 L 591.7,222.3 L 594.3,221.2 L 594.7,219.2 L 594.2,217.1 L 596.1,215.9 L 598.4,215.6 L 600.7,213.3 L 602.6,213.2 L 604.5,215.1 L 606.7,216.5 L 609.2,217.5 L 611.0,217.2 L 614.1,218.3 L 616.1,219.4 L 616.7,217.4 L 619.0,217.5 L 621.2,217.4 L 622.0,215.5 L 624.2,215.1 L 626.4,214.0 L 627.5,212.1 L 630.9,211.9 L 633.6,211.7 L 635.6,213.3 L 637.8,214.8 L 639.7,214.0 L 639.2,216.3 L 636.6,217.1 L 636.3,220.0 L 638.1,218.8 L 640.0,219.7 L 642.0,220.8 L 643.2,223.4 L 645.0,226.5 L 643.0,229.3 L 642.3,231.2 L 642.8,234.6 L 643.6,231.9 L 645.5,230.1 L 647.3,230.6 L 650.4,233.2 L 651.7,236.2 L 653.9,236.7 L 655.7,235.7 L 658.0,237.2 L 660.3,239.1 L 660.5,241.7 L 661.8,244.3 L 661.4,246.4 L 659.3,247.1 L 656.9,249.3 L 655.1,251.0 L 653.0,252.4 L 651.1,254.0 L 651.3,256.1 L 651.3,258.3 L 655.5,263.8 L 656.8,265.7 L 655.0,266.9 L 651.0,264.9 L 650.1,262.4 L 647.9,260.4 L 646.0,260.9 L 644.0,261.6 L 640.9,261.8 L 635.1,262.8 L 632.2,264.4 L 630.6,267.1 L 627.6,268.9 L 625.5,271.3 L 623.7,271.9 L 621.6,273.4 L 619.6,275.5 L 616.9,277.1 L 615.3,277.5 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Arunachal Pradesh"/>
                    <!-- Mizoram -->
                    <path d="M 566.3,331.9 L 566.8,334.0 L 566.2,336.0 L 565.8,338.3 L 567.7,340.1 L 569.6,340.3 L 571.4,340.4 L 572.8,342.6 L 573.8,345.1 L 574.1,347.9 L 575.4,350.2 L 574.7,354.8 L 574.8,356.9 L 574.1,359.1 L 574.1,361.7 L 573.2,364.6 L 571.3,365.7 L 569.2,364.6 L 569.2,366.9 L 569.4,369.2 L 567.6,371.3 L 567.4,373.3 L 568.3,375.6 L 568.0,377.6 L 569.2,379.7 L 569.7,383.5 L 569.0,385.4 L 566.9,385.0 L 566.4,387.1 L 565.1,389.1 L 563.1,391.1 L 562.2,388.8 L 559.4,386.4 L 558.3,388.6 L 556.5,390.5 L 556.2,388.5 L 556.5,386.5 L 555.3,378.0 L 554.9,375.0 L 554.6,372.8 L 553.4,370.8 L 552.9,368.5 L 551.6,365.1 L 551.0,361.6 L 551.5,359.5 L 551.5,357.5 L 550.6,355.5 L 549.4,351.1 L 549.5,348.8 L 549.7,346.6 L 550.9,344.6 L 551.0,342.1 L 551.0,339.3 L 551.0,337.1 L 553.0,335.8 L 553.3,337.9 L 555.4,337.6 L 557.3,336.0 L 558.8,333.3 L 560.2,330.2 L 562.1,332.5 L 564.3,332.2 L 566.3,331.9 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Mizoram"/>
                    <!-- Tripura -->
                    <path d="M 550.4,335.8 L 551.0,339.1 L 550.9,341.1 L 550.7,343.1 L 550.8,345.1 L 549.5,347.0 L 548.5,349.8 L 546.2,348.4 L 544.2,350.3 L 542.4,348.3 L 542.5,352.9 L 541.8,355.0 L 539.8,356.1 L 538.6,358.0 L 538.3,360.2 L 538.9,362.6 L 538.5,364.6 L 536.5,366.2 L 534.7,367.1 L 533.2,365.0 L 532.2,362.3 L 531.5,360.4 L 529.6,360.4 L 530.0,363.5 L 527.9,358.4 L 527.3,356.3 L 526.6,354.3 L 525.5,352.2 L 524.9,350.0 L 524.9,347.9 L 526.8,345.8 L 526.6,343.8 L 527.8,341.9 L 529.5,339.8 L 532.4,339.5 L 534.6,339.3 L 535.5,336.7 L 537.3,338.1 L 538.0,336.0 L 540.4,337.9 L 541.8,335.3 L 542.1,333.3 L 544.5,332.7 L 546.1,329.6 L 548.7,329.5 L 549.5,332.0 L 548.6,335.2 L 550.4,335.8 Z"
                          fill="#5ab050" stroke="rgba(255,255,255,0.45)" stroke-width="1.0" class="svc-state" data-state="Tripura"/>

          <!-- ── CITY MARKERS — calibrated using same projection as market-data.tsx ── -->
          <!-- All cx/cy = market-data cx × 0.7158, cy × 0.7091                         -->

          <!-- Delhi NCR: md(291,308) → (208,218) -->
          <g class="svc-marker" onclick="svcCityTip('Delhi NCR','Real Estate · Hospitality · Retail')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Delhi NCR — Real Estate, Hospitality, Retail">
            <circle cx="218" cy="230" r="13" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="13"/>
            <circle cx="218" cy="230" r="8" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="233" y="234" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Delhi NCR</text>
          </g>

          <!-- Mumbai: md(152,664) → (109,471) -->
          <g class="svc-marker" onclick="svcCityTip('Mumbai','Real Estate · Entertainment · Retail')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Mumbai — Real Estate, Entertainment, Retail">
            <circle cx="123" cy="461" r="13" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="13"/>
            <circle cx="123" cy="461" r="8" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="108" y="455" text-anchor="end" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Mumbai</text>
          </g>

          <!-- Chandigarh: md(279,231) → (200,164) -->
          <g class="svc-marker" onclick="svcCityTip('Chandigarh','Hospitality · Real Estate')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Chandigarh — Hospitality, Real Estate">
            <circle cx="208" cy="179" r="11" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="11"/>
            <circle cx="208" cy="179" r="6.5" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="222" y="183" font-family="DM Sans,sans-serif" font-size="9" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Chandigarh</text>
          </g>

          <!-- Kasauli/Chail: md(265,224) → (190,159) — small heritage marker, no label -->
          <g class="svc-marker" onclick="svcCityTip('Kasauli · Chail','Heritage Hospitality')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Kasauli · Chail — Heritage Hospitality">
            <circle cx="213" cy="175" r="9" fill="rgba(184,150,12,0.12)" class="svc-pulse" data-r="9"/>
            <circle cx="213" cy="175" r="5.5" fill="rgba(184,150,12,0.75)" stroke="#B8960C" stroke-width="1.2" filter="url(#svsShadow)"/>
          </g>

          <!-- Jaipur: md(247,370) → (177,262) -->
          <g class="svc-marker" onclick="svcCityTip('Jaipur','Hospitality · Heritage · Real Estate')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Jaipur — Hospitality, Heritage, Real Estate">
            <circle cx="187" cy="271" r="11" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="11"/>
            <circle cx="187" cy="271" r="6.5" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="172" y="265" text-anchor="end" font-family="DM Sans,sans-serif" font-size="9" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Jaipur</text>
          </g>

          <!-- Bengaluru: md(304,884) → (218,627) -->
          <g class="svc-marker" onclick="svcCityTip('Bengaluru','Real Estate · HORECA · Retail')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Bengaluru — Real Estate, HORECA, Retail">
            <circle cx="226" cy="608" r="12" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="12"/>
            <circle cx="226" cy="608" r="7.5" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="240" y="612" font-family="DM Sans,sans-serif" font-size="9.5" font-weight="600"
                  fill="rgba(255,255,255,0.88)" paint-order="stroke" stroke="rgba(0,0,0,0.7)" stroke-width="2.5">Bengaluru</text>
          </g>

          <!-- Hyderabad: md(333,719) → (238,510) -->
          <g class="svc-marker" onclick="svcCityTip('Hyderabad','Real Estate · Hospitality')" style="cursor:pointer;" role="button" tabindex="0" aria-label="Hyderabad — Real Estate, Hospitality">
            <circle cx="246" cy="502" r="11" fill="rgba(184,150,12,0.15)" class="svc-pulse" data-r="11"/>
            <circle cx="246" cy="502" r="6.5" fill="url(#svsGold)" stroke="#B8960C" stroke-width="1.5" filter="url(#svsShadow)"/>
            <text x="260" y="506" font-family="DM Sans,sans-serif" font-size="9" font-weight="600"
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
