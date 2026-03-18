import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { VERTICALS, LISTINGS, HOSPITALITY_BRANDS, RETAIL_BRANDS, ADVISORY_PARTNERS } from '../lib/constants'

// ── RECENT INSIGHTS (3 latest) ───────────────────────────────────────────────
const RECENT_INSIGHTS = [
  {
    id: 'horeca-cloud-kitchen-india-2026',
    category: 'HORECA',
    date: 'March 2026',
    readTime: '9 min read',
    title: 'Cloud Kitchens & Dark Stores: India\'s HORECA Infrastructure Revolution',
    excerpt: 'India\'s online food delivery GMV has crossed ₹1,00,000 Cr. We map how cloud kitchens, dark stores and ghost brands are reshaping HORECA procurement, supply chains and real estate demand in 2026.',
    img: '/static/mandates/hero/hero-hotel-products.jpg',
    color: '#065F46',
  },
  {
    id: 'india-hospitality-brand-strategy-2026',
    category: 'Hospitality',
    date: 'March 2026',
    readTime: '12 min read',
    title: 'Hotel Brand Affiliation in India 2026: Choosing the Right Flag for Your Asset',
    excerpt: 'With 20+ international and domestic brands competing for India hotel management agreements, selecting the right brand is the most consequential decision a hotel owner makes. Our complete evaluation framework.',
    img: '/static/mandates/kasauli/kasauli-img2.jpg',
    color: '#1A3A6B',
  },
  {
    id: 'india-retail-leasing-outlook-2026',
    category: 'Retail',
    date: 'March 2026',
    readTime: '9 min read',
    title: 'India Retail Leasing 2026: Mall Demand, Brand Expansion & Rental Benchmarks',
    excerpt: 'India\'s organised retail leasing market is set to absorb 8–10 million sq ft of new supply in 2026. We examine demand drivers, city-wise rental benchmarks, and the evolving tenant mix strategy in Grade-A malls.',
    img: '/static/mandates/jaipur/jaipur-render-aerial.jpg',
    color: '#B8960C',
  },
]

const app = new Hono()

// ── HERO SLIDES ─────────────────────────────────────────────────────────────
// 3 Active Mandate slides + 3 Advisory Service slides
const SLIDES = [
  // ── MANDATE 1: Prism Tower, Gurgaon ────────────────────────────────────
  {
    bg: '#030610',
    tag: 'Active Mandate · Gurgaon · ₹400 Cr · Due Diligence Stage',
    h1a: 'Prism Tower',
    h1b: 'Gurgaon.',
    h1c: '312 Keys · Mixed-Use · REIT-Grade',
    sub: 'Institutional-grade mixed-use commercial building on Gurgaon-Faridabad Road, part of a 4-star hotel complex. 312 keys. REIT listing potential. India Gully advising on acquisition & due diligence.',
    cta1: { text: 'View Mandate & Sign NDA', href: '/listings/prism-tower-gurgaon' },
    cta2: { text: 'Enquire via WhatsApp', href: 'https://wa.me/919810889134?text=Hi%20Arun%2C%20I%20am%20interested%20in%20Prism%20Tower%20Gurgaon%20mandate' },
    img: '/static/mandates/prism/prism-tower-hero.jpg',
    label: 'REIT-Grade · ₹400 Cr',
    spoc: 'Arun Manikonda',
    value: '₹400 Cr',
    type: 'mandate',
  },
  // ── MANDATE 2: Belcibo Multi-Brand F&B Platform ─────────────────────────
  {
    bg: '#0a0008',
    tag: 'Growth Equity · Delhi NCR & Goa · ₹100 Cr · Active Fundraise',
    h1a: 'Belcibo',
    h1b: 'F&B Platform.',
    h1c: '15+ Outlets · Pan-India Rollout',
    sub: 'Scalable multi-brand F&B platform — Imperfecto, Noor, Begam, Khybani, Informal, RuinPub, Patio & more. Seeking strategic growth equity partner for pan-India expansion. Exclusive advisory mandate with India Gully.',
    cta1: { text: 'View Mandate & Sign NDA', href: '/listings/belcibo-hospitality-platform' },
    cta2: { text: 'Express Interest', href: 'https://wa.me/919810889134?text=Hi%20Arun%2C%20interested%20in%20Belcibo%20growth%20equity%20mandate' },
    img: '/static/mandates/belcibo/belcibo-cover.jpg',
    label: 'Growth Equity · ₹100 Cr',
    spoc: 'Arun Manikonda',
    value: '₹100 Cr',
    type: 'mandate',
  },
  // ── MANDATE 3: Sawasdee JLG Galleria, Noida ─────────────────────────────
  {
    bg: '#020b14',
    tag: 'Outright Sale · Noida · ₹150 Cr · Negotiation Ready',
    h1a: 'Sawasdee JLG',
    h1b: 'Galleria.',
    h1c: '114 Keys · Hotel + Retail Mall · Noida',
    sub: 'Structure-ready 114-key hotel with integrated retail mall in Sector 63, Noida. Independent hotel access, possession-ready. India Gully holds the exclusive sale mandate. Outright sale — negotiation ready.',
    cta1: { text: 'View Mandate & Sign NDA', href: '/listings/sawasdee-jlg-noida' },
    cta2: { text: 'Enquire via WhatsApp', href: 'https://wa.me/919810889134?text=Hi%20Arun%2C%20interested%20in%20Sawasdee%20JLG%20Galleria%20Noida%20mandate' },
    img: '/static/mandates/sawasdee/sawasdee-cover.jpg',
    label: 'Hotel + Mall · ₹150 Cr',
    spoc: 'Arun Manikonda',
    value: '₹150 Cr',
    type: 'mandate',
  },
  // ── ADVISORY 1: Transaction Advisory ───────────────────────────────────
  {
    bg: '#040408',
    tag: 'Transaction Advisory · Real Estate · Hospitality · Retail',
    h1a: 'India Gully',
    h1b: 'Advisory.',
    h1c: '₹2,000 Cr+ Transacted Across Verticals',
    sub: "India's premier multi-vertical advisory — Real Estate acquisitions, Hospitality asset sales, Retail leasing, Entertainment divestments and Debt solutions. EY & CBRE co-advisory credentials. NDA-governed mandates.",
    cta1: { text: 'View Active Mandates', href: '/listings' },
    cta2: { text: 'Submit Your Mandate', href: '/contact' },
    img: '/static/mandates/hero/hero-ig-advisory-skyline.jpg',
    label: 'Transaction Advisory',
    type: 'advisory',
  },
  // ── ADVISORY 2: Growth Equity & F&B Platform Advisory ──────────────────
  {
    bg: '#050408',
    tag: 'Growth Equity Advisory · F&B Platforms · HORECA Solutions',
    h1a: 'Growth Capital',
    h1b: 'Advisory.',
    h1c: 'F&B · Hospitality · Entertainment',
    sub: "India Gully structures and executes growth equity rounds for India's most exciting F&B platforms and hospitality brands. Proprietary deal flow. Institutional-grade information memoranda. NDA-protected pipeline.",
    cta1: { text: 'Explore Advisory Services', href: '/services' },
    cta2: { text: 'Discuss Your Mandate', href: '/contact' },
    img: '/static/mandates/hero/hero-fine-dining.jpg',
    label: 'Growth Equity · F&B',
    type: 'advisory',
  },
  // ── ADVISORY 3: HORECA & Procurement ───────────────────────────────────
  {
    bg: '#050404',
    tag: 'HORECA Solutions · Procurement · FF&E · OS&E · Pan-India',
    h1a: 'HORECA',
    h1b: 'Solutions.',
    h1c: '500+ SKUs · 15+ Hotel Properties',
    sub: "India Gully's HORECA division is the complete hospitality supply partner — FF&E, OS&E, kitchen equipment, linen, uniforms and guest amenities delivered on spec and on schedule across India.",
    cta1: { text: 'Explore HORECA Services', href: '/horeca' },
    cta2: { text: 'Browse Product Catalogue', href: '/horeca/catalogue' },
    img: '/static/mandates/hero/hero-hotel-products.jpg',
    label: 'HORECA Procurement',
    type: 'advisory',
  },
]

