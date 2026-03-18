import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const content = `

<!-- ABOUT HERO -->
<div class="hero-dk" style="position:relative;">
  <div class="hero-dk-grid"></div>
  <!-- India skyline / commercial real estate background -->
  <div style="position:absolute;inset:0;background-image:url('/static/mandates/hero/hero-dlf-gurgaon.jpg');background-size:cover;background-position:center 35%;opacity:.15;pointer-events:none;"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 55% 65% at 75% 50%,rgba(184,150,12,.06) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <!-- Floating year accent -->
  <div class="hero-dk-num">2017</div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:820px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.75rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">About India Gully</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.75rem;">Celebrating<br><em style="color:var(--gold);font-style:italic;">Desiness</em><br><span style="font-size:.5em;font-weight:300;color:rgba(255,255,255,.38);letter-spacing:-.01em;">Since 2017.</span></h1>
      <p class="lead-lt" style="max-width:600px;margin-bottom:2.5rem;">Vivacious Entertainment and Hospitality Pvt. Ltd. A Delhi-based, multi-vertical enterprise advisory firm operating across Hospitality, Retail, Real Estate and Entertainment with a distinctly Indian identity.</p>
      <!-- Quick stats -->
      <div style="display:flex;flex-wrap:wrap;gap:2.5rem;">
        ${[{n:"2017",l:"Founded"},{n:"₹2,000 Cr+",l:"Transacted"},{n:"6",l:"Verticals"},{n:"Pan-India",l:"Presence"}].map(s=>`<div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;line-height:1;">${s.n}</div><div style="font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(184,150,12,.7);margin-top:.25rem;">${s.l}</div></div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- VISION & MISSION -->
<div class="sec-wh" style="padding-top:7rem;">
  <div class="wrap">

    <!-- Section header -->
    <div style="text-align:center;max-width:600px;margin:0 auto 5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Our Purpose</p>
      <h2 class="h2">Vision, Mission<br>&amp; Guiding Principles</h2>
      <p class="lead" style="margin-top:1.25rem;">The strategic intent and values that govern every mandate, every relationship, every decision we make.</p>
    </div>

    <!-- Vision + Mission two-column -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:5rem;" class="mob-stack">

      <!-- VISION -->
      <div class="reveal-l" style="position:relative;overflow:hidden;background:var(--ink);padding:3rem 2.5rem;border:1px solid rgba(184,150,12,.18);">
        <!-- Gold corner accent -->
        <div style="position:absolute;top:0;left:0;width:80px;height:3px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <div style="position:absolute;top:0;left:0;width:3px;height:80px;background:linear-gradient(180deg,var(--gold),transparent);"></div>
        <!-- Subtle bg glow -->
        <div style="position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(184,150,12,.07) 0%,transparent 70%);pointer-events:none;"></div>

        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:2rem;">
          <div style="width:36px;height:36px;background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-eye" style="color:var(--gold);font-size:.8rem;"></i>
          </div>
          <span style="font-size:.6rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);">Vision</span>
        </div>

        <blockquote style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:#fff;line-height:1.75;font-style:italic;margin:0 0 1.75rem;border:none;padding:0;">
          "To be India's preeminent force in Real Estate, Hospitality and Entertainment — integrating institutional rigour with bespoke advisory and trading solutions, while setting the benchmark for excellence across every vertical."
        </blockquote>

        <p style="font-size:.8rem;color:rgba(255,255,255,.45);line-height:1.75;border-top:1px solid rgba(255,255,255,.07);padding-top:1.25rem;">
          We do not follow the market. We define its next chapter — transaction by transaction, mandate by mandate, across every sector we operate in.
        </p>
      </div>

      <!-- MISSION -->
      <div class="reveal-r" style="position:relative;overflow:hidden;background:var(--parch);padding:3rem 2.5rem;border:1px solid var(--border);">
        <!-- Navy corner accent -->
        <div style="position:absolute;top:0;left:0;width:80px;height:3px;background:linear-gradient(90deg,#1A3A6B,transparent);"></div>
        <div style="position:absolute;top:0;left:0;width:3px;height:80px;background:linear-gradient(180deg,#1A3A6B,transparent);"></div>

        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:2rem;">
          <div style="width:36px;height:36px;background:rgba(26,58,107,.08);border:1px solid rgba(26,58,107,.2);display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-rocket" style="color:#1A3A6B;font-size:.8rem;"></i>
          </div>
          <span style="font-size:.6rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#1A3A6B;">Mission</span>
        </div>

        <blockquote style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);line-height:1.75;font-style:italic;margin:0 0 1.75rem;border:none;padding:0;">
          "To empower stakeholders through a unique synergy of data-driven strategy and Yield-Centric Focus — delivering high-impact advisory, world-class hospitality and entertainment experiences that benchmark the standards of excellence."
        </blockquote>

        <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.75;border-top:1px solid var(--border);padding-top:1.25rem;">
          Every engagement is anchored in measurable outcomes. We are not satisfied until our clients are — and we engineer every mandate to maximise risk-adjusted returns on both capital and trust.
        </p>
      </div>
    </div>

    <!-- PRINCIPLES — full-width 4-column grid -->
    <div class="reveal">
      <div style="text-align:center;margin-bottom:3rem;">
        <p class="eyebrow" style="margin-bottom:.5rem;">Core Values</p>
        <h2 class="h2">The Principles That Guide Us</h2>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;" class="principles-grid">
        ${[
          {
            fa: 'fa-balance-scale',
            color: '#B8960C',
            bg: 'rgba(184,150,12,.06)',
            border: 'rgba(184,150,12,.2)',
            name: 'Institutional Integrity',
            tagline: 'Fiduciary first. Always.',
            desc: 'We operate with the transparency and discipline of a global institution. Acting as true fiduciaries, every engagement is grounded in ethical conduct, complete disclosure and the uncompromising best interests of our stakeholders — not our own.'
          },
          {
            fa: 'fa-trophy',
            color: '#1A3A6B',
            bg: 'rgba(26,58,107,.06)',
            border: 'rgba(26,58,107,.2)',
            name: 'Benchmark Excellence',
            tagline: 'We do not follow. We define.',
            desc: 'We do not merely meet industry standards — we author them. Our relentless pursuit of excellence spans every dimension: mandate delivery, research depth, transaction precision and the quality of counsel we provide at every stage.'
          },
          {
            fa: 'fa-handshake',
            color: '#15803d',
            bg: 'rgba(21,128,61,.06)',
            border: 'rgba(21,128,61,.2)',
            name: 'Yield-Centric Partnership',
            tagline: 'Aligned incentives. Sustained value.',
            desc: 'We build long-term relationships centred on measurable, yield-driven success. Our unique synergy of capital markets insight and operational expertise ensures every engagement delivers not just advice — but compounding, high-impact results for clients and communities alike.'
          },
          {
            fa: 'fa-lightbulb',
            color: '#7C3AED',
            bg: 'rgba(124,58,237,.06)',
            border: 'rgba(124,58,237,.2)',
            name: 'Strategic Innovation',
            tagline: 'Data-driven. Bespoke thinking.',
            desc: 'We synthesise deep sector data with bespoke strategic thinking to solve India\'s most complex asset and advisory challenges. By embracing new methodologies and cross-vertical intelligence, we transform traditional sectors into engines of institutional-grade value creation.'
          },
        ].map(p => `
        <div style="position:relative;overflow:hidden;background:var(--parch);border:1px solid var(--border);padding:2.25rem 1.75rem;transition:all .25s;cursor:default;"
             onmouseover="this.style.borderColor='${p.border}';this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 32px rgba(0,0,0,.08)'"
             onmouseout="this.style.borderColor='var(--border)';this.style.transform='translateY(0)';this.style.boxShadow='none'">
          <!-- Top accent bar -->
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${p.color},transparent);"></div>

          <!-- Icon -->
          <div style="width:48px;height:48px;background:${p.bg};border:1px solid ${p.border};display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;">
            <i class="fas ${p.fa}" style="color:${p.color};font-size:1rem;"></i>
          </div>

          <!-- Title -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.3rem;line-height:1.25;">${p.name}</h3>
          <p style="font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${p.color};margin-bottom:1rem;">${p.tagline}</p>

          <!-- Description -->
          <p style="font-size:.84rem;color:var(--ink-soft);line-height:1.85;">${p.desc}</p>
        </div>
        `).join('')}
      </div>
    </div>

  </div>
