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
              <!-- Accurate India state geometry — derived from GADM/Survey of India geographic data -->
              <!-- Projection: lon 68–97.5°E, lat 6.5–37.5°N mapped to 440×520 viewBox -->
              <!-- J&K shown with dashed border per India's official Survey of India claim -->
              <!-- Disputed -->
              <path d="M 167.6,466.4 L 167.7,466.5 L 167.8,466.5 L 167.8,466.6 L 167.7,466.5 L 167.6,466.5 L 167.5,466.5 L 167.4,466.4 L 167.5,466.4 L 167.6,466.4 Z"
                    fill="#d4cdb8" stroke="#8b7d5e" stroke-width="0.7" stroke-dasharray="3,2" stroke-linejoin="round" class="india-state-claim"/>
              <!-- Chandigarh -->
              <path d="M 135.5,118.2 L 135.6,119.6 L 134.3,119.3 L 135.5,118.2 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Delhi -->
              <path d="M 141.0,149.1 L 141.4,150.6 L 142.6,151.8 L 142.9,153.1 L 142.8,154.8 L 141.6,155.2 L 140.3,156.0 L 139.1,154.7 L 137.9,154.4 L 136.3,154.8 L 136.1,153.4 L 137.3,152.2 L 137.2,150.4 L 138.6,149.5 L 139.9,149.2 L 141.0,149.1 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Himachal Pradesh -->
              <path d="M 157.8,90.2 L 158.8,91.8 L 158.9,94.2 L 160.0,95.8 L 161.6,98.1 L 162.8,99.0 L 162.6,100.3 L 162.4,101.6 L 162.3,102.9 L 163.7,104.6 L 162.3,106.6 L 163.2,108.2 L 162.9,109.7 L 164.4,110.1 L 165.7,111.0 L 166.6,112.5 L 164.8,112.9 L 163.6,111.5 L 162.1,111.3 L 161.0,111.1 L 159.8,111.2 L 158.5,110.5 L 157.3,110.2 L 155.7,110.6 L 154.0,111.4 L 152.8,112.1 L 151.5,112.0 L 149.6,114.0 L 148.8,115.3 L 149.3,116.9 L 148.2,118.2 L 148.7,119.7 L 149.0,121.0 L 149.8,122.4 L 147.9,123.6 L 146.6,123.9 L 145.4,124.1 L 144.0,124.0 L 142.5,123.5 L 141.2,123.3 L 140.1,122.0 L 140.2,120.7 L 139.8,119.3 L 138.3,118.5 L 137.3,117.1 L 135.9,116.5 L 134.2,115.8 L 132.8,114.6 L 132.8,113.1 L 132.5,111.7 L 132.0,110.4 L 130.8,110.1 L 129.2,108.1 L 128.0,109.3 L 126.7,109.9 L 125.7,107.9 L 124.9,105.7 L 123.1,102.4 L 122.9,100.2 L 121.1,98.6 L 119.7,97.9 L 118.2,97.6 L 118.9,96.1 L 118.3,94.8 L 119.5,94.3 L 120.8,93.3 L 122.5,92.0 L 122.0,90.7 L 122.4,89.1 L 122.5,87.5 L 122.6,86.2 L 121.4,84.7 L 122.6,83.8 L 124.6,83.1 L 126.1,82.1 L 127.3,81.6 L 128.1,80.2 L 129.5,79.4 L 131.2,79.1 L 132.6,79.4 L 134.4,79.4 L 135.7,80.5 L 137.1,81.8 L 139.4,83.4 L 141.3,84.2 L 143.1,84.7 L 144.5,84.3 L 145.8,83.9 L 147.0,83.0 L 148.3,82.4 L 149.9,84.0 L 150.9,85.7 L 151.4,87.2 L 152.3,88.7 L 153.5,88.4 L 154.9,87.6 L 156.2,87.2 L 157.4,86.3 L 157.8,87.9 L 156.7,89.2 L 156.2,90.6 L 157.5,90.4 L 157.8,90.2 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Haryana -->
              <path d="M 146.5,124.8 L 146.3,126.5 L 144.5,128.2 L 143.0,129.8 L 141.6,131.2 L 140.7,134.1 L 140.1,135.5 L 139.5,136.8 L 139.0,138.1 L 139.7,139.5 L 140.1,140.8 L 140.2,142.2 L 140.1,145.0 L 140.6,146.5 L 141.0,148.0 L 140.3,149.3 L 139.1,149.0 L 137.8,149.6 L 137.3,151.3 L 136.9,152.9 L 135.8,153.9 L 137.6,154.7 L 139.1,154.7 L 140.3,156.0 L 141.5,156.1 L 142.8,154.8 L 144.1,155.7 L 145.2,156.9 L 145.1,158.4 L 145.5,159.7 L 145.2,161.2 L 144.8,162.5 L 145.7,164.0 L 144.5,165.0 L 143.2,165.6 L 141.7,166.2 L 140.6,166.2 L 139.1,166.3 L 138.2,167.6 L 136.9,168.5 L 136.9,166.2 L 137.3,164.8 L 137.2,163.4 L 137.1,162.1 L 137.2,160.7 L 136.0,159.5 L 134.7,160.6 L 133.5,161.6 L 133.3,162.9 L 132.0,163.6 L 130.8,162.5 L 130.2,161.2 L 129.0,160.6 L 128.8,162.0 L 127.5,161.9 L 126.3,162.1 L 126.2,163.4 L 126.5,164.7 L 126.9,166.0 L 125.6,165.6 L 123.9,165.8 L 122.8,164.3 L 123.7,162.9 L 124.3,161.6 L 123.2,161.6 L 124.2,160.2 L 123.3,157.7 L 122.1,156.6 L 120.9,156.3 L 119.6,154.8 L 118.5,153.4 L 117.5,151.1 L 117.1,149.8 L 116.6,148.3 L 116.2,146.8 L 115.3,145.4 L 115.4,144.1 L 114.4,142.5 L 113.2,143.0 L 111.9,142.9 L 110.7,143.2 L 109.5,142.6 L 108.7,141.3 L 107.4,140.6 L 106.2,141.2 L 105.0,141.2 L 103.8,141.2 L 103.1,139.9 L 104.2,138.5 L 103.7,136.2 L 104.0,134.9 L 102.9,135.1 L 102.3,133.8 L 102.9,132.5 L 104.4,132.3 L 105.7,131.4 L 106.9,131.2 L 108.3,131.7 L 109.4,132.9 L 110.6,132.8 L 111.6,134.1 L 112.9,134.8 L 112.1,136.1 L 112.8,137.4 L 114.0,137.7 L 114.2,136.4 L 115.5,134.8 L 116.9,134.4 L 118.3,134.8 L 119.6,134.7 L 120.8,133.7 L 122.1,134.8 L 123.3,135.2 L 124.5,134.9 L 125.7,133.9 L 127.0,133.2 L 126.4,131.8 L 126.9,130.4 L 126.8,129.1 L 128.0,129.2 L 129.2,129.1 L 130.4,129.3 L 132.3,129.0 L 133.0,127.7 L 131.8,127.4 L 133.0,126.3 L 134.3,125.3 L 134.6,124.0 L 135.9,124.1 L 136.8,122.8 L 136.7,121.4 L 136.1,120.1 L 135.6,118.8 L 135.8,117.4 L 135.2,116.0 L 136.4,116.4 L 137.5,117.7 L 138.8,118.7 L 139.9,119.5 L 140.3,121.1 L 141.0,122.9 L 142.3,123.5 L 143.6,124.0 L 144.7,124.2 L 146.5,124.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- J&amp;K + Ladakh -->
              <path d="M 157.8,90.2 L 156.6,91.1 L 156.5,89.4 L 157.7,88.2 L 157.8,86.9 L 156.4,87.1 L 155.1,87.5 L 153.9,88.0 L 152.5,88.8 L 151.5,87.5 L 151.3,86.2 L 150.3,84.6 L 149.0,83.2 L 147.8,82.6 L 146.4,83.6 L 145.2,84.0 L 143.8,84.3 L 141.3,84.2 L 140.1,83.7 L 138.1,82.4 L 136.8,81.4 L 134.9,79.6 L 132.8,79.5 L 131.6,78.8 L 129.5,79.4 L 128.1,80.2 L 127.3,81.6 L 126.1,82.1 L 124.6,83.1 L 123.2,84.2 L 122.0,83.6 L 121.9,85.2 L 122.7,86.5 L 122.8,88.2 L 122.0,89.7 L 120.3,91.2 L 118.4,92.3 L 116.8,93.9 L 115.6,93.1 L 114.3,93.2 L 112.9,92.6 L 111.5,92.0 L 110.0,91.2 L 108.4,91.5 L 106.8,91.1 L 105.2,91.1 L 104.4,89.5 L 104.8,88.1 L 104.8,86.7 L 105.2,85.3 L 103.9,86.5 L 102.6,86.7 L 101.4,86.1 L 100.1,86.2 L 100.2,84.7 L 100.0,83.0 L 98.2,82.2 L 96.8,80.9 L 95.5,79.7 L 95.5,78.2 L 96.6,77.5 L 97.4,75.8 L 97.5,73.7 L 95.7,72.7 L 94.9,70.9 L 95.6,69.5 L 97.5,69.0 L 98.8,68.1 L 99.1,66.5 L 97.6,66.4 L 96.4,66.2 L 95.1,66.4 L 93.9,65.6 L 94.3,64.3 L 95.4,63.3 L 94.8,61.8 L 93.3,61.5 L 92.3,60.0 L 93.3,58.5 L 94.4,56.9 L 97.2,55.3 L 98.6,54.4 L 100.4,54.0 L 104.9,55.4 L 109.9,56.3 L 111.2,56.2 L 112.7,56.1 L 114.0,57.2 L 118.4,58.4 L 119.8,58.2 L 121.0,58.2 L 123.0,56.6 L 124.2,55.5 L 125.6,55.8 L 127.6,55.4 L 129.6,54.3 L 131.3,54.7 L 133.0,54.5 L 134.5,53.2 L 134.7,51.7 L 136.0,51.2 L 137.2,51.5 L 138.6,50.3 L 138.5,48.9 L 144.2,45.4 L 149.5,42.3 L 150.7,43.4 L 152.2,42.3 L 152.9,43.9 L 152.4,46.0 L 154.2,49.4 L 154.5,51.2 L 155.4,52.8 L 156.3,55.8 L 157.8,57.1 L 161.0,57.6 L 163.1,58.8 L 164.3,60.0 L 165.5,60.5 L 166.4,61.8 L 165.2,63.9 L 163.9,64.5 L 162.6,66.5 L 163.4,68.5 L 163.7,70.6 L 163.5,73.7 L 164.1,75.2 L 165.4,76.3 L 166.5,77.7 L 167.6,78.3 L 168.8,78.9 L 170.4,79.7 L 172.0,79.9 L 171.5,81.5 L 171.4,83.3 L 172.8,84.9 L 173.4,86.3 L 173.7,87.8 L 171.4,90.1 L 170.3,90.7 L 168.9,90.7 L 167.9,92.4 L 166.5,92.8 L 164.9,92.6 L 163.4,91.3 L 162.9,89.9 L 162.9,88.6 L 161.6,89.3 L 158.7,89.6 L 157.8,90.2 Z"
                    fill="#d4cdb8" stroke="#8b7d5e" stroke-width="0.7" stroke-dasharray="3,2" stroke-linejoin="round" class="india-state-claim"/>
              <!-- Andhra Pradesh -->
              <path d="M 194.7,360.8 L 193.2,359.8 L 194.6,360.1 L 194.7,360.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andhra Pradesh -->
              <path d="M 184.7,313.0 L 185.5,314.3 L 186.7,315.0 L 188.0,314.8 L 189.1,315.8 L 190.3,317.2 L 191.1,318.8 L 191.8,320.4 L 191.3,321.7 L 192.5,321.1 L 194.0,322.1 L 194.2,323.5 L 194.7,324.9 L 194.9,327.1 L 196.3,327.7 L 197.5,327.2 L 199.0,327.7 L 200.7,327.6 L 201.9,328.0 L 203.3,327.8 L 204.9,326.8 L 206.8,325.5 L 208.2,324.5 L 209.9,323.8 L 211.2,323.9 L 212.4,324.5 L 213.9,323.8 L 214.2,322.5 L 213.7,321.2 L 214.4,319.8 L 214.6,318.4 L 215.2,317.0 L 216.4,316.3 L 216.6,317.7 L 217.7,319.0 L 217.6,320.3 L 218.7,320.1 L 220.1,319.1 L 220.5,317.7 L 221.8,317.9 L 223.4,318.5 L 224.0,317.1 L 224.7,315.8 L 223.9,314.4 L 224.9,312.8 L 226.1,312.4 L 227.4,312.0 L 228.8,311.0 L 228.2,309.5 L 229.6,308.9 L 230.0,307.4 L 231.3,307.6 L 232.2,306.3 L 233.3,307.8 L 233.9,309.3 L 235.2,309.0 L 235.7,310.5 L 237.1,311.5 L 238.6,311.3 L 239.8,311.6 L 241.4,311.5 L 242.6,311.4 L 243.4,310.0 L 244.4,308.6 L 245.7,307.4 L 246.9,306.8 L 248.4,305.8 L 248.4,307.2 L 247.8,308.8 L 245.6,311.7 L 244.2,313.5 L 243.1,314.8 L 241.9,316.0 L 241.1,317.3 L 239.9,318.5 L 238.9,320.1 L 234.6,322.3 L 232.3,323.8 L 231.3,325.2 L 230.0,325.8 L 229.6,327.1 L 228.4,329.1 L 227.1,329.1 L 227.2,330.4 L 226.0,331.6 L 224.8,332.1 L 223.5,333.0 L 222.1,334.0 L 220.6,334.5 L 216.1,337.3 L 214.9,338.6 L 213.8,339.9 L 212.9,341.8 L 213.7,343.1 L 214.3,341.4 L 214.6,342.9 L 214.3,344.5 L 214.2,345.8 L 213.5,347.3 L 212.2,348.5 L 211.1,349.1 L 209.9,349.6 L 208.7,350.2 L 207.4,350.7 L 206.0,351.6 L 204.7,351.5 L 203.4,351.2 L 202.1,351.0 L 200.9,350.6 L 199.6,350.9 L 198.7,352.4 L 197.8,354.5 L 197.4,355.9 L 197.2,357.3 L 195.7,358.5 L 195.3,359.8 L 194.0,359.4 L 193.8,357.3 L 193.0,359.6 L 192.5,361.2 L 192.3,359.3 L 190.7,358.4 L 189.4,358.7 L 187.9,359.4 L 186.4,360.0 L 184.8,361.6 L 184.0,363.8 L 183.7,365.1 L 182.7,366.6 L 182.1,368.0 L 182.0,369.6 L 181.6,371.4 L 181.7,373.3 L 182.3,376.7 L 183.0,378.2 L 183.4,379.5 L 183.4,381.5 L 183.4,382.8 L 182.8,384.7 L 181.6,385.5 L 182.8,385.3 L 182.7,386.6 L 183.0,388.6 L 184.2,391.6 L 184.3,393.0 L 184.2,394.5 L 184.9,396.6 L 183.7,394.8 L 182.9,393.4 L 182.9,394.7 L 181.6,395.2 L 182.3,396.5 L 184.0,397.3 L 182.8,397.8 L 181.5,396.5 L 180.6,398.0 L 180.2,399.3 L 179.0,400.0 L 177.8,400.4 L 176.5,401.4 L 175.2,400.7 L 173.8,399.7 L 172.6,401.0 L 171.6,402.4 L 170.3,402.7 L 169.2,404.2 L 167.9,404.6 L 166.7,404.2 L 165.6,404.0 L 164.0,403.9 L 162.7,404.2 L 161.5,405.4 L 161.1,407.6 L 160.6,408.9 L 159.4,409.3 L 158.7,410.9 L 157.4,410.9 L 155.7,409.0 L 155.8,407.7 L 157.0,407.4 L 158.7,407.3 L 158.3,406.0 L 158.9,404.7 L 159.8,403.1 L 160.4,401.7 L 160.4,400.4 L 159.0,400.1 L 157.8,399.9 L 157.5,398.6 L 157.6,397.3 L 157.7,395.9 L 156.4,395.7 L 155.1,395.5 L 153.8,394.5 L 153.6,393.2 L 153.7,391.8 L 152.4,391.2 L 151.2,391.8 L 151.5,390.4 L 150.3,390.2 L 149.1,390.2 L 148.9,391.5 L 147.7,392.9 L 146.5,393.3 L 145.3,393.8 L 144.2,392.5 L 142.9,391.5 L 141.7,391.2 L 140.4,391.1 L 140.0,392.5 L 138.8,393.1 L 137.6,392.8 L 137.8,391.4 L 137.9,389.8 L 137.2,388.4 L 136.3,386.8 L 137.5,386.3 L 137.9,387.7 L 139.2,388.4 L 140.5,388.9 L 141.7,388.7 L 142.8,390.0 L 143.1,388.7 L 143.3,387.3 L 144.6,386.2 L 144.6,384.9 L 143.5,383.7 L 143.7,385.0 L 142.5,384.4 L 141.1,383.7 L 139.9,383.5 L 139.3,385.0 L 138.1,385.1 L 136.8,384.9 L 136.3,383.6 L 136.9,382.1 L 135.7,381.3 L 134.6,379.9 L 134.5,378.3 L 134.7,376.7 L 135.5,375.2 L 135.6,373.9 L 134.3,373.2 L 134.5,371.9 L 136.2,372.2 L 137.4,372.6 L 138.6,372.8 L 139.7,371.3 L 140.0,369.8 L 139.6,367.9 L 138.5,367.0 L 138.1,365.7 L 138.3,363.7 L 138.4,362.4 L 138.9,361.0 L 138.6,359.6 L 139.2,358.1 L 140.5,357.3 L 141.7,357.3 L 144.3,357.5 L 145.0,356.0 L 145.0,354.1 L 145.1,352.7 L 146.0,351.4 L 144.0,350.6 L 142.3,350.2 L 143.1,348.5 L 144.2,347.3 L 144.2,346.0 L 144.1,344.2 L 144.3,341.7 L 144.8,340.2 L 144.2,338.4 L 143.5,337.0 L 145.2,334.6 L 146.4,333.3 L 147.8,331.7 L 146.7,331.8 L 145.5,331.3 L 144.2,330.8 L 144.7,329.1 L 145.5,327.8 L 147.0,325.7 L 146.8,324.2 L 146.1,322.9 L 146.3,320.9 L 146.0,319.6 L 145.3,318.2 L 146.0,316.9 L 146.7,315.5 L 147.9,315.3 L 148.2,313.9 L 149.4,313.0 L 150.0,311.6 L 151.1,311.0 L 150.1,309.7 L 149.0,308.4 L 149.4,307.0 L 150.0,305.7 L 150.8,304.0 L 152.2,303.1 L 153.5,304.1 L 154.6,304.2 L 154.8,302.6 L 155.4,301.3 L 156.6,300.7 L 156.7,299.1 L 157.2,297.8 L 158.1,296.5 L 157.1,294.8 L 158.2,295.1 L 159.4,295.4 L 160.7,295.3 L 162.0,295.6 L 163.5,295.9 L 164.8,297.9 L 166.1,298.9 L 167.3,298.9 L 169.1,298.0 L 170.3,298.8 L 171.6,299.0 L 173.8,299.7 L 174.9,300.2 L 176.7,298.8 L 178.0,298.8 L 178.9,300.1 L 180.0,300.9 L 180.3,302.5 L 180.1,303.8 L 179.9,305.3 L 179.0,306.6 L 180.2,308.9 L 180.3,310.2 L 180.4,311.7 L 181.7,312.6 L 183.3,313.4 L 184.4,313.2 L 184.7,313.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Kerala -->
              <path d="M 129.8,426.6 L 128.4,427.9 L 127.2,427.9 L 127.3,429.2 L 129.7,430.4 L 130.9,431.2 L 130.7,433.0 L 132.1,434.1 L 133.2,434.0 L 134.2,435.5 L 134.8,436.8 L 133.6,437.0 L 133.7,438.5 L 135.6,439.4 L 136.5,440.7 L 136.4,442.4 L 135.7,444.6 L 135.4,446.0 L 135.7,447.3 L 136.0,448.7 L 137.2,449.8 L 138.4,449.4 L 140.0,448.3 L 141.5,448.8 L 142.0,450.1 L 141.4,452.3 L 141.8,454.1 L 141.4,455.4 L 141.5,456.8 L 140.8,459.8 L 142.5,460.4 L 143.8,461.6 L 143.3,463.0 L 142.6,464.8 L 141.8,467.7 L 141.1,469.1 L 140.8,470.9 L 141.7,472.3 L 140.9,474.2 L 140.8,475.7 L 142.1,477.0 L 141.1,478.3 L 140.7,479.9 L 139.7,481.2 L 138.1,479.9 L 136.4,477.4 L 135.5,476.1 L 134.4,474.8 L 133.3,472.9 L 131.9,471.4 L 132.5,470.1 L 131.3,470.3 L 130.9,468.8 L 130.5,467.5 L 130.0,465.7 L 130.3,467.1 L 129.1,464.4 L 128.3,461.7 L 128.0,459.5 L 127.9,456.6 L 127.4,455.3 L 128.7,458.4 L 128.7,456.9 L 128.6,455.6 L 129.0,457.1 L 129.3,458.5 L 128.9,461.1 L 130.1,461.5 L 129.9,460.1 L 129.8,458.6 L 129.3,457.2 L 129.4,455.8 L 128.4,454.3 L 127.8,453.0 L 127.1,451.6 L 127.2,453.1 L 126.5,451.8 L 127.1,450.4 L 125.9,449.3 L 125.6,448.0 L 124.9,446.6 L 124.7,445.2 L 123.9,443.8 L 123.0,441.9 L 122.6,440.5 L 122.2,438.5 L 121.5,435.8 L 120.3,432.4 L 119.5,430.6 L 118.3,429.6 L 118.0,428.3 L 117.2,426.2 L 115.1,423.4 L 115.1,422.1 L 113.8,421.6 L 114.0,420.2 L 115.3,419.2 L 114.1,419.2 L 112.8,419.7 L 112.6,421.0 L 111.7,418.7 L 111.6,417.4 L 109.9,414.6 L 109.3,413.1 L 107.9,409.6 L 109.1,409.6 L 110.4,409.9 L 111.5,411.1 L 112.7,411.4 L 113.4,412.8 L 114.6,413.6 L 114.5,414.9 L 115.1,416.2 L 117.3,418.6 L 118.5,419.4 L 119.7,420.1 L 121.0,421.5 L 122.2,422.2 L 123.7,422.4 L 124.9,421.9 L 125.1,423.3 L 126.3,423.5 L 127.5,424.4 L 128.7,425.4 L 129.8,426.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Odisha -->
              <path d="M 276.1,256.5 L 277.4,257.5 L 278.6,258.1 L 279.7,258.4 L 280.6,259.8 L 281.0,261.5 L 282.1,260.5 L 283.5,260.9 L 283.8,262.4 L 286.3,263.4 L 286.6,264.8 L 287.3,266.2 L 285.4,267.1 L 284.2,267.1 L 282.1,267.9 L 279.3,270.9 L 278.2,273.3 L 278.3,274.8 L 279.8,278.6 L 278.9,279.9 L 280.2,280.1 L 280.4,281.4 L 277.3,284.0 L 276.6,285.3 L 277.8,285.6 L 277.0,287.0 L 275.2,288.4 L 273.9,289.0 L 272.9,290.5 L 271.9,291.9 L 270.2,291.2 L 268.7,290.6 L 270.1,291.8 L 271.4,292.7 L 270.1,293.7 L 267.9,294.6 L 266.4,294.8 L 264.7,295.4 L 263.5,295.9 L 262.2,296.2 L 260.9,296.8 L 258.9,297.6 L 260.3,296.4 L 260.2,294.2 L 258.8,293.9 L 257.4,294.9 L 256.2,295.6 L 254.9,297.0 L 254.4,298.3 L 253.6,299.7 L 254.9,300.0 L 255.3,298.7 L 257.0,297.4 L 257.0,298.7 L 260.3,297.3 L 258.6,298.2 L 257.5,298.8 L 256.1,299.7 L 254.6,300.7 L 253.0,302.4 L 250.2,304.9 L 249.1,306.4 L 247.9,305.8 L 245.9,307.3 L 244.6,307.8 L 244.4,309.1 L 243.3,310.1 L 242.3,311.4 L 240.4,311.8 L 239.1,311.5 L 237.8,311.5 L 236.4,311.5 L 235.5,310.0 L 235.0,308.4 L 233.6,308.3 L 232.7,307.0 L 231.5,307.4 L 230.2,307.2 L 230.0,308.5 L 228.8,308.5 L 228.5,309.9 L 228.3,311.3 L 226.4,312.6 L 225.1,312.6 L 224.0,314.2 L 224.2,315.7 L 224.0,317.1 L 224.0,318.4 L 222.8,318.8 L 221.6,317.9 L 220.4,317.8 L 219.7,319.2 L 218.6,320.6 L 217.8,319.3 L 216.7,317.9 L 216.5,316.5 L 215.3,316.8 L 214.6,318.1 L 214.4,319.7 L 213.8,321.0 L 214.4,322.4 L 214.0,323.8 L 212.7,324.6 L 211.4,324.1 L 209.9,323.8 L 208.7,324.5 L 206.8,325.5 L 205.6,326.1 L 204.4,326.9 L 203.0,327.7 L 201.8,328.0 L 200.6,327.4 L 201.5,326.1 L 202.0,324.6 L 202.2,323.3 L 202.5,321.9 L 202.8,320.3 L 204.3,319.8 L 205.4,319.0 L 206.4,317.4 L 207.7,316.0 L 208.1,314.6 L 209.0,313.3 L 210.3,312.9 L 211.5,311.8 L 211.7,310.5 L 212.5,308.4 L 212.2,307.0 L 211.7,305.7 L 211.4,304.2 L 211.3,302.8 L 211.5,301.5 L 210.3,300.4 L 209.8,298.8 L 209.8,297.5 L 209.9,296.2 L 208.7,295.4 L 207.1,294.0 L 207.3,291.6 L 208.5,290.5 L 209.5,291.9 L 210.7,291.5 L 211.9,292.6 L 213.4,294.9 L 214.6,294.1 L 216.1,294.3 L 217.4,294.7 L 217.5,296.0 L 218.7,295.2 L 219.1,293.8 L 219.2,292.3 L 218.0,292.4 L 216.6,291.9 L 215.2,291.2 L 215.5,289.7 L 215.4,288.4 L 215.2,287.0 L 215.3,285.3 L 214.2,283.7 L 214.4,282.2 L 214.4,280.9 L 214.2,278.4 L 215.4,278.8 L 216.6,277.4 L 218.0,275.7 L 218.5,274.4 L 220.0,273.6 L 221.3,273.5 L 223.1,273.2 L 224.2,273.9 L 225.4,274.2 L 226.8,272.1 L 227.3,270.8 L 228.5,270.6 L 228.4,269.1 L 228.3,267.8 L 229.9,264.5 L 230.2,263.2 L 231.4,262.7 L 231.7,261.4 L 230.9,259.7 L 231.3,258.3 L 232.2,256.8 L 233.8,255.9 L 235.2,254.6 L 236.6,254.1 L 237.7,252.7 L 237.4,251.3 L 238.7,251.9 L 239.7,253.3 L 240.9,254.2 L 242.2,254.8 L 243.6,254.7 L 244.8,254.1 L 248.2,253.1 L 249.4,252.8 L 250.7,253.2 L 252.6,252.2 L 253.5,253.7 L 253.4,255.1 L 252.6,256.5 L 252.0,257.8 L 253.2,258.1 L 254.7,259.0 L 256.0,258.6 L 257.4,257.6 L 258.6,257.5 L 259.9,258.3 L 261.4,258.6 L 262.7,258.3 L 263.2,259.6 L 264.5,260.1 L 265.7,258.6 L 266.0,257.2 L 265.8,255.8 L 266.1,253.7 L 265.4,252.2 L 266.6,251.2 L 267.7,251.9 L 270.1,253.2 L 271.5,254.7 L 273.0,254.6 L 274.9,255.6 L 276.1,256.5 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Karnataka -->
              <path d="M 146.0,319.6 L 146.3,320.9 L 146.7,322.5 L 146.6,323.8 L 147.0,325.2 L 146.1,326.6 L 145.6,328.0 L 144.6,329.5 L 144.6,331.0 L 146.0,331.4 L 147.3,331.5 L 146.5,332.9 L 145.4,334.3 L 143.5,337.0 L 144.2,338.3 L 144.8,340.0 L 144.3,341.4 L 144.3,343.7 L 144.0,345.1 L 144.5,346.4 L 143.7,347.7 L 142.6,349.0 L 143.8,350.6 L 145.2,350.7 L 145.7,352.1 L 145.1,353.4 L 145.0,355.0 L 145.0,356.8 L 142.5,357.5 L 141.3,357.2 L 140.2,357.4 L 138.6,358.8 L 138.5,360.3 L 139.2,361.8 L 138.3,363.7 L 137.9,365.2 L 138.5,367.0 L 139.6,367.9 L 140.0,369.8 L 139.8,371.2 L 138.9,372.7 L 137.7,372.4 L 136.4,372.3 L 134.9,371.5 L 134.4,372.8 L 135.6,373.9 L 135.5,375.2 L 134.9,376.5 L 134.6,377.9 L 134.4,379.2 L 135.4,380.6 L 136.6,381.2 L 136.6,382.5 L 136.5,383.8 L 137.7,385.0 L 139.0,385.3 L 139.6,384.0 L 140.8,383.7 L 142.0,384.2 L 143.2,385.0 L 143.3,383.7 L 144.6,384.3 L 144.8,385.7 L 143.6,386.3 L 142.8,388.0 L 143.4,389.4 L 143.8,390.7 L 142.6,389.5 L 140.7,388.9 L 139.5,388.8 L 138.2,388.1 L 137.8,386.5 L 136.5,386.3 L 137.2,387.7 L 137.4,389.0 L 138.3,390.4 L 137.5,391.7 L 137.7,393.0 L 138.9,393.0 L 139.9,391.7 L 141.1,390.8 L 142.3,391.5 L 143.6,391.5 L 144.4,393.0 L 145.6,393.5 L 146.8,392.7 L 147.9,392.3 L 149.2,391.4 L 149.3,390.1 L 150.7,390.4 L 151.2,391.7 L 152.4,391.2 L 153.7,391.8 L 153.6,393.2 L 153.3,394.5 L 154.8,395.2 L 156.0,395.7 L 157.2,395.7 L 157.6,397.1 L 157.5,398.5 L 157.8,399.9 L 159.0,400.1 L 160.2,400.3 L 160.4,401.6 L 159.8,403.1 L 159.1,404.4 L 158.3,406.0 L 159.0,407.3 L 157.7,406.6 L 156.5,407.6 L 155.7,409.0 L 154.3,408.6 L 153.0,407.6 L 151.6,407.8 L 150.2,407.2 L 149.2,408.6 L 148.8,409.9 L 147.4,410.3 L 146.3,411.9 L 146.3,413.2 L 146.8,414.7 L 145.7,416.3 L 145.0,417.8 L 147.6,418.0 L 149.0,419.2 L 148.3,420.7 L 147.4,422.0 L 145.5,422.2 L 144.4,424.0 L 143.2,424.8 L 142.0,424.2 L 140.6,424.5 L 139.3,425.2 L 138.1,424.1 L 136.8,424.5 L 135.9,426.0 L 135.6,427.3 L 132.5,427.2 L 131.1,425.8 L 129.9,426.5 L 128.7,425.4 L 127.5,424.4 L 126.3,423.5 L 125.1,423.4 L 125.0,422.0 L 123.7,422.4 L 122.2,422.2 L 121.0,421.5 L 120.5,420.2 L 119.2,419.7 L 118.0,418.9 L 116.0,416.8 L 114.9,415.5 L 114.8,414.1 L 113.6,413.1 L 113.5,411.6 L 112.3,411.7 L 111.1,411.0 L 109.9,410.2 L 108.9,408.8 L 107.6,408.9 L 108.0,407.6 L 106.4,404.3 L 106.3,402.9 L 105.9,400.9 L 105.5,399.6 L 105.2,398.0 L 105.1,396.7 L 105.0,395.2 L 105.2,393.7 L 104.2,391.7 L 103.3,389.9 L 102.5,388.5 L 102.2,386.4 L 101.5,385.1 L 101.3,383.5 L 100.9,382.2 L 100.4,380.9 L 99.6,379.6 L 99.2,377.7 L 98.0,377.1 L 96.8,376.2 L 98.0,375.2 L 96.7,374.7 L 98.0,374.1 L 99.1,372.7 L 99.1,371.3 L 99.6,370.0 L 99.5,368.7 L 99.6,367.4 L 99.1,366.0 L 99.1,364.5 L 98.8,363.0 L 97.6,362.5 L 97.4,361.1 L 98.5,361.2 L 99.7,361.0 L 100.7,359.6 L 100.9,358.2 L 101.5,356.9 L 100.9,355.6 L 102.1,355.0 L 102.2,353.5 L 100.7,352.0 L 99.8,350.7 L 99.9,349.4 L 98.7,349.0 L 99.9,347.7 L 101.1,347.3 L 102.7,346.6 L 104.2,347.3 L 105.0,345.9 L 106.2,344.7 L 107.5,344.6 L 107.6,343.2 L 108.7,342.2 L 110.3,341.4 L 111.6,342.6 L 113.1,342.2 L 114.3,341.2 L 115.7,340.9 L 116.9,341.0 L 118.3,341.0 L 118.5,339.6 L 118.3,338.3 L 118.5,336.9 L 117.8,335.5 L 117.6,334.2 L 118.7,332.9 L 120.0,333.9 L 121.3,334.1 L 122.5,335.0 L 123.8,335.0 L 125.2,334.5 L 126.5,334.5 L 128.0,334.9 L 129.2,334.6 L 128.7,333.3 L 128.6,332.0 L 128.5,330.7 L 129.7,330.1 L 130.7,328.7 L 132.0,328.3 L 133.3,329.2 L 133.9,327.9 L 134.5,326.5 L 135.6,326.4 L 136.5,324.9 L 136.6,323.2 L 136.9,321.8 L 138.1,321.7 L 139.3,321.4 L 140.6,319.7 L 141.3,318.3 L 142.6,317.2 L 143.0,318.5 L 144.2,319.4 L 145.4,319.4 L 146.0,319.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Maharashtra -->
              <path d="M 190.5,270.5 L 189.9,272.1 L 188.7,272.8 L 187.5,273.7 L 187.2,275.1 L 187.1,276.5 L 188.4,277.1 L 188.8,279.7 L 189.0,281.0 L 187.9,282.4 L 189.1,282.3 L 189.7,283.6 L 189.6,285.8 L 189.3,287.1 L 188.1,288.0 L 186.9,288.5 L 186.8,289.8 L 188.1,290.0 L 188.8,291.5 L 188.5,293.1 L 187.3,293.3 L 187.8,294.6 L 187.0,295.9 L 188.2,295.2 L 189.0,296.7 L 190.2,297.2 L 190.7,298.6 L 191.9,299.2 L 193.4,300.2 L 193.2,301.6 L 192.7,303.0 L 191.4,303.9 L 190.1,303.2 L 188.7,302.1 L 187.6,303.3 L 186.5,304.6 L 186.2,305.9 L 185.0,308.1 L 184.9,309.7 L 185.8,311.1 L 184.6,312.1 L 183.3,313.4 L 182.1,313.3 L 180.9,311.9 L 179.7,311.2 L 180.3,309.4 L 180.0,307.8 L 178.9,307.1 L 180.0,305.7 L 179.9,304.4 L 180.2,303.0 L 180.4,301.7 L 179.5,300.4 L 178.2,299.1 L 176.8,298.7 L 175.7,299.2 L 174.5,300.0 L 172.6,299.7 L 170.3,298.8 L 169.1,298.0 L 167.6,298.4 L 166.4,299.1 L 165.0,298.1 L 164.4,296.7 L 162.9,295.9 L 161.1,295.2 L 160.0,295.1 L 158.3,295.1 L 157.1,294.0 L 157.5,296.1 L 157.4,297.6 L 156.7,299.1 L 156.7,300.5 L 155.5,301.1 L 154.8,302.5 L 155.0,303.9 L 153.8,304.0 L 152.6,303.8 L 151.3,303.1 L 150.5,304.4 L 150.0,305.8 L 149.2,307.2 L 149.0,308.6 L 150.1,309.9 L 150.7,311.2 L 149.4,313.0 L 148.2,313.6 L 148.1,314.9 L 147.0,315.4 L 146.1,316.8 L 145.4,318.1 L 146.0,319.6 L 144.7,320.0 L 143.4,319.1 L 143.0,317.7 L 141.4,317.9 L 141.4,319.3 L 139.8,320.4 L 138.5,321.5 L 136.9,321.8 L 136.6,323.2 L 136.5,324.9 L 136.0,326.3 L 134.7,326.1 L 134.6,327.4 L 133.5,329.3 L 132.3,328.2 L 131.2,328.3 L 130.0,329.6 L 128.5,330.7 L 128.6,332.0 L 128.7,333.3 L 129.2,334.6 L 128.0,334.9 L 126.7,334.4 L 125.5,334.5 L 124.3,335.1 L 123.0,335.4 L 122.2,334.0 L 120.8,334.6 L 119.3,333.8 L 118.0,333.8 L 117.8,335.2 L 118.5,336.7 L 118.3,338.1 L 118.8,339.4 L 118.8,340.8 L 117.5,340.4 L 116.4,341.2 L 114.9,340.9 L 113.3,341.3 L 112.5,342.6 L 111.2,342.4 L 109.6,341.5 L 108.4,342.5 L 107.8,344.2 L 106.5,344.6 L 105.3,345.3 L 105.0,346.7 L 103.7,347.7 L 102.2,346.6 L 100.9,347.5 L 99.8,347.8 L 98.6,348.8 L 99.8,349.4 L 99.8,350.7 L 100.0,352.0 L 101.9,352.7 L 102.1,354.2 L 100.9,355.6 L 101.5,356.9 L 100.9,358.2 L 100.7,359.6 L 99.7,361.0 L 98.5,361.2 L 97.4,361.1 L 96.9,362.6 L 95.5,363.0 L 94.2,361.4 L 93.0,360.3 L 91.5,361.1 L 90.3,359.7 L 89.5,358.3 L 88.2,356.9 L 87.6,355.6 L 87.8,354.2 L 87.0,352.7 L 86.6,351.4 L 86.2,350.0 L 85.7,348.5 L 85.7,347.3 L 85.8,346.0 L 85.4,344.4 L 85.1,343.1 L 85.0,341.8 L 84.9,340.3 L 85.0,339.0 L 84.6,337.4 L 83.9,335.9 L 83.6,334.4 L 83.8,332.9 L 83.0,331.5 L 83.0,330.1 L 82.9,328.8 L 82.3,327.4 L 81.4,325.3 L 81.5,323.9 L 80.9,322.6 L 80.6,321.0 L 81.9,320.9 L 80.7,319.5 L 79.9,318.1 L 79.6,316.8 L 81.1,316.9 L 80.6,315.6 L 79.5,314.3 L 79.1,312.9 L 79.5,311.5 L 80.8,312.0 L 80.9,310.6 L 79.7,310.1 L 81.0,308.9 L 80.9,307.6 L 80.8,305.7 L 80.2,307.1 L 79.6,308.5 L 78.6,310.0 L 78.3,308.6 L 78.5,307.3 L 78.5,306.0 L 78.6,304.5 L 79.8,303.7 L 81.0,303.9 L 79.7,303.4 L 78.4,303.1 L 77.6,301.2 L 79.5,299.8 L 78.3,299.9 L 77.1,298.9 L 76.7,296.7 L 76.5,295.3 L 76.4,293.6 L 76.9,292.3 L 77.7,290.9 L 79.1,290.6 L 80.4,290.2 L 81.1,291.5 L 82.2,291.6 L 83.5,291.5 L 84.5,290.2 L 86.0,289.3 L 86.8,287.9 L 86.6,286.5 L 87.5,284.3 L 87.6,282.9 L 86.4,281.9 L 87.6,280.7 L 88.8,282.0 L 90.0,283.1 L 91.3,283.1 L 92.6,282.3 L 93.1,280.9 L 94.2,279.5 L 94.0,278.0 L 93.6,276.7 L 92.5,275.3 L 91.3,274.3 L 89.7,273.9 L 90.9,273.4 L 92.1,272.9 L 92.7,271.5 L 94.1,271.5 L 94.7,270.1 L 95.9,268.8 L 98.9,268.3 L 99.6,267.0 L 98.2,267.3 L 97.0,267.2 L 95.7,267.1 L 94.3,267.6 L 93.0,267.9 L 92.0,266.5 L 93.1,265.1 L 92.6,263.8 L 93.6,262.3 L 94.9,261.8 L 96.3,260.9 L 97.6,260.9 L 99.0,261.1 L 100.3,260.3 L 101.5,259.9 L 102.4,261.3 L 102.4,262.9 L 102.7,264.2 L 103.9,265.4 L 105.2,266.0 L 106.3,266.3 L 107.6,266.2 L 108.8,266.7 L 110.2,267.1 L 111.3,268.7 L 112.6,269.6 L 114.1,270.0 L 116.5,270.1 L 117.8,270.0 L 119.1,270.0 L 121.3,269.9 L 122.6,269.8 L 124.5,270.2 L 125.7,271.6 L 126.0,273.0 L 126.0,274.4 L 128.0,274.9 L 129.3,274.7 L 130.6,273.7 L 132.7,272.9 L 133.2,271.4 L 133.4,270.1 L 134.6,268.7 L 135.1,267.3 L 136.7,266.2 L 138.6,264.9 L 139.8,264.5 L 141.0,264.7 L 142.2,264.2 L 144.7,263.7 L 145.8,264.6 L 146.1,266.0 L 146.2,267.3 L 144.6,267.3 L 144.6,268.7 L 145.8,269.5 L 147.0,269.7 L 148.3,270.0 L 149.5,269.3 L 150.8,269.7 L 152.8,269.1 L 154.2,268.3 L 155.3,267.1 L 156.8,266.6 L 158.0,266.1 L 158.5,267.6 L 159.7,267.6 L 161.3,268.4 L 162.6,268.5 L 163.8,268.2 L 165.2,267.9 L 165.9,266.6 L 167.8,266.2 L 169.0,265.8 L 170.3,264.6 L 171.9,265.0 L 173.3,265.3 L 174.3,266.6 L 175.6,266.9 L 177.4,266.6 L 178.6,267.5 L 179.7,267.4 L 180.9,267.3 L 182.1,266.6 L 183.3,266.0 L 184.8,266.7 L 186.4,268.2 L 186.4,269.6 L 187.6,269.6 L 189.6,270.8 L 190.5,270.5 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 378.1,498.5 L 378.5,500.2 L 379.0,501.5 L 379.0,503.0 L 378.6,504.5 L 377.8,506.0 L 377.2,504.7 L 376.8,503.3 L 376.2,502.1 L 375.2,500.0 L 376.3,498.7 L 377.5,498.0 L 378.1,498.5 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 375.1,497.8 L 374.6,496.3 L 375.9,494.8 L 376.4,496.3 L 375.1,497.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 372.1,486.6 L 372.4,487.9 L 371.2,487.8 L 370.4,486.0 L 371.5,485.7 L 372.1,486.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 374.0,485.8 L 374.0,486.0 L 374.1,486.3 L 374.1,487.0 L 373.3,486.4 L 373.2,486.1 L 373.2,485.9 L 373.3,485.7 L 373.6,485.8 L 373.6,485.5 L 373.7,485.5 L 373.9,485.6 L 374.0,485.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 373.4,484.3 L 373.0,485.9 L 373.0,484.5 L 372.3,483.1 L 373.5,482.4 L 373.2,483.7 L 373.4,484.3 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 369.5,481.8 L 369.5,482.3 L 369.3,482.1 L 369.2,482.1 L 369.1,482.0 L 369.1,481.9 L 369.1,481.7 L 369.3,481.6 L 369.4,481.6 L 369.5,481.7 L 369.5,481.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 368.5,482.4 L 367.1,481.9 L 366.8,480.4 L 367.5,481.7 L 368.5,482.4 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 367.0,478.5 L 367.0,478.9 L 366.8,478.7 L 366.8,478.4 L 367.0,478.5 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 374.6,478.7 L 374.4,477.1 L 374.7,478.5 L 374.6,478.7 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 363.6,467.3 L 362.1,467.5 L 361.8,466.2 L 363.0,465.8 L 363.6,467.3 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 360.0,440.8 L 360.2,442.1 L 359.4,443.5 L 359.3,445.1 L 358.0,444.8 L 357.6,443.4 L 357.1,441.9 L 357.6,440.7 L 358.6,439.3 L 359.7,439.9 L 360.0,440.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 360.9,431.6 L 360.7,430.2 L 361.3,431.5 L 360.9,431.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 355.6,428.9 L 355.3,428.9 L 355.0,428.7 L 355.0,428.1 L 354.8,427.9 L 354.8,427.8 L 354.9,427.8 L 355.3,427.9 L 355.5,427.9 L 355.6,428.0 L 355.8,428.3 L 355.8,428.6 L 355.6,428.9 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 359.5,428.5 L 359.4,428.5 L 359.4,428.0 L 359.4,427.9 L 359.4,427.7 L 359.5,427.7 L 359.6,427.8 L 359.6,427.9 L 359.7,427.9 L 359.9,428.0 L 359.9,428.2 L 359.6,428.4 L 359.5,428.5 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 366.9,422.9 L 365.6,421.9 L 366.9,422.9 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 366.8,420.2 L 366.1,418.9 L 366.8,420.2 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 367.4,419.6 L 366.9,418.3 L 367.4,419.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 378.4,417.0 L 378.1,417.1 L 378.1,416.9 L 378.2,416.8 L 378.4,417.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 361.6,408.3 L 361.3,406.9 L 361.6,405.6 L 362.0,407.2 L 361.6,408.3 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 366.1,405.3 L 366.1,405.4 L 366.0,405.6 L 365.9,405.7 L 365.8,405.9 L 365.9,406.0 L 365.8,406.2 L 365.8,406.4 L 365.7,406.3 L 365.7,406.2 L 365.6,406.2 L 365.5,406.1 L 365.4,406.2 L 365.4,406.1 L 365.5,406.1 L 365.6,406.1 L 365.6,406.0 L 365.5,406.0 L 365.4,405.7 L 365.5,405.8 L 365.5,405.7 L 365.4,405.6 L 365.4,405.5 L 365.5,405.4 L 365.6,405.5 L 365.6,405.6 L 365.7,405.7 L 365.8,405.6 L 365.8,405.5 L 365.9,405.3 L 366.0,405.4 L 366.1,405.3 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 362.0,404.1 L 361.9,404.2 L 361.8,404.0 L 361.6,403.8 L 361.6,403.6 L 361.8,403.5 L 361.9,403.5 L 361.9,403.6 L 362.1,403.7 L 362.1,403.9 L 362.0,404.1 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 384.3,398.4 L 384.1,398.4 L 383.9,398.2 L 384.2,398.0 L 384.3,398.4 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 366.2,396.0 L 366.7,397.6 L 366.8,399.0 L 365.6,399.6 L 367.0,400.8 L 366.7,403.0 L 366.2,404.6 L 365.1,404.1 L 365.3,405.5 L 364.5,406.8 L 365.5,408.3 L 365.8,409.6 L 365.5,411.2 L 365.8,412.9 L 365.1,414.2 L 363.8,414.3 L 364.6,415.7 L 364.5,417.1 L 364.0,418.5 L 363.1,419.8 L 362.3,421.4 L 362.2,423.3 L 362.5,426.0 L 361.4,427.5 L 362.6,427.2 L 362.2,429.0 L 361.0,428.5 L 360.9,427.1 L 360.3,425.8 L 359.8,424.1 L 359.7,422.4 L 360.8,420.9 L 360.8,419.1 L 361.4,417.7 L 362.6,418.4 L 362.5,417.1 L 361.9,415.4 L 362.0,411.6 L 362.3,410.1 L 362.2,408.3 L 363.3,406.7 L 363.6,405.1 L 363.5,403.5 L 363.7,402.2 L 363.8,400.5 L 364.3,398.8 L 364.7,397.5 L 365.7,396.2 L 366.2,396.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Andaman &amp; Nicobar -->
              <path d="M 366.5,394.5 L 366.7,394.8 L 366.2,394.7 L 365.9,394.6 L 365.8,394.4 L 366.2,394.2 L 366.4,394.2 L 366.5,394.4 L 366.5,394.5 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Assam -->
              <path d="M 396.9,178.8 L 394.8,180.4 L 393.4,180.2 L 392.0,181.6 L 390.0,183.5 L 388.5,184.2 L 387.2,184.6 L 386.2,185.9 L 385.4,187.2 L 384.0,186.6 L 382.9,188.0 L 382.7,189.5 L 380.3,192.5 L 380.2,194.3 L 379.7,195.6 L 379.4,197.3 L 377.8,198.0 L 377.4,196.6 L 376.2,196.4 L 376.0,197.7 L 374.5,199.0 L 373.4,200.5 L 371.9,201.7 L 370.8,202.7 L 371.5,204.0 L 372.5,205.5 L 372.0,207.2 L 371.1,208.7 L 370.6,210.0 L 369.6,211.5 L 369.5,212.8 L 368.9,214.1 L 367.7,214.7 L 367.3,216.0 L 367.1,217.7 L 366.7,219.3 L 366.5,221.1 L 365.1,221.5 L 364.0,221.9 L 362.8,220.3 L 361.8,221.7 L 360.7,223.0 L 359.6,224.6 L 358.4,225.7 L 357.6,224.4 L 355.9,223.9 L 355.3,222.3 L 355.1,220.8 L 353.9,219.1 L 354.3,217.3 L 355.0,215.2 L 354.9,213.9 L 356.8,214.0 L 358.0,214.0 L 358.4,212.6 L 357.2,211.7 L 358.6,210.1 L 360.1,209.2 L 361.4,208.6 L 363.2,207.9 L 363.1,206.5 L 361.7,204.7 L 360.5,204.0 L 361.0,202.6 L 359.1,200.9 L 357.9,199.9 L 356.6,199.6 L 354.9,200.1 L 354.1,198.7 L 354.5,197.3 L 354.2,196.0 L 355.4,194.6 L 354.0,194.1 L 352.4,194.6 L 351.0,194.8 L 349.5,194.2 L 348.2,194.7 L 347.7,196.0 L 346.5,196.4 L 346.5,195.0 L 345.2,196.0 L 344.2,197.4 L 342.6,198.0 L 341.3,199.5 L 340.3,197.8 L 338.8,198.1 L 337.7,196.9 L 336.4,196.4 L 335.0,196.3 L 333.1,196.3 L 331.9,196.0 L 330.6,195.5 L 328.9,195.2 L 327.4,195.8 L 325.2,196.1 L 323.8,197.3 L 322.9,198.7 L 322.4,200.1 L 323.1,201.7 L 321.9,202.7 L 321.7,204.0 L 320.5,204.5 L 320.7,202.5 L 320.7,200.8 L 320.1,198.5 L 320.8,196.9 L 320.6,195.6 L 319.7,194.1 L 318.4,192.9 L 319.4,191.6 L 320.7,190.3 L 321.1,188.2 L 321.6,186.9 L 321.5,185.2 L 321.2,183.8 L 322.9,183.7 L 324.5,183.5 L 325.7,182.1 L 327.0,181.7 L 328.2,181.0 L 330.0,182.1 L 331.6,182.9 L 333.4,183.1 L 336.7,182.9 L 338.3,182.5 L 340.3,182.5 L 341.7,183.0 L 342.8,181.9 L 344.0,181.5 L 345.7,182.4 L 347.5,182.5 L 348.8,181.7 L 349.9,182.5 L 350.4,181.2 L 352.2,181.7 L 354.7,180.8 L 356.2,180.4 L 358.5,179.7 L 360.3,179.2 L 361.6,178.3 L 363.3,178.5 L 364.6,179.0 L 365.8,180.0 L 371.3,179.6 L 372.5,180.2 L 373.7,179.8 L 374.9,179.6 L 376.2,179.0 L 377.7,177.8 L 377.8,176.4 L 379.6,174.4 L 381.1,173.1 L 383.6,170.9 L 383.2,169.5 L 384.6,169.5 L 386.6,169.4 L 388.1,169.4 L 389.6,168.6 L 391.4,168.1 L 392.9,167.3 L 397.9,165.4 L 399.2,165.1 L 401.4,165.1 L 402.8,164.3 L 404.0,163.6 L 408.2,163.3 L 407.2,165.4 L 406.0,166.9 L 405.6,168.1 L 405.9,169.4 L 407.1,171.1 L 407.1,172.5 L 408.3,172.1 L 408.8,173.4 L 407.6,174.5 L 406.4,174.8 L 403.6,175.7 L 402.4,175.0 L 401.2,176.0 L 399.9,177.3 L 398.7,178.1 L 397.5,178.6 L 396.9,178.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Manipur -->
              <path d="M 389.4,204.4 L 388.0,207.7 L 388.9,209.0 L 390.2,209.8 L 390.3,211.2 L 389.5,213.4 L 388.6,215.1 L 387.5,216.4 L 387.1,217.7 L 385.8,219.8 L 385.2,221.1 L 384.4,222.4 L 383.5,225.1 L 383.2,226.6 L 382.2,228.7 L 382.1,230.1 L 380.2,229.1 L 378.9,228.7 L 377.4,228.8 L 376.1,227.6 L 374.7,227.6 L 373.4,228.2 L 372.2,227.8 L 371.2,226.5 L 369.6,227.5 L 368.4,227.1 L 367.1,226.7 L 365.9,226.2 L 366.0,224.8 L 366.1,223.3 L 366.3,222.0 L 366.6,220.6 L 366.8,218.7 L 367.3,217.2 L 367.4,215.8 L 367.9,214.5 L 369.2,213.6 L 369.8,212.2 L 369.8,210.9 L 371.1,208.7 L 371.8,207.4 L 373.0,207.2 L 374.3,208.2 L 375.6,206.5 L 377.4,204.4 L 376.9,203.0 L 379.2,202.7 L 380.6,202.7 L 381.7,203.3 L 382.9,203.6 L 384.8,203.3 L 386.2,202.2 L 388.2,200.6 L 388.2,202.0 L 387.8,203.3 L 389.4,204.4 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Nagaland -->
              <path d="M 397.9,185.0 L 396.8,185.3 L 396.0,186.6 L 395.0,188.1 L 395.1,189.7 L 395.0,191.5 L 395.7,193.8 L 396.0,195.6 L 394.6,196.6 L 394.6,199.1 L 392.6,202.0 L 391.3,203.5 L 390.0,204.0 L 388.7,204.2 L 388.1,202.3 L 388.3,200.8 L 387.1,201.5 L 385.9,202.7 L 383.8,203.5 L 382.6,203.3 L 381.4,203.3 L 380.1,202.7 L 377.4,202.8 L 377.5,204.1 L 376.2,205.8 L 375.2,207.4 L 374.0,207.7 L 372.8,207.1 L 372.5,205.8 L 372.0,204.5 L 370.8,203.1 L 371.9,201.7 L 373.4,200.5 L 374.5,199.0 L 375.9,197.8 L 376.2,196.4 L 377.4,196.6 L 376.9,198.0 L 378.5,197.9 L 379.8,196.7 L 379.7,195.0 L 380.3,193.4 L 381.7,190.6 L 382.8,189.1 L 383.1,187.7 L 384.3,186.7 L 385.7,187.0 L 386.2,185.7 L 387.4,184.6 L 389.7,183.7 L 391.1,182.8 L 392.4,180.9 L 393.8,180.4 L 396.5,179.4 L 397.7,180.0 L 397.5,181.3 L 397.7,182.6 L 397.9,184.5 L 397.9,185.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Meghalaya -->
              <path d="M 357.2,211.6 L 356.0,210.4 L 354.8,210.2 L 353.7,209.4 L 352.2,208.7 L 350.3,208.7 L 348.7,209.0 L 347.6,209.3 L 346.2,209.6 L 344.9,209.3 L 343.6,209.4 L 341.5,208.7 L 340.3,208.5 L 337.1,208.9 L 334.9,209.3 L 333.7,208.9 L 332.5,208.9 L 330.4,208.9 L 328.9,209.2 L 327.3,208.7 L 325.1,208.2 L 321.9,206.8 L 320.7,207.0 L 320.3,205.6 L 321.4,204.2 L 321.7,202.9 L 322.9,202.5 L 322.7,201.2 L 322.5,199.7 L 323.1,198.3 L 324.5,196.8 L 326.3,195.9 L 327.8,195.7 L 329.6,195.3 L 331.0,195.8 L 332.1,196.1 L 333.9,196.1 L 335.6,196.3 L 336.9,196.4 L 337.8,198.0 L 340.0,197.6 L 340.3,199.4 L 341.9,198.7 L 343.4,197.8 L 345.0,197.3 L 345.4,195.7 L 346.6,195.2 L 346.6,196.6 L 347.9,195.6 L 348.7,194.2 L 349.9,194.6 L 352.0,194.5 L 353.4,194.3 L 355.3,194.1 L 354.3,195.6 L 354.5,197.3 L 354.1,198.7 L 354.1,200.3 L 355.5,200.0 L 356.7,199.5 L 358.5,200.3 L 360.1,202.1 L 361.3,201.8 L 360.6,203.1 L 360.8,204.4 L 362.3,205.3 L 363.0,206.7 L 361.4,208.6 L 360.1,209.2 L 358.6,210.1 L 357.2,211.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Punjab -->
              <path d="M 134.8,116.3 L 135.8,117.7 L 134.4,118.1 L 134.7,119.8 L 135.9,120.0 L 136.7,121.3 L 136.9,122.7 L 136.8,124.4 L 135.3,124.1 L 134.1,124.8 L 133.2,126.2 L 131.9,126.7 L 133.0,128.0 L 131.4,129.6 L 130.3,129.2 L 129.6,127.9 L 128.4,129.2 L 127.2,128.7 L 127.0,130.0 L 126.5,131.4 L 126.7,132.7 L 125.1,134.2 L 123.8,134.9 L 122.6,135.0 L 121.3,133.8 L 120.0,134.0 L 118.8,134.6 L 117.5,134.4 L 116.2,134.1 L 115.1,135.5 L 113.9,136.9 L 112.7,137.1 L 112.5,135.8 L 112.7,134.4 L 111.5,134.0 L 111.2,132.7 L 109.9,133.0 L 108.8,132.3 L 107.6,131.6 L 106.4,131.4 L 105.1,131.8 L 103.7,132.0 L 100.9,131.6 L 99.6,131.6 L 94.2,131.3 L 95.0,128.7 L 94.5,126.7 L 93.2,125.3 L 94.4,124.2 L 95.4,122.9 L 96.2,121.4 L 97.6,120.3 L 98.8,118.7 L 99.9,117.2 L 101.2,116.6 L 102.5,115.6 L 103.7,114.2 L 104.8,113.5 L 103.3,113.1 L 102.7,111.7 L 102.9,110.3 L 103.6,108.6 L 104.2,107.1 L 103.3,105.0 L 102.5,103.5 L 103.1,102.1 L 104.6,100.5 L 106.3,99.7 L 107.2,98.3 L 108.7,98.2 L 109.9,97.7 L 111.1,97.5 L 112.4,96.6 L 113.8,96.3 L 114.6,94.8 L 113.9,93.3 L 115.2,93.3 L 116.4,93.7 L 117.8,92.6 L 119.4,92.3 L 121.0,90.9 L 122.6,91.8 L 120.8,93.3 L 119.5,94.3 L 118.3,94.8 L 118.9,96.1 L 117.9,97.5 L 119.1,97.8 L 120.4,98.2 L 121.9,99.0 L 123.4,101.1 L 124.9,105.7 L 125.7,107.9 L 126.2,109.4 L 127.4,109.7 L 128.4,108.4 L 129.8,109.1 L 130.9,110.3 L 132.1,110.5 L 132.5,111.8 L 132.6,113.4 L 133.1,114.9 L 134.8,116.3 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Rajasthan -->
              <path d="M 102.8,131.8 L 103.2,133.2 L 102.0,134.5 L 103.2,134.9 L 103.7,136.2 L 103.6,137.6 L 104.1,139.2 L 103.4,140.6 L 104.6,141.4 L 106.0,141.2 L 107.3,140.6 L 108.6,141.2 L 109.2,142.5 L 110.4,142.8 L 111.8,143.0 L 113.2,143.0 L 114.4,142.4 L 115.5,143.8 L 115.3,145.1 L 116.1,146.7 L 116.7,148.0 L 116.9,149.3 L 117.5,151.1 L 117.9,152.4 L 118.9,154.0 L 120.3,155.3 L 121.5,156.5 L 123.3,157.7 L 124.3,159.0 L 125.0,160.4 L 123.8,160.8 L 124.1,162.2 L 123.7,163.6 L 123.5,164.9 L 125.2,165.6 L 126.5,166.3 L 126.7,165.0 L 126.2,163.4 L 126.3,162.1 L 127.5,161.9 L 128.7,162.4 L 128.7,161.1 L 130.1,160.5 L 130.7,161.8 L 131.5,163.3 L 132.9,163.0 L 133.2,161.7 L 134.4,160.8 L 135.6,159.5 L 137.1,160.5 L 137.1,162.1 L 137.2,163.4 L 137.3,164.8 L 136.9,166.2 L 136.7,167.5 L 138.1,167.8 L 139.2,167.3 L 140.4,166.2 L 141.7,166.2 L 142.3,167.7 L 142.7,169.1 L 143.0,170.5 L 144.1,172.0 L 145.2,173.2 L 146.6,174.0 L 147.1,175.4 L 146.9,176.7 L 145.5,177.6 L 147.0,178.9 L 148.1,179.0 L 144.7,180.9 L 143.8,182.4 L 145.0,182.0 L 147.3,181.2 L 148.6,180.4 L 149.8,180.7 L 151.2,180.9 L 152.4,181.1 L 153.6,180.4 L 154.8,180.2 L 154.8,181.5 L 154.5,182.8 L 153.6,184.1 L 152.4,184.3 L 151.1,184.8 L 149.8,185.7 L 148.5,187.2 L 147.1,187.6 L 145.6,188.6 L 144.4,188.8 L 143.1,189.6 L 141.9,190.9 L 140.7,191.7 L 139.6,191.9 L 138.4,192.7 L 137.2,193.8 L 135.5,195.2 L 134.4,196.7 L 133.2,196.7 L 131.9,197.8 L 131.3,199.4 L 131.3,202.7 L 131.7,204.2 L 132.9,205.3 L 134.1,205.7 L 135.4,206.1 L 136.9,206.6 L 138.1,206.5 L 139.5,205.9 L 140.7,206.1 L 141.5,204.8 L 142.8,204.5 L 143.1,205.9 L 143.3,207.2 L 143.7,208.5 L 142.8,209.8 L 141.5,209.7 L 139.4,210.1 L 138.2,210.2 L 136.9,210.8 L 136.2,212.2 L 136.4,213.5 L 135.2,214.0 L 136.0,215.5 L 137.1,215.8 L 138.4,216.5 L 139.0,218.0 L 137.3,219.7 L 136.1,218.6 L 135.4,220.0 L 135.5,221.9 L 136.4,223.5 L 136.3,224.8 L 134.8,225.1 L 133.4,224.1 L 133.4,222.8 L 132.2,223.2 L 131.0,224.4 L 129.7,223.6 L 128.2,223.2 L 127.0,223.1 L 125.8,222.4 L 125.6,223.7 L 125.6,225.1 L 123.9,226.9 L 123.7,228.3 L 122.5,229.0 L 121.2,229.5 L 120.0,229.1 L 119.8,230.5 L 118.2,230.7 L 117.1,229.3 L 116.6,227.9 L 117.8,227.5 L 119.3,227.4 L 120.5,226.9 L 120.5,225.5 L 121.0,223.7 L 120.5,222.4 L 120.1,220.9 L 121.4,220.1 L 122.0,218.1 L 121.3,216.7 L 120.6,215.3 L 118.9,215.8 L 117.5,216.1 L 116.1,216.4 L 114.5,216.1 L 113.1,216.1 L 112.5,214.8 L 112.3,213.5 L 113.6,214.2 L 114.9,214.0 L 113.5,213.3 L 113.9,212.0 L 114.3,210.7 L 113.0,211.0 L 111.7,210.9 L 111.1,212.6 L 109.9,213.6 L 108.6,213.4 L 107.5,212.7 L 107.4,214.1 L 108.5,215.0 L 109.2,216.6 L 108.0,217.0 L 106.9,215.5 L 106.6,216.8 L 106.1,218.2 L 105.6,219.6 L 107.1,220.1 L 106.3,221.9 L 105.9,223.3 L 107.1,223.5 L 108.1,225.2 L 109.0,226.8 L 108.4,229.4 L 108.3,230.9 L 108.8,232.2 L 108.5,233.5 L 107.9,235.0 L 106.7,235.9 L 105.4,236.7 L 103.5,237.9 L 102.8,239.4 L 104.1,240.2 L 105.3,240.8 L 104.2,242.1 L 102.2,242.9 L 100.9,242.7 L 99.7,242.6 L 98.4,241.1 L 97.2,241.1 L 96.8,239.7 L 95.4,238.5 L 94.2,238.5 L 92.8,237.0 L 91.3,237.2 L 90.1,236.8 L 90.0,235.4 L 89.6,233.8 L 88.4,234.1 L 88.5,232.8 L 87.3,231.9 L 86.4,230.3 L 86.8,229.0 L 86.9,227.7 L 86.2,226.1 L 84.8,227.5 L 83.9,226.2 L 82.7,225.3 L 82.7,223.0 L 83.9,222.3 L 82.7,221.3 L 82.6,219.9 L 81.4,219.8 L 80.6,221.1 L 79.2,221.8 L 77.6,221.6 L 76.4,220.3 L 74.9,219.6 L 73.7,220.8 L 72.9,219.4 L 71.7,218.8 L 70.5,218.2 L 71.7,217.7 L 69.9,217.6 L 68.4,217.2 L 66.8,216.5 L 65.5,217.1 L 64.2,217.5 L 62.0,217.1 L 60.8,216.7 L 59.4,216.7 L 58.1,217.3 L 56.9,217.1 L 54.6,217.1 L 53.2,216.1 L 52.8,214.7 L 51.9,213.3 L 51.2,211.6 L 50.7,209.4 L 49.4,207.8 L 48.6,206.2 L 47.7,204.6 L 47.8,202.8 L 47.8,201.4 L 46.4,200.3 L 43.6,200.8 L 42.2,200.4 L 41.5,198.9 L 40.1,197.4 L 39.4,195.8 L 39.5,194.2 L 40.4,192.6 L 40.5,190.7 L 40.7,188.9 L 40.8,187.5 L 39.8,186.1 L 35.8,186.1 L 34.2,184.9 L 31.4,183.6 L 31.1,180.5 L 31.5,178.5 L 32.4,176.3 L 33.7,175.0 L 36.3,172.7 L 37.2,171.3 L 38.4,170.1 L 39.7,166.6 L 41.2,164.9 L 43.1,163.2 L 44.7,162.7 L 46.1,163.0 L 47.3,164.1 L 47.6,165.6 L 48.6,167.4 L 50.3,168.1 L 51.5,167.8 L 53.1,167.0 L 54.9,166.1 L 57.1,165.5 L 58.4,165.4 L 60.7,165.4 L 62.7,164.7 L 65.0,164.0 L 65.4,161.7 L 66.8,159.6 L 68.5,158.1 L 69.7,156.0 L 70.6,152.8 L 72.0,150.9 L 74.4,149.5 L 76.3,148.5 L 77.9,147.7 L 79.8,146.7 L 80.6,145.2 L 81.9,143.4 L 83.0,141.3 L 83.7,140.0 L 84.5,138.4 L 85.2,136.1 L 85.8,134.1 L 86.5,132.2 L 89.1,130.8 L 91.7,130.2 L 94.6,127.9 L 94.0,130.4 L 99.6,131.6 L 100.9,131.6 L 102.8,131.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Uttar Pradesh -->
              <path d="M 181.9,150.0 L 183.2,151.1 L 184.4,151.8 L 185.5,153.1 L 186.9,153.3 L 188.2,152.2 L 189.9,153.1 L 191.2,154.2 L 192.5,155.1 L 193.7,156.1 L 194.9,156.3 L 197.2,157.2 L 198.1,158.7 L 199.1,160.1 L 200.4,160.5 L 201.5,161.7 L 203.1,162.8 L 204.5,163.7 L 205.7,164.7 L 207.2,165.6 L 208.6,164.8 L 210.0,164.8 L 211.5,165.7 L 213.2,167.1 L 215.0,168.4 L 216.8,168.5 L 218.6,168.0 L 219.6,170.4 L 221.8,171.5 L 223.7,172.2 L 225.5,172.2 L 226.7,173.0 L 227.9,174.0 L 228.6,172.5 L 230.4,171.8 L 232.0,172.0 L 235.0,173.4 L 236.2,174.1 L 236.8,175.4 L 237.0,176.9 L 238.0,178.2 L 238.7,180.3 L 239.9,181.4 L 241.1,181.2 L 241.2,183.0 L 243.2,184.6 L 241.1,185.2 L 239.7,185.0 L 238.7,186.3 L 237.4,187.1 L 238.7,188.5 L 240.3,189.0 L 240.2,190.5 L 239.1,191.2 L 237.9,191.4 L 238.3,192.9 L 239.7,194.3 L 240.9,195.9 L 242.5,196.5 L 243.8,197.3 L 244.9,197.6 L 246.4,198.7 L 245.5,200.2 L 244.0,200.0 L 242.9,199.4 L 242.4,200.7 L 241.3,201.2 L 240.8,199.9 L 238.6,200.8 L 237.5,202.1 L 236.2,203.3 L 235.0,204.0 L 233.1,205.3 L 231.1,206.5 L 229.5,207.5 L 228.3,208.8 L 228.2,210.2 L 228.7,211.5 L 228.7,213.0 L 229.3,214.3 L 230.8,215.5 L 230.8,216.8 L 231.0,218.2 L 229.8,219.3 L 229.4,220.7 L 230.0,222.0 L 229.4,223.4 L 228.3,225.5 L 227.4,226.8 L 226.8,228.3 L 225.6,228.9 L 224.1,229.1 L 222.6,229.0 L 221.3,227.9 L 220.0,226.8 L 219.3,225.5 L 219.9,223.2 L 220.2,221.5 L 219.9,219.9 L 219.9,218.6 L 220.5,217.2 L 219.3,216.1 L 218.0,216.6 L 215.8,216.1 L 215.2,217.5 L 213.7,217.5 L 213.1,216.2 L 212.4,214.8 L 211.2,214.7 L 209.8,213.9 L 207.6,212.9 L 207.3,211.6 L 206.2,211.2 L 204.5,210.6 L 203.3,210.3 L 203.0,208.9 L 201.4,208.8 L 200.2,209.1 L 198.9,209.0 L 198.3,210.5 L 197.7,211.8 L 196.5,213.1 L 195.3,212.2 L 194.1,212.3 L 192.8,212.1 L 192.1,210.7 L 193.1,208.6 L 191.8,209.1 L 190.6,209.1 L 190.2,210.4 L 189.0,209.2 L 187.8,209.8 L 187.7,211.3 L 186.4,211.4 L 185.2,211.4 L 185.3,210.1 L 186.6,209.0 L 186.5,207.7 L 185.4,206.2 L 184.8,204.9 L 183.6,204.9 L 182.4,205.9 L 181.1,206.3 L 179.9,207.2 L 178.7,207.6 L 179.0,209.0 L 177.7,209.2 L 176.0,209.2 L 174.8,208.8 L 173.6,209.8 L 172.4,209.3 L 172.7,207.5 L 171.5,207.3 L 171.2,206.0 L 170.7,208.3 L 169.3,208.7 L 168.2,208.4 L 166.9,208.8 L 167.3,207.5 L 166.1,208.0 L 164.9,208.8 L 165.0,207.3 L 165.7,206.0 L 166.1,204.7 L 165.4,203.3 L 164.5,204.6 L 163.5,203.2 L 163.0,204.5 L 162.9,205.8 L 161.6,205.0 L 160.4,205.9 L 159.7,207.2 L 161.1,209.4 L 161.5,212.2 L 162.5,213.6 L 162.8,215.4 L 162.6,216.7 L 164.0,217.3 L 165.4,218.9 L 166.3,220.6 L 165.2,222.2 L 164.5,223.6 L 163.2,223.9 L 161.9,223.1 L 160.8,222.2 L 159.6,221.2 L 158.4,222.6 L 157.2,222.4 L 157.3,221.1 L 156.1,220.0 L 156.0,218.7 L 156.0,217.4 L 155.7,215.9 L 155.2,214.2 L 155.6,212.8 L 156.8,211.8 L 157.1,210.5 L 157.5,209.1 L 156.6,206.3 L 156.1,205.0 L 157.3,203.8 L 158.9,202.3 L 160.2,202.4 L 162.6,201.5 L 162.8,200.0 L 163.0,198.7 L 164.3,197.0 L 165.1,195.5 L 165.9,194.1 L 165.5,192.7 L 165.7,191.4 L 166.9,190.7 L 167.2,189.4 L 167.2,188.0 L 166.2,186.3 L 165.7,184.7 L 164.4,184.0 L 163.2,183.0 L 161.7,182.9 L 160.4,183.3 L 158.9,182.7 L 157.7,181.7 L 156.4,181.7 L 155.2,182.2 L 155.8,180.8 L 154.5,180.2 L 153.4,180.7 L 152.2,180.9 L 150.8,180.7 L 149.0,180.5 L 147.6,181.0 L 145.4,182.1 L 143.9,183.0 L 143.8,181.7 L 147.1,179.8 L 148.3,179.4 L 147.1,178.7 L 146.0,178.7 L 146.3,177.4 L 147.5,176.1 L 146.8,174.5 L 145.3,173.3 L 144.1,172.0 L 143.1,170.6 L 142.6,169.3 L 142.6,168.0 L 142.1,166.3 L 143.7,165.5 L 144.8,165.0 L 145.6,163.7 L 144.9,162.1 L 145.2,160.8 L 145.6,159.5 L 144.8,158.1 L 144.8,156.8 L 143.6,155.9 L 142.5,154.1 L 142.9,152.8 L 141.4,150.6 L 141.0,149.1 L 140.6,147.7 L 140.3,145.5 L 140.0,142.5 L 140.0,141.1 L 139.7,139.5 L 139.0,138.2 L 139.5,136.8 L 140.1,135.5 L 140.7,134.1 L 141.1,132.1 L 142.1,130.7 L 143.4,129.4 L 145.4,127.2 L 146.5,125.7 L 148.8,125.7 L 151.4,127.0 L 150.5,128.3 L 149.4,130.4 L 148.8,132.3 L 149.1,133.9 L 150.0,136.5 L 151.3,135.8 L 153.0,136.0 L 154.6,136.2 L 155.1,134.3 L 154.7,132.9 L 155.1,131.7 L 156.4,132.7 L 157.4,134.4 L 159.2,135.5 L 160.3,137.1 L 161.5,138.4 L 163.9,139.8 L 165.3,140.1 L 164.6,141.4 L 163.4,141.9 L 164.7,143.6 L 165.4,145.4 L 166.8,144.8 L 168.5,145.2 L 170.8,147.6 L 172.0,147.7 L 172.8,149.1 L 174.1,149.0 L 175.3,149.5 L 176.6,149.5 L 178.2,149.1 L 179.3,150.1 L 180.5,151.4 L 181.6,150.7 L 181.9,150.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Uttarakhand -->
              <path d="M 181.9,150.0 L 180.9,151.3 L 179.7,150.7 L 178.5,150.2 L 177.5,148.9 L 175.6,149.3 L 174.1,149.0 L 172.9,149.5 L 172.5,148.2 L 171.2,147.7 L 169.1,146.3 L 167.4,144.6 L 165.9,145.1 L 164.7,143.6 L 162.6,142.5 L 163.9,141.6 L 165.3,140.8 L 163.9,139.8 L 161.5,138.4 L 160.3,137.1 L 159.2,135.5 L 157.8,134.8 L 157.0,133.5 L 155.6,131.8 L 155.1,134.3 L 155.1,135.7 L 153.9,136.5 L 152.1,135.5 L 150.0,136.5 L 149.3,135.1 L 148.8,133.2 L 148.7,131.6 L 150.0,128.9 L 151.2,127.8 L 149.7,126.3 L 147.5,124.6 L 146.2,124.4 L 147.6,123.8 L 149.1,122.9 L 148.7,121.3 L 148.8,119.9 L 148.2,118.5 L 148.7,117.0 L 149.0,115.7 L 149.5,114.4 L 150.9,112.6 L 152.5,112.1 L 154.0,111.4 L 155.7,110.6 L 157.3,110.2 L 158.5,110.5 L 159.8,111.2 L 161.0,111.1 L 162.1,111.3 L 163.4,111.5 L 164.8,112.9 L 166.1,112.9 L 166.1,111.6 L 164.9,110.0 L 166.3,109.7 L 166.8,108.0 L 168.1,108.3 L 169.3,109.3 L 169.7,110.6 L 170.5,112.1 L 171.9,113.3 L 173.2,114.5 L 174.3,115.7 L 175.6,115.5 L 177.1,115.2 L 178.5,115.5 L 179.6,116.7 L 180.9,117.3 L 182.2,118.5 L 183.7,118.9 L 183.2,120.3 L 183.5,121.7 L 185.5,122.1 L 186.9,122.9 L 188.1,123.5 L 189.4,123.5 L 190.7,124.3 L 191.8,125.6 L 193.2,126.3 L 194.7,126.8 L 194.0,128.1 L 192.8,128.2 L 191.8,129.7 L 190.5,131.1 L 189.2,131.7 L 188.4,133.2 L 186.5,134.6 L 186.0,136.1 L 186.2,137.7 L 185.0,139.1 L 184.0,140.6 L 184.5,142.0 L 184.5,143.8 L 183.7,145.1 L 182.5,145.9 L 182.2,147.5 L 181.3,148.8 L 181.9,150.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Jharkhand -->
              <path d="M 291.7,208.2 L 291.6,209.6 L 292.5,211.0 L 293.0,212.6 L 292.8,214.0 L 292.2,215.4 L 293.1,216.7 L 293.2,218.0 L 292.1,218.3 L 291.9,219.7 L 291.5,221.0 L 291.0,222.4 L 289.8,223.3 L 289.9,224.7 L 288.7,225.8 L 287.5,225.6 L 287.5,227.0 L 286.2,227.4 L 285.0,226.9 L 283.8,227.2 L 284.5,228.5 L 284.0,229.9 L 282.8,229.7 L 281.6,230.7 L 280.5,230.0 L 279.2,229.3 L 278.0,230.2 L 277.9,231.8 L 275.5,232.6 L 274.0,233.2 L 272.8,233.6 L 271.4,234.5 L 271.0,235.8 L 269.7,236.7 L 268.5,236.1 L 268.1,234.6 L 266.8,234.1 L 266.4,235.5 L 265.1,235.8 L 263.8,236.1 L 264.7,237.4 L 264.0,238.9 L 264.5,240.5 L 265.7,241.0 L 268.3,243.4 L 270.0,243.6 L 272.7,243.8 L 272.1,245.2 L 271.9,246.9 L 273.1,248.0 L 274.6,249.0 L 275.2,250.4 L 276.6,250.8 L 276.4,252.2 L 277.6,253.6 L 278.3,255.0 L 277.2,255.5 L 275.5,256.2 L 273.5,254.7 L 272.2,254.8 L 271.0,254.3 L 267.7,251.9 L 266.6,251.2 L 265.4,251.9 L 266.0,253.4 L 266.2,254.9 L 265.9,256.3 L 266.0,257.6 L 265.1,259.6 L 263.9,260.2 L 263.1,258.9 L 261.8,258.8 L 259.9,258.3 L 258.6,257.5 L 257.4,257.6 L 256.0,258.6 L 254.7,259.0 L 253.4,258.2 L 252.1,258.3 L 252.6,256.5 L 253.4,255.1 L 253.5,253.7 L 253.0,251.9 L 251.8,252.7 L 250.3,253.0 L 248.9,252.8 L 245.4,253.2 L 243.8,254.6 L 242.2,254.8 L 241.1,254.2 L 239.9,253.8 L 238.7,251.9 L 237.4,251.3 L 238.4,249.9 L 239.8,249.3 L 240.9,247.6 L 242.4,246.3 L 242.6,244.9 L 241.4,243.9 L 240.1,243.5 L 238.9,242.3 L 238.1,240.9 L 238.4,238.9 L 237.8,237.6 L 237.1,236.2 L 238.0,234.9 L 237.6,233.6 L 236.5,234.7 L 235.2,234.4 L 234.0,233.3 L 234.0,232.0 L 233.5,230.7 L 231.5,228.8 L 231.0,226.9 L 229.8,225.8 L 228.3,225.5 L 229.0,224.0 L 229.5,222.7 L 229.8,221.3 L 229.2,220.0 L 231.0,219.2 L 232.6,219.4 L 234.2,219.5 L 235.5,219.1 L 236.9,218.9 L 238.0,217.5 L 239.2,219.6 L 240.4,220.1 L 241.6,219.4 L 242.6,221.0 L 244.0,222.2 L 245.2,222.8 L 246.1,221.4 L 247.3,221.6 L 248.4,220.2 L 249.7,220.7 L 250.7,222.0 L 252.0,221.9 L 253.2,221.4 L 254.5,220.8 L 255.8,220.3 L 257.4,219.7 L 258.6,219.6 L 260.0,219.2 L 261.2,218.9 L 261.3,217.5 L 262.0,216.1 L 263.9,215.3 L 265.7,216.4 L 266.9,215.8 L 267.9,218.1 L 269.3,218.6 L 270.5,219.0 L 270.2,220.4 L 271.3,221.4 L 272.5,222.3 L 273.2,220.6 L 274.6,218.7 L 275.8,219.0 L 277.0,218.2 L 278.9,219.2 L 279.3,217.9 L 280.7,218.3 L 281.5,217.0 L 281.6,215.5 L 282.1,214.2 L 282.2,212.1 L 283.0,210.7 L 284.1,210.6 L 284.5,209.2 L 285.9,208.5 L 287.0,207.3 L 288.2,206.5 L 289.9,207.5 L 291.2,207.6 L 291.7,208.2 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- West Bengal -->
              <path d="M 307.7,267.6 L 306.7,266.2 L 307.7,267.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- West Bengal -->
              <path d="M 296.7,266.0 L 295.5,265.8 L 296.0,263.1 L 297.1,264.7 L 296.7,266.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- West Bengal -->
              <path d="M 304.0,262.5 L 304.0,261.2 L 304.0,262.5 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- West Bengal -->
              <path d="M 296.2,262.2 L 296.2,260.9 L 296.2,262.2 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- West Bengal -->
              <path d="M 305.2,177.0 L 306.5,177.8 L 306.8,179.4 L 308.0,180.7 L 309.3,180.8 L 310.3,182.2 L 311.6,182.4 L 312.9,181.9 L 314.3,182.0 L 316.2,182.5 L 317.3,182.8 L 318.7,183.8 L 320.4,184.2 L 321.6,186.9 L 321.1,188.2 L 320.7,189.5 L 319.8,191.2 L 318.3,192.4 L 317.2,192.9 L 317.7,194.3 L 316.8,195.8 L 315.0,195.6 L 313.8,195.5 L 312.4,194.5 L 310.8,193.3 L 310.5,191.8 L 310.0,190.4 L 309.0,189.1 L 307.7,188.7 L 308.1,190.0 L 309.3,191.2 L 307.6,191.1 L 306.3,191.7 L 304.2,191.2 L 304.6,189.9 L 303.4,188.6 L 302.2,187.8 L 300.6,186.7 L 299.3,187.5 L 300.9,188.0 L 301.8,189.4 L 300.6,190.0 L 299.5,191.2 L 298.3,192.4 L 297.1,193.2 L 297.0,194.7 L 296.0,196.7 L 296.0,198.1 L 297.4,198.8 L 299.3,199.9 L 300.7,201.1 L 301.5,202.6 L 303.2,203.6 L 304.4,204.1 L 305.7,203.5 L 306.1,205.2 L 307.3,206.5 L 308.6,206.7 L 308.0,208.1 L 306.6,208.5 L 305.1,208.9 L 303.8,208.5 L 302.6,208.8 L 301.0,208.5 L 300.8,210.8 L 300.3,212.1 L 299.4,213.6 L 298.2,213.6 L 296.4,212.9 L 296.6,214.3 L 295.4,216.3 L 295.7,217.9 L 296.0,219.2 L 300.4,221.8 L 301.9,222.7 L 303.5,223.0 L 304.9,222.6 L 305.4,224.1 L 304.4,225.4 L 304.7,226.8 L 304.9,228.3 L 304.2,229.7 L 303.0,230.1 L 302.6,231.4 L 302.4,233.4 L 303.6,234.6 L 304.8,235.9 L 305.0,238.3 L 304.7,239.8 L 305.9,240.3 L 307.7,240.4 L 307.1,242.3 L 306.7,243.9 L 307.5,245.8 L 308.1,247.2 L 307.9,248.8 L 308.3,250.1 L 308.6,251.5 L 309.0,253.1 L 309.0,254.6 L 309.9,256.6 L 309.8,257.9 L 309.8,259.3 L 309.8,261.0 L 308.4,261.0 L 309.2,262.4 L 309.4,263.7 L 310.2,265.2 L 309.0,266.4 L 307.5,265.6 L 307.2,264.1 L 307.0,265.6 L 305.8,265.8 L 305.6,267.2 L 304.6,265.2 L 304.8,263.0 L 304.9,261.6 L 305.4,260.2 L 304.8,258.8 L 304.7,260.4 L 303.9,258.8 L 304.4,257.4 L 303.6,258.7 L 303.3,260.2 L 302.8,262.4 L 302.8,263.7 L 303.3,265.9 L 302.7,267.2 L 302.1,265.8 L 301.9,264.2 L 302.3,262.8 L 302.1,261.4 L 301.8,262.9 L 301.2,264.5 L 301.2,266.0 L 299.9,265.0 L 299.3,266.4 L 299.0,264.1 L 299.0,265.6 L 299.1,266.9 L 297.9,266.2 L 297.4,264.8 L 297.7,263.4 L 296.9,261.8 L 296.9,260.4 L 297.9,258.7 L 297.6,257.3 L 295.9,256.5 L 294.5,255.7 L 294.0,254.3 L 294.1,255.8 L 295.6,256.8 L 297.0,257.5 L 296.7,259.0 L 295.4,259.6 L 294.5,262.3 L 293.4,263.3 L 291.3,265.0 L 289.7,265.6 L 287.3,266.2 L 286.6,264.8 L 286.3,263.4 L 284.4,263.0 L 283.5,261.2 L 282.2,260.4 L 281.0,261.5 L 280.6,260.0 L 280.1,258.7 L 278.8,258.1 L 277.4,257.5 L 276.1,256.5 L 277.2,255.8 L 278.4,255.1 L 277.6,253.6 L 276.4,252.2 L 276.6,250.8 L 275.4,250.5 L 274.6,249.0 L 273.4,248.0 L 271.9,247.4 L 272.0,246.1 L 272.2,244.8 L 273.4,244.2 L 270.7,243.7 L 269.4,243.6 L 266.6,241.4 L 264.9,241.2 L 263.8,239.7 L 264.5,238.3 L 264.5,237.0 L 266.2,235.6 L 266.4,234.3 L 267.7,234.6 L 268.0,235.9 L 269.3,236.6 L 270.6,236.2 L 271.2,234.7 L 272.8,233.6 L 274.0,233.2 L 275.5,232.6 L 277.1,232.3 L 277.9,231.0 L 278.4,229.7 L 279.9,229.8 L 281.3,230.6 L 282.9,230.8 L 284.0,229.7 L 284.4,228.3 L 284.1,227.0 L 285.3,227.7 L 286.9,227.5 L 287.5,226.2 L 288.7,225.8 L 289.9,224.7 L 289.5,223.4 L 290.8,222.6 L 291.5,221.0 L 291.9,219.7 L 291.3,218.4 L 292.6,218.4 L 293.2,217.1 L 292.8,215.6 L 292.8,214.0 L 293.0,212.6 L 292.6,211.1 L 291.6,209.7 L 291.7,208.4 L 292.5,207.0 L 291.8,205.7 L 292.2,204.2 L 293.7,203.3 L 294.8,203.5 L 295.5,202.2 L 295.4,200.8 L 293.9,199.7 L 293.1,198.4 L 291.9,197.5 L 292.2,196.0 L 292.9,194.7 L 294.3,193.2 L 295.7,192.5 L 296.9,191.2 L 298.3,190.2 L 298.4,188.9 L 297.7,187.6 L 296.5,186.9 L 296.8,184.8 L 297.2,183.5 L 296.9,181.8 L 296.1,180.0 L 294.9,178.6 L 294.5,177.0 L 294.8,175.3 L 295.9,176.6 L 297.5,177.1 L 299.5,177.7 L 300.8,177.7 L 302.1,176.5 L 303.5,176.6 L 305.0,177.0 L 305.2,177.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Bihar -->
              <path d="M 296.0,186.8 L 297.5,186.6 L 298.6,188.3 L 299.1,189.7 L 297.9,190.6 L 296.4,191.8 L 295.3,192.7 L 293.8,193.9 L 292.5,195.1 L 292.2,196.5 L 292.7,197.9 L 293.5,199.3 L 294.8,200.1 L 295.5,201.5 L 295.4,202.8 L 294.1,203.0 L 292.9,203.8 L 291.7,204.4 L 291.5,205.7 L 292.5,207.2 L 291.2,207.6 L 289.9,207.5 L 288.6,206.7 L 287.2,207.0 L 286.6,208.4 L 285.5,208.5 L 284.3,210.4 L 283.1,210.6 L 282.2,212.1 L 282.3,213.8 L 281.5,215.1 L 281.5,216.5 L 281.3,217.8 L 280.0,218.0 L 277.8,218.8 L 276.6,218.7 L 275.2,218.8 L 273.9,219.4 L 273.2,221.1 L 271.3,221.4 L 270.1,220.6 L 270.5,219.2 L 269.3,218.6 L 268.1,218.4 L 267.8,216.9 L 266.5,215.8 L 265.0,216.5 L 262.7,215.3 L 261.9,216.7 L 261.5,218.6 L 260.3,218.7 L 259.1,219.5 L 257.6,219.5 L 256.3,219.8 L 254.5,220.8 L 253.4,222.2 L 252.3,221.8 L 250.7,222.0 L 250.3,220.7 L 249.0,219.9 L 247.8,220.6 L 246.5,221.6 L 245.2,222.8 L 244.0,222.2 L 242.8,221.3 L 242.4,219.6 L 241.2,219.3 L 240.0,219.5 L 238.9,218.7 L 237.7,218.2 L 236.1,219.0 L 234.8,219.1 L 233.5,219.6 L 231.2,219.2 L 231.0,217.8 L 231.1,216.4 L 229.9,215.1 L 228.7,213.8 L 228.8,212.1 L 228.2,210.7 L 228.3,209.3 L 228.8,207.9 L 230.3,207.2 L 233.1,205.3 L 234.6,204.4 L 235.7,203.5 L 237.5,202.1 L 238.6,200.8 L 239.8,199.7 L 241.0,201.0 L 242.2,201.1 L 242.3,199.6 L 243.8,199.8 L 245.3,200.3 L 246.5,199.1 L 245.4,197.7 L 243.8,197.3 L 242.5,196.5 L 241.3,196.4 L 240.2,194.8 L 239.0,194.0 L 238.1,192.5 L 239.2,191.2 L 240.4,190.9 L 240.4,189.5 L 239.0,188.6 L 237.9,187.9 L 236.7,187.9 L 238.3,186.5 L 239.0,185.2 L 240.5,185.1 L 243.2,185.1 L 242.2,183.5 L 241.3,182.0 L 240.2,181.3 L 238.8,180.6 L 238.2,178.9 L 237.5,177.4 L 237.0,176.0 L 236.2,174.7 L 236.0,173.4 L 236.7,172.1 L 237.9,172.2 L 239.2,171.0 L 240.4,172.3 L 241.6,173.1 L 246.0,174.0 L 247.0,175.5 L 247.1,177.3 L 246.7,178.8 L 248.6,179.4 L 249.9,179.6 L 251.1,180.4 L 252.3,181.4 L 253.5,181.6 L 254.8,183.2 L 256.1,183.6 L 257.3,183.0 L 258.8,182.5 L 260.5,181.7 L 261.8,182.4 L 262.0,184.4 L 263.2,185.8 L 264.4,186.1 L 265.6,185.1 L 266.9,185.1 L 268.3,185.8 L 269.5,185.9 L 270.7,185.8 L 272.6,186.7 L 273.9,187.5 L 275.2,188.1 L 276.4,188.8 L 277.6,188.5 L 279.2,187.3 L 280.7,186.3 L 281.5,188.0 L 283.2,189.0 L 284.8,189.9 L 286.0,188.7 L 287.3,188.6 L 288.9,189.4 L 290.2,188.6 L 291.5,188.2 L 292.7,188.0 L 294.2,189.4 L 295.4,188.9 L 295.9,187.5 L 296.0,186.8 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Sikkim -->
              <path d="M 305.2,177.0 L 303.5,176.6 L 302.1,176.5 L 300.8,177.7 L 299.5,177.7 L 298.1,177.1 L 296.9,177.1 L 295.3,175.7 L 295.2,174.1 L 295.1,172.7 L 295.1,171.4 L 296.3,169.0 L 296.7,167.7 L 296.9,166.2 L 296.2,164.8 L 297.6,163.9 L 300.1,163.5 L 301.5,162.6 L 303.2,161.5 L 304.8,162.2 L 306.2,163.0 L 306.3,164.4 L 306.9,165.7 L 306.2,168.8 L 305.4,170.3 L 305.5,171.9 L 306.3,173.2 L 307.5,174.3 L 306.1,175.2 L 305.1,176.9 L 305.2,177.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Chhattisgarh -->
              <path d="M 237.4,251.3 L 237.7,252.7 L 237.0,254.0 L 235.5,254.4 L 234.0,255.8 L 232.7,256.4 L 231.5,257.9 L 231.5,259.2 L 230.9,260.6 L 231.5,261.9 L 230.9,263.2 L 229.9,264.5 L 228.6,266.8 L 228.2,268.3 L 228.9,269.6 L 227.7,270.3 L 226.9,271.9 L 226.4,273.3 L 224.7,274.3 L 223.5,273.5 L 221.6,273.5 L 220.4,273.7 L 218.9,273.6 L 218.0,275.7 L 217.1,277.1 L 215.9,278.5 L 214.5,278.0 L 214.2,280.2 L 214.5,281.7 L 214.2,283.3 L 214.8,284.7 L 215.2,286.7 L 215.4,288.4 L 215.5,289.7 L 215.2,291.0 L 216.4,291.9 L 217.6,292.0 L 218.8,292.2 L 219.1,293.8 L 219.0,295.1 L 217.8,296.0 L 216.8,294.7 L 214.7,294.1 L 213.6,295.1 L 212.6,292.9 L 211.3,292.1 L 210.2,291.6 L 208.7,290.7 L 207.6,291.4 L 206.7,292.8 L 208.3,294.7 L 209.5,295.7 L 209.7,297.2 L 209.8,298.8 L 209.8,300.2 L 211.0,301.4 L 211.3,302.7 L 211.5,304.0 L 211.7,305.5 L 212.1,306.9 L 212.5,308.3 L 212.5,309.6 L 211.7,311.0 L 211.3,312.5 L 210.0,313.1 L 208.8,313.6 L 208.5,314.9 L 207.5,316.3 L 206.1,317.8 L 204.9,319.1 L 203.5,320.1 L 202.4,321.4 L 202.3,323.1 L 202.0,324.6 L 201.5,326.1 L 200.6,327.4 L 199.0,327.7 L 197.6,327.2 L 196.3,327.7 L 195.1,327.6 L 194.8,325.1 L 194.3,323.7 L 194.5,322.4 L 193.3,322.3 L 192.1,321.8 L 191.9,320.5 L 191.1,318.8 L 190.3,317.2 L 189.1,315.8 L 188.0,314.8 L 186.7,315.0 L 185.5,314.3 L 185.0,313.0 L 185.7,311.4 L 184.9,309.7 L 185.0,308.1 L 186.1,306.5 L 186.5,304.6 L 187.6,303.3 L 188.7,302.1 L 190.1,303.2 L 191.4,303.9 L 192.6,303.1 L 192.4,301.8 L 193.6,301.1 L 192.8,299.6 L 191.0,298.8 L 190.5,297.5 L 189.2,296.8 L 188.6,295.4 L 187.4,296.0 L 187.8,294.6 L 187.3,293.3 L 188.5,293.4 L 188.7,291.9 L 188.4,290.1 L 186.9,289.9 L 186.9,288.5 L 188.1,288.0 L 189.3,287.1 L 189.6,285.8 L 189.7,284.4 L 189.7,282.8 L 188.4,282.7 L 188.9,281.4 L 188.8,279.7 L 188.8,278.1 L 187.6,277.2 L 187.1,275.7 L 187.4,274.1 L 188.7,272.8 L 189.9,272.1 L 190.5,270.5 L 190.9,269.1 L 191.1,266.7 L 191.2,264.6 L 192.6,263.2 L 192.7,261.5 L 193.4,259.1 L 194.8,259.1 L 195.4,257.7 L 195.7,256.4 L 196.8,255.0 L 196.8,253.5 L 197.8,252.2 L 199.1,252.4 L 200.4,252.0 L 201.6,252.6 L 203.0,251.6 L 204.2,251.1 L 205.5,249.6 L 206.0,248.3 L 206.2,246.9 L 207.4,245.8 L 208.5,244.5 L 208.5,243.2 L 210.3,242.3 L 211.5,241.5 L 212.0,239.2 L 210.7,237.9 L 209.4,237.5 L 208.3,235.9 L 206.5,235.3 L 205.3,235.5 L 204.0,236.0 L 203.6,234.7 L 204.6,233.1 L 204.2,230.8 L 205.7,230.6 L 207.0,231.0 L 208.4,230.3 L 209.7,230.5 L 212.2,230.9 L 215.2,231.2 L 216.4,231.4 L 218.0,230.6 L 219.2,229.3 L 220.4,228.7 L 222.1,228.7 L 223.2,229.1 L 224.8,229.2 L 226.2,228.8 L 227.2,227.2 L 228.2,225.7 L 229.8,225.8 L 231.0,226.7 L 231.0,228.0 L 233.5,230.7 L 234.0,232.0 L 234.0,233.3 L 235.2,234.4 L 236.5,234.7 L 237.6,233.6 L 238.0,234.9 L 237.1,236.2 L 237.0,237.7 L 238.2,238.1 L 238.2,240.2 L 238.2,241.5 L 239.2,242.9 L 240.6,243.8 L 241.8,243.9 L 242.7,245.2 L 241.9,246.7 L 240.7,248.5 L 239.5,249.5 L 238.2,250.2 L 237.4,251.3 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Madhya Pradesh -->
              <path d="M 220.7,227.7 L 219.8,229.1 L 218.6,229.8 L 217.4,230.9 L 215.2,231.2 L 213.1,231.2 L 210.9,231.0 L 209.4,230.4 L 208.0,230.4 L 206.6,231.0 L 205.1,229.8 L 203.9,229.9 L 204.5,231.8 L 204.4,233.4 L 203.5,234.7 L 204.3,236.1 L 205.5,235.2 L 207.3,235.7 L 208.6,236.3 L 209.7,237.6 L 210.9,237.9 L 211.7,240.5 L 211.3,242.0 L 209.6,242.7 L 208.4,243.6 L 208.0,245.3 L 206.6,246.1 L 206.2,247.4 L 206.0,249.0 L 204.6,250.2 L 203.3,251.4 L 202.1,252.2 L 200.8,252.8 L 199.6,252.3 L 198.4,252.8 L 196.9,253.2 L 196.8,254.5 L 196.4,255.8 L 195.4,257.7 L 195.0,259.2 L 193.7,258.6 L 192.9,260.3 L 192.8,262.5 L 192.1,263.9 L 191.1,266.2 L 191.1,268.1 L 190.8,269.7 L 189.6,270.8 L 188.0,269.8 L 186.8,269.8 L 186.6,268.4 L 185.4,267.3 L 183.7,266.0 L 182.4,266.4 L 180.9,267.3 L 179.7,267.4 L 178.6,267.5 L 177.4,266.6 L 176.2,266.6 L 174.8,267.4 L 174.2,266.1 L 172.7,265.0 L 171.3,265.0 L 170.0,264.7 L 168.3,266.1 L 166.6,266.4 L 165.4,267.9 L 163.8,268.2 L 162.6,268.5 L 161.3,268.4 L 160.0,267.8 L 158.7,267.9 L 158.2,266.4 L 156.8,266.6 L 155.3,267.1 L 154.2,268.3 L 152.8,269.1 L 151.1,269.7 L 149.6,269.3 L 148.3,270.0 L 147.0,269.7 L 145.8,269.5 L 144.6,268.7 L 144.3,267.4 L 146.0,267.4 L 146.1,266.0 L 145.9,264.7 L 144.7,263.7 L 142.9,263.6 L 141.7,264.3 L 140.5,264.4 L 139.1,264.7 L 137.0,266.1 L 135.5,266.5 L 135.1,267.9 L 134.3,269.5 L 133.1,270.4 L 133.2,272.1 L 131.6,273.0 L 130.3,274.2 L 128.4,274.8 L 126.6,274.8 L 125.4,273.6 L 125.7,271.6 L 125.1,270.2 L 123.7,270.0 L 122.2,269.7 L 119.7,270.0 L 118.5,269.9 L 117.3,270.1 L 115.1,270.1 L 112.6,269.6 L 111.4,268.9 L 110.6,267.5 L 109.0,266.8 L 107.7,266.2 L 106.3,266.3 L 105.2,266.0 L 103.9,265.4 L 102.7,264.2 L 102.4,262.9 L 102.4,261.5 L 101.5,259.9 L 100.3,260.3 L 99.0,261.1 L 97.6,260.9 L 97.5,259.0 L 97.0,257.6 L 96.4,256.0 L 96.4,254.6 L 97.5,254.8 L 98.7,254.2 L 97.2,253.4 L 96.0,252.5 L 97.1,251.9 L 99.3,250.2 L 100.5,249.8 L 101.9,247.0 L 100.8,245.9 L 100.3,244.1 L 100.7,242.7 L 101.9,242.9 L 103.2,242.3 L 104.9,241.5 L 104.8,240.2 L 103.3,239.9 L 103.4,238.2 L 104.7,236.9 L 106.5,236.0 L 107.7,235.2 L 108.2,233.9 L 108.8,232.5 L 108.3,231.1 L 108.4,229.4 L 108.9,227.7 L 108.5,226.3 L 108.0,224.4 L 106.2,223.6 L 106.2,222.3 L 107.4,221.0 L 105.7,219.7 L 106.1,218.2 L 106.6,216.8 L 106.4,215.4 L 107.5,216.7 L 108.7,216.9 L 109.4,215.5 L 108.2,214.9 L 107.0,212.9 L 108.2,213.3 L 109.4,213.8 L 110.7,213.4 L 111.0,212.0 L 112.6,211.0 L 114.0,210.7 L 113.9,212.0 L 113.5,213.3 L 115.2,213.1 L 113.9,214.2 L 112.7,213.5 L 112.5,214.8 L 112.8,216.1 L 114.1,216.1 L 115.6,216.4 L 117.5,216.1 L 118.9,215.8 L 120.1,215.2 L 121.3,216.1 L 121.6,217.5 L 122.1,219.4 L 121.0,219.8 L 120.2,221.1 L 120.6,222.5 L 120.5,224.3 L 121.1,225.8 L 120.3,227.2 L 118.8,227.7 L 117.5,227.2 L 116.6,228.7 L 117.9,229.7 L 119.1,230.9 L 119.9,229.4 L 121.2,229.5 L 122.5,229.0 L 123.7,228.3 L 123.9,226.9 L 125.1,226.2 L 125.5,224.8 L 125.7,223.2 L 127.0,223.1 L 128.2,223.2 L 129.7,223.6 L 130.9,224.2 L 132.1,223.3 L 133.3,222.7 L 133.4,224.1 L 134.8,225.1 L 136.0,225.0 L 136.4,223.5 L 135.5,221.9 L 135.4,220.4 L 135.4,218.8 L 136.6,218.9 L 138.6,219.1 L 138.8,217.3 L 137.6,215.9 L 136.4,215.7 L 135.2,214.6 L 136.4,213.5 L 136.2,212.2 L 136.5,210.9 L 138.1,210.2 L 139.4,210.1 L 140.8,209.6 L 142.1,209.6 L 143.3,209.4 L 143.8,208.0 L 143.3,206.7 L 143.1,205.3 L 141.8,204.6 L 141.0,205.9 L 139.7,205.9 L 138.1,206.5 L 136.9,206.6 L 135.7,206.0 L 134.1,205.7 L 132.9,205.3 L 131.7,204.2 L 131.3,202.7 L 130.9,200.5 L 131.2,198.9 L 132.2,197.5 L 133.9,196.8 L 135.1,196.1 L 136.3,194.6 L 137.6,193.5 L 138.9,192.5 L 140.3,191.6 L 141.8,191.1 L 142.9,189.7 L 144.3,189.4 L 145.5,188.8 L 146.9,187.7 L 148.1,187.4 L 149.7,186.5 L 150.8,185.0 L 152.1,184.4 L 153.5,184.5 L 153.7,183.1 L 155.0,182.3 L 156.2,181.9 L 157.7,181.7 L 158.9,182.7 L 160.4,183.3 L 161.7,182.9 L 163.0,182.8 L 164.4,184.0 L 165.6,184.1 L 166.1,185.9 L 167.0,187.4 L 167.3,188.8 L 167.1,190.5 L 166.0,191.1 L 166.0,192.4 L 166.0,193.7 L 165.1,195.5 L 164.3,197.0 L 163.6,198.3 L 162.7,199.7 L 163.1,201.0 L 161.1,201.8 L 159.9,202.4 L 157.7,202.7 L 157.1,204.1 L 156.0,205.5 L 157.3,207.9 L 157.3,209.4 L 157.2,210.9 L 156.0,212.6 L 154.8,213.6 L 155.6,214.9 L 155.9,216.3 L 156.2,217.7 L 155.6,219.2 L 156.5,220.6 L 157.1,221.9 L 158.4,222.6 L 159.0,221.2 L 160.8,222.2 L 161.9,223.1 L 163.1,223.4 L 164.5,223.6 L 165.2,222.2 L 166.3,220.6 L 165.5,219.3 L 164.9,217.9 L 163.6,217.4 L 162.9,216.1 L 162.8,214.6 L 161.8,212.9 L 161.2,210.6 L 160.5,208.2 L 159.8,206.8 L 160.6,205.4 L 161.8,205.1 L 163.0,204.9 L 162.8,203.5 L 163.9,204.8 L 164.6,203.5 L 165.8,204.5 L 165.7,205.9 L 165.2,207.2 L 164.7,208.5 L 165.9,208.0 L 167.0,207.2 L 166.7,208.5 L 168.1,208.4 L 169.2,208.7 L 170.4,209.0 L 170.3,207.2 L 170.9,205.7 L 170.7,207.1 L 171.9,207.1 L 172.0,208.6 L 171.3,210.0 L 172.7,209.3 L 174.0,209.1 L 175.4,209.1 L 177.1,209.1 L 178.5,209.2 L 178.5,207.9 L 179.9,207.2 L 181.1,206.3 L 182.4,205.9 L 183.6,204.9 L 184.8,204.9 L 185.4,206.2 L 186.2,207.6 L 186.6,209.0 L 185.4,209.9 L 184.9,211.4 L 186.2,211.3 L 187.4,211.4 L 187.4,210.0 L 188.6,209.9 L 189.8,210.4 L 191.1,210.3 L 191.9,209.0 L 193.1,208.4 L 192.6,209.7 L 192.1,211.1 L 193.6,211.9 L 195.1,212.2 L 196.5,213.1 L 197.7,212.3 L 198.0,210.8 L 198.4,209.1 L 199.7,208.9 L 201.0,209.9 L 202.7,208.4 L 203.3,209.7 L 204.5,210.6 L 205.8,211.3 L 207.1,211.2 L 207.4,212.5 L 208.7,213.7 L 210.1,214.1 L 211.3,214.7 L 212.4,215.5 L 213.6,216.3 L 214.9,217.5 L 215.4,216.1 L 217.1,216.6 L 219.2,216.1 L 220.4,217.1 L 221.0,218.4 L 219.8,218.8 L 219.8,220.6 L 220.2,222.4 L 219.8,224.3 L 219.6,225.7 L 220.3,227.1 L 220.7,227.7 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Tamil Nadu -->
              <path d="M 184.8,396.9 L 184.9,396.7 L 184.9,396.6 L 185.2,397.4 L 185.3,398.0 L 185.2,398.0 L 184.8,396.9 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Tamil Nadu -->
              <path d="M 184.5,397.6 L 185.7,399.1 L 185.7,400.8 L 185.4,402.3 L 185.2,403.6 L 184.7,405.9 L 184.6,407.8 L 184.2,409.8 L 183.7,411.1 L 183.4,412.5 L 182.6,414.6 L 181.7,415.9 L 180.2,417.6 L 179.9,419.0 L 179.0,420.7 L 178.7,422.0 L 177.5,422.5 L 176.4,421.3 L 176.5,422.6 L 177.0,423.9 L 178.2,424.0 L 177.5,426.6 L 177.3,428.1 L 177.7,429.9 L 178.3,431.3 L 176.3,432.4 L 177.7,431.6 L 178.5,433.2 L 178.8,434.9 L 178.7,437.3 L 177.4,437.7 L 176.9,439.0 L 178.0,439.5 L 178.7,441.3 L 178.7,444.0 L 178.9,447.4 L 178.8,448.8 L 177.4,448.6 L 175.6,448.3 L 177.0,448.9 L 174.9,448.8 L 173.2,448.6 L 171.8,448.7 L 170.5,449.8 L 170.0,451.1 L 170.2,452.7 L 169.5,454.0 L 168.6,455.3 L 167.9,456.7 L 166.4,458.9 L 165.7,460.3 L 165.4,462.0 L 166.0,463.5 L 167.2,464.6 L 170.2,465.0 L 171.5,464.6 L 171.8,466.0 L 173.0,467.1 L 171.8,466.2 L 169.9,465.5 L 168.5,465.6 L 167.0,465.3 L 165.6,465.6 L 164.4,465.7 L 163.2,466.3 L 162.0,466.7 L 159.3,467.7 L 157.7,468.4 L 155.8,470.2 L 155.0,471.7 L 154.9,473.0 L 154.6,474.6 L 154.4,476.2 L 154.2,477.9 L 153.3,479.8 L 149.6,482.1 L 147.3,483.3 L 146.1,484.0 L 144.6,484.4 L 142.6,483.7 L 141.3,482.9 L 140.0,481.4 L 140.7,479.9 L 141.1,478.4 L 142.1,477.1 L 140.9,475.8 L 140.7,474.5 L 141.5,473.2 L 141.6,471.9 L 140.5,469.9 L 141.8,467.7 L 142.6,464.8 L 143.3,463.0 L 143.8,461.6 L 143.0,460.3 L 141.8,460.7 L 141.5,457.3 L 141.3,455.8 L 141.8,454.3 L 141.3,452.6 L 142.1,450.8 L 141.6,449.3 L 140.8,447.9 L 139.4,448.5 L 137.9,449.8 L 136.6,449.2 L 135.9,447.7 L 135.4,446.0 L 135.7,444.6 L 135.6,443.3 L 136.4,441.8 L 136.1,440.4 L 134.9,439.0 L 133.5,438.1 L 133.8,436.8 L 134.2,435.5 L 133.9,434.0 L 132.1,434.1 L 130.9,434.0 L 131.5,432.3 L 130.6,431.0 L 128.2,429.8 L 127.3,428.5 L 128.7,427.9 L 129.9,426.5 L 131.1,425.8 L 131.8,427.1 L 134.6,427.1 L 135.9,426.0 L 136.8,424.5 L 138.0,424.1 L 139.3,425.2 L 140.6,424.5 L 141.8,424.2 L 143.2,424.8 L 144.4,424.0 L 145.0,422.7 L 147.0,422.1 L 148.3,420.7 L 149.1,419.4 L 147.6,418.0 L 145.1,418.0 L 145.1,416.6 L 146.3,415.5 L 147.0,413.8 L 146.2,412.3 L 146.8,410.5 L 148.0,410.4 L 149.0,409.0 L 149.5,407.5 L 150.9,407.2 L 152.0,408.2 L 153.6,408.0 L 155.7,409.0 L 156.6,410.4 L 157.8,411.1 L 159.4,410.2 L 160.5,409.0 L 161.1,407.6 L 161.4,406.2 L 161.8,404.9 L 163.4,404.1 L 164.6,403.9 L 165.8,403.6 L 167.3,404.3 L 168.8,404.5 L 170.0,402.9 L 171.3,402.9 L 172.6,401.6 L 172.8,400.1 L 174.0,399.7 L 176.1,400.4 L 177.4,401.6 L 179.0,400.0 L 180.2,399.3 L 180.6,398.0 L 181.2,396.7 L 182.4,396.9 L 183.7,397.9 L 184.5,397.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Gujarat -->
              <path d="M 100.0,243.3 L 100.5,245.5 L 101.9,246.4 L 100.8,249.5 L 99.6,250.1 L 98.2,251.0 L 96.3,251.6 L 96.6,253.1 L 97.7,253.3 L 98.9,253.6 L 97.5,254.8 L 96.4,254.6 L 96.4,256.0 L 97.0,257.6 L 97.4,258.9 L 97.2,260.8 L 95.1,261.6 L 93.6,262.3 L 92.6,263.8 L 93.1,265.1 L 91.9,266.1 L 92.8,267.8 L 94.3,267.6 L 95.7,267.1 L 97.0,267.2 L 98.2,267.3 L 99.3,266.9 L 98.9,268.3 L 97.0,268.8 L 95.5,269.2 L 94.4,271.1 L 93.2,271.8 L 92.0,273.0 L 90.8,273.4 L 89.4,273.0 L 90.6,274.2 L 92.2,275.1 L 93.4,276.4 L 94.0,278.0 L 94.2,279.5 L 93.1,280.9 L 92.6,282.3 L 91.3,283.1 L 90.2,283.2 L 88.8,282.0 L 87.6,280.7 L 86.5,281.6 L 87.6,282.9 L 87.5,284.3 L 86.4,286.1 L 86.8,287.9 L 86.6,289.2 L 85.1,289.1 L 84.1,290.4 L 82.9,289.3 L 81.7,289.1 L 82.9,288.1 L 81.4,287.3 L 80.3,288.2 L 80.4,290.0 L 79.1,290.6 L 77.9,290.7 L 77.4,289.3 L 77.6,287.8 L 78.3,286.5 L 79.5,285.9 L 79.5,284.0 L 79.6,282.5 L 79.9,281.0 L 80.1,279.7 L 79.8,278.2 L 79.1,276.9 L 77.9,275.7 L 78.6,274.2 L 77.4,274.6 L 76.0,274.8 L 76.8,273.2 L 76.2,271.7 L 76.0,270.4 L 77.3,268.6 L 75.7,269.3 L 76.2,267.9 L 77.7,267.0 L 78.6,265.7 L 80.3,265.5 L 81.5,264.8 L 82.7,264.3 L 81.5,264.6 L 80.1,265.1 L 78.9,265.0 L 77.7,265.1 L 76.2,265.2 L 75.1,265.3 L 74.8,264.0 L 74.9,262.6 L 75.7,261.2 L 76.9,260.9 L 75.7,260.7 L 74.2,260.6 L 74.4,259.1 L 74.6,257.7 L 76.0,256.6 L 77.2,257.1 L 78.5,256.2 L 79.7,256.6 L 78.3,255.7 L 76.3,255.6 L 75.1,255.3 L 73.8,256.2 L 72.5,255.9 L 72.7,254.3 L 71.6,255.8 L 70.4,255.1 L 69.1,255.5 L 70.4,255.3 L 71.5,257.0 L 71.3,258.7 L 70.1,259.8 L 68.9,259.9 L 67.5,260.9 L 69.0,261.2 L 69.4,262.6 L 68.0,261.7 L 66.9,262.6 L 68.2,263.5 L 69.4,263.4 L 70.1,264.7 L 71.2,266.0 L 70.4,268.4 L 69.3,269.8 L 68.5,271.2 L 68.5,272.5 L 66.8,273.9 L 64.2,275.1 L 62.9,275.6 L 61.0,276.8 L 59.7,277.3 L 58.1,278.4 L 54.7,279.9 L 53.4,280.3 L 50.4,280.9 L 49.2,280.7 L 46.2,279.2 L 44.9,278.5 L 43.3,277.3 L 40.6,274.9 L 39.3,273.7 L 38.0,272.0 L 36.3,269.8 L 35.5,268.6 L 33.2,266.2 L 31.6,264.7 L 30.3,263.5 L 29.8,262.2 L 27.7,260.9 L 26.4,259.3 L 24.9,257.5 L 23.6,255.6 L 23.7,254.1 L 24.9,252.5 L 26.1,253.4 L 26.6,254.7 L 28.3,255.4 L 30.4,254.7 L 31.6,253.9 L 32.8,254.1 L 34.1,253.5 L 35.5,253.2 L 36.8,252.4 L 38.1,251.3 L 39.3,251.0 L 40.5,251.2 L 41.8,249.5 L 43.0,247.5 L 43.8,245.5 L 45.1,244.4 L 46.0,243.1 L 45.1,241.8 L 44.2,243.1 L 44.2,244.6 L 43.0,244.8 L 41.8,243.9 L 40.6,244.5 L 39.3,245.2 L 37.6,245.7 L 36.4,246.1 L 35.0,246.9 L 33.6,247.7 L 32.2,247.5 L 31.0,247.2 L 29.6,246.8 L 27.6,246.4 L 26.2,245.7 L 24.8,244.7 L 22.3,243.6 L 19.8,241.7 L 18.7,240.5 L 18.0,238.8 L 17.3,237.4 L 16.1,236.8 L 16.9,235.4 L 15.8,233.9 L 17.0,233.9 L 17.9,232.5 L 19.1,231.6 L 20.3,230.7 L 21.7,229.7 L 20.5,230.1 L 19.3,230.4 L 17.9,231.5 L 16.7,232.0 L 14.9,233.8 L 13.3,234.4 L 12.0,234.0 L 13.3,233.4 L 12.8,232.1 L 12.5,230.5 L 13.7,229.4 L 14.9,228.3 L 16.2,228.3 L 17.8,228.3 L 19.2,228.3 L 20.3,226.1 L 20.3,224.4 L 20.3,223.1 L 21.6,222.8 L 22.9,222.6 L 24.4,223.5 L 25.6,223.2 L 27.2,223.6 L 32.3,223.3 L 33.8,224.7 L 35.2,225.1 L 38.1,225.1 L 39.4,224.2 L 40.0,222.8 L 41.4,222.5 L 42.7,221.9 L 44.4,221.2 L 45.9,220.9 L 46.4,222.5 L 47.3,223.8 L 49.2,224.0 L 50.6,223.5 L 51.5,221.9 L 52.8,221.9 L 53.3,220.6 L 52.4,219.2 L 52.2,217.8 L 53.6,216.7 L 55.9,217.5 L 57.3,217.1 L 58.5,217.2 L 60.5,216.7 L 61.8,217.1 L 63.4,216.8 L 64.6,216.9 L 65.8,217.2 L 67.5,216.3 L 69.4,217.5 L 70.7,217.5 L 71.7,218.8 L 72.8,219.3 L 73.3,220.7 L 74.7,219.5 L 75.9,220.1 L 77.2,221.4 L 78.9,221.7 L 80.1,221.9 L 80.8,220.4 L 82.1,219.6 L 82.5,221.0 L 83.6,221.7 L 82.7,223.0 L 82.3,224.4 L 83.3,225.7 L 84.5,227.3 L 85.6,226.9 L 86.8,227.0 L 87.2,228.7 L 86.4,230.2 L 87.1,231.5 L 88.3,232.6 L 88.3,233.9 L 89.6,233.8 L 90.0,235.1 L 90.0,236.6 L 91.3,237.2 L 92.6,236.8 L 93.8,238.4 L 95.4,238.5 L 96.6,239.5 L 97.0,240.8 L 98.2,241.0 L 99.3,242.4 L 100.0,243.3 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Goa -->
              <path d="M 96.9,362.6 L 98.2,362.5 L 99.0,364.3 L 99.0,365.8 L 99.6,367.3 L 99.5,368.6 L 99.6,369.9 L 99.1,371.3 L 99.1,372.7 L 98.2,374.1 L 96.7,374.7 L 96.0,373.2 L 94.9,371.9 L 94.8,370.6 L 93.9,367.4 L 92.7,366.8 L 94.0,366.3 L 92.7,365.6 L 93.5,364.3 L 92.1,364.9 L 91.7,363.4 L 93.1,362.4 L 91.6,362.8 L 91.0,361.5 L 92.2,361.0 L 93.4,360.9 L 94.3,362.3 L 96.3,362.6 L 96.9,362.6 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Arunachal Pradesh -->
              <path d="M 397.9,185.0 L 397.6,183.7 L 397.3,182.2 L 397.7,180.9 L 397.4,179.6 L 398.7,178.1 L 399.9,177.3 L 401.2,176.2 L 402.2,174.9 L 403.6,175.7 L 405.8,174.7 L 407.3,174.9 L 408.7,173.6 L 408.4,172.2 L 407.2,172.8 L 407.2,171.3 L 406.8,170.0 L 405.6,168.1 L 406.0,166.9 L 407.2,165.4 L 407.9,164.1 L 404.6,163.4 L 402.8,164.3 L 401.4,165.1 L 400.2,165.3 L 398.9,164.9 L 393.7,166.9 L 391.9,167.8 L 390.5,168.3 L 388.8,168.9 L 387.6,169.6 L 385.2,169.8 L 384.0,169.1 L 383.8,170.5 L 381.8,172.6 L 380.6,173.5 L 378.0,176.1 L 377.8,177.5 L 376.4,178.8 L 374.9,179.6 L 373.7,179.8 L 372.5,180.2 L 371.3,179.6 L 366.2,180.1 L 365.1,179.6 L 363.3,178.5 L 361.6,178.3 L 360.3,179.2 L 358.5,179.7 L 356.9,180.2 L 355.6,180.4 L 353.3,180.6 L 352.4,178.9 L 351.5,177.4 L 352.1,176.0 L 352.9,174.6 L 351.7,172.1 L 350.0,172.1 L 348.6,172.6 L 347.2,171.7 L 345.9,170.6 L 345.7,168.8 L 346.5,167.1 L 348.5,167.0 L 349.8,167.6 L 351.0,167.7 L 352.7,166.5 L 354.7,166.3 L 356.0,166.7 L 357.3,165.6 L 358.5,165.7 L 359.7,164.9 L 361.1,164.2 L 361.7,162.8 L 361.0,161.5 L 362.7,160.1 L 364.0,159.9 L 365.4,158.9 L 367.3,157.3 L 368.0,155.8 L 369.0,154.5 L 370.5,153.5 L 372.3,152.4 L 373.8,152.3 L 375.1,152.2 L 377.2,151.1 L 378.4,150.6 L 379.6,149.7 L 381.3,149.0 L 382.6,148.2 L 384.3,147.5 L 384.6,146.1 L 384.3,144.7 L 385.5,143.9 L 386.9,143.7 L 388.5,142.2 L 389.7,142.1 L 390.9,143.4 L 392.3,144.4 L 393.9,145.0 L 395.1,144.8 L 397.1,145.5 L 398.4,146.3 L 398.8,144.9 L 400.2,145.0 L 401.7,145.0 L 402.2,143.7 L 403.6,143.4 L 405.0,142.7 L 405.7,141.4 L 408.0,141.3 L 409.7,141.2 L 411.0,142.2 L 412.4,143.2 L 413.6,142.7 L 413.3,144.2 L 411.6,144.7 L 411.4,146.7 L 412.6,145.8 L 413.9,146.5 L 415.1,147.2 L 415.9,148.9 L 417.1,151.0 L 415.8,152.8 L 415.3,154.1 L 415.7,156.4 L 416.1,154.6 L 417.4,153.4 L 418.6,153.7 L 420.6,155.5 L 421.4,157.5 L 422.8,157.8 L 424.0,157.2 L 425.5,158.1 L 427.0,159.4 L 427.1,161.1 L 428.0,162.9 L 427.7,164.3 L 426.3,164.7 L 424.8,166.2 L 423.6,167.3 L 422.3,168.2 L 421.0,169.4 L 421.2,170.7 L 421.2,172.2 L 423.8,175.8 L 424.7,177.1 L 423.5,177.9 L 421.0,176.6 L 420.3,175.0 L 419.0,173.6 L 417.7,173.9 L 416.4,174.4 L 414.4,174.5 L 410.7,175.2 L 408.8,176.3 L 407.8,178.1 L 405.9,179.3 L 404.5,180.9 L 403.3,181.3 L 402.0,182.2 L 400.7,183.6 L 398.9,184.7 L 397.9,185.0 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Mizoram -->
              <path d="M 366.2,221.3 L 366.5,222.6 L 366.2,224.0 L 365.9,225.5 L 367.1,226.7 L 368.3,226.9 L 369.5,227.0 L 370.4,228.4 L 371.0,230.1 L 371.2,232.0 L 372.1,233.4 L 371.6,236.6 L 371.7,237.9 L 371.3,239.4 L 371.2,241.1 L 370.7,243.0 L 369.5,243.8 L 368.1,243.0 L 368.1,244.6 L 368.2,246.1 L 367.0,247.5 L 366.9,248.8 L 367.5,250.4 L 367.3,251.8 L 368.1,253.1 L 368.4,255.7 L 368.0,257.0 L 366.6,256.7 L 366.3,258.1 L 365.5,259.4 L 364.2,260.7 L 363.6,259.2 L 361.8,257.6 L 361.1,259.0 L 359.9,260.3 L 359.7,259.0 L 359.9,257.7 L 359.1,252.0 L 358.9,250.0 L 358.7,248.5 L 357.9,247.2 L 357.6,245.7 L 356.7,243.4 L 356.4,241.1 L 356.7,239.7 L 356.7,238.3 L 356.1,237.0 L 355.3,234.0 L 355.4,232.5 L 355.5,231.0 L 356.3,229.7 L 356.4,228.1 L 356.4,226.2 L 356.3,224.7 L 357.6,223.9 L 357.9,225.3 L 359.2,225.1 L 360.4,224.0 L 361.4,222.2 L 362.3,220.1 L 363.5,221.7 L 364.9,221.4 L 366.2,221.3 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- Tripura -->
              <path d="M 355.9,223.9 L 356.4,226.1 L 356.3,227.4 L 356.1,228.8 L 356.2,230.1 L 355.4,231.4 L 354.7,233.2 L 353.2,232.3 L 351.9,233.5 L 350.8,232.2 L 350.9,235.3 L 350.4,236.6 L 349.1,237.4 L 348.3,238.7 L 348.1,240.1 L 348.5,241.7 L 348.2,243.0 L 347.0,244.2 L 345.8,244.8 L 344.8,243.3 L 344.2,241.6 L 343.7,240.3 L 342.5,240.3 L 342.8,242.3 L 341.4,239.0 L 341.0,237.5 L 340.6,236.2 L 339.9,234.8 L 339.5,233.4 L 339.5,231.9 L 340.7,230.5 L 340.5,229.2 L 341.4,227.9 L 342.5,226.5 L 344.3,226.3 L 345.7,226.2 L 346.3,224.4 L 347.5,225.4 L 347.9,224.0 L 349.5,225.2 L 350.4,223.5 L 350.6,222.2 L 352.2,221.8 L 353.2,219.8 L 354.9,219.7 L 355.4,221.3 L 354.8,223.5 L 355.9,223.9 Z"
                    fill="#d4cdb8" stroke="#9a8468" stroke-width="0.6" stroke-linejoin="round" class="india-state"/>
              <!-- J&K label -->
              <text x="118" y="42" font-family="DM Sans,sans-serif" font-size="5.5" font-weight="700" fill="rgba(90,74,60,.85)" text-anchor="middle" pointer-events="none">J&amp;K</text>
              <text x="118" y="50" font-family="DM Sans,sans-serif" font-size="4" fill="rgba(90,74,60,.6)" text-anchor="middle" pointer-events="none" font-style="italic">India's Claim</text>
            </g>

            <!-- ══ MANDATE CITY PINS ══ -->

            <!-- Pins — recalibrated to viewBox 0 0 440 520 (scale X×0.4632, Y×0.4727 from market-data) -->

            <!-- Kasauli · Chail lon 77.1°E lat 31.0°N → (123,106) -->
            <g id="pin-himachal" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('himachal',true)" onmouseout="igMapHover('himachal',false)">
              <circle cx="138" cy="116" r="7.5" fill="#1A3A6B" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="138" cy="116" r="3" fill="#fff"/>
              <text x="125" y="111" class="map-pin-label" text-anchor="end">Kasauli · Chail</text>
              <text x="125" y="121" class="map-pin-sub" text-anchor="end">₹75 Cr</text>
            </g>

            <!-- Chandigarh lon 76.8°E lat 30.7°N → (129,109) -->
            <g id="pin-chandigarh" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('chandigarh',true)" onmouseout="igMapHover('chandigarh',false)">
              <circle cx="135" cy="119" r="7.5" fill="#065F46" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="135" cy="119" r="3" fill="#fff"/>
              <text x="148" y="115" class="map-pin-label">Chandigarh</text>
              <text x="148" y="125" class="map-pin-sub">₹70 Cr</text>
            </g>

            <!-- Delhi NCR lon 77.2°E lat 28.6°N → (135,146) — pulsing gold -->
            <g id="pin-delhi" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('delhi',true)" onmouseout="igMapHover('delhi',false)">
              <circle cx="141" cy="153" r="20" fill="rgba(184,150,12,.09)" stroke="rgba(184,150,12,.28)" stroke-width="1">
                <animate attributeName="r" values="20;30;20" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values=".7;0.08;.7" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="141" cy="153" r="11" fill="#B8960C" stroke="#fff" stroke-width="2" filter="url(#mapPinGlow)"/>
              <circle cx="141" cy="153" r="4.5" fill="#fff"/>
              <text x="155" y="148" class="map-pin-label" style="font-size:9px;">Delhi NCR</text>
              <text x="155" y="160" class="map-pin-sub" style="font-size:6.5px;opacity:.7;">3 Mandates · ₹900 Cr</text>
            </g>

            <!-- Jaipur lon 75.8°E lat 26.9°N → (114,175) -->
            <g id="pin-jaipur" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('jaipur',true)" onmouseout="igMapHover('jaipur',false)">
              <circle cx="121" cy="181" r="7.5" fill="#7C3AED" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="121" cy="181" r="3" fill="#fff"/>
              <text x="108" y="177" class="map-pin-label" text-anchor="end">Jaipur</text>
              <text x="108" y="187" class="map-pin-sub" text-anchor="end">₹20 Cr</text>
            </g>

            <!-- Mumbai lon 72.8°E lat 18.9°N → (70,314) -->
            <g id="pin-mumbai" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('mumbai',true)" onmouseout="igMapHover('mumbai',false)">
              <circle cx="79" cy="307" r="8" fill="#dc2626" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="79" cy="307" r="3.2" fill="#fff"/>
              <text x="66" y="303" class="map-pin-label" text-anchor="end">Mumbai</text>
              <text x="66" y="313" class="map-pin-sub" text-anchor="end">Pipeline</text>
            </g>

            <!-- Hyderabad lon 78.5°E lat 17.4°N → (154,340) -->
            <g id="pin-hyderabad" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('hyderabad',true)" onmouseout="igMapHover('hyderabad',false)">
              <circle cx="159" cy="334" r="7" fill="#b45309" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="159" cy="334" r="2.8" fill="#fff"/>
              <text x="172" y="330" class="map-pin-label">Hyderabad</text>
              <text x="172" y="340" class="map-pin-sub">Pipeline</text>
            </g>

            <!-- Bengaluru lon 77.6°E lat 12.9°N → (141,418) -->
            <g id="pin-bengaluru" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('bengaluru',true)" onmouseout="igMapHover('bengaluru',false)">
              <circle cx="147" cy="406" r="7" fill="#065F46" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="147" cy="406" r="2.8" fill="#fff"/>
              <text x="160" y="402" class="map-pin-label">Bengaluru</text>
              <text x="160" y="412" class="map-pin-sub">Pipeline</text>
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