app.get('/', (c) => {
  const content = `

<!-- ══ HERO CAROUSEL ════════════════════════════════════════════════════ -->
<!-- Visually-hidden semantic h1 for SEO — carousel slides use h2 -->
<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">India Gully Advisory — Real Estate, Hospitality &amp; HORECA Advisory in India</h1>
<div class="car">
  <div class="car-track">
    ${SLIDES.map((s, i) => `
    <div class="car-slide${i === 0 ? ' on' : ''}">
      <!-- Full-bleed background with Ken Burns -->
      <div class="car-bg" style="background-image:url('${s.img}');background-color:${s.bg};"></div>
      <!-- Cinematic layered overlays -->
      <div class="car-ov-main"></div>
      <div class="car-ov-btm"></div>
      <div class="car-ov-gold"></div>
      <!-- Gold grid texture -->
      <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.025) 1px,transparent 1px);background-size:88px 88px;pointer-events:none;"></div>
      <!-- Star / particle canvas overlay -->
      <canvas class="hero-stars" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.55;z-index:1;"></canvas>
      <div class="car-body">
        <div class="wrap" style="width:100%;">
          <div style="max-width:760px;">

            <!-- Tag line — slides in from left -->
            <div class="s-tag" style="display:flex;align-items:center;gap:.875rem;margin-bottom:2rem;">
              <div style="width:36px;height:1px;background:linear-gradient(90deg,var(--gold),var(--gold-lt));flex-shrink:0;"></div>
              <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">${s.tag}</span>
            </div>

            <!-- Display headline — h2 for carousel slides; one true h1 is injected below for SEO -->
            <div class="s-txt">
              <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(3.4rem,7.5vw,7rem);line-height:1.01;color:#fff;letter-spacing:-.025em;font-weight:400;margin-bottom:1.75rem;">
                ${s.h1a}<br>
                <em style="font-style:italic;color:var(--gold);display:inline-block;position:relative;">${s.h1b}<span style="position:absolute;bottom:-.15em;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);opacity:.5;"></span></em><br>
                <span style="font-size:.48em;font-weight:300;color:rgba(255,255,255,.42);letter-spacing:-.01em;">${s.h1c}</span>
              </h2>
              <p style="font-size:1.05rem;line-height:1.9;color:rgba(255,255,255,.62);max-width:560px;margin-bottom:2.5rem;font-weight:400;">${s.sub}</p>
            </div>

            <!-- CTAs -->
            <div class="s-cta" style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;">
              <a href="${s.cta1.href}" class="btn btn-g" style="min-width:200px;justify-content:center;">${s.cta1.text}</a>
              <a href="${s.cta2.href}" ${(s as any).type === 'mandate' && s.cta2.href.startsWith('https://wa.me') ? 'target="_blank" rel="noopener"' : ''} class="btn btn-ghost" style="min-width:160px;justify-content:center;">${s.cta2.text}</a>
            </div>

            ${(s as any).type === 'mandate' && (s as any).spoc ? `
            <!-- Mandate SPOC strip -->
            <div style="display:inline-flex;align-items:center;gap:.75rem;margin-top:1.5rem;padding:.5rem 1rem .5rem .5rem;background:rgba(0,0,0,.35);backdrop-filter:blur(8px);border:1px solid rgba(184,150,12,.25);">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:.78rem;flex-shrink:0;">A</div>
              <div>
                <div style="font-size:.55rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.15rem;">SPOC · India Gully</div>
                <div style="font-size:.78rem;font-weight:600;color:#fff;">${(s as any).spoc}</div>
              </div>
              <div style="width:1px;height:28px;background:rgba(255,255,255,.12);margin:0 .25rem;"></div>
              <div>
                <div style="font-size:.55rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.15rem;">Mandate Value</div>
                <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--gold);">${(s as any).value}</div>
              </div>
            </div>` : ''}

          </div>
        </div>
      </div>

      <!-- Slide label — bottom right -->
      <div style="position:absolute;bottom:3.5rem;right:2.5rem;z-index:3;display:flex;flex-direction:column;align-items:flex-end;gap:.35rem;">
        ${(s as any).type === 'mandate' ? `<div style="background:rgba(184,150,12,.85);padding:.22rem .6rem;font-size:.52rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fff;margin-bottom:.25rem;">Active Mandate · NDA Required</div>` : `<div style="background:rgba(26,58,107,.7);padding:.22rem .6rem;font-size:.52rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:.25rem;">Advisory Services</div>`}
        <div style="width:1px;height:40px;background:linear-gradient(180deg,transparent,rgba(184,150,12,.5));margin-left:auto;"></div>
        <span style="font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.3);">${s.label}</span>
      </div>
    </div>
    `).join('')}
  </div>

  <!-- Controls -->
  <div class="car-ct"></div>
  <button class="car-arr car-prev" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>
  <button class="car-arr car-next" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>
  <div class="car-dots" role="tablist">
    ${SLIDES.map((_,i) => `<button class="c-dot${i===0?' on':''}" role="tab" aria-label="Go to slide ${i+1}"></button>`).join('')}
  </div>
  <div class="car-pb" aria-hidden="true"></div>

  <!-- Scroll hint -->
  <div style="position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);z-index:10;display:flex;flex-direction:column;align-items:center;gap:.5rem;">
    <span style="font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.25);">Scroll</span>
    <div style="width:1px;height:32px;background:linear-gradient(180deg,rgba(184,150,12,.4),transparent);animation:pulse-line 2s ease-in-out infinite;"></div>
  </div>
</div>
<style>
@keyframes pulse-line{0%,100%{opacity:.3;transform:scaleY(.8)}50%{opacity:.8;transform:scaleY(1)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
</style>
<script>
(function(){
  /* ── Hero star/particle canvas ── */
  function initStars(canvas){
    var W = canvas.offsetWidth || window.innerWidth;
    var H = canvas.offsetHeight || window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');
    if(!ctx) return;
    var COUNT = Math.min(Math.floor(W * H / 8000), 120);
    var stars = Array.from({length: COUNT}, function(){
      return {
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.2 + 0.2,
        sp: Math.random() * 0.4 + 0.05,
        op: Math.random() * 0.6 + 0.15,
        tw: Math.random() * Math.PI * 2,
        ts: Math.random() * 0.015 + 0.005
      };
    });
    var raf;
    function draw(){
      ctx.clearRect(0, 0, W, H);
      stars.forEach(function(s){
        s.tw += s.ts;
        s.y  -= s.sp;
        if(s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
        var alpha = s.op * (0.6 + 0.4 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,220,100,' + alpha.toFixed(2) + ')';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return function(){ cancelAnimationFrame(raf); };
  }
  var destroyers = [];
  function startAll(){
    destroyers.forEach(function(d){ d(); });
    destroyers = [];
    document.querySelectorAll('.hero-stars').forEach(function(c){
      destroyers.push(initStars(c));
    });
  }
  /* start after hero loads */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', startAll);
  } else {
    setTimeout(startAll, 200);
  }
  /* Pause stars on non-active slides to save CPU */
  var obs = new MutationObserver(function(){
    document.querySelectorAll('.car-slide').forEach(function(slide){
      var c = slide.querySelector('.hero-stars');
      if(!c) return;
      c.style.opacity = slide.classList.contains('on') ? '0.55' : '0';
    });
  });
  document.querySelectorAll('.car-slide').forEach(function(s){
    obs.observe(s, {attributes:true, attributeFilter:['class']});
  });
})();
</script>

<!-- ══ GOLD SERVICE TICKER ═══════════════════════════════════════════════ -->
<div class="ticker" role="marquee" aria-label="India Gully services">
  <div class="ticker-tr">
    ${[
      'Real Estate Advisory','Transaction Advisory','Retail Leasing Strategy',
      'Hotel Management Advisory','Entertainment Destinations','Debt & Special Situations',
      'HORECA Solutions','Brand On-Boarding','Financial Feasibility','Project Management',
      'Asset Management','Greenfield Hotels','Mall Leasing','FF&E Procurement',
      '₹1,165 Cr+ Pipeline','15+ Hotel Projects','35+ Retail Brands','Pan-India Presence'
    ].map(t=>`<span style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(0,0,0,.75);padding:0 2.5rem;">${t}</span><span style="color:rgba(0,0,0,.25);font-size:.45rem;flex-shrink:0;">◆</span>`).join('')}
    ${[
      'Real Estate Advisory','Transaction Advisory','Retail Leasing Strategy',
      'Hotel Management Advisory','Entertainment Destinations','Debt & Special Situations',
      'HORECA Solutions','Brand On-Boarding','Financial Feasibility','Project Management',
      'Asset Management','Greenfield Hotels','Mall Leasing','FF&E Procurement',
      '₹1,165 Cr+ Pipeline','15+ Hotel Projects','35+ Retail Brands','Pan-India Presence'
    ].map(t=>`<span style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(0,0,0,.75);padding:0 2.5rem;">${t}</span><span style="color:rgba(0,0,0,.25);font-size:.45rem;flex-shrink:0;">◆</span>`).join('')}
  </div>
</div>

<!-- ══ STATS BAR ════════════════════════════════════════════════════════ -->
<div style="position:relative;z-index:1;" id="homeStatsSection">
  <div id="homeStats">
    ${[
      { n:'₹1,165 Cr+', l:'Advisory Pipeline',      sub:'Active mandates under advisory', icon:'chart-line' },
      { n:'15+',         l:'Hotel Projects',          sub:'Pre-opening & PMC mandates', icon:'hotel' },
      { n:'30+',         l:'Retail Brand Partners',   sub:'Leasing & franchise advisory', icon:'store' },
      { n:'20+',         l:'Hospitality Brands',      sub:'Management & on-boarding', icon:'concierge-bell' },
      { n:'Pan-India',   l:'Operations Reach',        sub:'Tier 1, 2 &amp; 3 cities', icon:'map-marked-alt' },
    ].map((s) => `
    <div class="home-stat-cell">
      <i class="fas fa-${s.icon}" style="font-size:.7rem;color:var(--gold);opacity:.6;display:block;margin-bottom:.625rem;"></i>
      <div class="stat-n count-up" data-target="${s.n}" style="font-size:2.7rem;letter-spacing:-.03em;">${s.n}</div>
      <div style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink);margin-top:.4rem;margin-bottom:.2rem;">${s.l}</div>
      <div style="font-size:.67rem;color:var(--ink-muted);">${s.sub}</div>
    </div>`).join('')}
  </div>
</div>
<!-- gold rule separator -->
<div class="sec-sep"></div>

<!-- ══ CREDENTIALS PROOF BAR ════════════════════════════════════════════ -->
<div id="proofBar" style="background:#0c0c18;border-top:1px solid rgba(184,150,12,.15);border-bottom:1px solid rgba(184,150,12,.15);padding:.85rem 0;overflow:hidden;position:relative;">
  <!-- subtle animated gold line top -->
  <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(184,150,12,.4) 30%,rgba(212,174,42,.6) 50%,rgba(184,150,12,.4) 70%,transparent 100%);animation:goldShimmer 3s ease-in-out infinite;"></div>
  <div class="proof-track" style="display:flex;align-items:center;gap:0;white-space:nowrap;animation:proofScroll 38s linear infinite;">
    ${[
      { icon:'shield-alt',     color:'#22c55e', text:'CERT-In Compliant' },
      { icon:'check-double',   color:'#B8960C', text:'OWASP Top-10 Secure' },
      { icon:'handshake',      color:'#60a5fa', text:'EY Co-Advisory Partner' },
      { icon:'chart-line',     color:'#B8960C', text:'₹1,165 Cr+ Active Pipeline' },
      { icon:'hotel',          color:'#a78bfa', text:'15+ Hotel Projects Executed' },
      { icon:'store',          color:'#34d399', text:'35+ Retail Brand Partnerships' },
      { icon:'building',       color:'#60a5fa', text:'CBRE Co-Advisory Partner' },
      { icon:'balance-scale',  color:'#fbbf24', text:'SEBI-Framework Advisory' },
      { icon:'registered',     color:'#B8960C', text:'MCA Registered · CIN U74999DL2017PTC323237' },
      { icon:'map-marked-alt', color:'#a78bfa', text:'Pan-India · Delhi · Chandigarh · Mumbai · Kerala' },
      { icon:'trophy',         color:'#fbbf24', text:'₹2,000 Cr+ Transactions Advised' },
      { icon:'calendar-alt',   color:'#34d399', text:'Established 2017 · 8+ Years' },
      { icon:'file-contract',  color:'#B8960C', text:'Mutual NDA Framework · All Mandates' },
      { icon:'concierge-bell', color:'#a78bfa', text:'20+ Hospitality Brand Partnerships' },
    ].concat([
      { icon:'shield-alt',     color:'#22c55e', text:'CERT-In Compliant' },
      { icon:'check-double',   color:'#B8960C', text:'OWASP Top-10 Secure' },
      { icon:'handshake',      color:'#60a5fa', text:'EY Co-Advisory Partner' },
      { icon:'chart-line',     color:'#B8960C', text:'₹1,165 Cr+ Active Pipeline' },
      { icon:'hotel',          color:'#a78bfa', text:'15+ Hotel Projects Executed' },
      { icon:'store',          color:'#34d399', text:'35+ Retail Brand Partnerships' },
    ]).map(item => `
    <span style="display:inline-flex;align-items:center;gap:.5rem;padding:0 2rem;font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);">
      <i class="fas fa-${item.icon}" style="color:${item.color};font-size:.58rem;flex-shrink:0;"></i>${item.text}
    </span><span style="color:rgba(184,150,12,.3);font-size:.45rem;flex-shrink:0;">◆</span>`).join('')}
  </div>
  <style>
    @keyframes proofScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes goldShimmer { 0%,100%{opacity:.5} 50%{opacity:1} }
    #proofBar:hover .proof-track { animation-play-state:paused; }
    @media(prefers-reduced-motion:reduce){ .proof-track{animation:none;} }
  </style>
</div>