</div>
<style>
@media(max-width:900px){.principles-grid{grid-template-columns:1fr 1fr!important;}}
@media(max-width:560px){.principles-grid{grid-template-columns:1fr!important;}}
</style>

<!-- JOURNEY / TIMELINE -->
<div class="sec-pd" style="padding-top:7rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:580px;margin:0 auto 5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Our Story</p>
      <h2 class="h2">A Legacy of<br>Innovation</h2>
      <p class="lead" style="margin-top:1.25rem;">Seven years of building India's most trusted multi-vertical advisory practice.</p>
    </div>

    <div style="position:relative;max-width:920px;margin:0 auto;">
      <!-- Centre line -->
      <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(180deg,var(--gold-line),var(--border),transparent);transform:translateX(-50%);"></div>

      ${[
        { year:'2017', desc:'Incorporated as Vivacious Entertainment and Hospitality Pvt. Ltd. in New Delhi. Commenced advisory operations across Hospitality and Entertainment sectors with founding team.' },
        { year:'2018', desc:'Launched hotel management and pre-opening consultancy vertical. First mandates executed for Cygnett, Regenta and Radisson brand properties across North India.' },
        { year:'2019', desc:'Expanded into Real Estate consulting and Retail Leasing strategy, building a truly diversified advisory practice across four complementary verticals.' },
        { year:'2020', desc:'HORECA Supplies vertical launched. Providing end-to-end FF&E, OS&E and kitchen procurement for hotel pre-openings and renovations across India.' },
        { year:'2021', desc:'Launched India Gully brand identity, celebrating Desiness. Deepened retail leasing practice with 30+ brand relationships across fashion, F&B and entertainment.' },
        { year:'2023', desc:'Scaled hospitality transaction advisory with high-value asset sales and acquisitions across Delhi NCR, Chandigarh and Himachal Pradesh. Debt & Special Situations vertical established. Advisory pipeline crosses ₹1,000 Cr+.' },
        { year:'2024', desc:'Digital transformation initiative. India Gully Enterprise Platform (ERP), integrated advisory management, governance and HORECA procurement system launched.' },
        { year:'2025', desc:'₹1,165 Cr+ active advisory pipeline. Prism Tower (₹400 Cr) and Belcibo Hospitality Platform (₹100 Cr) mandates added. Co-advisory with EY on mixed-use transactions. Debt & Special Situations vertical scales with distressed hospitality and real estate mandates.' },
        { year:'2026', desc:'India Gully Investor Relations portal launched. /invest page goes live for qualified institutional investors and family offices. CERT-In OWASP Top-10 security compliance achieved. Eight active mandates across five asset classes.' },
      ].map((t,i) => `
      <div style="display:grid;grid-template-columns:1fr 44px 1fr;gap:0;margin-bottom:2.5rem;align-items:center;">
        ${i%2===0 ? `
        <div style="padding-right:3rem;text-align:right;">
          <div class="card card-lift reveal-l" style="padding:1.75rem;display:inline-block;text-align:left;max-width:360px;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.625rem;">${t.year}</div>
            <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.8;">${t.desc}</p>
          </div>
        </div>
        <div style="display:flex;justify-content:center;position:relative;z-index:1;">
          <div style="width:16px;height:16px;background:var(--gold);border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 3px var(--gold-line);"></div>
        </div>
        <div></div>
        ` : `
        <div></div>
        <div style="display:flex;justify-content:center;position:relative;z-index:1;">
          <div style="width:16px;height:16px;background:var(--gold);border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 3px var(--gold-line);"></div>
        </div>
        <div style="padding-left:3rem;">
          <div class="card card-lift reveal-r" style="padding:1.75rem;max-width:360px;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.625rem;">${t.year}</div>
            <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.8;">${t.desc}</p>
          </div>
        </div>
        `}
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- LEADERSHIP TEAM -->
<div class="sec-wh" id="leadership" style="padding-top:7rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:640px;margin:0 auto 5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Our People</p>
      <h2 class="h2">Board &amp; Key Managerial<br>Personnel</h2>
      <p class="lead" style="margin-top:1.25rem;">Three decades of combined experience spanning hospitality, real estate, retail and entertainment — earned through landmark transactions, not just advisory.</p>
    </div>

    <!-- ── ARUN MANIKONDA — Featured MD Profile ──────────────────── -->
    <div class="reveal" style="background:var(--parch);border:1px solid var(--border);overflow:hidden;margin-bottom:2rem;max-width:1080px;margin:0 auto 2.5rem;">
      <!-- Gold top accent -->
      <div style="height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);"></div>
      <div style="display:grid;grid-template-columns:320px 1fr;gap:0;" class="mob-stack">

        <!-- Left: Photo Column -->
        <div style="position:relative;overflow:hidden;background:var(--ink);min-height:380px;">
          <img loading="lazy" src="/static/team/arun-manikonda.jpg" alt="Arun Kumar Manikonda"
               style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
          <div style="display:none;width:100%;height:380px;background:linear-gradient(135deg,#0a0a12,#141420);align-items:center;justify-content:center;">
            <div style="width:100px;height:100px;background:linear-gradient(135deg,var(--gold),var(--gold-lt));display:flex;align-items:center;justify-content:center;">
              <span style="font-family:'DM Serif Display',Georgia,serif;font-size:2.2rem;color:#fff;">AM</span>
            </div>
          </div>
          <!-- Gradient overlay at bottom -->
          <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 55%,rgba(0,0,0,.85) 100%);pointer-events:none;"></div>
          <!-- Name on photo -->
          <div style="position:absolute;bottom:0;left:0;right:0;padding:1.75rem;">
            <div style="font-size:.55rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.35rem;">Managing Director · Director on Board · KMP</div>
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:#fff;line-height:1.1;text-shadow:0 2px 10px rgba(0,0,0,.5);">Arun Kumar<br>Manikonda</h3>
          </div>
          <!-- LinkedIn badge -->
          <a href="https://www.linkedin.com/in/arun-kumar-manikon" target="_blank" rel="noopener"
             style="position:absolute;top:1.25rem;right:1.25rem;background:rgba(10,102,194,.9);color:#fff;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:.85rem;transition:opacity .2s;text-decoration:none;border-radius:4px;"
             title="Connect on LinkedIn">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>

        <!-- Right: Content Column -->
        <div style="padding:2.5rem;">
          <!-- Current role tag -->
          <div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(184,150,12,.08);border:1px solid rgba(184,150,12,.2);padding:.3rem .875rem;margin-bottom:1.75rem;">
            <i class="fas fa-briefcase" style="color:var(--gold);font-size:.65rem;"></i>
            <span style="font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);">Managing Director, India Gully</span>
          </div>

          <!-- Bio -->
          <p style="font-size:.925rem;color:var(--ink-soft);line-height:1.9;margin-bottom:1.75rem;">
            Arun Kumar Manikonda is the Managing Director &amp; Founder of India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.), India's premier multi-vertical advisory firm. With over <strong style="color:var(--ink);">20 years</strong> of deep domain expertise spanning hospitality, real estate, retail, entertainment and HORECA, Arun has led landmark institutional transactions and built enduring partnerships with India's most prominent developers, hotel brands and investors.
          </p>
          <p style="font-size:.925rem;color:var(--ink-soft);line-height:1.9;margin-bottom:2rem;">
            Prior to founding India Gully, Arun served as <strong style="color:var(--ink);">Managing Director of Entertainment City Limited, Noida</strong> — where he co-led the landmark ₹1,350+ Cr 100% shareholder-consented divestment in joint advisory with Ernst &amp; Young — a clean, consensual transaction with full board and promoter alignment, one of the most significant entertainment real estate deals in India's history.
          </p>

          <!-- Career highlights -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:2rem;">
            ${[
              { icon:'trophy',     color:'#B8960C', label:'₹1,350 Cr+', sub:'Entertainment City divestment (EY joint advisory)' },
              { icon:'hotel',      color:'#1A3A6B', label:'15+ Hotels',   sub:'Pre-opening PMC & brand on-boarding mandates' },
              { icon:'store',      color:'#15803d', label:'1,40,000 sq ft', sub:'Retail leased across premium destinations' },
              { icon:'chart-line', color:'#7C3AED', label:'₹1,165 Cr+',  sub:'Active advisory pipeline under management' },
            ].map(h => `
            <div style="display:flex;gap:.75rem;align-items:flex-start;padding:1rem;background:var(--parch-dk);border:1px solid var(--border-lt);">
              <div style="width:34px;height:34px;background:${h.color}15;border:1px solid ${h.color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="fas fa-${h.icon}" style="color:${h.color};font-size:.72rem;"></i>
              </div>
              <div>
                <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);line-height:1;">${h.label}</div>
                <div style="font-size:.68rem;color:var(--ink-muted);line-height:1.4;margin-top:.18rem;">${h.sub}</div>
              </div>
            </div>`).join('')}
          </div>

          <!-- Prior Role Banner -->
          <div style="padding:1rem 1.25rem;border-left:3px solid var(--gold);background:rgba(184,150,12,.04);margin-bottom:1.75rem;display:flex;align-items:flex-start;gap:.875rem;">
            <i class="fas fa-history" style="color:var(--gold);font-size:.8rem;margin-top:.15rem;flex-shrink:0;"></i>
            <div>
              <div style="font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:.3rem;">Prior Leadership Role</div>
              <div style="font-size:.875rem;color:var(--ink);font-weight:600;">Managing Director — Entertainment City Limited, Noida</div>
              <div style="font-size:.78rem;color:var(--ink-muted);margin-top:.2rem;">₹1,350+ Cr 100% shareholder-consented divestment · Joint advisory alongside Ernst &amp; Young</div>
            </div>
          </div>

          <!-- Contact row -->
          <div style="display:flex;flex-wrap:wrap;gap:.75rem;padding-top:1.5rem;border-top:1px solid var(--border);">
            <a href="tel:+919810889134" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--ink-muted);padding:.5rem .875rem;border:1px solid var(--border);background:var(--parch);transition:all .2s;" onmouseover="this.style.color='var(--gold)';this.style.borderColor='rgba(184,150,12,.3)'" onmouseout="this.style.color='var(--ink-muted)';this.style.borderColor='var(--border)'">
              <i class="fas fa-phone" style="color:var(--gold);font-size:.62rem;"></i>+91 98108 89134
            </a>
            <a href="mailto:akm@indiagully.com" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--ink-muted);padding:.5rem .875rem;border:1px solid var(--border);background:var(--parch);transition:all .2s;" onmouseover="this.style.color='var(--gold)';this.style.borderColor='rgba(184,150,12,.3)'" onmouseout="this.style.color='var(--ink-muted)';this.style.borderColor='var(--border)'">
              <i class="fas fa-envelope" style="color:var(--gold);font-size:.62rem;"></i>akm@indiagully.com
            </a>
            <a href="https://www.linkedin.com/in/arun-kumar-manikon" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--ink-muted);padding:.5rem .875rem;border:1px solid var(--border);background:var(--parch);transition:all .2s;" onmouseover="this.style.color='#0a66c2';this.style.borderColor='rgba(10,102,194,.3)'" onmouseout="this.style.color='var(--ink-muted)';this.style.borderColor='var(--border)'">
              <i class="fab fa-linkedin-in" style="color:#0a66c2;font-size:.72rem;"></i>LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ── PAVAN & AMIT — Two-column profiles ────────────────────── -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;max-width:1080px;margin:0 auto;" class="mob-stack">

      <!-- PAVAN MANIKONDA -->
      <div class="feature-card reveal" style="overflow:hidden;transition-delay:.1s;">
        <!-- Photo -->
        <div style="background:var(--ink);position:relative;overflow:hidden;">
          <div style="position:relative;width:100%;height:280px;overflow:hidden;">
            <img loading="lazy" src="/static/team/pavan-manikonda.jpg" alt="Pavan Kumar Manikonda"
                 style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;transition:transform .5s ease;"
                 onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div style="display:none;width:100%;height:280px;background:linear-gradient(135deg,#0a0a12,#141420);align-items:center;justify-content:center;">
              <div style="width:80px;height:80px;background:linear-gradient(135deg,#1A3A6B,#2a5298);display:flex;align-items:center;justify-content:center;">
                <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;">PM</span>
              </div>
            </div>
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.85) 100%);pointer-events:none;"></div>
            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/in/pavan-kumar-manikonda-49254421/" target="_blank" rel="noopener"
               style="position:absolute;top:1rem;right:1rem;background:rgba(10,102,194,.9);color:#fff;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:.75rem;transition:opacity .2s;text-decoration:none;border-radius:3px;">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <div style="position:absolute;bottom:0;left:0;right:0;padding:1.5rem;">
              <div style="font-size:.54rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(212,174,42,.7);margin-bottom:.25rem;">Executive Director · Director on Board · KMP</div>
              <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:#fff;line-height:1.1;">Pavan Kumar<br>Manikonda</h3>
            </div>
          </div>
        </div>
        <!-- Content -->
        <div style="padding:1.75rem;">
          <div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(26,58,107,.08);border:1px solid rgba(26,58,107,.18);padding:.28rem .75rem;margin-bottom:1.25rem;">
            <i class="fas fa-building" style="color:#1A3A6B;font-size:.6rem;"></i>
            <span style="font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1A3A6B;">Executive Director, India Gully</span>
          </div>
          <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.85;margin-bottom:1.25rem;">
            Pavan Kumar Manikonda is Executive Director &amp; Director on Board of Vivacious Entertainment and Hospitality Pvt. Ltd. (India Gully). An incisive hospitality leader with <strong style="color:var(--ink);">18+ years of experience</strong> in hotel operations, brand on-boarding and HORECA solutions, Pavan drives operational excellence and new business development across India Gully's advisory verticals.
          </p>
          <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.85;margin-bottom:1.5rem;">
            He leads execution across hospitality management mandates, HORECA procurement, FF&amp;E project delivery and hotel brand partnerships — having supplied and on-boarded properties for Mahindra Holidays, Accor, CGH Earth and WelcomHeritage across India.
          </p>
          <!-- Key expertise tags -->
          <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.5rem;">
            ${['Hotel Operations','HORECA Supply','Brand On-Boarding','Pre-Opening PMC','FF&E Procurement','F&B Strategy'].map(t=>`<span style="background:var(--parch-dk);border:1px solid var(--border-lt);color:var(--ink-muted);font-size:.6rem;font-weight:600;letter-spacing:.08em;padding:.22rem .65rem;">${t}</span>`).join('')}
          </div>
          <!-- Contact -->
          <div style="display:flex;flex-direction:column;gap:.4rem;padding-top:1.25rem;border-top:1px solid var(--border);">
            <a href="tel:+916282556067" style="display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">
              <div style="width:26px;height:26px;background:var(--parch);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-phone" style="color:var(--gold);font-size:.55rem;"></i></div>+91 62825 56067
            </a>
            <a href="mailto:pavan@indiagully.com" style="display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">
              <div style="width:26px;height:26px;background:var(--parch);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-envelope" style="color:var(--gold);font-size:.55rem;"></i></div>pavan@indiagully.com
            </a>
            <a href="https://www.linkedin.com/in/pavan-kumar-manikonda-49254421/" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='#0a66c2'" onmouseout="this.style.color='var(--ink-muted)'">
              <div style="width:26px;height:26px;background:var(--parch);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fab fa-linkedin-in" style="color:#0a66c2;font-size:.55rem;"></i></div>LinkedIn Profile
            </a>
          </div>
        </div>
      </div>

      <!-- AMIT JHINGAN -->
      <div class="feature-card reveal" style="overflow:hidden;transition-delay:.2s;">
        <!-- Photo -->
        <div style="background:var(--ink);position:relative;overflow:hidden;">
          <div style="position:relative;width:100%;height:280px;overflow:hidden;">
            <img loading="lazy" src="/static/team/amit-jhingan.png" alt="Amit Jhingan"
                 style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;transition:transform .5s ease;"
                 onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div style="display:none;width:100%;height:280px;background:linear-gradient(135deg,#0a0a12,#141420);align-items:center;justify-content:center;">
              <div style="width:80px;height:80px;background:linear-gradient(135deg,#15803d,#16a34a);display:flex;align-items:center;justify-content:center;">
                <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;">AJ</span>
              </div>
            </div>
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.85) 100%);pointer-events:none;"></div>
            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/in/amit-jhingan-11631451/" target="_blank" rel="noopener"
               style="position:absolute;top:1rem;right:1rem;background:rgba(10,102,194,.9);color:#fff;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:.75rem;transition:opacity .2s;text-decoration:none;border-radius:3px;">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <div style="position:absolute;bottom:0;left:0;right:0;padding:1.5rem;">
              <div style="font-size:.54rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(21,128,61,.7);margin-bottom:.25rem;">President, Real Estate · Key Managerial Personnel</div>
              <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:#fff;line-height:1.1;">Amit<br>Jhingan</h3>
            </div>
          </div>
        </div>
        <!-- Content -->
        <div style="padding:1.75rem;">
          <div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(21,128,61,.08);border:1px solid rgba(21,128,61,.18);padding:.28rem .75rem;margin-bottom:1.25rem;">
            <i class="fas fa-building" style="color:#15803d;font-size:.6rem;"></i>
            <span style="font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#15803d;">President – Real Estate, India Gully</span>
          </div>
          <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.85;margin-bottom:1.25rem;">
            Amit Jhingan is President, Real Estate &amp; Key Managerial Personnel at India Gully. A seasoned real estate specialist with <strong style="color:var(--ink);">15+ years of pan-India experience</strong>, Amit heads India Gully's Real Estate advisory vertical covering transaction advisory, investment sales, retail leasing and commercial asset management.
          </p>
          <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.85;margin-bottom:1.5rem;">
            He has led landmark leasing mandates at Gardens Galleria, Hyatt Andaz Delhi, AIPL Joy Street and Entertainment City — placing 30+ premium brands across India's top retail and hospitality destinations, and advising on commercial and hospitality transactions across Delhi NCR, Gurugram and tier-2 markets.
          </p>
          <!-- Key expertise tags -->
          <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.5rem;">
            ${['Transaction Advisory','Retail Leasing','Investment Sales','Asset Management','Due Diligence','Commercial Real Estate'].map(t=>`<span style="background:var(--parch-dk);border:1px solid var(--border-lt);color:var(--ink-muted);font-size:.6rem;font-weight:600;letter-spacing:.08em;padding:.22rem .65rem;">${t}</span>`).join('')}
          </div>
          <!-- Contact -->
          <div style="display:flex;flex-direction:column;gap:.4rem;padding-top:1.25rem;border-top:1px solid var(--border);">
            <a href="tel:+919899993543" style="display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">
              <div style="width:26px;height:26px;background:var(--parch);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-phone" style="color:var(--gold);font-size:.55rem;"></i></div>+91 98999 93543
            </a>
            <a href="mailto:amit.jhingan@indiagully.com" style="display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">
              <div style="width:26px;height:26px;background:var(--parch);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-envelope" style="color:var(--gold);font-size:.55rem;"></i></div>amit.jhingan@indiagully.com
            </a>
            <a href="https://www.linkedin.com/in/amit-jhingan-11631451/" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='#0a66c2'" onmouseout="this.style.color='var(--ink-muted)'">
              <div style="width:26px;height:26px;background:var(--parch);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fab fa-linkedin-in" style="color:#0a66c2;font-size:.55rem;"></i></div>LinkedIn Profile
            </a>
          </div>
        </div>
      </div>

    </div>

    <div style="background:var(--parch);border:1px solid var(--border);padding:1.5rem 2rem;max-width:700px;margin:2.5rem auto 0;text-align:center;">
      <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.75;"><i class="fas fa-envelope" style="color:var(--gold);margin-right:.5rem;"></i>To connect with our leadership directly, reach us at <a href="mailto:info@indiagully.com" style="color:var(--gold);font-weight:600;">info@indiagully.com</a> or call <strong style="color:var(--ink);">+91 8988 988 988</strong>.</p>
    </div>
  </div>
</div>

<!-- COMPANY INFORMATION -->
<div class="sec-dk" style="padding-top:7rem;">
  <div class="wrap">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;flex-wrap:wrap;gap:2rem;">
      <div>
        <div class="gr-lt"></div>
        <p class="eyebrow-lt" style="margin-bottom:.875rem;">Legal &amp; Regulatory</p>
        <h2 class="h2-lt">Company Information</h2>
      </div>
      <div style="max-width:360px;">
        <p style="font-size:.82rem;color:rgba(255,255,255,.4);line-height:1.8;">Incorporated in 2017 under the Companies Act 2013. ROC: NCT of Delhi &amp; Haryana. All advisory mandates governed by applicable laws of India.</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.05);">
      ${[
        { label:'Legal Name',       value:'Vivacious Entertainment and Hospitality Pvt. Ltd.' },
        { label:'Brand',            value:'India Gully™' },
        { label:'CIN',              value:'U74999DL2017PTC323237' },
        { label:'Incorporation',    value:'2017, New Delhi, India' },
        { label:'Registered Office',value:'New Delhi, India' },
        { label:'GSTIN',            value:'07AAGCV0867P1ZN' },
        { label:'Type',             value:'Private Limited Company' },
        { label:'ROC',              value:'Registrar of Companies, NCT of Delhi & Haryana' },
        { label:'Compliance',       value:'Companies Act, 2013 · ICSI SS-1 & SS-2' },
      ].map((item, ii) => `
      <div style="padding:1.75rem 1.5rem;background:rgba(255,255,255,.025);transition:all .22s;position:relative;overflow:hidden;cursor:default;" onmouseover="this.style.background='rgba(255,255,255,.05)'" onmouseout="this.style.background='rgba(255,255,255,.025)'">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),transparent);opacity:.4;"></div>
        <div style="font-size:.58rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(184,150,12,.55);margin-bottom:.625rem;">${item.label}</div>
        <div style="font-size:.9rem;font-weight:500;color:#fff;line-height:1.4;">${item.value}</div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ══ BY THE NUMBERS ════════════════════════════════════════════════════ -->\n