<!-- ══ PARTNER MARQUEE ══════════════════════════════════════════════════ -->
<div class="partner-marquee-section" style="background:var(--parch-dk);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:1.1rem 0;overflow:hidden;">
  <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0;">
    <div class="partner-marquee-label" style="flex-shrink:0;padding:0 1.5rem;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-muted);white-space:nowrap;">
      Partners
    </div>
    <div class="marquee-outer" style="flex:1;">
      <div class="marquee-track">
        ${[
          '🏛️ EY (Ernst & Young)',
          '🏢 CBRE India',
          '📊 ANAROCK',
          '⚖️ Pipara & Co LLP',
          '💼 Resurgent India',
          '🏨 Sarovar Hotels',
          '🏪 CGH Earth',
          '🏖️ Mahindra Holidays',
          '🏝️ WelcomHeritage',
          '🎰 Pride Hotels',
          '🍽️ Maple Resorts',
          '🏛️ EY (Ernst & Young)',
          '🏢 CBRE India',
          '📊 ANAROCK',
          '⚖️ Pipara & Co LLP',
          '💼 Resurgent India',
          '🏨 Sarovar Hotels',
          '🏪 CGH Earth',
          '🏖️ Mahindra Holidays',
          '🏝️ WelcomHeritage',
          '🎰 Pride Hotels',
          '🍽️ Maple Resorts',
        ].map(p => `<span class="marquee-item">${p}</span>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ TRUST SIGNALS ROW ════════════════════════════════════════════════ -->
<div class="trust-signals-section" style="background:var(--parch-dk);padding:1.5rem 0;border-bottom:1px solid var(--border);">
  <div class="wrap">
    <div class="trust-row">
      <div class="trust-item">
        <span class="sla-badge">24h Response</span>
        <span>All enquiries guaranteed</span>
      </div>
      <div class="trust-item">
        <i class="fas fa-shield-alt" style="color:var(--gold);"></i>
        <span>Mutual <strong>NDA</strong> before all mandates</span>
      </div>
      <div class="trust-item">
        <i class="fas fa-certificate" style="color:var(--gold);"></i>
        <span>CERT-In & <strong>OWASP Top-10</strong> compliant</span>
      </div>
      <div class="trust-item">
        <i class="fas fa-map-marked-alt" style="color:var(--gold);"></i>
        <span><strong>Pan-India</strong> · Delhi NCR · Chandigarh · Mumbai</span>
      </div>
      <div class="trust-item">
        <a href="/testimonials" style="color:var(--gold);font-weight:600;font-family:'DM Sans',sans-serif;font-size:.8rem;text-decoration:none;">
          ⭐ View Client Testimonials →
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ══ PAN-INDIA PRESENCE MAP ════════════════════════════════════════════ -->
<div class="map-presence-section" style="background:var(--parch);padding:5rem 0;border-top:1px solid var(--border);overflow:hidden;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;" class="mob-stack">
      <!-- Left: copy -->
      <div class="fu">
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Pan-India Presence</p>
        <h2 class="h2" style="margin-bottom:1.25rem;">Active Mandates<br>Across India</h2>
        <p class="body-lg" style="margin-bottom:2rem;color:var(--ink-soft);">India Gully has active mandates across six cities — Delhi NCR, Chandigarh, Kasauli, Chail, Jaipur and Bengaluru — with Mumbai and Hyderabad in the pipeline. Combined advisory value exceeds ₹1,165 Cr+ across Tier 1, 2 and 3 markets.</p>
        <!-- City list -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:2rem;">
          ${[
            { city:'Delhi NCR',       sub:'Gurugram · Noida · Shalimar Bagh', pin:'#B8960C' },
            { city:'Chandigarh',      sub:'Hotel Rajshree & Spa · 41 Keys', pin:'#065F46' },
            { city:'Kasauli & Chail',  sub:'WelcomHeritage · Maple Resort', pin:'#1A3A6B' },
            { city:'Jaipur',          sub:'Heritage Hotel Corridor', pin:'#7C3AED' },
            { city:'Mumbai',          sub:'BKC · Lower Parel', pin:'#B8960C' },
            { city:'Bengaluru',       sub:'Whitefield · MG Road', pin:'#065F46' },
          ].map(c => `
          <div class="city-pin-card" style="display:flex;align-items:flex-start;gap:.625rem;padding:.625rem;background:var(--surface);border:1px solid var(--border);transition:border-color .2s;" onmouseover="this.style.borderColor='${c.pin}44'" onmouseout="this.style.borderColor='var(--border)'">
            <div style="width:8px;height:8px;border-radius:50%;background:${c.pin};flex-shrink:0;margin-top:.25rem;"></div>
            <div>
              <div class="map-city-name" style="font-size:.75rem;font-weight:700;color:var(--ink);">${c.city}</div>
              <div class="map-city-sub" style="font-size:.62rem;color:var(--ink-faint);">${c.sub}</div>
            </div>
          </div>`).join('')}
        </div>
        <div style="display:flex;gap:.875rem;flex-wrap:wrap;">
          <a href="/listings" class="btn btn-g" style="font-size:.75rem;"><i class="fas fa-map-marked-alt" style="margin-right:.4rem;font-size:.65rem;"></i>View Active Mandates</a>
          <a href="/pipeline" class="btn btn-dko" style="font-size:.75rem;"><i class="fas fa-chart-bar" style="margin-right:.4rem;font-size:.65rem;"></i>Pipeline Dashboard</a>
        </div>
      </div>
      <!-- Right: SVG India map -->
      <div style="position:relative;" id="indiaMapWrap" class="india-map-wrap">
        <div class="india-map-box" style="border:1px solid var(--border);padding:1.25rem 1rem 1rem;position:relative;overflow:hidden;border-radius:3px;">
          <!-- India SVG map — accurate state geometry, scaled from market-data.tsx (950×1100) at 0.4632×0.4727 -->
          <!-- viewBox 0 0 440 520 — proportional, no padding offsets, preserveAspectRatio xMidYMid meet -->
          <svg id="igIndiaMap" viewBox="0 0 440 520" width="100%"
               preserveAspectRatio="xMidYMid meet"
               style="display:block;max-width:440px;margin:0 auto;"
               aria-label="India map showing active mandate locations">
            <defs>
              <filter id="mapPinGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="mapShadow" x="-5%" y="-5%" width="115%" height="120%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="rgba(0,0,0,0.12)"/>
              </filter>
              <style>
                .india-state { fill: #d4cdb8; stroke: #9a8468; stroke-width: 0.7; stroke-linejoin: round; }
                .india-state-claim { fill: #d4cdb8; stroke: #8b7d5e; stroke-width: 0.9; stroke-dasharray: 3,2; stroke-linejoin: round; }
                .india-state:hover { fill: #c8bfa5; }
                .map-pin-label { font-family: "DM Sans", sans-serif; font-size: 8px; font-weight: 700; fill: currentColor; }
                .map-pin-sub { font-family: "DM Sans", sans-serif; font-size: 6px; fill: currentColor; opacity: 0.65; }
              </style>
            </defs>

            <!-- India States — generated from GADM GeoJSON, simplified for SVG rendering -->
            <!-- India states — scaled from market-data.tsx (950×1100) by X×0.4632 Y×0.4727 -->
            <!-- Same accurate geometry as services.tsx map, at 440×520 viewBox -->
            <g id="india-states" filter="url(#mapShadow)">
              <!-- J&K + Ladakh — official India claim, dashed border -->
              <path d="M 73,0 L 147,0 L 183,0 L 183,43 L 169,61 L 154,73 L 147,83 L 132,78 L 120,78 L 115,78 L 95,66 L 81,43 L 73,17 Z"
                    fill="#d4cdb8" stroke="#8b7d5e" stroke-width="0.8" stroke-dasharray="3,2" stroke-linejoin="round" class="india-state"/>
              <!-- Himachal Pradesh -->
              <path d="M 117,69 L 139,66 L 161,73 L 159,97 L 141,115 L 115,115 L 110,101 L 110,78 L 117,69 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Punjab -->
              <path d="M 87,78 L 112,78 L 117,111 L 120,125 L 100,130 L 87,125 L 87,95 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Haryana -->
              <path d="M 117,111 L 141,115 L 141,163 L 125,170 L 100,170 L 97,156 L 97,130 L 117,121 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Delhi (UT) -->
              <path d="M 129,139 L 137,141 L 138,149 L 129,149 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Uttarakhand -->
              <path d="M 141,115 L 147,104 L 183,104 L 191,113 L 183,144 L 169,144 L 147,144 L 141,130 L 141,115 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Uttar Pradesh -->
              <path d="M 135,145 L 141,115 L 147,130 L 183,144 L 244,170 L 235,225 L 220,225 L 183,217 L 141,163 L 125,170 L 132,156 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Rajasthan -->
              <path d="M 22,130 L 66,130 L 100,130 L 141,163 L 138,217 L 115,239 L 73,243 L 27,251 L 22,225 L 7,182 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Gujarat -->
              <path d="M 25,217 L 73,217 L 85,234 L 85,260 L 66,286 L 37,291 L 15,284 L 0,269 L 7,234 L 25,217 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Madhya Pradesh -->
              <path d="M 88,175 L 141,163 L 217,173 L 217,217 L 176,275 L 117,275 L 88,251 L 73,217 L 88,175 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Maharashtra -->
              <path d="M 68,260 L 117,275 L 176,275 L 190,303 L 183,338 L 169,355 L 147,371 L 117,371 L 88,364 L 73,355 L 68,329 L 68,295 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Goa -->
              <path d="M 84,367 L 93,367 L 93,383 L 84,383 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.5" stroke-linejoin="round" class="india-state"/>
              <!-- Karnataka -->
              <path d="M 89,321 L 117,321 L 156,338 L 147,390 L 132,419 L 117,433 L 95,433 L 88,407 L 88,381 L 89,321 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Kerala -->
              <path d="M 102,419 L 117,433 L 132,425 L 138,459 L 125,497 L 117,499 L 103,477 L 102,451 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Tamil Nadu -->
              <path d="M 132,425 L 179,407 L 182,433 L 173,477 L 154,501 L 139,501 L 125,497 L 132,459 L 132,425 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andhra Pradesh -->
              <path d="M 129,295 L 176,277 L 190,303 L 245,303 L 235,338 L 205,364 L 183,399 L 161,399 L 156,373 L 156,338 L 129,321 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Telangana -->
              <path d="M 135,297 L 161,297 L 193,297 L 195,338 L 176,364 L 156,373 L 147,371 L 135,347 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Odisha -->
              <path d="M 198,249 L 264,249 L 286,269 L 279,315 L 247,329 L 205,321 L 198,303 L 198,269 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Chhattisgarh -->
              <path d="M 176,223 L 217,217 L 242,260 L 220,295 L 205,321 L 183,321 L 161,312 L 154,295 L 176,260 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Jharkhand -->
              <path d="M 226,201 L 292,201 L 286,243 L 264,249 L 242,260 L 226,251 L 220,225 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Bihar -->
              <path d="M 225,165 L 298,165 L 298,220 L 292,225 L 226,208 L 225,191 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- West Bengal -->
              <path d="M 261,170 L 301,170 L 322,208 L 301,269 L 264,249 L 292,225 L 292,201 L 261,208 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Assam -->
              <path d="M 318,153 L 352,153 L 411,153 L 411,199 L 389,223 L 345,217 L 318,199 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.5" stroke-linejoin="round" class="india-state"/>
              <!-- NE States (Nagaland, Manipur, Mizoram, Tripura, Meghalaya) -->
              <path d="M 345,199 L 411,199 L 411,262 L 357,262 L 340,245 L 340,217 L 345,217 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.5" stroke-linejoin="round" class="india-state"/>
              <!-- Arunachal Pradesh -->
              <path d="M 348,130 L 431,130 L 431,179 L 348,179 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.5" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman & Nicobar Islands -->
              <ellipse cx="380" cy="294" rx="3" ry="9" fill="#d4cdb8" stroke="#9a8468" stroke-width="0.5" opacity="0.7"/>
              <!-- J&K label -->
              <text x="130" y="27" font-family="DM Sans,sans-serif" font-size="5" font-weight="700" fill="rgba(90,74,60,.9)" text-anchor="middle" pointer-events="none">J&amp;K</text>
              <text x="130" y="34" font-family="DM Sans,sans-serif" font-size="4" fill="rgba(90,74,60,.65)" text-anchor="middle" pointer-events="none" font-style="italic">India's Claim</text>
            </g>

            <!-- ══ MANDATE CITY PINS ══ -->

            <!-- Pins — recalibrated to viewBox 0 0 440 520 (scale X×0.4632, Y×0.4727 from market-data) -->

            <!-- Kasauli · Chail lon 77.1°E lat 31.0°N → (123,106) -->
            <g id="pin-himachal" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('himachal',true)" onmouseout="igMapHover('himachal',false)">
              <circle cx="123" cy="106" r="7.5" fill="#1A3A6B" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="123" cy="106" r="3" fill="#fff"/>
              <text x="112" y="101" class="map-pin-label" text-anchor="end">Kasauli · Chail</text>
              <text x="112" y="111" class="map-pin-sub" text-anchor="end">₹75 Cr</text>
            </g>

            <!-- Chandigarh lon 76.8°E lat 30.7°N → (129,109) -->
            <g id="pin-chandigarh" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('chandigarh',true)" onmouseout="igMapHover('chandigarh',false)">
              <circle cx="129" cy="113" r="7.5" fill="#065F46" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="129" cy="113" r="3" fill="#fff"/>
              <text x="140" y="110" class="map-pin-label">Chandigarh</text>
              <text x="140" y="120" class="map-pin-sub">₹70 Cr</text>
            </g>

            <!-- Delhi NCR lon 77.2°E lat 28.6°N → (135,146) — pulsing gold -->
            <g id="pin-delhi" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('delhi',true)" onmouseout="igMapHover('delhi',false)">
              <circle cx="135" cy="146" r="20" fill="rgba(184,150,12,.09)" stroke="rgba(184,150,12,.28)" stroke-width="1">
                <animate attributeName="r" values="20;30;20" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values=".7;0.08;.7" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="135" cy="146" r="11" fill="#B8960C" stroke="#fff" stroke-width="2" filter="url(#mapPinGlow)"/>
              <circle cx="135" cy="146" r="4.5" fill="#fff"/>
              <text x="150" y="140" class="map-pin-label" style="font-size:9px;">Delhi NCR</text>
              <text x="150" y="152" class="map-pin-sub" style="font-size:6.5px;opacity:.7;">3 Mandates · ₹900 Cr</text>
            </g>

            <!-- Jaipur lon 75.8°E lat 26.9°N → (114,175) -->
            <g id="pin-jaipur" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('jaipur',true)" onmouseout="igMapHover('jaipur',false)">
              <circle cx="114" cy="175" r="7.5" fill="#7C3AED" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="114" cy="175" r="3" fill="#fff"/>
              <text x="101" y="171" class="map-pin-label" text-anchor="end">Jaipur</text>
              <text x="101" y="181" class="map-pin-sub" text-anchor="end">₹20 Cr</text>
            </g>

            <!-- Mumbai lon 72.8°E lat 18.9°N → (70,314) -->
            <g id="pin-mumbai" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('mumbai',true)" onmouseout="igMapHover('mumbai',false)">
              <circle cx="70" cy="314" r="8" fill="#dc2626" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="70" cy="314" r="3.2" fill="#fff"/>
              <text x="57" y="310" class="map-pin-label" text-anchor="end">Mumbai</text>
              <text x="57" y="320" class="map-pin-sub" text-anchor="end">Pipeline</text>
            </g>

            <!-- Hyderabad lon 78.5°E lat 17.4°N → (154,340) -->
            <g id="pin-hyderabad" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('hyderabad',true)" onmouseout="igMapHover('hyderabad',false)">
              <circle cx="154" cy="340" r="7" fill="#b45309" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="154" cy="340" r="2.8" fill="#fff"/>
              <text x="166" y="336" class="map-pin-label">Hyderabad</text>
              <text x="166" y="346" class="map-pin-sub">Pipeline</text>
            </g>

            <!-- Bengaluru lon 77.6°E lat 12.9°N → (141,418) -->
            <g id="pin-bengaluru" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('bengaluru',true)" onmouseout="igMapHover('bengaluru',false)">
              <circle cx="141" cy="418" r="7" fill="#065F46" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="141" cy="418" r="2.8" fill="#fff"/>
              <text x="153" y="414" class="map-pin-label">Bengaluru</text>
              <text x="153" y="424" class="map-pin-sub">Pipeline</text>
            </g>

            <!-- ══ LEGEND ══ -->
            <rect x="5" y="468" width="390" height="48" rx="2"
              fill="rgba(184,150,12,.04)" stroke="rgba(184,150,12,.18)" stroke-width=".7"/>
            <text x="12" y="480" font-family="DM Sans,sans-serif" font-size="6" font-weight="700"
              fill="currentColor" opacity=".45" letter-spacing="1.5">ACTIVE MANDATE LOCATIONS</text>
            <circle cx="14" cy="492" r="4" fill="#B8960C"/>
            <text x="22" y="496" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".7">Delhi NCR ₹900Cr</text>
            <circle cx="110" cy="492" r="4" fill="#065F46"/>
            <text x="118" y="496" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".7">Chandigarh ₹70Cr</text>
            <circle cx="210" cy="492" r="4" fill="#1A3A6B"/>
            <text x="218" y="496" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".7">Kasauli/Chail ₹75Cr</text>
            <circle cx="300" cy="492" r="4" fill="#7C3AED"/>
            <text x="308" y="496" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".7">Jaipur ₹20Cr</text>
            <circle cx="14" cy="508" r="4" fill="#dc2626"/>
            <text x="22" y="512" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".5">Mumbai · Pipeline</text>
            <circle cx="110" cy="508" r="4" fill="#065F46"/>
            <text x="118" y="512" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".5">Bengaluru · Pipeline</text>
            <circle cx="210" cy="508" r="4" fill="#b45309"/>
            <text x="218" y="512" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".5">Hyderabad · Pipeline</text>

          </svg>
          <!-- Hover tooltip -->
          <div id="map-tooltip" style="position:absolute;display:none;background:rgba(10,10,10,.95);color:#fff;padding:.5rem .75rem;font-size:.7rem;pointer-events:none;border:1px solid rgba(184,150,12,.35);max-width:180px;z-index:10;border-radius:3px;box-shadow:0 8px 24px rgba(0,0,0,.3);"></div>
        </div>
        <!-- Map caption -->
        <p class="india-map-caption" style="font-size:.62rem;color:var(--ink-faint);text-align:center;margin-top:.5rem;"><i class="fas fa-map-pin" style="color:var(--gold);margin-right:.3rem;font-size:.55rem;"></i>Pins show active India Gully advisory mandates · Updated Q1 2026 · J&amp;K shown per India's claimed boundaries</p>
        <script>
        (function(){
          var tooltips = {
            delhi:      { title:'Delhi NCR', sub:'Prism Tower · Ambience Tower · Sawasdee JLG', val:'₹900 Cr combined', color:'#B8960C' },
            chandigarh: { title:'Chandigarh', sub:'Hotel Rajshree & Spa · 41 Keys', val:'₹70 Cr', color:'#065F46' },
            himachal:   { title:'Kasauli & Chail',  sub:'WelcomHeritage Kasauli · Maple Resort Chail', val:'₹75 Cr combined', color:'#1A3A6B' },
            jaipur:     { title:'Jaipur', sub:'Heritage Hotel · 43 Keys', val:'₹20 Cr', color:'#7C3AED' },
            mumbai:     { title:'Mumbai', sub:'BKC · Lower Parel · Advisory pipeline', val:'In discussion', color:'#dc2626' },
            bengaluru:  { title:'Bengaluru', sub:'Whitefield · MG Road · Active pipeline', val:'In discussion', color:'#065F46' },
            hyderabad:  { title:'Hyderabad', sub:'HITEC City · Banjara Hills · Advisory pipeline', val:'In discussion', color:'#b45309' },
          };
          window.igMapHover = function(id, on) {
            var tt = document.getElementById('map-tooltip');
            var wrap = document.getElementById('indiaMapWrap');
            var groups = document.querySelectorAll('.map-pin-group');
            groups.forEach(function(g){ g.style.opacity = on ? '0.55' : '1'; });
            var active = document.getElementById('pin-'+id);
            if (active) active.style.opacity = '1';
            if (!tt || !wrap) return;
            if (on && tooltips[id]) {
              var d = tooltips[id];
              tt.innerHTML = '<strong style="display:block;font-size:.72rem;color:'+d.color+';margin-bottom:.2rem;">'+d.title+'</strong>'+
                '<span style="display:block;font-size:.65rem;color:rgba(255,255,255,.65);margin-bottom:.2rem;">'+d.sub+'</span>'+
                '<span style="font-size:.65rem;color:#D4AE2A;font-weight:700;">'+d.val+'</span>';
              tt.style.display = 'block';
              tt.style.top = '12px'; tt.style.right = '12px'; tt.style.left = 'auto'; tt.style.transform = 'none';
            } else {
              tt.style.display = 'none';
              groups.forEach(function(g){ g.style.opacity = '1'; });
            }
          };
          // Fetch mandate locations from API and update tooltips dynamically
          fetch('/api/mandate-locations').then(function(r){ return r.json(); }).then(function(data){
            if (data && data.locations) {
              data.locations.forEach(function(loc){
                if (tooltips[loc.id]) {
                  tooltips[loc.id].val = loc.value;
                  tooltips[loc.id].sub = loc.mandates;
                }
              });
            }
          }).catch(function(){});

          // ── AUTO-CYCLE through mandate pins like Google Earth ──────────
          var _pins = ['delhi','chandigarh','himachal','jaipur','mumbai','bengaluru'];
          var _pinIdx = 0;
          var _cycleTimer = null;
          var _userInteracting = false;
          var _interactTimer = null;

          function igMapCyclePin(id) {
            var tt = document.getElementById('map-tooltip');
            var groups = document.querySelectorAll('.map-pin-group');
            groups.forEach(function(g){ g.style.opacity = '0.45'; g.style.transform = 'scale(1)'; g.style.transition = 'opacity .4s,transform .4s'; });
            var active = document.getElementById('pin-'+id);
            if (active) {
              active.style.opacity = '1';
              active.style.transform = 'scale(1.25)';
              active.style.transition = 'opacity .4s,transform .4s';
            }
            if (tt && tooltips[id]) {
              var d = tooltips[id];
              tt.innerHTML = '<strong style="display:block;font-size:.72rem;color:'+d.color+';margin-bottom:.2rem;">'+d.title+'</strong>'+
                '<span style="display:block;font-size:.65rem;color:rgba(255,255,255,.65);margin-bottom:.2rem;">'+d.sub+'</span>'+
                '<span style="font-size:.65rem;color:#D4AE2A;font-weight:700;">'+d.val+'</span>';
              tt.style.display = 'block';
              tt.style.top = '12px'; tt.style.right = '12px'; tt.style.left = 'auto'; tt.style.transform = 'none';
            }
          }

          function igMapResetAll() {
            var groups = document.querySelectorAll('.map-pin-group');
            groups.forEach(function(g){ g.style.opacity = '1'; g.style.transform = 'scale(1)'; });
            var tt = document.getElementById('map-tooltip');
            if (tt) tt.style.display = 'none';
          }

          function igStartCycle() {
            _cycleTimer = setInterval(function(){
              if (_userInteracting) return;
              igMapResetAll();
              setTimeout(function(){
                igMapCyclePin(_pins[_pinIdx]);
                _pinIdx = (_pinIdx + 1) % _pins.length;
              }, 200);
            }, 2800);
            // Start first cycle immediately after 1.5s
            setTimeout(function(){
              igMapCyclePin(_pins[_pinIdx]);
              _pinIdx = (_pinIdx + 1) % _pins.length;
            }, 1500);
          }

          // Override hover to pause auto-cycle
          window.igMapHover = function(id, on) {
            _userInteracting = on;
            clearTimeout(_interactTimer);
            if (!on) {
              // Resume auto-cycle 4s after user stops interacting
              _interactTimer = setTimeout(function(){ _userInteracting = false; }, 4000);
            }
            var tt = document.getElementById('map-tooltip');
            var groups = document.querySelectorAll('.map-pin-group');
            groups.forEach(function(g){ g.style.opacity = on ? '0.45' : '1'; g.style.transform = 'scale(1)'; });
            var active = document.getElementById('pin-'+id);
            if (active) { active.style.opacity = '1'; if (on) active.style.transform = 'scale(1.2)'; }
            if (!tt) return;
            if (on && tooltips[id]) {
              var d = tooltips[id];
              tt.innerHTML = '<strong style="display:block;font-size:.72rem;color:'+d.color+';margin-bottom:.2rem;">'+d.title+'</strong>'+
                '<span style="display:block;font-size:.65rem;color:rgba(255,255,255,.65);margin-bottom:.2rem;">'+d.sub+'</span>'+
                '<span style="font-size:.65rem;color:#D4AE2A;font-weight:700;">'+d.val+'</span>';
              tt.style.display = 'block';
              tt.style.top = '12px'; tt.style.right = '12px'; tt.style.left = 'auto'; tt.style.transform = 'none';
            } else {
              tt.style.display = 'none';
              if (!on) groups.forEach(function(g){ g.style.opacity = '1'; g.style.transform = 'scale(1)'; });
            }
          };

          // Use IntersectionObserver to start cycle only when map is visible
          var mapWrap = document.getElementById('indiaMapWrap');
          if (mapWrap && 'IntersectionObserver' in window) {
            var obs = new IntersectionObserver(function(entries){
              entries.forEach(function(entry){
                if (entry.isIntersecting && !_cycleTimer) {
                  igStartCycle();
                } else if (!entry.isIntersecting && _cycleTimer) {
                  clearInterval(_cycleTimer); _cycleTimer = null;
                  _pinIdx = 0;
                  igMapResetAll();
                }
              });
            }, { threshold: 0.3 });
            obs.observe(mapWrap);
          } else {
            igStartCycle();
          }
        })();
        </script>
      </div>
    </div>
  </div>
</div>

<!-- ══ WHY INDIA GULLY ══════════════════════════════════════════════════ -->
<div class="sec-pc" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">

    <!-- Section header -->
    <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:5rem;align-items:start;margin-bottom:4.5rem;" class="mob-stack">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Why India Gully</p>
        <h2 class="h2">The Advisory Partner<br>Built for India</h2>
      </div>
      <div style="display:flex;align-items:center;padding-top:1rem;">
        <div>
          <p class="lead" style="margin-bottom:1.5rem;">20+ years of boots-on-the-ground execution across every vertical — not just strategy, but delivery. We are investors' most trusted partner in India's complex advisory landscape.</p>
          <div style="width:48px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        </div>
      </div>
    </div>

    <!-- Why cards grid -->
    <div class="why-grid">
      ${[
        { icon:'trophy',         color:'#B8960C', bg:'rgba(184,150,12,.08)', border:'rgba(184,150,12,.18)', title:'₹2,000+ Cr Transacted',       desc:'Landmark transactions including joint advisory with EY for the ₹1,350 Cr+ 100% shareholder-consented divestment of Entertainment City Limited, Noida.' },
        { icon:'hotel',          color:'#065F46', bg:'rgba(6,95,70,.08)',    border:'rgba(6,95,70,.18)',    title:'15+ Hotels On-Boarded',        desc:'Hotel brand selection, pre-opening management and PMC across Marriott, Radisson, Cygnett, Regenta and more — from site selection to first check-in.' },
        { icon:'store',          color:'#1A3A6B', bg:'rgba(26,58,107,.08)', border:'rgba(26,58,107,.18)',  title:'1,40,000+ Sq Ft Leased',       desc:'Premium F&B and retail leasing at Gardens Galleria, Hyatt Andaz, AIPL Joy Street and Entertainment City — India\'s top retail destinations.' },
        { icon:'utensils',       color:'#B8960C', bg:'rgba(184,150,12,.08)', border:'rgba(184,150,12,.18)', title:'HORECA — 15+ Properties',      desc:'End-to-end supply of FF&amp;E, OS&amp;E, kitchen equipment and guest amenities for Mahindra Holidays, Accor, CGH Earth and more across India.' },
        { icon:'handshake',      color:'#7C3AED', bg:'rgba(124,58,237,.08)', border:'rgba(124,58,237,.18)', title:'Co-Advisory with EY & CBRE',   desc:'Trusted by India\'s top professional service firms as co-advisor on complex, multi-party institutional transactions requiring deep sector expertise.' },
        { icon:'map-marked-alt', color:'#B8960C', bg:'rgba(184,150,12,.08)', border:'rgba(184,150,12,.18)', title:'Pan-India Presence',           desc:'Active mandates across Delhi NCR, Chandigarh, Kasauli, Chail, Jaipur, Gurugram, Bengaluru and Mumbai — spanning Tier 1, 2 and 3 markets.' },
      ].map((w, wi) => `
      <div class="why-card reveal" style="transition-delay:${wi*0.07}s;">
        <div class="why-icon" style="background:${w.bg};border:1px solid ${w.border};">
          <i class="fas fa-${w.icon}" style="color:${w.color};font-size:1.1rem;"></i>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);margin-bottom:.6rem;line-height:1.25;">${w.title}</h3>
        <p style="font-size:.875rem;line-height:1.8;color:var(--ink-soft);">${w.desc}</p>
        <div style="width:28px;height:1px;background:linear-gradient(90deg,${w.color},transparent);margin-top:1.25rem;opacity:.6;"></div>
      </div>`).join('')}
    </div>

  </div>
</div>

<!-- ══ FEATURED MANDATES ═══════════════════════════════════════════════ -->
<div class="sec-dk" style="position:relative;overflow:hidden;padding-top:7rem;padding-bottom:7rem;">
  <!-- Background texture -->
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.03) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 100%,rgba(184,150,12,.04) 0%,transparent 60%);pointer-events:none;"></div>

  <div class="wrap" style="position:relative;">

    <!-- Section header -->
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4rem;flex-wrap:wrap;gap:2rem;">
      <div>
        <div class="gr-lt"></div>
        <p class="eyebrow-lt" style="margin-bottom:1rem;">Active Mandates</p>
        <h2 class="h2-lt" style="max-width:500px;">Investment Opportunities<br>of Institutional Grade</h2>
      </div>
      <div style="text-align:right;max-width:360px;">
        <p style="font-size:.875rem;line-height:1.8;color:rgba(255,255,255,.45);margin-bottom:1.5rem;">Exclusive mandates across Hospitality, Real Estate, Heritage & Mixed-Use. All strictly subject to NDA.</p>
        <a href="/listings" class="btn btn-ghost-g">View All 8 Mandates <i class="fas fa-arrow-right" style="font-size:.6rem;margin-left:.25rem;"></i></a>
      </div>
    </div>

    <!-- Featured 3-column mandate cards -->
    <div id="featuredMandates">
      ${LISTINGS.filter((l: any) => l.highlight).slice(0,3).map((l: any, idx: number) => {
        const img = l.images?.[0] || ''
        const ss = { active: { bg:'rgba(184,150,12,.15)', text:'#D4AE2A', border:'rgba(184,150,12,.35)' }, negotiation: { bg:'rgba(59,130,246,.12)', text:'#60a5fa', border:'rgba(59,130,246,.3)' }, feasibility: { bg:'rgba(22,163,74,.1)', text:'#4ade80', border:'rgba(22,163,74,.25)' } }[l.statusType] || { bg:'rgba(184,150,12,.15)', text:'#D4AE2A', border:'rgba(184,150,12,.35)' }
        return `
      <a href="/listings/${l.id}"
         class="ed-card reveal"
         style="display:block;text-decoration:none;transition-delay:${idx*0.1}s;"
         onmouseover="this.style.borderColor='rgba(184,150,12,.4)';this.style.boxShadow='0 24px 70px rgba(0,0,0,.5)';this.style.transform='translateY(-6px)'"
         onmouseout="this.style.borderColor='rgba(255,255,255,.08)';this.style.boxShadow='none';this.style.transform='translateY(0)'"
         style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);overflow:hidden;transition:all .3s cubic-bezier(.4,0,.2,1);">

        <!-- Image area -->
        <div class="ed-card-img" style="height:248px;background:#0a0a12;position:relative;">
          ${img
            ? `<img src="${img}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`
            : `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(145deg,#090912 0%,#0f0f1e 50%,#111128 100%);position:relative;overflow:hidden;">
                <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:32px 32px;"></div>
                <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(184,150,12,.06) 0%,transparent 70%);"></div>
                <div style="position:relative;text-align:center;">
                  <div style="width:56px;height:56px;background:rgba(184,150,12,.1);border:1.5px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;border-radius:2px;">
                    <i class="fas fa-lock" style="color:var(--gold);font-size:1.2rem;"></i>
                  </div>
                  <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:#fff;line-height:1;margin-bottom:.25rem;">${l.value}</div>
                  ${l.valueUSD ? `<div style="font-size:.58rem;color:rgba(255,255,255,.4);letter-spacing:.05em;margin-bottom:.5rem;">${l.valueUSD}</div>` : '<div style="margin-bottom:.5rem;"></div>'}
                  <div style="font-size:.56rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(184,150,12,.7);">Confidential · NDA</div>
                </div>
              </div>`
          }
          <!-- Gradient overlay (images only) -->
          ${img ? `<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.8) 0%,rgba(0,0,0,.2) 50%,transparent 100%);"></div>` : ''}

          <!-- Sector pill -->
          <div style="position:absolute;top:1.25rem;left:1.25rem;">
            <span style="background:${l.sectorColor};color:#fff;font-size:.57rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:.28rem .75rem;">${l.sector}</span>
          </div>
          <!-- NDA badge always shown -->
          <div style="position:absolute;top:1.25rem;right:1.25rem;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);padding:.22rem .65rem;display:flex;align-items:center;gap:.3rem;border:1px solid rgba(184,150,12,.4);">
            <i class="fas fa-lock" style="font-size:.48rem;color:var(--gold);"></i>
            <span style="font-size:.54rem;color:rgba(255,255,255,.85);letter-spacing:.08em;font-weight:700;text-transform:uppercase;">NDA</span>
          </div>

          <!-- Value overlay on image bottom (images only) -->
          ${img ? `<div style="position:absolute;bottom:1.25rem;left:1.25rem;right:1.25rem;display:flex;align-items:flex-end;justify-content:space-between;">
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.1rem;color:#fff;line-height:1;text-shadow:0 2px 12px rgba(0,0,0,.6);">${l.value}</div>
              ${l.valueUSD ? `<div style="font-size:.6rem;color:rgba(255,255,255,.5);letter-spacing:.08em;">${l.valueUSD}</div>` : ''}
            </div>
            <div style="background:rgba(0,0,0,.4);backdrop-filter:blur(6px);padding:.2rem .55rem;display:flex;align-items:center;gap:.3rem;border:1px solid rgba(255,255,255,.15);">
              <i class="fas fa-images" style="font-size:.48rem;color:rgba(255,255,255,.5);"></i>
              <span style="font-size:.54rem;color:rgba(255,255,255,.6);letter-spacing:.06em;">${l.images.length} photos · NDA</span>
            </div>
          </div>` : ''}
        </div>

        <!-- Content -->
        <div style="padding:1.75rem;">
          <!-- Status + location -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem;">
            <span style="background:${ss.bg};color:${ss.text};border:1px solid ${ss.border};font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.22rem .65rem;">${l.status}</span>
            <span style="font-size:.68rem;color:rgba(255,255,255,.4);display:flex;align-items:center;gap:.3rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.55rem;"></i>${l.locationShort}</span>
          </div>

          <!-- Title -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#fff;line-height:1.2;margin-bottom:.35rem;">${l.title}</h3>
          <p style="font-size:.72rem;color:var(--gold);font-weight:500;letter-spacing:.04em;margin-bottom:1rem;">${l.subtitle}</p>

          <!-- Description -->
          <p style="font-size:.825rem;color:rgba(255,255,255,.45);line-height:1.75;margin-bottom:1.25rem;">${l.desc}</p>

          <!-- Highlights row -->
          <div style="display:flex;gap:.75rem;margin-bottom:1.5rem;flex-wrap:wrap;">
            ${l.highlights.slice(0,2).map((h: any) => `
            <div style="flex:1;min-width:120px;padding:.75rem 1rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);">
              <div style="font-size:.58rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:.3rem;">${h.label}</div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);line-height:1;">${h.value}</div>
            </div>`).join('')}
          </div>

          <!-- CTA row -->
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:1.1rem;border-top:1px solid rgba(255,255,255,.07);">
            <span style="font-size:.68rem;color:var(--gold);font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:.4rem;">
              <i class="fas fa-file-signature" style="font-size:.6rem;"></i>View Mandate
            </span>
            <div style="width:28px;height:28px;background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.25);display:flex;align-items:center;justify-content:center;transition:all .22s;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='rgba(184,150,12,.12)';this.style.borderColor='rgba(184,150,12,.25)'">
              <i class="fas fa-arrow-right" style="font-size:.55rem;color:var(--gold);pointer-events:none;"></i>
            </div>
          </div>
        </div>
      </a>`
      }).join('')}
    </div>

    <!-- Remaining mandates list -->
    <div style="border:1px solid rgba(255,255,255,.07);overflow:hidden;margin-top:.25rem;">
      <div style="padding:1.1rem 1.75rem;background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.06);">
        <div style="display:flex;align-items:center;gap:.75rem;">
          <i class="fas fa-folder-open" style="color:var(--gold);font-size:.75rem;"></i>
          <span style="font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.35);">More Active Mandates</span>
        </div>
        <a href="/listings" style="font-size:.65rem;color:var(--gold);font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:.4rem;">View All <i class="fas fa-arrow-right" style="font-size:.55rem;"></i></a>
      </div>
      ${LISTINGS.filter((l: any) => !l.highlight).map((l: any) => `
      <a href="/listings/${l.id}"
         style="display:flex;align-items:center;gap:1.5rem;padding:1.1rem 1.75rem;border-bottom:1px solid rgba(255,255,255,.04);text-decoration:none;transition:background .2s;"
         onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background='transparent'">
        ${l.images?.[0]
          ? `<div style="width:60px;height:46px;overflow:hidden;flex-shrink:0;border:1px solid rgba(255,255,255,.08);"><img src="${l.images[0]}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>`
          : `<div style="width:60px;height:46px;flex-shrink:0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;"><i class="fas fa-lock" style="color:rgba(184,150,12,.5);font-size:.7rem;"></i></div>`
        }
        <div style="flex:1;min-width:0;">
          <div style="font-size:.875rem;font-weight:600;color:#fff;margin-bottom:.15rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${l.title}</div>
          <div style="font-size:.7rem;color:rgba(255,255,255,.35);">${l.locationShort} · ${l.sector}</div>
        </div>
        <div style="flex-shrink:0;text-align:right;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--gold);">${l.value}</div>
          <div style="font-size:.6rem;color:rgba(255,255,255,.3);letter-spacing:.06em;margin-top:.1rem;">${l.status}</div>
        </div>
        <i class="fas fa-chevron-right" style="font-size:.55rem;color:rgba(255,255,255,.2);flex-shrink:0;"></i>
      </a>`).join('')}
    </div>

    <!-- NDA disclaimer -->
    <div style="text-align:center;margin-top:2rem;padding:1.25rem;border:1px solid rgba(184,150,12,.1);background:rgba(184,150,12,.03);">
      <p style="font-size:.72rem;color:rgba(255,255,255,.35);line-height:1.75;">
        <i class="fas fa-shield-alt" style="color:var(--gold);margin-right:.5rem;font-size:.65rem;"></i>
        All mandates strictly by Mutual NDA · Information Memoranda available to qualified investors, family offices &amp; institutional buyers upon request
      </p>
    </div>

  </div>
</div>

<!-- ══ ADVISORY VERTICALS ═════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">

    <!-- Section header -->
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:5rem;align-items:start;margin-bottom:4.5rem;" class="mob-stack">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Advisory Verticals</p>
        <h2 class="h2">Six Verticals.<br>One Trusted Partner.</h2>
      </div>
      <div style="display:flex;align-items:flex-end;padding-bottom:.25rem;">
        <p class="lead" style="max-width:480px;">From strategy to execution, India Gully delivers institutional-grade advisory across every sector it operates in. Deep expertise. Proven results.</p>
      </div>
    </div>

    <!-- Vertical grid -->
    <div class="vg">
      ${VERTICALS.map((v: any) => `
      <div class="vg-cell" onclick="window.location='/services#${v.id}'" role="button" tabindex="0">
        <div class="vg-icon">
          <span style="font-size:1.45rem;">${v.icon}</span>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);margin-bottom:.65rem;line-height:1.2;">${v.name}</h3>
        <p style="font-size:.875rem;line-height:1.8;color:var(--ink-soft);margin-bottom:1.1rem;">${v.desc}</p>
        <div class="vg-arr" style="display:flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;">
          Explore <i class="fas fa-arrow-right" style="font-size:.6rem;"></i>
        </div>
      </div>`).join('')}
    </div>

  </div>
</div>

<!-- ══ THE INDIA GULLY DIFFERENCE ════════════════════════════════════ -->
<div class="sec-dk diff-section" style="background:#0a0a10;position:relative;overflow:hidden;padding-top:7rem;padding-bottom:7rem;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;"></div>

  <div class="wrap" style="position:relative;">
    <div style="text-align:center;max-width:640px;margin:0 auto 4.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow-lt" style="margin-bottom:1rem;">Our Proposition</p>
      <h2 class="h2-lt" style="color:#fff;">The India Gully Difference</h2>
      <p style="font-size:1rem;line-height:1.85;color:rgba(255,255,255,.6);margin-top:1.25rem;">What separates us from other advisory firms is not just depth of expertise — it is the way we stay committed from mandate inception to final delivery.</p>
    </div>

    <div class="diff-grid">
      ${[
        { icon:'flag',      n:'01', title:'India-Deep Expertise',    desc:'Born in India. We understand local markets, regulations, culture and consumer behaviour at granular depth across Tier 1, 2 and 3 cities.' },
        { icon:'handshake', n:'02', title:'20+ Brand Relationships', desc:'Deep relationships with every major hotel brand. We know which brand fits which project and navigate negotiations with authority.' },
        { icon:'utensils',  n:'03', title:'HORECA End-to-End',       desc:'One of the few consultants who also procure and supply, giving clients a single accountable partner from strategy to FF&E delivery.' },
        { icon:'bolt',      n:'04', title:'Execution-Led',           desc:'We stay involved through implementation, not just advisory. Turnkey delivery and hands-on project management is our differentiator.' },
      ].map((d, di) => `
      <div class="diff-cell reveal" style="transition-delay:${di*0.1}s;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:4rem;color:rgba(212,174,42,.18);line-height:1;margin-bottom:1.25rem;letter-spacing:-.05em;">${d.n}</div>
        <div class="ig-icon-box" style="margin-bottom:1.75rem;">
          <i class="fas fa-${d.icon}" style="color:var(--gold);font-size:.85rem;"></i>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.3rem;color:#fff;line-height:1.2;margin-bottom:1rem;">${d.title}</h3>
        <p style="font-size:.875rem;line-height:1.85;color:rgba(255,255,255,.6);">${d.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ BRAND PARTNERS ═════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">

    <!-- ── HOSPITALITY BRANDS ── -->
    <div style="margin-bottom:6rem;">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1.5rem;">
        <div>
          <div class="gr"></div>
          <p class="eyebrow" style="margin-bottom:.875rem;">Hospitality Partners</p>
          <h2 class="h2">Hotel Brands We<br>Work With</h2>
        </div>
        <div style="max-width:380px;text-align:right;">
          <p class="lead" style="font-size:.9375rem;margin-bottom:1.25rem;">Active relationships with India's most prominent hotel brands — from global chains to homegrown operators. Including our exclusive partner <strong>Nile Hospitality</strong>.</p>
          <a href="/services#hospitality" class="btn btn-sm btn-dko">Our Hospitality Practice</a>
        </div>
      </div>

      <!-- Category filter tabs for hotel brands -->
      <div id="hb-filters" style="display:flex;gap:.5rem;margin-bottom:2rem;flex-wrap:wrap;">
        ${['All','Global Chain','Indian Luxury','Midscale','Economy'].map((c,i) => `
        <button onclick="filterHB('${c}')" data-hbcat="${c}"
          style="padding:.3rem .85rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'var(--border)'};background:${i===0?'rgba(184,150,12,.08)':'transparent'};color:${i===0?'var(--gold)':'var(--ink-muted)'};cursor:pointer;transition:all .2s;">
          ${c}${c!=='All'?` <span style="font-size:.55rem;opacity:.7;">(${HOSPITALITY_BRANDS.filter((b:any)=>b.cat===c).length})</span>`:''}
        </button>`).join('')}
      </div>

      <!-- Hotel brand grid -->
      <div id="hbGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1rem;">
        ${HOSPITALITY_BRANDS.map((b: any) => `
        <div class="hb-card" data-hbcat="${b.cat}"
          style="border:1px solid var(--border);padding:.875rem .75rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;transition:all .25s;cursor:default;"
          onmouseover="this.style.borderColor='${b.color}';this.style.background='rgba(${parseInt(b.color.slice(1,3),16)},${parseInt(b.color.slice(3,5),16)},${parseInt(b.color.slice(5,7),16)},.04)'"
          onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <img src="${b.svg}" alt="${b.name}" width="155" height="62"
               style="width:155px;height:62px;object-fit:contain;border-radius:3px;"
               loading="lazy" decoding="async">
          <div style="text-align:center;">
            <div style="font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);">${b.cat}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- ── RETAIL BRANDS ── -->
    <div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1.5rem;">
        <div>
          <div class="gr"></div>
          <p class="eyebrow" style="margin-bottom:.875rem;">Retail Partners</p>
          <h2 class="h2">Retail Brands We<br>Advise &amp; Place</h2>
        </div>
        <div style="max-width:420px;text-align:right;">
          <p class="lead" style="font-size:.9375rem;margin-bottom:1.25rem;">${RETAIL_BRANDS.length}+ active retail brand relationships — F&amp;B, anchor stores, cinemas, fashion, accessories &amp; electronics.</p>
          <a href="/services#retail" class="btn btn-sm btn-dko">Our Retail Practice</a>
        </div>
      </div>

      <!-- Retail category tabs -->
      <div id="rb-filters" style="display:flex;gap:.5rem;margin-bottom:2rem;flex-wrap:wrap;">
        ${['All','F&B','Anchor Retail','Cinema','Fashion & Apparel','Accessories & Beauty','Electronics'].map((c,i) => `
        <button onclick="filterRB('${c}')" data-rbcat="${c}"
          style="padding:.3rem .85rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'var(--border)'};background:${i===0?'rgba(184,150,12,.08)':'transparent'};color:${i===0?'var(--gold)':'var(--ink-muted)'};cursor:pointer;transition:all .2s;">
          ${c}${c!=='All'?` <span style="font-size:.55rem;opacity:.7;">(${RETAIL_BRANDS.filter((b:any)=>b.cat===c).length})</span>`:''}
        </button>`).join('')}
      </div>

      <!-- Retail brand grid -->
      <div id="rbGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1rem;">
        ${RETAIL_BRANDS.map((b: any) => `
        <div class="rb-card" data-rbcat="${b.cat}"
          style="border:1px solid var(--border);padding:.875rem .75rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;transition:all .25s;cursor:default;"
          onmouseover="this.style.borderColor='${b.color}';this.style.background='rgba(${parseInt(b.color.slice(1,3),16)},${parseInt(b.color.slice(3,5),16)},${parseInt(b.color.slice(5,7),16)},.04)'"
          onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <img src="${b.svg}" alt="${b.name}" width="155" height="62"
               style="width:155px;height:62px;object-fit:contain;border-radius:3px;"
               loading="lazy" decoding="async">
          <div style="text-align:center;">
            <div style="font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);">${b.cat}</div>
          </div>
        </div>`).join('')}
      </div>

      <!-- Category count summary strip -->
      <div style="display:flex;gap:1rem;margin-top:2.5rem;flex-wrap:wrap;justify-content:center;padding:1.5rem;background:rgba(184,150,12,.03);border:1px solid rgba(184,150,12,.12);">
        ${['F&B','Anchor Retail','Cinema','Fashion & Apparel','Accessories & Beauty','Electronics'].map((c: string) => {
          const count = RETAIL_BRANDS.filter((b: any) => b.cat === c).length
          const icons: Record<string,string> = {
            'F&B':'fa-utensils','Anchor Retail':'fa-store','Cinema':'fa-film',
            'Fashion & Apparel':'fa-shirt','Accessories & Beauty':'fa-gem','Electronics':'fa-mobile-screen'
          }
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:80px;">
            <i class="fas ${icons[c]||'fa-tag'}" style="font-size:.9rem;color:var(--gold);"></i>
            <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);">${count}</span>
            <span style="font-size:.56rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);text-align:center;">${c}</span>
          </div>`
        }).join('')}
      </div>
    </div>

  </div>
</div>

<script>
/* ── Brand filter tabs ────────────────────────────────────────────── */
function filterHB(cat){
  document.querySelectorAll('[data-hbcat]').forEach(function(el){
    if(el.tagName === 'BUTTON'){
      var isActive = el.getAttribute('data-hbcat') === cat;
      el.style.borderColor  = isActive ? 'var(--gold)' : 'var(--border)';
      el.style.background   = isActive ? 'rgba(184,150,12,.08)' : 'transparent';
      el.style.color        = isActive ? 'var(--gold)' : 'var(--ink-muted)';
    } else {
      var show = cat === 'All' || el.getAttribute('data-hbcat') === cat;
      el.style.display = show ? '' : 'none';
    }
  });
}
function filterRB(cat){
  document.querySelectorAll('[data-rbcat]').forEach(function(el){
    if(el.tagName === 'BUTTON'){
      var isActive = el.getAttribute('data-rbcat') === cat;
      el.style.borderColor  = isActive ? 'var(--gold)' : 'var(--border)';
      el.style.background   = isActive ? 'rgba(184,150,12,.08)' : 'transparent';
      el.style.color        = isActive ? 'var(--gold)' : 'var(--ink-muted)';
    } else {
      var show = cat === 'All' || el.getAttribute('data-rbcat') === cat;
      el.style.display = show ? '' : 'none';
    }
  });
}
</script>