<div style="background:var(--bg);padding:4.5rem 0;border-top:1px solid var(--border);">
  <div class="wrap">
    <div style="text-align:center;margin-bottom:3rem;">
      <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;">Quantified Impact</p>
      <h2 class="h2" style="margin:0;">India Gully By The Numbers</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;">
      ${[
        { n:'₹1,165 Cr+', label:'Active Pipeline', sub:'8 mandates across 5 asset classes', icon:'chart-bar', color:'#B8960C' },
        { n:'₹2,000 Cr+', label:'Transactions Advised', sub:'Including ₹1,350 Cr+ Entertainment City divestment', icon:'trophy', color:'#1A3A6B' },
        { n:'1,40,000 sq ft', label:'Retail Leased', sub:'Across Delhi NCR and Gurugram', icon:'store', color:'#15803d' },
        { n:'15+', label:'Hotel Projects', sub:'PMC, pre-opening & HORECA supply', icon:'hotel', color:'#7C3AED' },
        { n:'500+ SKUs', label:'HORECA Catalogue', sub:'FF&E, OS&E, kitchen, linen, uniforms', icon:'utensils', color:'#B8960C' },
        { n:'₹50 Cr+', label:'Procurement Managed', sub:'Cumulative HORECA procurement value', icon:'truck', color:'#065F46' },
        { n:'30+', label:'Retail Brands', sub:'Brand partnerships in NCR & Gurugram', icon:'tag', color:'#1A3A6B' },
        { n:'8+', label:'Years', sub:'Established 2017, incorporated in Delhi', icon:'calendar-alt', color:'#B8960C' },
      ].map(s => `
      <div class="reveal" style="padding:2rem;border:1px solid var(--border-lt);text-align:center;transition:all .28s;position:relative;overflow:hidden;" onmouseover="this.style.borderColor='rgba(184,150,12,.3)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='var(--border-lt)';this.style.transform='translateY(0)'">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${s.color},transparent);opacity:0;transition:opacity .3s;" class="num-top"></div>
        <i class="fas fa-${s.icon}" style="font-size:1.1rem;color:${s.color};margin-bottom:1rem;display:block;"></i>
        <div class="count-up" data-target="${s.n}" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.85rem;color:${s.color};line-height:1;margin-bottom:.5rem;letter-spacing:-.02em;">${s.n}</div>
        <div style="font-size:.72rem;font-weight:700;color:var(--ink);letter-spacing:.04em;margin-bottom:.35rem;">${s.label}</div>
        <p style="font-size:.72rem;color:var(--ink-muted);line-height:1.55;margin:0;">${s.sub}</p>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ ACCOLADES STRIP ══════════════════════════════════════════════════ -->
<div style="background:var(--parch-dk);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:2rem 0;overflow:hidden;">
  <div class="wrap">
    <div style="text-align:center;margin-bottom:1.5rem;">
      <span style="font-size:.58rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--ink-muted);">Credentials & Affiliations</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;align-items:stretch;">
      ${[
        { icon:'shield-alt',    color:'#065F46', bg:'rgba(22,163,74,.08)', border:'rgba(22,163,74,.2)',  title:'CERT-In Compliant',         sub:'Cyber security advisory standard' },
        { icon:'check-shield',  color:'#1A3A6B', bg:'rgba(37,99,235,.08)', border:'rgba(37,99,235,.2)',  title:'OWASP Top-10 Secure',       sub:'Platform security verified 2025' },
        { icon:'file-contract', color:'#B8960C', bg:'rgba(184,150,12,.08)',border:'rgba(184,150,12,.2)', title:'Mutual NDA Framework',      sub:'All mandates NDA-protected' },
        { icon:'balance-scale', color:'#7C3AED', bg:'rgba(124,58,237,.08)',border:'rgba(124,58,237,.2)', title:'SEBI-Compliant Advisory',   sub:'Transaction advisory within regulatory framework' },
        { icon:'building',      color:'#065F46', bg:'rgba(22,163,74,.08)', border:'rgba(22,163,74,.2)',  title:'EY Co-Advisory',            sub:'Joint mandates with Ernst & Young' },
        { icon:'chart-bar',     color:'#1A3A6B', bg:'rgba(37,99,235,.08)', border:'rgba(37,99,235,.2)',  title:'CBRE Co-Advisory',          sub:'Commercial & hospitality mandates' },
        { icon:'registered',    color:'#B8960C', bg:'rgba(184,150,12,.08)',border:'rgba(184,150,12,.2)', title:'MCA Registered',            sub:'CIN: U74999DL2017PTC323237' },
        { icon:'map-marked-alt',color:'#7C3AED', bg:'rgba(124,58,237,.08)',border:'rgba(124,58,237,.2)', title:'Pan-India Network',         sub:'Delhi · Chandigarh · Mumbai · Kerala' },
      ].map(a => `
      <div class="reveal" style="display:flex;align-items:center;gap:.75rem;background:${a.bg};border:1px solid ${a.border};padding:.75rem 1.25rem;border-radius:3px;flex:0 1 auto;white-space:nowrap;transition:transform .2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
        <i class="fas fa-${a.icon}" style="color:${a.color};font-size:.85rem;flex-shrink:0;"></i>
        <div>
          <div style="font-size:.68rem;font-weight:700;color:var(--ink);letter-spacing:.02em;">${a.title}</div>
          <div style="font-size:.6rem;color:var(--ink-muted);">${a.sub}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ RECOGNITION & MEDIA ═══════════════════════════════════════════════ -->\n
<div style="background:var(--parch);padding:4.5rem 0;border-top:1px solid var(--border);">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;">
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.875rem;">Recognition</p>
        <h2 class="h2" style="margin-bottom:2rem;">What Sets India Gully Apart</h2>
        <div style="display:flex;flex-direction:column;gap:1.25rem;">
          ${[
            { icon:'star', color:'#B8960C', title:'India\'s Only Multi-Vertical Boutique', desc:'We operate simultaneously across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA — a breadth matched by no other boutique advisory firm in India.' },
            { icon:'shield-alt', color:'#1A3A6B', title:'Institutional Rigour, Boutique Service', desc:'Every mandate receives the same financial rigour applied at tier-1 investment banks, combined with the direct personal accountability of a boutique advisor.' },
            { icon:'hands-helping', color:'#15803d', title:'Source-to-Close Advisory', desc:'From mandate origination through due diligence, NDA management, EOI, IM preparation and deal closing — we own the full process.' },
            { icon:'map-marked-alt', color:'#7C3AED', title:'Pan-India Network', desc:'From Lutyens\' Delhi to Kasauli, from Chandigarh to Aerocity — India Gully\'s network spans the full geography of Indian hospitality and real estate.' },
          ].map(s => `
          <div style="display:flex;gap:1rem;align-items:flex-start;padding:1.25rem;border:1px solid var(--border-lt);transition:all .22s;" onmouseover="this.style.borderColor='rgba(184,150,12,.25)';this.style.background='rgba(184,150,12,.02)'" onmouseout="this.style.borderColor='var(--border-lt)';this.style.background='transparent'">
            <div style="width:40px;height:40px;background:${s.color}15;border:1px solid ${s.color}25;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-${s.icon}" style="color:${s.color};font-size:.85rem;"></i>
            </div>
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.98rem;color:var(--ink);margin-bottom:.3rem;">${s.title}</div>
              <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.65;margin:0;">${s.desc}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.875rem;">Marquee Mandates</p>
        <h2 class="h2" style="margin-bottom:2rem;">Selected Highlights</h2>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          ${[
            { value:'₹1,350 Cr+', title:'Entertainment City Limited Divestment', desc:'Joint advisory mandate with EY — 100% shareholder-consented divestment with full promoter alignment, comprehensive due diligence and structured deal closure.', sector:'Entertainment', color:'#7C3AED' },
            { value:'₹400 Cr', title:'Prism Tower, Gurugram', desc:'312-key mixed-use hospitality & commercial asset advisory mandate. REIT-grade exit potential. 10 km metro connectivity. Active transaction.', sector:'Real Estate', color:'#1A3A6B' },
            { value:'₹70 Cr', title:'Hotel Rajshree & Spa, Chandigarh', desc:'41-key boutique hotel — full HORECA procurement refresh, operational enhancement and active asset sale advisory.', sector:'Hospitality', color:'#15803d' },
            { value:'₹45 Cr', title:'WelcomHeritage Santa Roza, Kasauli', desc:'44-key luxury heritage resort under ITC WelcomHeritage brand. End-to-end transaction advisory and investor outreach.', sector:'Heritage Hospitality', color:'#B8960C' },
            { value:'₹30 Cr', title:'Maple Resort Chail, Himachal Pradesh', desc:'30-key boutique mountain resort at 2,515 metres. Owner-direct advisory and active buyer outreach for premium mountain hospitality asset.', sector:'Hospitality', color:'#065F46' },
          ].map(m => `
          <div style="padding:1.25rem;border:1px solid var(--border-lt);display:flex;gap:1rem;align-items:flex-start;transition:all .22s;" onmouseover="this.style.borderColor='rgba(184,150,12,.25)'" onmouseout="this.style.borderColor='var(--border-lt)'">
            <div style="flex-shrink:0;text-align:right;min-width:80px;">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:${m.color};line-height:1;">${m.value}</div>
              <span style="background:${m.color};color:#fff;font-size:.52rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.15rem .45rem;display:inline-block;margin-top:.3rem;">${m.sector}</span>
            </div>
            <div style="flex:1;">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.9rem;color:var(--ink);margin-bottom:.3rem;line-height:1.2;">${m.title}</div>
              <p style="font-size:.75rem;color:var(--ink-muted);line-height:1.6;margin:0;">${m.desc}</p>
            </div>
          </div>`).join('')}
          <a href="/listings" style="display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.875rem;background:var(--ink);color:#fff;text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;" onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
            <i class="fas fa-folder-open" style="font-size:.65rem;"></i>View All Active Mandates
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

`
  return c.html(layout('Our Story & Team', content, {
    description: "About India Gully. Celebrating Desiness since 2017. Leadership, vision, values and the story behind India's premier multi-vertical advisory firm.",
    canonical: 'https://indiagully.com/about',
    ogImage: 'https://indiagully.com/static/og.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          name: 'About India Gully',
          url: 'https://indiagully.com/about',
          description: "India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.) — advisory firm celebrating Desiness since 2017.",
          mainEntity: {
            '@type': 'Organization',
            name: 'India Gully',
            legalName: 'Vivacious Entertainment and Hospitality Pvt. Ltd.',
            foundingDate: '2017',
            url: 'https://indiagully.com',
            employee: [
              { '@type': 'Person', name: 'Arun Kumar Manikonda', jobTitle: 'Managing Director' },
              { '@type': 'Person', name: 'Pavan Kumar Manikonda', jobTitle: 'Executive Director' },
              { '@type': 'Person', name: 'Amit Jhingan', jobTitle: 'President, Real Estate' }
            ]
          }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://indiagully.com/' },
            { '@type': 'ListItem', position: 2, name: 'Our Story & Team', item: 'https://indiagully.com/about' },
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'When was India Gully founded?',
              acceptedAnswer: { '@type': 'Answer', text: 'India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.) was founded in 2017. The firm celebrates Desiness — an ethos of bringing institutional rigour to India\'s real estate, hospitality, retail, entertainment and HORECA sectors.' }
            },
            {
              '@type': 'Question',
              name: 'Who leads India Gully?',
              acceptedAnswer: { '@type': 'Answer', text: 'India Gully is led by Managing Director Arun Kumar Manikonda, Executive Director Pavan Kumar Manikonda, and President of Real Estate Amit Jhingan. The senior team has 40+ years of combined advisory experience across Indian real estate and hospitality.' }
            },
            {
              '@type': 'Question',
              name: 'What does India Gully mean by celebrating Desiness?',
              acceptedAnswer: { '@type': 'Answer', text: "Celebrating Desiness is India Gully's founding philosophy — a commitment to building distinctly Indian institutions, assets and hospitality brands that carry national character and global standards." }
            },
            {
              '@type': 'Question',
              name: 'How large is India Gully\'s advisory pipeline?',
              acceptedAnswer: { '@type': 'Answer', text: 'As of 2026, India Gully manages an active advisory pipeline of ₹1,165 Cr+ across 8 mandates in Real Estate, Hospitality, F&B, Retail, and Debt & Special Situations.' }
            }
          ]
        }
      ]
    }
  }))
})

export default app