<!-- ══ Phase 43: SECTOR VELOCITY / DEAL ACTIVITY ══════════════════════ -->
<div style="background:linear-gradient(135deg,#04040a 0%,#080810 60%,#0a0a14 100%);border-top:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);padding:4rem 0;overflow:hidden;position:relative;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.03) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;" class="mob-stack">

      <!-- LEFT: Live Activity feed -->
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Live Deal Activity</p>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.95rem;color:#fff;line-height:1.2;margin-bottom:2rem;">Q1 2026<br><em style="color:var(--gold);font-style:italic;">Mandate Pulse</em></h2>
        <div>
          ${[
            { icon:'rocket',       color:'#16a34a', badge:'Active',      text:'Prism Tower, Gurugram',           sub:'₹400 Cr · Mixed-Use · Due Diligence Stage' },
            { icon:'handshake',    color:'#B8960C', badge:'Negotiation', text:'Belcibo Multi-Brand Platform',   sub:'₹120 Cr · F&B Franchise · Term Sheet Review' },
            { icon:'hotel',        color:'#7C3AED', badge:'Feasibility', text:'Boutique Hotel Asset, Kasauli',  sub:'₹85 Cr · Heritage Hospitality · Site Approved' },
            { icon:'store',        color:'#0369a1', badge:'Listed',      text:'Jaipur Heritage Estate',         sub:'₹575 Cr · Heritage Hospitality · IM Ready' },
            { icon:'chart-line',   color:'#B8960C', badge:'Active',      text:'Sawasdee JLG Galleria, Noida',  sub:'HORECA Retail · Anchor Leasing · 12,000 sqft' },
          ].map((item, ii) => `
          <div class="reveal" style="display:flex;gap:1rem;padding:.875rem 0;border-bottom:1px solid rgba(255,255,255,.06);transition-delay:${ii*0.08}s;" class="mob-stack">
            <div style="width:36px;height:36px;flex-shrink:0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-${item.icon}" style="color:${item.color};font-size:.72rem;"></i>
            </div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.2rem;">
                <span style="font-size:.78rem;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.text}</span>
                <span style="font-size:.52rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${item.color};background:rgba(255,255,255,.05);padding:.12rem .45rem;flex-shrink:0;">${item.badge}</span>
              </div>
              <div style="font-size:.68rem;color:rgba(255,255,255,.38);">${item.sub}</div>
            </div>
          </div>`).join('')}
        </div>
        <a href="/pipeline" style="display:inline-flex;align-items:center;gap:.5rem;margin-top:1.5rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);text-decoration:none;transition:gap .2s;" onmouseover="this.style.gap='.75rem'" onmouseout="this.style.gap='.5rem'">
          View Full Pipeline <i class="fas fa-arrow-right" style="font-size:.6rem;"></i>
        </a>
      </div>

      <!-- RIGHT: Sector breakdown with animated bars -->
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Advisory Mix</p>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.95rem;color:#fff;line-height:1.2;margin-bottom:2rem;">Sector<br><em style="color:var(--gold);font-style:italic;">Distribution</em></h2>
        <div id="sectorBarsHome" style="display:flex;flex-direction:column;gap:1.25rem;">
          ${[
            { label:'Real Estate & Commercial', pct:45, val:'₹524 Cr',  color:'#1A3A6B' },
            { label:'Hospitality & Hotels',     pct:28, val:'₹325 Cr',  color:'#065F46' },
            { label:'Retail & Leasing',         pct:14, val:'₹163 Cr',  color:'#7C3AED' },
            { label:'HORECA & F&B',             pct: 9, val:'₹105 Cr',  color:'#B8960C' },
            { label:'Debt & Special',            pct: 4, val:'₹48 Cr',   color:'#b91c1c' },
          ].map((s, si) => `
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem;">
              <span style="font-size:.72rem;font-weight:600;color:rgba(255,255,255,.75);">${s.label}</span>
              <span style="font-size:.68rem;color:var(--gold);font-weight:700;">${s.val} <span style="color:rgba(255,255,255,.3);font-weight:400;">(${s.pct}%)</span></span>
            </div>
            <div style="height:5px;background:rgba(255,255,255,.07);overflow:hidden;">
              <div class="home-sector-bar" data-pct="${s.pct}" style="height:100%;width:0%;background:${s.color};transition:width 1.3s cubic-bezier(.4,0,.2,1);transition-delay:${si*0.12}s;"></div>
            </div>
          </div>`).join('')}
        </div>
        <div style="margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.06);">
          <div style="display:flex;gap:2.5rem;flex-wrap:wrap;">
            ${[
              { n:'₹1,165 Cr+', l:'Total Pipeline' },
              { n:'8',           l:'Live Mandates'  },
              { n:'Q1 2026',     l:'Data Period'    },
            ].map(s => `
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.45rem;color:var(--gold);line-height:1;margin-bottom:.2rem;">${s.n}</div>
              <div style="font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.35);">${s.l}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>

    </div>
  </div>
  <script>
  /* Phase 43: Animate sector bars on scroll */
  (function(){
    var bars = document.querySelectorAll('.home-sector-bar');
    if (!bars.length) return;
    function animateBars() {
      bars.forEach(function(bar) {
        bar.style.width = (bar.dataset.pct || '0') + '%';
      });
    }
    var section = document.getElementById('sectorBarsHome');
    if (section && 'IntersectionObserver' in window) {
      var ob = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { animateBars(); ob.disconnect(); }
        });
      }, { threshold: 0.25 });
      ob.observe(section);
    } else {
      animateBars();
    }
  })();
  </script>
</div>

<!-- ══ RECENT INSIGHTS ═════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:5.5rem;padding-bottom:5.5rem;border-top:1px solid var(--border);">
  <div class="wrap">

    <!-- Section header -->
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Knowledge & Research</p>
        <h2 class="h2" style="margin-bottom:.5rem;">Recent Insights</h2>
        <p style="font-size:.88rem;color:var(--ink-muted);max-width:480px;line-height:1.7;">Advisory intelligence from India Gully's active deal pipeline — sector analysis, regulatory briefings, and market forecasts.</p>
      </div>
      <a href="/insights" class="btn btn-dko" style="flex-shrink:0;"><i class="fas fa-book-open" style="margin-right:.5rem;font-size:.7rem;"></i>All Articles</a>
    </div>

    <!-- 3-column article cards -->
    <div class="insights-strip-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;">
      ${RECENT_INSIGHTS.map((a, idx) => `
      <article class="ins-home-card reveal" style="border:1px solid var(--border);overflow:hidden;transition:box-shadow .25s,transform .25s;" onmouseover="this.style.boxShadow='0 12px 40px rgba(0,0,0,.12)';this.style.transform='translateY(-3px)'" onmouseout="this.style.boxShadow='';this.style.transform=''">
        <!-- Thumbnail -->
        <a href="/insights/${a.id}" style="display:block;position:relative;height:168px;overflow:hidden;">
          <img src="${a.img}" alt="${a.title}" loading="lazy"
               style="width:100%;height:100%;object-fit:cover;transition:transform 5s ease;"
               onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 55%);"></div>
          <span style="position:absolute;top:.875rem;left:.875rem;background:${a.color};color:#fff;font-size:.52rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.22rem .65rem;">${a.category}</span>
        </a>
        <!-- Body -->
        <div style="padding:1.5rem;">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.875rem;">
            <span style="font-size:.62rem;color:var(--ink-muted);">${a.date}</span>
            <span style="width:3px;height:3px;border-radius:50%;background:var(--border-dark);display:inline-block;"></span>
            <span style="font-size:.62rem;color:var(--ink-muted);"><i class="fas fa-clock" style="margin-right:.25rem;font-size:.55rem;"></i>${a.readTime}</span>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.08rem;color:var(--ink);line-height:1.4;margin-bottom:.75rem;">
            <a href="/insights/${a.id}" style="text-decoration:none;color:inherit;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='inherit'">${a.title}</a>
          </h3>
          <p style="font-size:.8rem;color:var(--ink-soft);line-height:1.75;margin-bottom:1.25rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${a.excerpt}</p>
          <a href="/insights/${a.id}" style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${a.color};text-decoration:none;display:inline-flex;align-items:center;gap:.35rem;transition:gap .2s;" onmouseover="this.style.gap='.55rem'" onmouseout="this.style.gap='.35rem'">
            Read Article <i class="fas fa-arrow-right" style="font-size:.58rem;"></i>
          </a>
        </div>
      </article>`).join('')}
    </div>

    <style>
      @media(max-width:900px){.insights-strip-grid{grid-template-columns:repeat(2,1fr)!important;}}
      @media(max-width:560px){.insights-strip-grid{grid-template-columns:1fr!important;}}
    </style>

  </div>
</div>

<!-- ══ ADVISORY PARTNERS ══════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;" class="mob-stack">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Transaction Advisory</p>
        <h2 class="h2" style="margin-bottom:1.5rem;">Our Advisory<br>Partners</h2>
        <p class="lead" style="margin-bottom:2rem;">India Gully collaborates with globally recognised advisory and consulting firms, bringing institutional credibility, financial rigour and sector depth to complex mandates.</p>
        <div style="padding:1.25rem 1.5rem;border-left:3px solid var(--gold);background:rgba(184,150,12,.04);">
          <p style="font-size:.82rem;line-height:1.8;color:var(--ink-soft);">Joint advisory with Ernst &amp; Young on the <strong style="color:var(--ink);">₹1,350+ Cr Entertainment City Limited divestment</strong> — a 100% shareholder-consented divestment, one of India's most significant entertainment real estate transactions.</p>
        </div>
      </div>
      <div class="partners-grid" style="grid-template-columns:repeat(3,1fr);">
        ${ADVISORY_PARTNERS.slice(0,3).map((p: any) => `
        <div class="partner-card reveal">
          <div style="height:52px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
            <img src="${p.logo}" alt="${p.name}" style="max-width:140px;max-height:42px;width:auto;height:auto;object-fit:contain;"
                 loading="lazy" decoding="async"
                 onerror="this.style.display='none';this.parentElement.nextElementSibling.style.display='flex'">
            <div style="display:none;align-items:center;justify-content:center;width:130px;height:42px;background:${p.color};border-radius:2px;">
              <span style="font-size:.78rem;font-weight:800;letter-spacing:.06em;color:${p.textColor || '#fff'};">${p.abbr}</span>
            </div>
          </div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);margin-bottom:.25rem;">${p.name}</div>
          <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);">${p.sub}</div>
        </div>`).join('')}
      </div>
    </div>
    <!-- Row 2: remaining partners centred -->
    ${ADVISORY_PARTNERS.slice(3).length > 0 ? `
    <div style="display:flex;justify-content:center;gap:1.5rem;margin-top:1.75rem;flex-wrap:wrap;">
      ${ADVISORY_PARTNERS.slice(3).map((p: any) => `
      <div class="partner-card" style="padding:1.75rem 2.5rem;flex:0 0 auto;min-width:160px;">
        <div style="height:52px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
          <img src="${p.logo}" alt="${p.name}" style="max-width:150px;max-height:46px;width:auto;height:auto;object-fit:contain;"
               loading="lazy" decoding="async"
               onerror="this.style.display='none';this.parentElement.nextElementSibling.style.display='flex'">
          <div style="display:none;align-items:center;justify-content:center;width:130px;height:42px;background:${p.color};border-radius:2px;">
            <span style="font-size:.78rem;font-weight:800;letter-spacing:.06em;color:${p.textColor || '#fff'};">${p.abbr}</span>
          </div>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);text-align:center;margin-bottom:.25rem;">${p.name}</div>
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);text-align:center;">${p.sub}</div>
      </div>`).join('')}
    </div>` : ''}
  </div>
</div>

<!-- ══ TRACK RECORD ══════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4rem;flex-wrap:wrap;gap:2rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Track Record</p>
        <h2 class="h2">Mandates Executed.<br>Relationships Built.</h2>
      </div>
      <a href="/works" class="btn btn-dko">View All Completed Works</a>
    </div>

    <div id="trackRecord">
      ${[
        { title:'Entertainment City Limited — Landmark Divestment',  loc:'Joint Advisory with EY · Noida, UP',      icon:'🏆', type:'Transaction Advisory', value:'₹1,350+ Cr', desc:'Served as Joint Transaction Advisors alongside EY for the 100% shareholder-consented divestment of Entertainment City Limited. A landmark entertainment real estate transaction with full board and promoter alignment.' },
        { title:'Worlds of Wonder — Post-COVID Re-opening',          loc:'10-Acre Waterpark · Noida, UP',           icon:'🎡', type:'Operational Revival',  value:'Pan-India',  desc:"Orchestrated the strategic re-opening of India's premier waterpark following COVID-19 closure. Managed lease negotiations and operational revival for this 10-acre world-class attraction." },
        { title:'Khubani at Hyatt Andaz Delhi',                      loc:'42,000 Sq. Ft. Dining · New Delhi',       icon:'🍽️', type:'Hospitality Leasing',  value:'42,000 Sq Ft', desc:'Negotiated and executed leasing for a signature 27,000 + 15,000 Sq. Ft. premium restaurant space within the iconic Hyatt Andaz property in New Delhi.' },
        { title:'800 Sq. Yard Asset — Anand Lok, New Delhi',         loc:'₹65 Cr+ Exit · South Delhi',              icon:'🏛️', type:'Asset Acquisition',    value:'₹65 Cr+', desc:'Executed a strategic acquisition of a prime South Delhi property. Delivered an exceptional ₹65+ Crores exit within a 6-month turnaround — demonstrating superior deal structuring and market timing.' },
        { title:'HORECA Supply — Mahindra Holidays & Resorts',        loc:'Pan-India · Multiple Locations',          icon:'🍽️', type:'HORECA Procurement',   value:'Pan-India', desc:"Established strategic HORECA supply partnership with Mahindra Holidays & Resorts, one of India's largest leisure hospitality companies, across their pan-India resort network." },
        { title:'Due Diligence — Adlabs Imagica for ECL',            loc:'₹500 Cr Transaction · Maharashtra',       icon:'⚖️', type:'Client-Side SPOC',     value:'₹500 Cr', desc:'Served as dedicated Client-Side SPOC for comprehensive due diligence in ECL\'s evaluation of Adlabs Imagica. Coordinated financial, legal and technical assessments for this landmark acquisition review.' },
      ].map((p, pi) => `
      <div class="feature-card reveal" style="padding:0;overflow:hidden;transition-delay:${pi*0.08}s;">
        <!-- Colored top strip -->
        <div style="height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);"></div>
        <div style="padding:2rem 1.75rem;">
          <!-- Icon + type -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;gap:.75rem;">
            <span style="font-size:2.1rem;flex-shrink:0;">${p.icon}</span>
            <span style="background:rgba(184,150,12,.08);color:var(--gold);border:1px solid rgba(184,150,12,.2);font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.2rem .65rem;white-space:nowrap;">${p.type}</span>
          </div>
          <!-- Value display -->
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--gold);line-height:1;margin-bottom:.625rem;">${p.value}</div>
          <!-- Title + location -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);line-height:1.3;margin-bottom:.3rem;">${p.title}</h3>
          <p style="font-size:.68rem;letter-spacing:.07em;color:var(--ink-muted);margin-bottom:1rem;display:flex;align-items:center;gap:.35rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.58rem;"></i>${p.loc}</p>
          <p style="font-size:.85rem;color:var(--ink-soft);line-height:1.8;">${p.desc}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ LEADERSHIP ════════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1.7fr;gap:5rem;align-items:start;" class="mob-stack">
      <div class="reveal-l">
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Leadership</p>
        <h2 class="h2" style="margin-bottom:1.5rem;">Steered by<br>Industry Veterans</h2>
        <p class="lead" style="margin-bottom:2.25rem;">Our leadership brings decades of combined experience across hospitality, real estate, retail and entertainment, having led marquee mandates for India's most prominent developers, hotel brands and institutional investors.</p>
        <a href="/about" class="btn btn-dk">Meet the Full Team</a>
        <div style="margin-top:3rem;padding:1.5rem;border:1px solid var(--border);background:rgba(184,150,12,.03);">
          <div style="font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">Board & KMP</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);line-height:1.5;">Three Directors. One Vision.<br>Building India's Premier Advisory Practice.</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        ${[
          { name:'Arun K. Manikonda', title:'Managing Director',      sub:'Director on Board & KMP',  init:'AM', photo:'/static/team/arun-manikonda.jpg',  ph:'+91 98108 89134', em:'akm@indiagully.com', li:'https://www.linkedin.com/in/arun-kumar-manikon', bio:'Founding MD with 20+ years across hospitality, real estate and entertainment. Former MD of Entertainment City Limited, Noida. Led ₹1,350 Cr+ 100% shareholder-consented divestment in joint advisory with EY — a landmark entertainment real estate transaction.' },
          { name:'Pavan K. Manikonda', title:'Executive Director',      sub:'Director on Board & KMP',  init:'PM', photo:'/static/team/pavan-manikonda.jpg',  ph:'+91 62825 56067', em:'pavan@indiagully.com', li:'https://www.linkedin.com/in/pavan-kumar-manikonda-49254421/', bio:'Hospitality operations leader with 18+ years across hotel management, HORECA supply and brand on-boarding. Drives business development and operational delivery across India Gully\'s advisory verticals.' },
          { name:'Amit Jhingan',    title:'President, Real Estate',  sub:'Key Managerial Personnel', init:'AJ', photo:'/static/team/amit-jhingan.png',       ph:'+91 98999 93543', em:'amit.jhingan@indiagully.com', li:'https://www.linkedin.com/in/amit-jhingan-11631451/', bio:'Real Estate Vertical Head with 15+ years of pan-India experience. Specialist in retail leasing (1,40,000+ sq ft placed), commercial transactions and hospitality asset advisory across Delhi NCR and beyond.' },
        ].map((p, pi) => `
        <div class="leader-card" style="padding:1.75rem;display:grid;grid-template-columns:auto 1fr auto;gap:1.5rem;align-items:center;transition-delay:${pi*0.1}s;border:1px solid var(--border);" onmouseover="this.style.borderColor='rgba(184,150,12,.25)'" onmouseout="this.style.borderColor='var(--border)'">
          <!-- Avatar -->
          <div style="width:62px;height:62px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid rgba(184,150,12,.3);background:var(--ink);position:relative;">
            <img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;object-position:center top;"
                 onerror="this.style.display='none';this.parentElement.innerHTML='<div style=\'width:62px;height:62px;background:var(--ink);border-radius:50%;display:flex;align-items:center;justify-content:center;\'><span style=\'font-family:DM Serif Display,Georgia,serif;font-size:1.15rem;color:var(--gold);\'>${p.init}</span></div>';">
          </div>
          <!-- Info -->
          <div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.12rem;">${p.name}</div>
            <div style="font-size:.8rem;color:var(--ink-soft);margin-bottom:.1rem;">${p.title}</div>
            <div style="font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${p.sub}</div>
            <div style="font-size:.8rem;color:var(--ink-muted);line-height:1.6;">${p.bio}</div>
          </div>
          <!-- Contact -->
          <div style="text-align:right;flex-shrink:0;display:flex;flex-direction:column;gap:.3rem;">
            <a href="tel:${p.ph.replace(/\s/g,'')}" style="font-size:.68rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;justify-content:flex-end;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-phone" style="font-size:.58rem;color:var(--gold);"></i>${p.ph}</a>
            <a href="mailto:${p.em}" style="font-size:.68rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;justify-content:flex-end;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-envelope" style="font-size:.58rem;color:var(--gold);"></i>${p.em}</a>
            <a href="${p.li}" target="_blank" rel="noopener" style="font-size:.68rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;justify-content:flex-end;transition:color .2s;" onmouseover="this.style.color='#0a66c2'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fab fa-linkedin-in" style="font-size:.58rem;color:#0a66c2;"></i>LinkedIn</a>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ FINAL CTA ═══════════════════════════════════════════════════════ -->
<div class="sec-dk" style="position:relative;overflow:hidden;">
  <!-- Radial gold glow -->
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 65% 85% at 50% 50%,rgba(184,150,12,.07) 0%,transparent 65%);pointer-events:none;"></div>
  <!-- Subtle grid -->
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.025) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;"></div>

  <div class="wrap" style="text-align:center;max-width:820px;margin:0 auto;position:relative;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:1rem;">Get in Touch</p>
    <h2 class="h2-lt" style="margin-bottom:1.5rem;">Ready to Work<br>With India Gully?</h2>
    <p style="font-size:1.05rem;line-height:1.9;color:rgba(255,255,255,.5);max-width:580px;margin:0 auto 3rem;">Whether you are a developer, investor, brand or operator — we bring the advisory depth, network and execution capability to deliver exceptional results.</p>

    <!-- CTA buttons -->
    <div class="cta-flex" style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin-bottom:4rem;">
      <a href="/contact"  class="btn btn-g" style="min-width:230px;justify-content:center;padding:.9rem 2.25rem;">Submit a Mandate Enquiry</a>
      <a href="/listings" class="btn btn-ghost-g" style="min-width:200px;justify-content:center;">View Active Mandates</a>
      <a href="/horeca"   class="btn btn-ghost" style="min-width:200px;justify-content:center;">HORECA Supply Enquiry</a>
      <a href="/horeca/catalogue" class="btn btn-ghost" style="min-width:200px;justify-content:center;"><i class="fas fa-book-open" style="font-size:.65rem;margin-right:.45rem;"></i>Browse HORECA Catalogue</a>
    </div>

    <!-- Quick contact strip -->
    <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:2.5rem;display:flex;flex-wrap:wrap;gap:2.5rem;justify-content:center;align-items:center;">
      <a href="tel:+918988988988" style="display:flex;align-items:center;gap:.65rem;font-size:.82rem;color:rgba(255,255,255,.45);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.45)'">
        <div style="width:32px;height:32px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-phone" style="font-size:.65rem;color:var(--gold);"></i>
        </div>
        +91 8988 988 988
      </a>
      <a href="mailto:info@indiagully.com" style="display:flex;align-items:center;gap:.65rem;font-size:.82rem;color:rgba(255,255,255,.45);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.45)'">
        <div style="width:32px;height:32px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-envelope" style="font-size:.65rem;color:var(--gold);"></i>
        </div>
        info@indiagully.com
      </a>
      <div style="display:flex;align-items:center;gap:.65rem;font-size:.82rem;color:rgba(255,255,255,.35);">
        <div style="width:32px;height:32px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-map-marker-alt" style="font-size:.65rem;color:var(--gold);"></i>
        </div>
        New Delhi, India
      </div>
    </div>

  </div>
</div>

`
  return c.html(layout('Home', content, {
    description: "India Gully. Celebrating Desiness. India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions. ₹1,165 Cr+ active mandate pipeline.",
    canonical: 'https://indiagully.com/',
    ogImage: 'https://indiagully.com/static/og.jpg',
    heroPreload: '/static/mandates/chail/chail-img1.jpg',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://indiagully.com/#organization",
          "name": "India Gully",
          "legalName": "Vivacious Entertainment and Hospitality Pvt. Ltd.",
          "url": "https://indiagully.com",
          "logo": "https://indiagully.com/assets/logo-white.png",
          "description": "India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions.",
          "address": { "@type": "PostalAddress", "addressLocality": "New Delhi", "addressCountry": "IN" },
          "telephone": "+918988988988",
          "email": "info@indiagully.com",
          "sameAs": ["https://indiagully.com"],
          "foundingDate": "2017",
          "knowsAbout": ["Real Estate Advisory","Hospitality Management","Retail Leasing","Entertainment Advisory","HORECA Procurement","Debt & Special Situations"]
        },
        {
          "@type": "WebSite",
          "@id": "https://indiagully.com/#website",
          "url": "https://indiagully.com",
          "name": "India Gully",
          "publisher": { "@id": "https://indiagully.com/#organization" },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://indiagully.com/insights?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        }
      ]
    })
  }))
})

export default app
